// src/pages/Services.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <main>
      <header className="services-hero js-observe animate-fade-up">
        <div className="container">
          <span className="section-label">Expertise</span>
          <h1>Decoration That Sets the Mood.</h1>
          <p>
            We provide creative balloon decorations, personalized themes, and special entries to make your celebrations memorable.
          </p>
        </div>
      </header>

      {/* 01 Birthday */}
      <section className="service-block" id="birthday">
        <div className="container service-block__inner">
          <div className="service-block__meta js-observe animate-fade-up">
            <span className="service-block__num">01</span>
            <h2 className="service-block__title">Birthday</h2>
            {/* <p className="service-block__desc">Premium birthday decoration for memorable celebrations.</p> */}
            <p className="service-block__details">
              Personalized setups for kids and adult birthdays, featuring custom themes, vibrant colors, and complete decoration styling.
            </p>
          </div>

          <div className="service-block__image js-observe animate-fade-up" style={{ transitionDelay: '0.1s' }}>
            <img src="/assets/images/gallery/Birthday-3.png" alt="VK Events birthday decoration" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </div>
        </div>
      </section>

      {/* 02 Anniversary */}
      <section className="service-block" id="anniversary">
        <div className="container service-block__inner">
          <div className="service-block__meta js-observe animate-fade-up">
            <span className="service-block__num">02</span>
            <h2 className="service-block__title">Anniversary</h2>
            <p className="service-block__desc">
              Elegant decoration setups for intimate and special anniversary celebrations.
            </p>
            <p className="service-block__details">
              Romantic setups, warm ambient lighting, beautiful floor arrangements, and sophisticated balloon styling.
            </p>
          </div>

          <div className="service-block__image js-observe animate-fade-up" style={{ transitionDelay: '0.1s' }}>
            <img src="/assets/images/gallery/Anniversay.png" alt="VK Events anniversary decoration" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          </div>
        </div>
      </section>

      {/* 03 Baby Shower */}
      <section className="service-block" id="baby-shower">
        <div className="container service-block__inner">
          <div className="service-block__meta js-observe animate-fade-up">
            <span className="service-block__num">03</span>
            <h2 className="service-block__title">Baby Shower</h2>
            <p className="service-block__desc">Beautiful themed decoration for baby shower celebrations.</p>
            <p className="service-block__details">
              Soft styling, pastel balloon palettes, and elegant themed decorative elements to welcome the newest arrival.
            </p>
          </div>

          <div className="service-block__image js-observe animate-fade-up" style={{ transitionDelay: '0.1s' }}>
            <img src="/assets/images/gallery/Baby_Shower.png" alt="VK Events baby shower decoration" />
          </div>
        </div>
      </section>

      {/* 04 Shop Decoration */}
      <section className="service-block" id="shop-decoration">
        <div className="container service-block__inner">
          <div className="service-block__meta js-observe animate-fade-up">
            <span className="service-block__num">04</span>
            <h2 className="service-block__title">Shop Decoration</h2>
            <p className="service-block__desc">
              Decoration for new shop openings, inaugurations, launches and similar occasions.
            </p>
            <p className="service-block__details">
              Professional setups, welcoming balloon arches, and impactful decorations to highlight your brand's big day.
            </p>
          </div>

          <div className="service-block__image js-observe animate-fade-up" style={{ transitionDelay: '0.1s' }}>
            <img src="/assets/images/gallery/Shop-decoration.png" alt="VK Events shop opening decoration" />
          </div>
        </div>
      </section>

      {/* 05 Haldi & Mehendi */}
      <section className="service-block" id="haldi-mehendi">
        <div className="container service-block__inner">
          <div className="service-block__meta js-observe animate-fade-up">
            <span className="service-block__num">05</span>
            <h2 className="service-block__title">Haldi & Mehendi</h2>
            <p className="service-block__desc">
              Colourful and traditional decoration setups for Haldi & Mehendi celebrations.
            </p>
            <p className="service-block__details">
              Vibrant colors, traditional props, beautiful floral-inspired backdrops, and memorable cultural styling.
            </p>
          </div>

          <div className="service-block__image js-observe animate-fade-up" style={{ transitionDelay: '0.1s' }}>
            <img src="/assets/images/gallery/Haldi.png" alt="VK Events Haldi and Mehendi decoration" />
          </div>
        </div>
      </section>

      {/* 06 Religious & Pooja */}
      <section className="service-block" id="religious-pooja">
        <div className="container service-block__inner">
          <div className="service-block__meta js-observe animate-fade-up">
            <span className="service-block__num">06</span>
            <h2 className="service-block__title">Religious & Pooja</h2>
            <p className="service-block__desc">
              Decoration for pooja, religious functions, festive celebrations and other religious occasions.
            </p>
            <p className="service-block__details">
              Respectful, serene, and beautiful decorations perfectly tailored for auspicious gatherings and ceremonies.
            </p>
          </div>

          <div className="service-block__image js-observe animate-fade-up" style={{ transitionDelay: '0.1s', overflow: 'hidden' }}>
            <img src="/assets/images/gallery/Religious.png" alt="VK Events religious and pooja decoration" />
          </div>
        </div>
      </section>

      {/* 07 Ring Ceremony */}
      <section className="service-block" id="ring-ceremony">
        <div className="container service-block__inner">
          <div className="service-block__meta js-observe animate-fade-up">
            <span className="service-block__num">07</span>
            <h2 className="service-block__title">Ring Ceremony</h2>
            <p className="service-block__desc">
              Elegant decoration setups for ring ceremonies and engagement celebrations.
            </p>
            <p className="service-block__details">
              Premium backdrops, luxurious detailing, and magnificent setups to mark the beginning of forever.
            </p>
          </div>

          <div className="service-block__image js-observe animate-fade-up" style={{ transitionDelay: '0.1s', overflow: 'hidden' }}>
            <img src="/assets/images/gallery/Ring-Ceremony.webp" alt="VK Events ring ceremony decoration" />
          </div>
        </div>
      </section>

      {/* 08 Event Entry */}
      <section className="service-block" id="event-entry">
        <div className="container service-block__inner">
          <div className="service-block__meta js-observe animate-fade-up">
            <span className="service-block__num">08</span>
            <h2 className="service-block__title">Event Entry</h2>
            <p className="service-block__desc">
              Special entrance experiences featuring fog and pyro effects for memorable event entries.
            </p>
            <p className="service-block__details">
              Grand, energetic, and safe indoor cold-pyro effects combined with dramatic, cloud-like entrances using professional fog pots for a magical atmosphere.
            </p>
          </div>

          <div className="service-block__image js-observe animate-fade-up" style={{ transitionDelay: '0.1s', overflow: 'hidden' }}>
            <img src="/assets/images/gallery/Event-entry.png" alt="VK Events event entry decoration" />
          </div>
        </div>
      </section>

      <div className="text-center py-24 js-observe animate-fade-up">
        <Link to="/pricing" className="btn btn--primary">View Our Packages</Link>
      </div>
    </main>
  );
}
