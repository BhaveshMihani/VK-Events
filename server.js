const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Directory Setup ──────────────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'gallery-db.json');

if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf8');
}

// ── Middleware ───────────────────────────────────────────────
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(UPLOAD_DIR));

// Serve website static files (built Vite bundle in dist)
const DIST_DIR = path.join(__dirname, 'dist');
if (fs.existsSync(DIST_DIR)) {
    app.use(express.static(DIST_DIR));
} else {
    console.warn('⚠️  WARNING: dist/ folder not found. Run "npm run build" to generate production assets.');
}

// ── Database Helpers ─────────────────────────────────────────
function readDb() {
    try {
        if (!fs.existsSync(DB_FILE)) return [];
        const raw = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(raw || '[]');
    } catch (err) {
        console.error('Error reading gallery database:', err);
        return [];
    }
}

function writeDb(data) {
    try {
        const tmpFile = DB_FILE + '.tmp';
        fs.writeFileSync(tmpFile, JSON.stringify(data, null, 2), 'utf8');
        fs.renameSync(tmpFile, DB_FILE);
        return true;
    } catch (err) {
        console.error('Error writing gallery database:', err);
        return false;
    }
}

// ── Multer Storage Setup ─────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const safeBase = path.basename(file.originalname, ext)
            .toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .slice(0, 30);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
        cb(null, `${safeBase || 'event'}-${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowed = /\.(jpe?g|png|webp|gif|svg)$/i;
    if (allowed.test(path.extname(file.originalname)) || (file.mimetype && file.mimetype.startsWith('image/'))) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (JPG, PNG, WEBP, GIF, SVG) are allowed'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 30 * 1024 * 1024 } // 30 MB max
});

// ── API Routes ───────────────────────────────────────────────

// 1. Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        uptime: process.uptime(),
        uploadDir: UPLOAD_DIR
    });
});

// 2. GET /api/media — fetch all permanent uploaded images
app.get('/api/media', (req, res) => {
    try {
        const items = readDb();
        res.json({ success: true, data: items });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. POST /api/upload — upload one or more images permanently
app.post('/api/upload', (req, res, next) => {
    upload.array('images', 20)(req, res, (err) => {
        if (err) {
            console.error('Multer upload error:', err);
            return res.status(400).json({ success: false, error: err.message });
        }

        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ success: false, error: 'No image files provided' });
            }

            const category = req.body.category || 'Other';
            let metaList = [];
            try {
                if (req.body.metadata) {
                    metaList = JSON.parse(req.body.metadata);
                }
            } catch (metaErr) {
                metaList = [];
            }

            const currentDb = readDb();
            const newRecords = [];

            req.files.forEach((file, index) => {
                const meta = (Array.isArray(metaList) && metaList[index]) ? metaList[index] : {};
                const spanType = (meta && meta.spanType === 'large') ? 'large' : 'normal';
                const aspectRatio = (meta && typeof meta.aspectRatio === 'number') ? meta.aspectRatio : null;

                const item = {
                    id: 'media_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
                    category: category,
                    filename: file.filename,
                    originalName: file.originalname,
                    type: 'image',
                    src: `/uploads/${file.filename}`,
                    srcFull: `/uploads/${file.filename}`,
                    spanType: spanType,
                    aspectRatio: aspectRatio,
                    size: file.size,
                    mimetype: file.mimetype,
                    featured: spanType === 'large',
                    isStatic: false,
                    createdAt: Date.now()
                };

                currentDb.push(item);
                newRecords.push(item);
            });

            writeDb(currentDb);

            res.json({
                success: true,
                count: newRecords.length,
                data: newRecords
            });
        } catch (innerErr) {
            console.error('Upload handling error:', innerErr);
            res.status(500).json({ success: false, error: innerErr.message });
        }
    });
});

// 4. POST /api/media/delete — permanently delete images from disk & DB
app.post('/api/media/delete', (req, res) => {
    try {
        const { ids } = req.body;
        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, error: 'Array of ids required' });
        }

        const currentDb = readDb();
        let deletedCount = 0;
        const remainingDb = [];

        currentDb.forEach(item => {
            if (ids.includes(item.id)) {
                // Remove file from disk
                if (item.filename) {
                    const filePath = path.join(UPLOAD_DIR, item.filename);
                    if (fs.existsSync(filePath)) {
                        try {
                            fs.unlinkSync(filePath);
                        } catch (unlinkErr) {
                            console.warn(`Could not delete file ${filePath}:`, unlinkErr.message);
                        }
                    }
                }
                deletedCount++;
            } else {
                remainingDb.push(item);
            }
        });

        writeDb(remainingDb);

        res.json({
            success: true,
            deletedCount,
            remainingCount: remainingDb.length
        });
    } catch (err) {
        console.error('Delete handling error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Fallback route for SPA client routes
app.get('*', (req, res, next) => {
    if (path.extname(req.path)) {
        return next();
    }
    const distIndex = path.join(DIST_DIR, 'index.html');
    if (fs.existsSync(distIndex)) {
        return res.sendFile(distIndex);
    }
    res.status(500).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Build Missing</title></head>
        <body style="font-family: sans-serif; padding: 40px; text-align: center;">
            <h2>⚠️ Production Build Not Found</h2>
            <p>The <code>dist/</code> folder does not exist on this server.</p>
            <p>Please configure your Render <strong>Build Command</strong> to:</p>
            <pre style="background: #f1f1f1; padding: 12px; display: inline-block; border-radius: 6px;">npm install && npm run build</pre>
        </body>
        </html>
    `);
});

// ── Start Server ─────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', () => {
    const interfaces = os.networkInterfaces();
    let localIp = 'localhost';

    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                localIp = iface.address;
                break;
            }
        }
    }

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║               VK EVENTS — BACKEND SERVER                   ║');
    console.log('╠════════════════════════════════════════════════════════════╣');
    console.log(`║  Local Computer : http://localhost:${PORT}                   ║`);
    console.log(`║  On Your Phone  : http://${localIp}:${PORT}               ║`);
    console.log(`║  Permanent Uploads: ${UPLOAD_DIR}   ║`);
    console.log('╚════════════════════════════════════════════════════════════╝\n');
});
