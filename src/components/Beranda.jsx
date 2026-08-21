import React from 'react';
import Hero from './Hero';
import { Compass, Landmark, Sparkles, Image as ImageIcon, ArrowRight, Calendar } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Beranda({ setActiveTab }) {
  const { newsList } = useData();

  const exploreFeatures = [
    { title: 'Profil & Sejarah', desc: 'Mengenal kisah perjalanan, nilai budaya, dan kearifan lokal Kedungsari.', icon: Compass, tab: 'profil-desa' },
    { title: 'Landmark Ikonik', desc: 'Pemandangan Waduk Panorama & Monumen Prasasti Sejarah Desa.', icon: Landmark, tab: 'profil-desa' },
    { title: 'UMKM & Potensi', desc: 'Jelajahi peternakan itik, pertanian hortikultura, dan kerajinan warga.', icon: Sparkles, tab: 'umkm' },
    { title: 'Galeri Foto', desc: 'Dokumentasi visual momen keindahan dan kegiatan warga desa.', icon: ImageIcon, tab: 'galeri' }
  ];

  // Show top 3 news
  const featuredNews = newsList.slice(0, 3);

  return (
    <main className="beranda-page">
      {/* Hero Welcome */}
      <Hero
        title="Selamat Datang di Portal Resmi Desa Kedungsari"
        subtitle="Pusat Informasi Publik, Pesona Keindahan Alam, Kebudayaan, dan Potensi Desa Kedungsari."
        bgImage="/images/galeri_jalan_tani_sumbing.jpg"
        badge="Kedungsari Explore Portal"
      />

      {/* Explore Village Features */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Pesona Kedungsari</span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '8px' }}>Jelajahi Potensi & Kebudayaan Desa</h2>
            <p style={{ color: '#64748b' }}>Kecamatan Bandongan, Kabupaten Magelang — Desa agraris dengan tradisi Tedhak Siten & peternakan itik petelur unggulan.</p>
          </div>

          <div className="news-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {exploreFeatures.map((ef, i) => {
              const IconComp = ef.icon;
              return (
                <div
                  key={i}
                  onClick={() => setActiveTab(ef.tab)}
                  style={{
                    background: 'white',
                    padding: '30px 24px',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    boxShadow: 'var(--shadow-sm)',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                >
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    <IconComp size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: '#0f172a' }}>{ef.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6' }}>{ef.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured News Section */}
      <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Kabar Terbaru</span>
              <h2 style={{ fontSize: '2.2rem', marginTop: '4px' }}>Berita & Pengumuman Desa</h2>
            </div>
            <button
              onClick={() => setActiveTab('berita')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.95rem' }}
            >
              Lihat Semua Berita <ArrowRight size={18} />
            </button>
          </div>

          <div className="news-grid">
            {featuredNews.map((news) => (
              <div key={news.id} className="news-card">
                <img src={news.img || '/images/no_image_placeholder.png'} alt={news.title} className="news-img" />
                <div className="news-body">
                  <span className="news-badge">{news.category}</span>
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-excerpt">{news.excerpt}</p>
                  <div className="news-footer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} /> {news.date}
                    </span>
                    <button onClick={() => setActiveTab('berita')} style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.88rem' }}>
                      Baca Artikel →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
