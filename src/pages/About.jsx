// src/pages/About.jsx
import React from 'react';

export default function About() {
  return (
    <main>
      <header className="about-hero js-observe animate-fade-up">
        <div className="container">
          <span className="section-label">Our Story</span>
          <h1>More Than Decoration.<br />It's the Atmosphere.</h1>
          <p>
            We are a creative decoration business dedicated to making your celebrations visually stunning and unforgettable.
          </p>
        </div>
      </header>

      <section className="about-story">
        <div className="container">
          <div className="about-grid">
            <div className="about-image js-observe animate-slide-right">
              <img src="/assets/images/gallery/About.png" alt="VK Events Decoration" />
            </div>
            <div className="about-content js-observe animate-slide-left">
              <h2>Crafting the Perfect Setup</h2>
              <p>
                At VK EVENTS, we believe that an event's environment dictates its emotion. Whether it's the playful vibrancy of a child's birthday party or the pristine elegance of an anniversary celebration, our approach remains the same: meticulous attention to detail and an unwavering commitment to our clients' vision.
              </p>
              <p>
                We specialize in premium balloon styling, custom thematic setups, and dramatic special entries. We don't just decorate rooms; we completely transform spaces to reflect your unique celebration.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-founder">
        <div className="container">
          <div className="founder-grid js-observe animate-fade-up">
            <div className="founder-info">
              <h3>Vasant Khaniya</h3>
              <span>Founder & Creative Director</span>
            </div>
            <div className="founder-bio">
              <p>
                With years of experience in event decoration, Vasant brings creativity, precision, and a refined eye to every project. His philosophy centers around blending contemporary design with premium decorative setups—creating spaces that feel both memorable and profoundly personal.
              </p>
              <p className="mt-8">
                "Every milestone deserves to be celebrated in a space that feels extraordinary. That is what we aim to deliver, every single time."
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
