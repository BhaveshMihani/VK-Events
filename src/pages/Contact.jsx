// src/pages/Contact.jsx
import React from 'react';

export default function Contact() {
  return (
    <main className="contact-main">
      <div className="container">
        <header className="contact-hero js-observe animate-fade-up">
          <span className="section-label">Connect With Us</span>
          <h1>Let's Create Your Celebration.</h1>
          <p>
            Have an event in mind? Reach out to us directly to discuss custom decoration themes, setups, dates,
            and bookings. We're here to make every moment memorable.
          </p>
        </header>

        <div className="contact-grid">
          {/* LEFT: CONTACT HIGHLIGHT CARDS */}
          <div className="contact-cards js-observe animate-slide-right">
            {/* EMAIL CARD */}
            <div className="contact-highlight-card">
              <div className="card-icon-wrap">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="card-content">
                <span className="card-label">Email</span>
                <a href="mailto:ayushkhaniya2904@gmail.com" className="card-primary-value">
                  ayushkhaniya2904@gmail.com
                </a>
                <p className="card-note">Write to us anytime for detailed quotes and celebration inquiries.</p>
                <div className="card-action mt-4">
                  <a href="mailto:ayushkhaniya2904@gmail.com" className="btn btn--outline btn--sm">
                    Send Email ✉
                  </a>
                </div>
              </div>
            </div>

            {/* MOBILE CARD */}
            <div className="contact-highlight-card">
              <div className="card-icon-wrap">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="card-content">
                <span className="card-label">Mobile</span>
                <a href="tel:7878708666" className="card-primary-value">
                  7878708666
                </a>
                <p className="card-note">Available for direct calls, consultations, and instant booking help.</p>
                <div className="card-action card-action--dual mt-4">
                  <a href="tel:7878708666" className="btn btn--primary btn--sm">
                    Call: 7878708666
                  </a>
                  <a
                    href="https://wa.me/917878708666?text=Hi%20VK%20Events,%20I%20would%20like%20to%20inquire%20about%20event%20decoration."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline btn--sm"
                  >
                    WhatsApp Chat ↗
                  </a>
                </div>
              </div>
            </div>

            {/* LOCATION CARD */}
            <div className="contact-highlight-card">
              <div className="card-icon-wrap">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="card-content">
                <span className="card-label">Location</span>
                <address className="card-address">
                  <strong>VK Events</strong><br />
                  Shop no. 3, Mahalaxmi Apartment, opp. Raveshia Park, GIDC, Vapi, Gujarat 396191
                </address>
                <div className="card-action mt-4">
                  <a
                    href="https://maps.app.goo.gl/aag8JDveoVU9pb8F8?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-gold"
                  >
                    View on Google Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: GOOGLE MAPS SNAPSHOT */}
          <div className="contact-map-col js-observe animate-slide-left">
            <div className="map-showcase-box">
              <div className="map-showcase-header">
                <div className="map-header-title">
                  <span className="map-header-dot"></span>
                  <span>Google Maps Location</span>
                </div>
                <span className="map-header-city">Vapi, Gujarat</span>
              </div>

              {/* SNAPSHOT LINKED TO GOOGLE MAPS */}
              <a
                href="https://maps.app.goo.gl/aag8JDveoVU9pb8F8?g_st=aw"
                target="_blank"
                rel="noopener noreferrer"
                className="map-snapshot-card"
                title="Click to open location in Google Maps"
              >
                <div className="map-snapshot-media">
                  <img
                    src="/assets/images/google-maps-snapshot.jpg"
                    alt="Google Maps snapshot showing VK Events location in Vapi, Gujarat"
                    className="map-snapshot-img"
                  />
                  <div className="map-snapshot-overlay"></div>
                </div>
              </a>

              <div className="map-showcase-footer">
                <div className="map-footer-info">
                  <p className="map-footer-label">VK Events</p>
                  <p className="map-footer-desc">
                    Shop no. 3, Mahalaxmi Apartment, opp. Raveshia Park, GIDC, Vapi, Gujarat 396191
                  </p>
                </div>
                <a
                  href="https://maps.app.goo.gl/aag8JDveoVU9pb8F8?g_st=aw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary map-action-btn"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
