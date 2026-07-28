import React from 'react';
import { ShieldAlert, LogOut, Edit3 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AdminBar() {
  const { isAdminLoggedIn, logoutAdmin } = useData();

  if (!isAdminLoggedIn) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #1e293b, #0f172a)',
        color: 'white',
        padding: '0 24px',
        height: '44px',
        fontSize: '0.86rem',
        fontWeight: '600',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid var(--accent)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            background: 'var(--accent)',
            color: 'white',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.72rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          ADMIN ACTIVE
        </span>
        <span style={{ color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
          <Edit3 size={15} color="var(--accent)" />
          Mode Pengelolaan Administrator Aktif — Anda dapat Menambah & Mengubah Berita, Perangkat Desa, Wisata, dan Kontak.
        </span>
      </div>

      <button
        onClick={logoutAdmin}
        style={{
          background: 'rgba(239, 68, 68, 0.2)',
          border: '1px solid rgba(239, 68, 68, 0.5)',
          color: '#fca5a5',
          padding: '4px 12px',
          borderRadius: '99px',
          fontSize: '0.8rem',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer'
        }}
      >
        <LogOut size={13} /> Keluar Admin
      </button>
    </div>
  );
}
