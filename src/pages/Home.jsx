
// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero__decor"></div>

        <div className="container hero__inner">
          <div className="hero__content">
            <span className="hero__eyebrow">
              VK Events
              <span className="hero__eyebrow-sub">Event Decoration Studio</span>
            </span>

            <span className="hero__gold-line"></span>

            <h1 className="hero__title">
              Decorations Made for Your <span className="hero__title-accent">Special Moments</span>.
            </h1>

            <p className="hero__description">
              From birthdays and anniversaries to baby showers, shop openings, Haldi &
              Mehendi, religious celebrations, ring ceremonies and unforgettable event entries.
            </p>

            <div className="hero__actions">
              <Link to="/work" className="btn btn--primary">Explore Our Work</Link>
              <Link to="/pricing" className="btn btn--outline">View Packages</Link>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-main">
              <div className="hero__frame">
                <img src="/assets/images/hero.png" alt="Premium Event Decoration Setup by VK Events" />
              </div>

              <div className="hero__badge">Premium Event Decor</div>
              <div className="hero__ornament"></div>
            </div>
          </div>
        </div>

        <div className="hero__separator"></div>
      </section>

      {/* FEATURED WORK */}
      <section className="featured-work">
        <div className="container">
          <div className="featured-work__header js-observe animate-fade-up">
            <span className="section-label">Portfolio</span>
            <span className="featured-work__ornament"></span>
            <span className="featured-work__line"></span>
            <h2>Celebrations We Create</h2>
          </div>

          <div className="featured-grid">
            {/* Main large card */}
            <div className="featured-item--main js-observe animate-fade-up">
              <Link to="/work" className="featured-card">
                <img src="/assets/images/gallery/Birthday-3.png" alt="Premium Birthday Celebration" loading="lazy" />
                <div className="featured-card__overlay">
                  <div>
                    <span className="featured-card__cat">Birthday</span>
                    <h3 className="featured-card__title">Premium Birthday Celebration</h3>
                  </div>
                  <div className="featured-card__arrow">→</div>
                </div>
              </Link>
            </div>

            {/* Side card 1 */}
            <div className="featured-item--side js-observe animate-slide-left" style={{ transitionDelay: '0.15s' }}>
              <Link to="/work" className="featured-card">
                <img src="/assets/images/gallery/Anniversay.png" alt="Elegant Anniversary Celebration" loading="lazy" />
                <div className="featured-card__overlay">
                  <div>
                    <span className="featured-card__cat">Anniversary</span>
                    <h3 className="featured-card__title">Elegant Anniversary Celebration</h3>
                  </div>
                  <div className="featured-card__arrow">→</div>
                </div>
              </Link>
            </div>

            {/* Side card 2 */}
            <div className="featured-item--side js-observe animate-slide-left" style={{ transitionDelay: '0.3s' }}>
              <Link to="/work" className="featured-card">
                <img src="/assets/images/gallery/Event-entry.png" alt="Grand Event Entry" loading="lazy" />
                <div className="featured-card__overlay">
                  <div>
                    <span className="featured-card__cat">Event Entry</span>
                    <h3 className="featured-card__title">Grand Event Entry</h3>
                  </div>
                  <div className="featured-card__arrow">→</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="featured-work__footer js-observe animate-fade-up" style={{ transitionDelay: '0.4s' }}>
            <Link to="/work" className="link-gold">View Full Portfolio</Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="home-services">
        <div className="container">
          <span className="section-label js-observe animate-fade-up">Expertise</span>
          <h2 className="mb-8 js-observe animate-fade-up">Decoration That Sets the Mood.</h2>

          <div className="services-list js-observe animate-fade-up">
            <Link to="/services#birthday" className="service-row">
              <div className="service-row__bg"></div>
              <div className="service-row__content">
                <span className="service-row__num">01</span>
                <h3 className="service-row__name">Birthday</h3>
                <span className="service-row__arrow">→</span>
              </div>
            </Link>

            <Link to="/services#anniversary" className="service-row">
              <div className="service-row__bg"></div>
              <div className="service-row__content">
                <span className="service-row__num">02</span>
                <h3 className="service-row__name">Anniversary</h3>
                <span className="service-row__arrow">→</span>
              </div>
            </Link>

            <Link to="/services#baby-shower" className="service-row">
              <div className="service-row__bg"></div>
              <div className="service-row__content">
                <span className="service-row__num">03</span>
                <h3 className="service-row__name">Baby Shower</h3>
                <span className="service-row__arrow">→</span>
              </div>
            </Link>

            <Link to="/services#shop-decoration" className="service-row">
              <div className="service-row__bg"></div>
              <div className="service-row__content">
                <span className="service-row__num">04</span>
                <h3 className="service-row__name">Shop Decoration</h3>
                <span className="service-row__arrow">→</span>
              </div>
            </Link>

            <Link to="/services#haldi-mehendi" className="service-row">
              <div className="service-row__bg"></div>
              <div className="service-row__content">
                <span className="service-row__num">05</span>
                <h3 className="service-row__name">Haldi & Mehendi</h3>
                <span className="service-row__arrow">→</span>
              </div>
            </Link>

            <Link to="/services#religious-pooja" className="service-row">
              <div className="service-row__bg"></div>
              <div className="service-row__content">
                <span className="service-row__num">06</span>
                <h3 className="service-row__name">Religious & Pooja</h3>
                <span className="service-row__arrow">→</span>
              </div>
            </Link>

            <Link to="/services#ring-ceremony" className="service-row">
              <div className="service-row__bg"></div>
              <div className="service-row__content">
                <span className="service-row__num">07</span>
                <h3 className="service-row__name">Ring Ceremony</h3>
                <span className="service-row__arrow">→</span>
              </div>
            </Link>

            <Link to="/services#event-entry" className="service-row">
              <div className="service-row__bg"></div>
              <div className="service-row__content">
                <span className="service-row__num">08</span>
                <h3 className="service-row__name">Event Entry</h3>
                <span className="service-row__arrow">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* WHY VK */}
      <section className="home-why">
        <div className="container">
          <div className="text-center mb-16 js-observe animate-fade-up">
            <span className="section-label">The VK Standard</span>
            <h2>Why Choose Us</h2>
          </div>

          <div className="why-grid">
            <div className="why-item js-observe animate-fade-up">
              <h3>Creative Themes</h3>
              <p className="text-muted">
                We don't just copy templates. Every event is personalized and thoughtfully designed around your specific vision.
              </p>
            </div>
            <div className="why-item js-observe animate-fade-up" style={{ transitionDelay: '0.1s' }}>
              <h3>Attention to Detail</h3>
              <p className="text-muted">
                From the perfect color matching of balloons to the precise placement of lighting, we obsess over the small things.
              </p>
            </div>
            <div className="why-item js-observe animate-fade-up">
              <h3>Quality Decoration</h3>
              <p className="text-muted">
                We source premium materials and props to ensure your celebration looks stunning both in person and in photographs.
              </p>
            </div>
            <div className="why-item js-observe animate-fade-up" style={{ transitionDelay: '0.1s' }}>
              <h3>Memorable Experiences</h3>
              <p className="text-muted">
                Beyond decoration, we create an atmosphere that you and your guests will remember long after the event ends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-cta js-observe animate-fade-up">
        <div className="container">
          <h2>Your Celebration.<br />Your Theme.<br />Your Moment.</h2>
          <p>
            Tell us what you have imagined. We'll help turn it into a setup that feels personal, stylish and memorable.
          </p>
          <Link to="/contact" className="btn btn--primary">Start Planning</Link>
        </div>
      </section>
    </>
  );
}
