import React from 'react';
import { TreePine } from 'lucide-react';

export default function Hero({
  title = "Jelajahi Kisah Menakjubkan Desa Kedungsari",
  subtitle = "Perjalanan melintasi waktu di desa tercinta kami, tempat tradisi bertemu dengan kemajuan.",
  bgImage = "/images/home-image.jpeg",
  badge = "Portal Resmi Desa Kedungsari"
}) {
  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '60px',
      overflow: 'hidden',
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Dark Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to top, rgba(5, 46, 22, 0.9) 0%, rgba(15, 23, 42, 0.5) 60%, rgba(0, 0, 0, 0.4) 100%)'
      }} />

      <div className="fade-up-element" style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 24px',
        textAlign: 'center',
        color: 'white'
      }}>
        {/* Pill Badge */}
        {badge && (
          <div style={{ marginBottom: '24px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '99px',
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '8px 20px',
              fontSize: '0.9rem',
              fontWeight: '600',
              color: 'white',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.25)'
            }}>
              <TreePine size={16} /> {badge}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: '800',
          letterSpacing: '-0.03em',
          lineHeight: '1.1',
          marginBottom: '24px',
          color: 'white'
        }}>
          {title}
        </h1>

        {/* Subtitle */}
        <p style={{
          maxWidth: '750px',
          margin: '0 auto',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'rgba(255, 255, 255, 0.88)',
          lineHeight: '1.6'
        }}>
          {subtitle}
        </p>
      </div>

      {/* Scroll Bounce Indicator */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        animation: 'bounce 2s infinite'
      }}>
        <div style={{
          width: '22px',
          height: '36px',
          borderRadius: '99px',
          border: '2px solid rgba(255, 255, 255, 0.4)',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '4px'
        }}>
          <div style={{ width: '4px', height: '8px', borderRadius: '99px', background: 'rgba(255, 255, 255, 0.8)' }} />
        </div>
      </div>
    </section>
  );
}
