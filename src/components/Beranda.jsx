import React from 'react';
import { Compass, Landmark, Sparkles, Image as ImageIcon, ArrowRight, Calendar, Users, Mountain, Home, Store, TreePine, ShoppingBag, Eye, User, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Beranda({ setActiveTab }) {
  const { newsList, dusunList, umkmList, galeriList } = useData();

  // Top items for summary previews
  const featuredNews = (newsList || []).slice(0, 3);
  const featuredUmkm = (umkmList || []).slice(0, 3);
  const featuredGaleri = (galeriList || []).slice(0, 4);

  const potensiItems = [
    {
      emoji: '🏔️',
      title: 'Wisata & Panorama Alam',
      desc: 'Pemandangan lanskap persawahan hortikultura berlatar kemegahan Gunung Sumbing yang menakjubkan.'
    },
    {
      emoji: '🌿',
      title: 'Pertanian Hortikultura',
      desc: 'Sentra penghasil cabai rawit, terong, ketimun, dan pepaya berkualitas tinggi dari persawahan subur.'
    },
    {
      emoji: '🎨',
      title: 'Budaya & Tradisi',
      desc: 'Kearifan lokal tradisi Tedhak Siten yang dihiasi sajian Jadah 7 Warna sarat makna filosofi.'
    },
    {
      emoji: '🍲',
      title: 'Peternakan Itik Petelur',
      desc: 'Budidaya itik petelur unggulan dengan sistem umbaran alami di lahan persawahan desa.'
    },
    {
      emoji: '🎭',
      title: 'Industri Rumah Tangga',
      desc: 'Kreativitas pengrajin lokal dan produk olahan industri rumah tangga warga desa.'
    },
    {
      emoji: '🏪',
      title: 'Potensi UMKM Warga',
      desc: 'Beragam usaha mandiri, wirausaha keliling, dan layanan jasa masyarakat Kedungsari.'
    }
  ];

  return (
    <main className="beranda-page">
      {/* 1. HERO SECTION (100% FULLSCREEN MATCHING BALESARI) */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '60px',
        overflow: 'hidden',
        backgroundImage: "url('/images/galeri_jalan_tani_sumbing.jpg')",
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

        <div style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 24px',
          textAlign: 'center',
          color: 'white'
        }}>
          {/* Pill Badge */}
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
              <TreePine size={16} /> Selamat Datang di Desa Kedungsari
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '800',
            letterSpacing: '-0.03em',
            lineHeight: '1.1',
            marginBottom: '24px',
            color: 'white'
          }}>
            Jelajahi Keindahan Desa Kedungsari
          </h1>

          {/* Subtitle */}
          <p style={{
            maxWidth: '750px',
            margin: '0 auto 36px',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'rgba(255, 255, 255, 0.88)',
            lineHeight: '1.6'
          }}>
            Rasakan pesona alam persawahan hortikultura, kekayaan tradisi Tedhak Siten, dan keramahan masyarakat di lereng Gunung Sumbing, Kecamatan Bandongan.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('dusun')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '99px',
                background: 'white',
                color: '#064e3b',
                padding: '14px 32px',
                fontSize: '0.95rem',
                fontWeight: '700',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Jelajahi Dusun & Wilayah <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setActiveTab('profil-desa')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '99px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                background: 'rgba(255, 255, 255, 0.12)',
                color: 'white',
                padding: '14px 32px',
                fontSize: '0.95rem',
                fontWeight: '600',
                backdropFilter: 'blur(8px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
            >
              Tentang Desa
            </button>
          </div>
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

      {/* 2. TENTANG DESA SECTION (2-COLUMN GRID MATCHING BALESARI) */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center'
          }}>
            {/* Left Image Card */}
            <div style={{
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              height: '380px',
              position: 'relative'
            }}>
              <img
                src="/images/galeri_persawahan_sunset.jpg"
                alt="Tentang Desa Kedungsari"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Right Text Content */}
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Tentang Desa
              </span>
              <h2 style={{ fontSize: '2.4rem', color: '#0f172a', margin: '8px 0 16px', lineHeight: '1.2' }}>
                Desa Kedungsari, Permata Agraris di Lereng Sumbing
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '24px' }}>
                Terletak di Kecamatan Bandongan, Kabupaten Magelang, Desa Kedungsari menawarkan keindahan alam agraris dengan lanskap persawahan hortikultura yang subur dan pemandangan Gunung Sumbing. Dengan kearifan lokal yang terjaga dan semangat gotong royong warga, Kedungsari siap menyambut setiap pengunjung dengan kehangatan.
              </p>
              <button
                onClick={() => setActiveTab('profil-desa')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--primary)',
                  fontWeight: '700',
                  fontSize: '0.95rem'
                }}
              >
                Selengkapnya tentang Desa Kedungsari <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATISTIK DESA DALAM ANGKA (FULL-WIDTH GREEN BANNER) */}
      <section style={{ background: 'var(--primary)', padding: '70px 0', color: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.4rem', color: 'white', fontWeight: '800' }}>Desa Kedungsari dalam Angka</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.05rem', marginTop: '6px' }}>Sekilas tentang potensi dan keunggulan Desa Kedungsari</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px',
            textAlign: 'center'
          }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '28px 20px', borderRadius: '20px', backdropFilter: 'blur(6px)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Users size={28} color="white" />
              </div>
              <h3 style={{ fontSize: '2.4rem', color: 'white', fontWeight: '800' }}>2.460+</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', fontWeight: '600' }}>Penduduk (Jiwa)</p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '28px 20px', borderRadius: '20px', backdropFilter: 'blur(6px)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Mountain size={28} color="white" />
              </div>
              <h3 style={{ fontSize: '2.4rem', color: 'white', fontWeight: '800' }}>154</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', fontWeight: '600' }}>Hektar Luas Wilayah</p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '28px 20px', borderRadius: '20px', backdropFilter: 'blur(6px)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Home size={28} color="white" />
              </div>
              <h3 style={{ fontSize: '2.4rem', color: 'white', fontWeight: '800' }}>{dusunList?.length || 5}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', fontWeight: '600' }}>Dusun Utama</p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '28px 20px', borderRadius: '20px', backdropFilter: 'blur(6px)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Store size={28} color="white" />
              </div>
              <h3 style={{ fontSize: '2.4rem', color: 'white', fontWeight: '800' }}>{umkmList?.length || 25}+</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem', fontWeight: '600' }}>UMKM & Potensi Warga</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POTENSI DESA SECTION (6 CARD GRID MATCHING BALESARI) */}
      <section className="section-padding" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 48px' }}>
            <h2 style={{ fontSize: '2.4rem', color: '#0f172a', fontWeight: '800' }}>Potensi Unggulan Desa</h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '8px' }}>Berbagai potensi lokal yang dimiliki Desa Kedungsari untuk kesejahteraan masyarakat</p>
            <div style={{ width: '60px', height: '4px', background: 'var(--primary)', borderRadius: '99px', margin: '16px auto 0' }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {potensiItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  padding: '32px 28px',
                  borderRadius: '20px',
                  border: '1px solid #e2e8f0',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '16px' }}>{item.emoji}</span>
                <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '8px', fontWeight: '700' }}>{item.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. RINGKASAN BERITA & PENGUMUMAN DESA */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Kabar Terbaru</span>
              <h2 style={{ fontSize: '2.2rem', marginTop: '4px', color: '#0f172a' }}>Berita & Pengumuman Desa</h2>
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

      {/* 6. RINGKASAN UMKM DESA (PRODUK & USAHA UNGGULAN) */}
      <section className="section-padding" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Potensi Ekonomi Warga</span>
              <h2 style={{ fontSize: '2.2rem', marginTop: '4px', color: '#0f172a' }}>Produk & UMKM Unggulan Desa</h2>
            </div>
            <button
              onClick={() => setActiveTab('umkm')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.95rem' }}
            >
              Lihat Semua UMKM <ArrowRight size={18} />
            </button>
          </div>

          <div className="news-grid">
            {featuredUmkm.map((item) => (
              <div key={item.id} className="news-card">
                <img src={item.img || '/images/no_image_placeholder.png'} alt={item.nama || item.title} className="news-img" />
                <div className="news-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="news-badge">{item.category || item.cat || 'UMKM'}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent)', fontWeight: '700' }}>{item.dusun || item.lokasi}</span>
                  </div>
                  <h3 className="news-title">{item.nama || item.title}</h3>
                  {item.pemilik && (
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={14} color="var(--primary)" /> {item.pemilik}
                    </p>
                  )}
                  <p className="news-excerpt">{item.excerpt || item.desc}</p>
                  <div className="news-footer" style={{ marginTop: 'auto', paddingTop: '16px' }}>
                    <button onClick={() => setActiveTab('umkm')} style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.88rem' }}>
                      Lihat Produk UMKM →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RINGKASAN GALERI FOTO DESA (DOKUMENTASI VISUAL) */}
      <section className="section-padding" style={{ background: 'white', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Dokumentasi Visual</span>
              <h2 style={{ fontSize: '2.2rem', marginTop: '4px', color: '#0f172a' }}>Galeri Keindahan & Aktivitas Desa</h2>
            </div>
            <button
              onClick={() => setActiveTab('galeri')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.95rem' }}
            >
              Lihat Semua Galeri Foto <ArrowRight size={18} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {featuredGaleri.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActiveTab('galeri')}
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '240px',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <img
                  src={photo.img || '/images/no_image_placeholder.png'}
                  alt={photo.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  color: 'white'
                }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: '700', marginBottom: '4px' }}>
                    {photo.cat}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'white', lineHeight: '1.4', margin: 0 }}>
                    {photo.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION BANNER (CTA MATCHING BALESARI) */}
      <section style={{
        background: 'linear-gradient(135deg, #052e16 0%, #064e3b 50%, #047857 100%)',
        padding: '80px 24px',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '800', marginBottom: '16px', color: 'white' }}>
            Siap Menjelajahi Desa Kedungsari?
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '36px', lineHeight: '1.6' }}>
            Temukan potensi dusun, produk UMKM lokal, dan pengalaman tak terlupakan di portal desa kami.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('dusun')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '99px',
                background: 'white',
                color: '#064e3b',
                padding: '14px 32px',
                fontSize: '0.95rem',
                fontWeight: '700',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer'
              }}
            >
              Lihat Pembagian Dusun <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setActiveTab('umkm')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                borderRadius: '99px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                padding: '14px 32px',
                fontSize: '0.95rem',
                fontWeight: '600',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer'
              }}
            >
              Jelajahi UMKM
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
