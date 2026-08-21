import React, { useState } from 'react';
import Hero from './Hero';
import { Eye, X, Plus, Edit2, Trash2, Image as ImageIcon, Upload, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { uploadImage } from '../lib/supabase';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export default function Galeri() {
  const { galeriList, addGaleri, updateGaleri, deleteGaleri, isAdminLoggedIn } = useData();

  const [activeFilter, setActiveFilter] = useState('Semua');
  const [activeImage, setActiveImage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Modal Form State for Admin
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    cat: 'Pertanian & Alam',
    img: '/images/galeri_jalan_tani_sumbing.jpg',
    desc: ''
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
      img: '/images/galeri_jalan_tani_sumbing.jpg',
      desc: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item, e) => {
    e.stopPropagation();
    setEditingId(item.id);
    setForm({
      title: item.title,
      cat: item.cat || 'Pertanian & Alam',
      img: item.img || '/images/galeri_jalan_tani_sumbing.jpg',
      desc: item.desc || ''
    });
    setIsFormOpen(true);
  };

  const handleDeleteClick = (item, e) => {
    e.stopPropagation();
    setDeleteTarget(item);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadedUrl = await uploadImage(file, 'desa-images');
      if (uploadedUrl) {
        setForm((prev) => ({ ...prev, img: uploadedUrl }));
      }
    } catch (err) {
      alert('Gagal mengunggah foto. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateGaleri(editingId, form);
    } else {
      await addGaleri(form);
    }
    setIsFormOpen(false);
  };

  return (
    <main className="galeri-page">
      <Hero
        title="Dokumentasi & Galeri Desa Kedungsari"
        subtitle="Abadikan momen indah lanskap persawahan, kebudayaan, pembangunan, dan kehangatan aktivitas warga Kedungsari."
        bgImage="/images/home-image.jpeg"
        badge="Galeri Foto Resmi"
      />

      <section className="section-padding">
        <div className="container">
          {/* Header & Admin Add Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Pesona Kedungsari</span>
              <h2 style={{ fontSize: '2.2rem', marginTop: '4px' }}>Koleksi Foto & Keindahan Desa</h2>
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

          {/* Filter Bar */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
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

          {/* Gallery Masonry / Grid */}
          <div className="galeri-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filteredPhotos.map((item) => (
              <div
                key={item.id}
                className="galeri-card"
                onClick={() => setActiveImage(item)}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-md)',
                  background: '#0f172a',
                  height: '280px'
                }}
              >
                <img
                  src={item.img || '/images/no_image_placeholder.png'}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />
                <div
                  className="galeri-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, rgba(15, 23, 42, 0.2) 60%, transparent 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'flex-end',
                    padding: '24px',
                    color: 'white'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: '700', marginBottom: '4px' }}>
                    {item.cat}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'white', lineHeight: '1.4' }}>{item.title}</h3>
                </div>

                {isAdminLoggedIn && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px', zIndex: 10 }}
                  >
                    <button
                      onClick={(e) => handleOpenEdit(item, e)}
                      title="Edit Foto"
                      style={{ background: 'white', color: 'var(--primary)', padding: '8px', borderRadius: '50%', boxShadow: 'var(--shadow-md)' }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(item, e)}
                      title="Hapus Foto"
                      style={{ background: 'white', color: '#ef4444', padding: '8px', borderRadius: '50%', boxShadow: 'var(--shadow-md)' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
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
            <img src={activeImage.img} alt={activeImage.title} style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain', borderRadius: '16px' }} />
            <div style={{ textAlign: 'center', marginTop: '16px', color: 'white', background: 'rgba(15, 23, 42, 0.85)', padding: '20px', borderRadius: '16px', backdropFilter: 'blur(8px)' }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: '700' }}>{activeImage.cat}</span>
              <h3 style={{ fontSize: '1.4rem', color: 'white', margin: '4px 0 8px' }}>{activeImage.title}</h3>
              {activeImage.desc && <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>{activeImage.desc}</p>}
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

              {/* Upload Foto Galeri */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>
                  📸 Upload File Foto
                </label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{
                    cursor: 'pointer',
                    background: 'white',
                    border: '1px solid var(--primary)',
                    color: 'var(--primary)',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.88rem',
                    fontWeight: '600',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    {isUploading ? 'Mengunggah...' : 'Pilih File Foto'}
                    <input type="file" accept="image/*" onChange={handleImageFileChange} disabled={isUploading} style={{ display: 'none' }} />
                  </label>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Format: JPG, PNG, WEBP</span>
                </div>

                {form.img ? (
                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={form.img} alt="Preview Foto" style={{ width: '70px', height: '46px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: '600' }}>✓ Foto Galeri Terpasang</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, img: '' }))}
                      style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Trash2 size={14} /> Hapus Foto / No Image
                    </button>
                  </div>
                ) : (
                  <span style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '8px', display: 'block' }}>ℹ️ Tidak ada foto terpilih (Tanpa Gambar)</span>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Deskripsi Penjelasan Foto</label>
                <textarea
                  rows="3"
                  placeholder="Jelaskan suasana/detail dalam foto ini..."
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                style={{ background: 'var(--primary)', color: 'white', padding: '14px', borderRadius: '99px', fontWeight: '700', fontSize: '1rem', marginTop: '10px', opacity: isUploading ? 0.6 : 1 }}
              >
                {editingId ? 'Simpan Perubahan Foto' : 'Tambahkan ke Galeri'}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Custom Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteGaleri(deleteTarget?.id)}
        title="Foto Galeri"
        itemName={deleteTarget?.title}
      />
    </main>
  );
}
