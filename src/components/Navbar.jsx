// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    document.body.classList.remove('no-scroll');
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => {
      const next = !prev;
      if (next) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
      return next;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('no-scroll');
  };

  const isContact = location.pathname === '/contact' || location.pathname === '/contact.html';

  const isActive = (path) => {
    if (path === '/' && (location.pathname === '/' || location.pathname === '/index.html')) {
      return true;
    }
    return location.pathname === path || location.pathname === `${path}.html`;
  };

  return (
    <>
      <nav className={`nav ${isScrolled ? 'is-scrolled' : ''}`} id="main-nav">
        <div className="container nav__inner">
          <Link to="/" className="nav__logo">
            <span>VK EVENTS</span>
            <span className="nav__logo-tag">By Vasant Khaniya</span>
          </Link>

          <div className="nav__links">
            <Link to="/" className={`nav__link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/work" className={`nav__link ${isActive('/work') ? 'active' : ''}`}>Our Work</Link>
            <Link to="/services" className={`nav__link ${isActive('/services') ? 'active' : ''}`}>Services</Link>
            <Link to="/pricing" className={`nav__link ${isActive('/pricing') ? 'active' : ''}`}>Pricing</Link>
            <Link to="/about" className={`nav__link ${isActive('/about') ? 'active' : ''}`}>About</Link>
            <Link to="/contact" className={`nav__link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
          </div>

          {!isContact && (
            <div className="nav__cta">
              <Link to="/contact" className="btn btn--primary btn--sm">Plan Your Event</Link>
            </div>
          )}

          <button
            className={`nav__hamburger ${isMenuOpen ? 'is-active' : ''}`}
            id="nav-toggle"
            aria-label="Toggle menu"
            type="button"
            onClick={toggleMenu}
          >
            <span className="nav__hamburger-line"></span>
            <span className="nav__hamburger-line"></span>
            <span className="nav__hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMenuOpen ? 'is-open' : ''}`} id="mobile-menu">
        <div className="mobile-menu__links">
          <Link to="/" className={`mobile-menu__link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
          <Link to="/work" className={`mobile-menu__link ${isActive('/work') ? 'active' : ''}`} onClick={closeMenu}>Our Work</Link>
          <Link to="/services" className={`mobile-menu__link ${isActive('/services') ? 'active' : ''}`} onClick={closeMenu}>Services</Link>
          <Link to="/pricing" className={`mobile-menu__link ${isActive('/pricing') ? 'active' : ''}`} onClick={closeMenu}>Pricing</Link>
          <Link to="/about" className={`mobile-menu__link ${isActive('/about') ? 'active' : ''}`} onClick={closeMenu}>About</Link>
          <Link to="/contact" className={`mobile-menu__link ${isActive('/contact') ? 'active' : ''}`} onClick={closeMenu}>Contact</Link>
        </div>
        {!isContact && (
          <div className="mobile-menu__cta">
            <Link to="/contact" className="btn btn--primary" onClick={closeMenu}>Plan Your Event</Link>
          </div>
        )}
      </div>
    </>
  );
}
