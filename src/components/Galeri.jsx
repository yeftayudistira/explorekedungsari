import React, { useState } from 'react';
import Hero from './Hero';
import { Eye, X, Image as ImageIcon } from 'lucide-react';

export default function Galeri() {
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [activeImage, setActiveImage] = useState(null);

  const filters = ['Semua', 'Alam & Wisata', 'Pembangunan', 'Kebudayaan', 'Kegiatan Warga'];

  const photos = [
    { id: 1, title: 'Waduk Panorama Kedungsari', cat: 'Alam & Wisata', img: '/images/landmark1.jpg' },
    { id: 2, title: 'Monumen Prasasti Sejarah Desa', cat: 'Kebudayaan', img: '/images/landmark2.jpg' },
    { id: 3, title: 'Lanskap Sunrise Persawahan Kedungsari', cat: 'Alam & Wisata', img: '/images/history.jpg' },
    { id: 4, title: 'Balai & Pendopo Agung Desa', cat: 'Pembangunan', img: '/images/hero.jpg' },
    { id: 5, title: 'Tepi Danau Kedungsari Terbenam', cat: 'Alam & Wisata', img: '/images/landmark1.jpg' },
    { id: 6, title: 'Rembuk Warga & Gotong Royong Desa', cat: 'Kegiatan Warga', img: '/images/history.jpg' },
    { id: 7, title: 'Kawasan Penghijauan Dusun', cat: 'Pembangunan', img: '/images/landmark2.jpg' },
    { id: 8, title: 'Panen Padi Organik Kedungsari', cat: 'Kegiatan Warga', img: '/images/hero.jpg' },
  ];

  const filteredPhotos = photos.filter(
    (item) => activeFilter === 'Semua' || item.cat === activeFilter
  );

  return (
    <main className="galeri-page">
      <Hero
        title="Galeri Visual Desa Kedungsari"
        subtitle="Dokumentasi keindahan alam, kegiatan masyarakat, dan momen bersejarah Desa Kedungsari."
        bgImage="/images/landmark1.jpg"
        badge="Dokumentasi Visual"
      />

      <section className="section-padding">
        <div className="container">
          {/* Filter Badges */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '10px 22px',
                  borderRadius: '99px',
                  fontSize: '0.92rem',
                  fontWeight: '600',
                  background: activeFilter === f ? 'var(--primary)' : 'white',
                  color: activeFilter === f ? 'white' : '#475569',
                  border: activeFilter === f ? 'none' : '1px solid #cbd5e1',
                  transition: 'var(--transition)'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="gallery-grid">
            {filteredPhotos.map((p) => (
              <div key={p.id} className="gallery-item" onClick={() => setActiveImage(p)}>
                <img src={p.img} alt={p.title} />
                <div className="gallery-overlay">
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#fef08a', fontWeight: '700' }}>{p.cat}</span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{p.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="modal-backdrop" onClick={() => setActiveImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: 'transparent', maxWidth: '900px', boxShadow: 'none' }}>
            <button className="modal-close" onClick={() => setActiveImage(null)} style={{ background: 'white' }}>
              <X size={20} />
            </button>
            <img src={activeImage.img} alt={activeImage.title} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '16px' }} />
            <div style={{ textAlign: 'center', marginTop: '16px', color: 'white' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'white' }}>{activeImage.title}</h3>
              <p style={{ color: '#cbd5e1' }}>Kategori: {activeImage.cat}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
