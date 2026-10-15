// src/pages/Pricing.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <main>
      <header className="pricing-hero js-observe animate-fade-up">
        <div className="container">
          <span className="section-label">Investment</span>
          <h1>Transparent Packages</h1>
          <p>Choose a setup that fits your occasion.</p>
        </div>
      </header>

      <section className="pricing-section">
        <div className="container">
          <div className="pricing-grid">
            {/* Silver */}
            <div className="price-card js-observe animate-fade-up">
              <div className="price-card__header">
                <div className="price-card__name">Silver</div>
                <div className="price-card__price">₹4,999</div>
                <p className="text-muted text-sm">Entry-level decoration package.</p>
              </div>
              <ul className="price-card__list">
                <li>6×6 Ring Backdrop</li>
                <li>Theme Colour Balloons</li>
                <li>Basic Floral Setup</li>
                <li>Basic Balloon Decoration</li>
                <li>Cake Table Setup</li>
                <li>Basic Decoration Elements</li>
              </ul>
              <Link to="/contact" className="btn btn--outline">Select Silver</Link>
            </div>

            {/* Gold */}
            <div
              className="price-card price-card--premium js-observe animate-fade-up"
              style={{ transitionDelay: '0.1s' }}
            >
              <div className="price-card__header">
                <div className="price-card__name">Gold</div>
                <div className="price-card__price">₹7,499</div>
                <p className="text-muted text-sm">Beautifully styled setup for a memorable celebration.</p>
              </div>
              <ul className="price-card__list">
                <li>Dual Panel Customized Backdrop</li>
                <li>Organic Balloon Decoration</li>
                <li>Character Cutout</li>
                <li>Warm Lights</li>
                <li>Cake Table Setup</li>
                <li>Props</li>
                <li>Floor Setup</li>
                <li>Theme-Based Decoration</li>
              </ul>
              <Link to="/contact" className="btn btn--primary">Select Gold</Link>
            </div>

            {/* Platinum */}
            <div
              className="price-card js-observe animate-fade-up"
              style={{ transitionDelay: '0.2s' }}
            >
              <div className="price-card__header">
                <div className="price-card__name">Platinum</div>
                <div className="price-card__price">₹9,999</div>
                <p className="text-muted text-sm">Complete premium styling for the highest visual impact.</p>
              </div>
              <ul className="price-card__list">
                <li>Multi-Layer Premium Backdrop</li>
                <li>Premium Organic Balloon Decoration</li>
                <li>Neon Light</li>
                <li>Neon Sign</li>
                <li>Cake Table Setup</li>
                <li>Premium Props</li>
                <li>Decorative Elements</li>
                <li>Full Theme Setup</li>
                <li>Premium Lights</li>
                <li>Complete Premium Styling</li>
              </ul>
              <Link to="/contact" className="btn btn--outline">Select Platinum</Link>
            </div>
          </div>

          <div className="pricing-note js-observe animate-fade-up">
            <p>
              Custom requirements can be discussed separately. Final pricing may vary depending on venue restrictions and highly specialized theme elements.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
