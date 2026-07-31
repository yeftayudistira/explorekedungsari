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
        bgImage="/images/hero.jpg"
        badge="Kedungsari Explore Portal"
      />

      {/* Quick Stats Bar */}
      <div className="container">
        <div className="stats-bar">
          <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            <div className="stat-item">
              <h3>2.460</h3>
              <p>Penduduk (Jiwa)</p>
            </div>
            <div className="stat-item">
              <h3>1,54</h3>
              <p>Luas Wilayah (km²)</p>
            </div>
            <div className="stat-item">
              <h3>660</h3>
              <p>Kepala Keluarga (KK)</p>
            </div>
            <div className="stat-item">
              <h3>5</h3>
              <p>Dusun Utama</p>
            </div>
            <div className="stat-item">
              <h3>100%</h3>
              <p>Status Sehat (ODF)</p>
            </div>
          </div>
        </div>
      </div>

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

      {/* Sambutan Kepala Desa Section */}
      <section className="section-padding" style={{ background: '#ffffff', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: '50px', alignItems: 'center' }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', height: '400px' }}>
              <img src="/images/history.jpg" alt="Sambutan Pemerintah Desa Kedungsari" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div>
              <span style={{ color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Pemerintah Desa Kedungsari</span>
              <h2 style={{ fontSize: '2.4rem', margin: '10px 0 20px', color: '#0f172a' }}>Selamat Datang di Portal Resmi Desa Kedungsari</h2>
              <p style={{ fontSize: '1.05rem', color: '#475569', lineHeight: '1.8', marginBottom: '20px', fontStyle: 'italic' }}>
                "Assalamu'alaikum Warahmatullahi Wabarakatuh. Puji syukur kehadirat Allah SWT, portal digital resmi Desa Kedungsari, Kecamatan Bandongan hadir untuk mempermudah akses informasi publik, promosi hasil pertanian hortikultura, peternakan itik petelur, serta pelestarian tradisi budaya warga."
              </p>
              <p style={{ fontSize: '1rem', color: '#475569', lineHeight: '1.7', marginBottom: '24px' }}>
                Terletak di Kabupaten Magelang, masyarakat Kedungsari senantiasa memegang teguh semangat gotong royong, kearifan tradisi lokal Tedhak Siten, dan kebersihan lingkungan demi mewujudkan desa yang sejahtera.
              </p>
              <div>
                <h4 style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: '800' }}>Pemerintah Desa Kedungsari</h4>
                <p style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>Kecamatan Bandongan, Kabupaten Magelang</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured News Grid */}
      <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Kabar Terbaru</span>
              <h2 style={{ fontSize: '2.4rem', marginTop: '4px' }}>Berita & Pengumuman Desa</h2>
            </div>
            <button
              onClick={() => setActiveTab('berita')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700' }}
            >
              Lihat Semua Berita <ArrowRight size={18} />
            </button>
          </div>

          <div className="news-grid">
            {featuredNews.map((nw) => (
              <div key={nw.id} className="news-card">
                <img src={nw.img} alt={nw.title} className="news-img" />
                <div className="news-body">
                  <span className="news-badge">{nw.category}</span>
                  <h3 className="news-title">{nw.title}</h3>
                  <p className="news-excerpt">{nw.excerpt}</p>
                  <div className="news-footer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} /> {nw.date}
                    </span>
                    <span style={{ color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }} onClick={() => setActiveTab('berita')}>Baca Selengkapnya</span>
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
