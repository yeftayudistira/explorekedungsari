import React from 'react';

export default function Hero({
  title = "Jelajahi Kisah Menakjubkan Desa Kedungsari",
  subtitle = "Perjalanan melintasi waktu di desa tercinta kami, tempat tradisi bertemu dengan kemajuan.",
  bgImage = "/images/galeri_jalan_tani_sumbing.jpg",
  badge = "Portal Resmi Desa Kedungsari"
}) {
  return (
    <section className="hero-banner" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content">
          {badge && (
            <div className="hero-badge-pill">
              <span>{badge}</span>
            </div>
          )}
          <h1 className="hero-title">{title}</h1>
          <p className="hero-subtitle">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
