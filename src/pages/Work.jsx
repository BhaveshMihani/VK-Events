// src/pages/Work.jsx
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Lightbox from '../components/Lightbox';
import { useToast } from '../components/Toast';
import {
  VK_CATEGORIES,
  getMedia,
  uploadMediaFiles,
  deleteMediaPermanent
} from '../services/api';

function computeSpanFromRatio(ratio, index = 0) {
  const pos = index % 12;

  // Positional rhythm anchors
  if (pos === 0) return 'hero';
  if (pos === 3) return 'wide';
  if (pos === 7) return 'tall';
  if (pos === 11) return 'wide';

  // Ratio-based assignment
  if (ratio < 0.75) return 'tall'; // portrait
  if (ratio > 1.45) return 'wide'; // landscape
  return 'normal';
}

function getBentoSpanClass(media, index) {
  if (media.spanType === 'hero') return 'gallery-item--hero';
  if (media.spanType === 'wide') return 'gallery-item--wide';
  if (media.spanType === 'tall') return 'gallery-item--tall';
  if (media.spanType === 'large') return 'gallery-item--hero';
  if (media.spanType === 'normal') return 'gallery-item--normal';

  if (media.featured || media.isFeatured) return 'gallery-item--hero';

  if (media.aspectRatio) {
    return `gallery-item--${computeSpanFromRatio(media.aspectRatio, index)}`;
  }

  return `gallery-item--${computeSpanFromRatio(1.0, index)}`;
}

function getFileAspectRatio(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth || 1;
      const h = img.naturalHeight || 1;
      URL.revokeObjectURL(url);
      resolve(w / h);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(1.0);
    };
    img.src = url;
  });
}

export default function Work() {
  const { showToast } = useToast();
  const [allMedia, setAllMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [deleteMode, setDeleteMode] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState(new Set());
  const [isDeleting, setIsDeleting] = useState(false);

  // Manage Dropdown
  const [isManageMenuOpen, setIsManageMenuOpen] = useState(false);
  const manageMenuRef = useRef(null);

  // Add Image Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [addCategory, setAddCategory] = useState(VK_CATEGORIES.find(c => c !== 'All') || 'Birthday');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Load media on mount
  useEffect(() => {
    let mounted = true;
    getMedia()
      .then(items => {
        if (mounted) {
          setAllMedia(items);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Failed to load gallery items:', err);
        if (mounted) {
          setAllMedia([]);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Close manage dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (manageMenuRef.current && !manageMenuRef.current.contains(e.target)) {
        setIsManageMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Filtered media
  const filteredMedia = useMemo(() => {
    if (currentFilter === 'All') return allMedia;
    return allMedia.filter(m => m.category === currentFilter);
  }, [allMedia, currentFilter]);

  // Handle clicking a media item
  const handleItemClick = (media, index) => {
    if (deleteMode) {
      if (media.isStatic) {
        showToast('Built-in showcase photos are protected and cannot be deleted.');
        return;
      }
      setSelectedForDelete(prev => {
        const next = new Set(prev);
        if (next.has(media.id)) {
          next.delete(media.id);
        } else {
          next.add(media.id);
        }
        return next;
      });
    } else {
      setLightboxIndex(index);
      setLightboxOpen(true);
    }
  };

  // Delete mode methods
  const enterDeleteMode = () => {
    setDeleteMode(true);
    setSelectedForDelete(new Set());
    setCurrentFilter('All');
    setIsManageMenuOpen(false);
  };

  const exitDeleteMode = () => {
    setDeleteMode(false);
    setSelectedForDelete(new Set());
  };

  const confirmDelete = async () => {
    if (selectedForDelete.size === 0) return;
    const n = selectedForDelete.size;
    const ok = window.confirm(
      `Permanently delete ${n} selected image${n > 1 ? 's' : ''}?\n\nThis removes the photo from the server permanently.`
    );
    if (!ok) return;

    setIsDeleting(true);
    const ids = [...selectedForDelete];

    try {
      await deleteMediaPermanent(ids);
      setAllMedia(prev => prev.filter(m => !ids.includes(m.id)));
      exitDeleteMode();
      showToast(`${n} image${n > 1 ? 's' : ''} permanently deleted.`);
    } catch (err) {
      console.error('Delete failed:', err);
      alert(`Delete failed: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Add Image Modal methods
  const openAddModal = () => {
    setIsManageMenuOpen(false);
    setPendingFiles([]);
    setUploadPercent(0);
    setUploadStatusText('');
    setIsUploading(false);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    if (isUploading) return;
    setIsAddModalOpen(false);
    setPendingFiles([]);
  };

  const handleFilesSelect = (files) => {
    const valid = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (valid.length === 0) return;
    setPendingFiles(prev => [...prev, ...valid]);
  };

  const removePendingFile = (index) => {
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadConfirm = async () => {
    if (pendingFiles.length === 0 || isUploading) return;

    setIsUploading(true);
    setUploadPercent(10);
    setUploadStatusText(`Analyzing & optimizing ${pendingFiles.length} photo(s)…`);

    try {
      const metaList = [];
      for (let i = 0; i < pendingFiles.length; i++) {
        const ratio = await getFileAspectRatio(pendingFiles[i]);
        const spanType = computeSpanFromRatio(ratio, allMedia.length + i);
        metaList.push({
          aspectRatio: Math.round(ratio * 100) / 100,
          spanType
        });
      }

      const newItems = await uploadMediaFiles(
        pendingFiles,
        addCategory,
        (percent) => {
          setUploadPercent(Math.max(10, percent));
          setUploadStatusText(`Uploading… ${percent}%`);
        },
        metaList
      );

      setUploadPercent(100);
      setUploadStatusText('Upload complete!');

      if (Array.isArray(newItems) && newItems.length > 0) {
        setAllMedia(prev => [...newItems, ...prev]);
      }

      setTimeout(() => {
        closeAddModal();
        showToast(
          `${pendingFiles.length} photo${pendingFiles.length > 1 ? 's' : ''} added to Bento gallery.`
        );
      }, 500);
    } catch (err) {
      console.error('Upload failed:', err);
      setIsUploading(false);
      alert(`Upload failed: ${err.message || 'Please check your connection and try again.'}`);
    }
  };

  return (
    <main>
      <header className="work-hero js-observe animate-fade-up">
        <div className="container">
          <span className="section-label">Portfolio</span>
          <h1>Celebrations We Create</h1>
          <p>A selection of our recent event decorations and thematic setups.</p>
        </div>
      </header>

      <section className="gallery-section">
        <div className="container">
          {/* MANAGE BAR */}
          <div className="manage-bar" id="manage-bar">
            <div className="manage-bar__inner">
              <div className="manage-dropdown" id="manage-dropdown" ref={manageMenuRef}>
                <button
                  className="manage-trigger"
                  id="manage-trigger"
                  aria-haspopup="true"
                  aria-expanded={isManageMenuOpen}
                  type="button"
                  onClick={() => setIsManageMenuOpen(prev => !prev)}
                >
                  Manage Work <span className="manage-trigger__arrow">▾</span>
                </button>
                <div
                  className={`manage-menu ${isManageMenuOpen ? 'is-open' : ''}`}
                  id="manage-menu"
                  role="menu"
                >
                  <button
                    className="manage-menu__item"
                    id="btn-add-image"
                    role="menuitem"
                    type="button"
                    onClick={openAddModal}
                  >
                    <span className="manage-menu__icon">＋</span> Add Image
                  </button>
                  <button
                    className="manage-menu__item"
                    id="btn-delete-mode"
                    role="menuitem"
                    type="button"
                    onClick={enterDeleteMode}
                  >
                    <span className="manage-menu__icon">🗑</span> Select &amp; Delete
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* GALLERY FILTERS */}
          <div className="gallery-filters js-observe animate-fade-in" id="gallery-filters">
            {VK_CATEGORIES.map(cat => (
              <button
                key={cat}
                type="button"
                className={`filter-btn ${cat === currentFilter ? 'active' : ''}`}
                onClick={() => {
                  if (deleteMode) return;
                  setCurrentFilter(cat);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* GALLERY GRID */}
          <div className="gallery-grid" id="gallery-grid">
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0' }}>
                <div className="loading-spinner"></div>
                <p className="text-muted" style={{ marginTop: '16px' }}>Loading gallery…</p>
              </div>
            ) : filteredMedia.length === 0 ? (
              allMedia.length === 0 ? (
                <div className="gallery-empty-state">
                  <div className="gallery-empty-state__box">
                    <div className="gallery-empty-state__icon">🖼️</div>
                    <h3 className="gallery-empty-state__title">Gallery is Currently Empty</h3>
                    <p className="gallery-empty-state__desc">
                      No decoration photos uploaded yet. Tap below or use <strong>Manage Work</strong> above to start adding photos from your mobile phone.
                    </p>
                    <button
                      className="btn btn--primary gallery-empty-state__btn"
                      id="btn-empty-add-image"
                      type="button"
                      onClick={openAddModal}
                    >
                      <span>＋</span> Add Image
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-muted" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '50px 0' }}>
                  No photos in "{currentFilter}" yet.
                </p>
              )
            ) : (
              filteredMedia.map((media, index) => {
                const spanClass = getBentoSpanClass(media, index);
                const isSelected = selectedForDelete.has(media.id);

                return (
                  <div
                    key={media.id || index}
                    className={`gallery-item ${spanClass} js-observe animate-fade-up is-visible`}
                    style={{ transitionDelay: `${(index % 4) * 0.08}s` }}
                    data-id={media.id}
                    data-static={media.isStatic ? 'true' : undefined}
                    onClick={() => handleItemClick(media, index)}
                  >
                    <img
                      src={media.src}
                      alt={media.category || 'Event Decoration'}
                      loading="lazy"
                    />
                    <div className="gallery-item__overlay">
                      <span className="gallery-item__cat">{media.category}</span>
                    </div>
                    {deleteMode && (
                      <div className={`delete-select-indicator ${isSelected ? 'is-selected' : ''}`}>
                        <span className="delete-check">✓</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <Lightbox
        isOpen={lightboxOpen}
        mediaList={filteredMedia}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex(prev => (prev - 1 + filteredMedia.length) % filteredMedia.length)
        }
        onNext={() =>
          setLightboxIndex(prev => (prev + 1) % filteredMedia.length)
        }
      />

      {/* DELETE ACTION BAR */}
      {deleteMode && (
        <div className="delete-action-bar is-visible" id="delete-action-bar">
          <div className="delete-action-bar__inner">
            <span className="delete-action-bar__hint" id="delete-hint">
              Tap uploaded photos to select for permanent deletion
            </span>
            <div className="delete-action-bar__btns">
              <button
                className="btn btn--outline btn--sm"
                id="delete-cancel-btn"
                type="button"
                onClick={exitDeleteMode}
              >
                Cancel
              </button>
              <button
                className="btn btn--danger btn--sm"
                id="delete-confirm-btn"
                type="button"
                disabled={selectedForDelete.size === 0 || isDeleting}
                onClick={confirmDelete}
              >
                {isDeleting
                  ? 'Deleting…'
                  : `Delete Selected (${selectedForDelete.size})`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD IMAGE MODAL */}
      {isAddModalOpen && (
        <div
          className="work-modal is-open"
          id="add-image-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Add Image"
          onClick={(e) => {
            if (e.target.id === 'add-image-modal' && !isUploading) {
              closeAddModal();
            }
          }}
        >
          <div className="work-modal__box">
            <div className="work-modal__head">
              <h3 className="work-modal__title">Add Image to Gallery</h3>
              {!isUploading && (
                <button
                  className="work-modal__close"
                  id="add-modal-close"
                  aria-label="Close"
                  type="button"
                  onClick={closeAddModal}
                >
                  ✕
                </button>
              )}
            </div>

            <div className="work-modal__body">
              <div
                className={`add-dropzone ${isDragOver ? 'is-dragover' : ''}`}
                id="add-dropzone"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  if (e.dataTransfer.files) {
                    handleFilesSelect(e.dataTransfer.files);
                  }
                }}
              >
                <input
                  type="file"
                  id="add-file-input"
                  ref={fileInputRef}
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files) {
                      handleFilesSelect(e.target.files);
                    }
                  }}
                />
                <div className="add-dropzone__icon">📸</div>
                <p className="add-dropzone__text">Tap to select or take photos</p>
                <p className="add-dropzone__sub">JPG, PNG, WEBP — Multiple allowed</p>
              </div>

              {pendingFiles.length > 0 && (
                <div className="add-previews" id="add-previews">
                  {pendingFiles.map((file, i) => (
                    <div className="add-preview-item" key={i}>
                      <img src={URL.createObjectURL(file)} alt={file.name} />
                      <button
                        className="add-preview-remove"
                        title="Remove"
                        type="button"
                        disabled={isUploading}
                        onClick={(e) => {
                          e.stopPropagation();
                          removePendingFile(i);
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="add-form">
                <label className="add-label" htmlFor="add-category">
                  Category
                </label>
                <select
                  id="add-category"
                  className="add-select"
                  value={addCategory}
                  disabled={isUploading}
                  onChange={(e) => setAddCategory(e.target.value)}
                >
                  {VK_CATEGORIES.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div
                className={`upload-progress-wrap ${isUploading ? 'is-active' : ''}`}
                id="upload-progress-wrap"
              >
                <div className="upload-progress-bar">
                  <div
                    className="upload-progress-fill"
                    id="upload-progress-fill"
                    style={{ width: `${uploadPercent}%` }}
                  ></div>
                </div>
                <div className="upload-progress-text" id="upload-progress-text">
                  {uploadStatusText}
                </div>
              </div>

              <div className="work-modal__actions">
                <button
                  className="btn btn--outline btn--sm"
                  id="add-cancel"
                  type="button"
                  disabled={isUploading}
                  onClick={closeAddModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn--primary btn--sm"
                  id="add-confirm"
                  type="button"
                  disabled={pendingFiles.length === 0 || isUploading}
                  onClick={handleUploadConfirm}
                >
                  {isUploading ? 'Uploading…' : 'Upload to Gallery'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
