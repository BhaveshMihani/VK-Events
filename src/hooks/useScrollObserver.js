// src/hooks/useScrollObserver.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollObserver() {
  const location = useLocation();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Hero Reveal if hero is present
    const hero = document.getElementById('hero');
    if (hero) {
      if (reducedMotion) {
        hero.classList.add('hero--revealed');
      } else {
        requestAnimationFrame(() => {
          setTimeout(() => {
            hero.classList.add('hero--revealed');
          }, 80);
        });
      }
    }

    // 2. IntersectionObserver for .js-observe elements
    const elements = document.querySelectorAll('.js-observe:not(.is-visible)');
    if (reducedMotion) {
      elements.forEach(el => el.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      });

      elements.forEach(el => observer.observe(el));
    }

    // 3. Hash scroll or scroll to top
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.querySelectorAll('.js-observe').forEach(el => el.classList.add('is-visible'));
        setTimeout(() => {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);
}
