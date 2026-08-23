import React, { useState, useEffect } from 'react';
import { DataProvider } from './context/DataContext';
import AdminBar from './components/AdminBar';
import AdminModal from './components/AdminModal';
import Header from './components/Header';
import ProfilDesa from './components/ProfilDesa';
import Beranda from './components/Beranda';
import Berita from './components/Berita';
import Galeri from './components/Galeri';
import DukuhWilayah from './components/DukuhWilayah';
import UmkmDesa from './components/UmkmDesa';
import KontakLayanan from './components/KontakLayanan';
import { Analytics } from '@vercel/analytics/react';
import Footer from './components/Footer';

function getInitialTab() {
  const pathname = window.location.pathname.replace(/^\/+/, '');
  if (pathname) return pathname;
  const hash = window.location.hash.replace('#', '');
  if (hash) return hash;
  const savedTab = localStorage.getItem('kedungsari_active_tab');
  if (savedTab) return savedTab;
  return 'beranda';
}

function MainApp() {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Sync activeTab with Clean HTML5 URL Path & LocalStorage (No '#' Hash)
  useEffect(() => {
    localStorage.setItem('kedungsari_active_tab', activeTab);
    const targetPath = activeTab === 'beranda' ? '/' : `/${activeTab}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  }, [activeTab]);

  // Listen to browser Back / Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname.replace(/^\/+/, '');
      setActiveTab(pathname || 'beranda');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'beranda':
        return <Beranda setActiveTab={setActiveTab} />;
      case 'profil-desa':
        return <ProfilDesa />;
      case 'berita':
        return <Berita />;
      case 'galeri':
        return <Galeri />;
      case 'dukuh':
      case 'dusun':
        return <DukuhWilayah />;
      case 'umkm':
      case 'destinasi':
        return <UmkmDesa />;
      case 'kontak':
        return <KontakLayanan />;
      default:
        return <Beranda setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="app-root">
      <AdminBar />
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
      <Footer setActiveTab={setActiveTab} onOpenAdminModal={() => setIsAdminModalOpen(true)} />
      <AdminModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <MainApp />
      <Analytics />
    </DataProvider>
  );
}
