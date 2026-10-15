// src/components/Toast.jsx
import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

const ToastContext = createContext({
  showToast: () => {}
});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, isVisible: false }]);

    // Trigger isVisible on next tick for CSS animation
    requestAnimationFrame(() => {
      setToasts(prev =>
        prev.map(t => (t.id === id ? { ...t, isVisible: true } : t))
      );
    });

    // Fade out after 3s
    setTimeout(() => {
      setToasts(prev =>
        prev.map(t => (t.id === id ? { ...t, isVisible: false } : t))
      );
      // Remove from DOM after transition
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 400);
    }, 3000);
  }, []);

  useEffect(() => {
    window.showToast = showToast;
    return () => {
      delete window.showToast;
    };
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container" id="toast-container">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`toast ${toast.isVisible ? 'is-visible' : ''}`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
