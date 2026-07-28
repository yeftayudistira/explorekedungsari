import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, PhoneCall, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Header({ activeTab, setActiveTab }) {
  const { isAdminLoggedIn } = useData();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil-desa', label: 'Profil Desa' },
    { id: 'berita', label: 'Berita' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'dukuh', label: 'Banjar / Dukuh' },
    { id: 'destinasi', label: 'Destinasi' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : 'transparent'} ${isAdminLoggedIn ? 'has-admin-bar' : ''}`}>
      <div className="container">
        <div className="header-inner">
          {/* Logo & Brand Name */}
          <a href="#beranda" className="brand-logo" onClick={(e) => { e.preventDefault(); handleNavClick('beranda'); }}>
            <img src="/images/logo.png" alt="Logo Desa Kedungsari" className="brand-logo-img" />
            <div className="logo-text-group">
              <span className="brand-name">Kedungsari</span>
              <span className="brand-domain">Explore The Village</span>
            </div>
          </a>

          {/* Desktop Navigation Menu (Matching Kuta Village bar) */}
          <nav>
            <ul className="nav-menu">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div className="nav-actions">
            <button className="btn-contact" onClick={() => handleNavClick('kontak')}>
              <PhoneCall size={16} />
              <span>Hubungi Kami</span>
            </button>

            <button
              className="mobile-toggle"
              aria-label="Toggle Navigation"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`mobile-nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
