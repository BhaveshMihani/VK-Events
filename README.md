# VK Events — Event Decoration Website & Gallery

A modern event decoration showcase website and dynamic gallery with permanent cloud storage.

## Cloudinary Storage Integration

VK Events supports direct cloud uploads to Cloudinary with automatic image optimization (`f_auto,q_auto`), responsive dimensions, and permanent CDN storage.

### 1. Setup Cloudinary Credentials

Copy `.env.example` to `.env` (already created locally):

```env
# Option 1: Individual credentials (recommended)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Option 2: Full connection URL
# CLOUDINARY_URL=cloudinary://<api_key>:<api_secret>@<cloud_name>

# Optional Cloudinary folder (default: vk-events)
CLOUDINARY_FOLDER=vk-events

PORT=3000
```

> **Note**: If Cloudinary credentials are not provided, the server automatically and gracefully falls back to local disk storage in `uploads/`.

### 2. Running Locally

```bash
# Start both backend server (port 3000) and frontend Vite dev server (port 5173)
npm run dev

# Or run separately:
npm run dev:server   # Node Express backend
npm run dev:client   # Vite React frontend
```

### 3. Migrating Existing Local Photos to Cloudinary

If you already have images uploaded locally in `uploads/` and tracked in `data/gallery-db.json`, you can migrate them to your Cloudinary account with one command:

```bash
npm run migrate:cloudinary
```

This will:
- Upload each local file from `uploads/` to your Cloudinary folder.
- Update `data/gallery-db.json` with Cloudinary CDN URLs and public IDs.
- Preserve aspect ratios and layout metadata.

### 4. Deploying to Render / Cloud Hosting

Set the following environment variables in your hosting provider's dashboard:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- (or `CLOUDINARY_URL`)
- `NODE_ENV=production`

Build command:
```bash
npm install && npm run build
```

Start command:
```bash
node server.js
```
