// src/components/Lightbox.jsx
import React, { useEffect, useCallback } from 'react';

export default function Lightbox({ isOpen, mediaList, currentIndex, onClose, onPrev, onNext }) {
  const currentMedia = mediaList && mediaList[currentIndex];

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [isOpen, onClose, onPrev, onNext]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !currentMedia) return null;

  return (
    <div
      className="lightbox is-open"
      id="lightbox"
      onClick={(e) => {
        if (e.target.id === 'lightbox' || e.target.id === 'lb-content') {
          onClose();
        }
      }}
    >
      <div className="lightbox__header">
        <div className="lightbox__info">
          <span className="lightbox__cat" id="lb-cat">
            {currentMedia.category || ''}
          </span>
        </div>
        <button
          className="lightbox__close"
          id="lb-close"
          type="button"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="lightbox__content" id="lb-content">
        <div className="lightbox__media-container">
          {currentMedia.type === 'video' ? (
            <video src={currentMedia.src} controls autoPlay />
          ) : (
            <img
              src={currentMedia.srcFull || currentMedia.src}
              alt={currentMedia.category || 'Event Decoration'}
            />
          )}
        </div>

        {mediaList.length > 1 && (
          <>
            <button
              className="lightbox__prev"
              id="lb-prev"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
            >
              ←
            </button>
            <button
              className="lightbox__next"
              id="lb-next"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
            >
              →
            </button>
          </>
        )}
      </div>

      <div className="lightbox__counter" id="lb-counter">
        {currentIndex + 1} / {mediaList.length}
      </div>
    </div>
  );
}
