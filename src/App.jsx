import React, { useState } from 'react';
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
import Footer from './components/Footer';

function MainApp() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

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
    </DataProvider>
  );
}
