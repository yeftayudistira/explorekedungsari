import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title = 'Data Ini', itemName = '' }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '440px',
          padding: '32px',
          borderRadius: '20px',
          textAlign: 'center'
        }}
      >
        <button className="modal-close" onClick={onClose} style={{ top: '16px', right: '16px' }}>
          <X size={18} />
        </button>

        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#fef2f2',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          border: '1px solid #fee2e2'
        }}>
          <AlertTriangle size={32} />
        </div>

        <h3 style={{ fontSize: '1.4rem', color: '#0f172a', fontWeight: '800', marginBottom: '10px' }}>
          Konfirmasi Penghapusan
        </h3>

        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '28px' }}>
          Apakah Anda yakin ingin menghapus {title} {itemName ? <strong>"{itemName}"</strong> : ''}? Tindakan ini akan menghapus data secara permanen dari database.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px 20px',
              borderRadius: '99px',
              border: '1px solid #cbd5e1',
              background: 'white',
              color: '#334155',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: 'pointer'
            }}
          >
            Batal
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              flex: 1,
              padding: '12px 20px',
              borderRadius: '99px',
              border: 'none',
              background: '#ef4444',
              color: 'white',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
            }}
          >
            <Trash2 size={18} /> Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
