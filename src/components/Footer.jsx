import React from 'react';
import { Compass, Mail, Phone, MapPin, Lock, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Footer({ setActiveTab, onOpenAdminModal }) {
  const { contactInfo, isAdminLoggedIn } = useData();

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src="/images/logo.png" alt="Logo Desa Kedungsari" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
              <div>
                <h3 style={{ margin: 0, fontSize: '1.4rem', color: 'white' }}>Kedungsari</h3>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Jelajahi Desa</span>
              </div>
            </div>
            <p style={{ marginBottom: '12px', color: '#94a3b8', fontSize: '0.92rem' }}>
              Website Digital Branding Desa Kedungsari, Kecamatan Bandongan, Kabupaten Magelang 56151.
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(52, 211, 153, 0.12)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              color: '#34d399',
              padding: '6px 14px',
              borderRadius: '99px',
              fontSize: '0.82rem',
              fontWeight: '700',
              marginBottom: '20px'
            }}>
              🎓 Dibuat oleh KKN Giat 16 UNNES Desa Kedungsari
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-col">
            <h4>Jelajahi Portal</h4>
            <ul className="footer-links">
              <li><a href="#beranda" onClick={(e) => { e.preventDefault(); handleNav('beranda'); }}>Beranda Utama</a></li>
              <li><a href="#profil-desa" onClick={(e) => { e.preventDefault(); handleNav('profil-desa'); }}>Profil & Sejarah Desa</a></li>
              <li><a href="#berita" onClick={(e) => { e.preventDefault(); handleNav('berita'); }}>Warta & Pengumuman</a></li>
              <li><a href="#galeri" onClick={(e) => { e.preventDefault(); handleNav('galeri'); }}>Galeri Foto & Video</a></li>
            </ul>
          </div>

          {/* Sub-district / Dukuh Links */}
          <div className="footer-col">
            <h4>Wilayah Dusun</h4>
            <ul className="footer-links">
              <li><a href="#dukuh" onClick={(e) => { e.preventDefault(); handleNav('dukuh'); }}>Dusun Paingan (Pusat)</a></li>
              <li><a href="#dukuh" onClick={(e) => { e.preventDefault(); handleNav('dukuh'); }}>Dusun Karangrejo</a></li>
              <li><a href="#dukuh" onClick={(e) => { e.preventDefault(); handleNav('dukuh'); }}>Dusun Wonosaran</a></li>
              <li><a href="#dukuh" onClick={(e) => { e.preventDefault(); handleNav('dukuh'); }}>Dusun Kedungan & Pranan</a></li>
              <li><a href="#dukuh" onClick={(e) => { e.preventDefault(); handleNav('dukuh'); }}>Dusun Kwangsan</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>Alamat Balai Desa</h4>
            <ul className="footer-links" style={{ gap: '14px' }}>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={18} color="#34d399" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{contactInfo.alamat}</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={18} color="#34d399" style={{ flexShrink: 0 }} />
                <span>{contactInfo.telepon}</span>
              </li>
              <li style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={18} color="#34d399" style={{ flexShrink: 0 }} />
                <span>{contactInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© 2026 Pemerintah Desa Kedungsari. Dibuat oleh <strong>KKN Giat 16 UNNES Desa Kedungsari</strong>.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Explore Village Portal</span>
            <button
              onClick={onOpenAdminModal}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#cbd5e1',
                padding: '4px 12px',
                borderRadius: '99px',
                fontSize: '0.78rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Lock size={12} /> {isAdminLoggedIn ? 'Admin Active' : 'Portal Admin'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
