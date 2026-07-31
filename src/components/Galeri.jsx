import React, { useState } from 'react';
import Hero from './Hero';
import { Eye, X, Plus, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function Galeri() {
  const { galeriList, addGaleri, updateGaleri, deleteGaleri, isAdminLoggedIn } = useData();

  const [activeFilter, setActiveFilter] = useState('Semua');
  const [activeImage, setActiveImage] = useState(null);

  // Modal Form State for Admin
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    cat: 'Pertanian & Alam',
    img: '/images/landmark1.jpg'
  });

  const filters = ['Semua', 'Pertanian & Alam', 'Kebudayaan', 'Ekonomi Warga', 'Pemerintahan', 'Kegiatan Warga'];

  const filteredPhotos = (galeriList || []).filter(
    (item) => activeFilter === 'Semua' || item.cat === activeFilter
  );

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      title: '',
      cat: 'Pertanian & Alam',
      img: '/images/landmark1.jpg'
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item, e) => {
    e.stopPropagation();
    setEditingId(item.id);
    setForm({
      title: item.title,
      cat: item.cat,
      img: item.img || '/images/landmark1.jpg'
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Apakah Anda yakin ingin menghapus foto ini dari galeri?')) {
      deleteGaleri(id);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateGaleri(editingId, form);
    } else {
      addGaleri(form);
    }
    setIsFormOpen(false);
  };

  return (
    <main className="galeri-page">
      <Hero
        title="Galeri Visual Desa Kedungsari"
        subtitle="Dokumentasi keindahan alam, kegiatan masyarakat, dan momen bersejarah Desa Kedungsari, Kecamatan Bandongan."
        bgImage="/images/landmark1.jpg"
        badge="Dokumentasi Visual"
      />

      <section className="section-padding">
        <div className="container">
          {/* Header Controls: Filter Badges & Admin Add Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '99px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    background: activeFilter === f ? 'var(--primary)' : 'white',
                    color: activeFilter === f ? 'white' : '#475569',
                    border: activeFilter === f ? 'none' : '1px solid #cbd5e1',
                    transition: 'var(--transition)'
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {isAdminLoggedIn && (
              <button
                onClick={handleOpenCreate}
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '99px',
                  fontWeight: '700',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(13, 92, 58, 0.3)'
                }}
              >
                <Plus size={18} /> Tambah Foto Galeri
              </button>
            )}
          </div>

          {/* Photo Grid */}
          <div className="gallery-grid">
            {filteredPhotos.map((p) => (
              <div key={p.id} className="gallery-item" onClick={() => setActiveImage(p)} style={{ position: 'relative' }}>
                <img src={p.img} alt={p.title} />

                {isAdminLoggedIn && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, display: 'flex', gap: '8px' }}>
                    <button
                      onClick={(e) => handleOpenEdit(p, e)}
                      title="Edit Foto"
                      style={{ background: 'white', color: 'var(--primary)', padding: '8px', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={(e) => handleDelete(p.id, e)}
                      title="Hapus Foto"
                      style={{ background: 'white', color: '#ef4444', padding: '8px', borderRadius: '50%', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}

                <div className="gallery-overlay">
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#fef08a', fontWeight: '700' }}>{p.cat}</span>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: '700' }}>{p.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              <h3>Belum ada foto dalam kategori ini.</h3>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Preview Modal */}
      {activeImage && (
        <div className="modal-backdrop" onClick={() => setActiveImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: 'transparent', maxWidth: '900px', boxShadow: 'none' }}>
            <button className="modal-close" onClick={() => setActiveImage(null)} style={{ background: 'white' }}>
              <X size={20} />
            </button>
            <img src={activeImage.img} alt={activeImage.title} style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '16px' }} />
            <div style={{ textAlign: 'center', marginTop: '16px', color: 'white' }}>
              <h3 style={{ fontSize: '1.4rem', color: 'white' }}>{activeImage.title}</h3>
              <p style={{ color: '#cbd5e1' }}>Kategori: {activeImage.cat}</p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Form Modal for Add/Edit Photo */}
      {isFormOpen && (
        <div className="modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '550px' }}>
            <button className="modal-close" onClick={() => setIsFormOpen(false)}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '20px' }}>
              {editingId ? '✏️ Edit Foto Galeri' : '➕ Tambah Foto Galeri Baru'}
            </h3>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Judul / Keterangan Foto</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Suasana Panen Cabai di Dusun Karangrejo"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Kategori Foto</label>
                <select
                  value={form.cat}
                  onChange={(e) => setForm({ ...form, cat: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}
                >
                  {filters.filter(f => f !== 'Semua').map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Path Gambar / URL Foto</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: /images/nama_foto.jpg atau URL gambar https://..."
                  value={form.img}
                  onChange={(e) => setForm({ ...form, img: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
                <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  Tips: Simpan foto di folder <code>public/images/</code> dan ketik jalurnya (misal: <code>/images/foto_baru.jpg</code>) atau gunakan URL gambar web.
                </span>
              </div>

              <button
                type="submit"
                style={{ background: 'var(--primary)', color: 'white', padding: '14px', borderRadius: '99px', fontWeight: '700', fontSize: '1rem', marginTop: '10px' }}
              >
                {editingId ? 'Simpan Perubahan Foto' : 'Tambahkan ke Galeri'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
