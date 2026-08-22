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
            <p style={{ marginBottom: '20px', color: '#94a3b8', fontSize: '0.92rem' }}>
              Website Digital Branding Desa Kedungsari, Kecamatan Bandongan, Kabupaten Magelang 56151.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" aria-label="Facebook Desa" style={{ background: 'rgba(255,255,255,0.08)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" aria-label="Instagram Desa" style={{ background: 'rgba(255,255,255,0.08)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="Youtube Desa" style={{ background: 'rgba(255,255,255,0.08)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
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
          <p>© 2026 Pemerintah Desa Kedungsari. Hak Cipta Dilindungi Undang-Undang.</p>
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
