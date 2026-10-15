// src/components/Footer.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isContact = location.pathname === '/contact' || location.pathname === '/contact.html';

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          {isContact ? (
            <>
              <span className="section-label">VK Events</span>
              <h2>Celebrations Crafted with Elegance.</h2>
              <p>Bringing creativity, color and celebration together with balloon decoration, personalized themes, and special event entries.</p>
            </>
          ) : (
            <>
              <h2>VK EVENTS</h2>
              <span className="section-label" style={{ margin: 0, fontSize: '10px' }}>By Vasant Khaniya</span>
              <p>Creative event decoration, balloon styling and memorable celebration setups.</p>
            </>
          )}
        </div>

        <div>
          <h3 className="footer__title">Explore</h3>
          <div className="footer__links">
            <Link to="/work">Our Work</Link>
            <Link to="/services">Services</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
          </div>
        </div>

        <div>
          <h3 className="footer__title">Connect</h3>
          <div className="footer__links">
            <Link to="/contact">Contact Us</Link>
            <a
              href="https://www.instagram.com/vk_event_01?stkn=dmtrNmk2bTFkZG5o"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="footer__bottom">
          <span>&copy; 2026 VK Events. All rights reserved.</span>
          <span>Vapi, Gujarat</span>
        </div>
      </div>
    </footer>
  );
}
