import React, { useState } from 'react';
import { X, Lock, Key, ShieldCheck, AlertCircle } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function AdminModal({ isOpen, onClose }) {
  const { loginAdmin } = useData();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const res = loginAdmin(username, password);
    if (res.success) {
      setUsername('');
      setPassword('');
      onClose();
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: '36px 30px', borderRadius: '20px' }}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <ShieldCheck size={32} />
          </div>
          <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '6px' }}>Backdoor Portal Admin</h3>
          <p style={{ color: '#64748b', fontSize: '0.88rem' }}>
            Masukan kredensial pengelola untuk mengaktifkan Mode Edit Desa Kedungsari.
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              color: '#991b1b',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}
          >
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: '#334155' }}>
              Username Admin
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                placeholder="Masukkan username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '6px', color: '#334155' }}>
              Password Admin
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                placeholder="Masukkan password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              <Key size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '14px',
              borderRadius: '99px',
              fontSize: '1rem',
              fontWeight: '700',
              marginTop: '10px',
              boxShadow: '0 4px 12px rgba(13, 92, 58, 0.3)'
            }}
          >
            Masuk Portal Admin
          </button>
        </form>
      </div>
    </div>
  );
}
