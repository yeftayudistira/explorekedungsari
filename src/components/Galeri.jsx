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
    img: '',
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
      img: '',
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
      img: item.img || '',
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
        bgImage="/images/mm.jpg"
        badge="Galeri Dokumentasi Foto"
      />

      <section className="section-padding" style={{ background: '#f8fafc' }}>
        {/* Wider Container for Maximum Viewport Usage */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
          {/* Header & Admin Add Button (Centered Alignment) */}
          <div className="fade-up-element" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Pesona Kedungsari</span>
            <h2 style={{ fontSize: '2.5rem', marginTop: '6px', color: '#0f172a', fontWeight: '800' }}>Koleksi Foto & Keindahan Desa</h2>
            <div style={{ width: '50px', height: '4px', background: 'var(--primary)', borderRadius: '99px', margin: '16px auto 0' }} />

            {isAdminLoggedIn && (
              <div style={{ marginTop: '20px' }}>
                <button
                  onClick={handleOpenCreate}
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '12px 28px',
                    borderRadius: '99px',
                    fontWeight: '700',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(13, 92, 58, 0.3)',
                    cursor: 'pointer'
                  }}
                >
                  <Plus size={18} /> Tambah Foto Galeri Baru
                </button>
              </div>
            )}
          </div>

          {/* Filter Bar (Centered Alignment) */}
          <div className="fade-up-element" style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '99px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  background: activeFilter === f ? 'var(--primary)' : 'white',
                  color: activeFilter === f ? 'white' : '#475569',
                  border: activeFilter === f ? 'none' : '1px solid #cbd5e1',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                  boxShadow: activeFilter === f ? '0 4px 12px rgba(13, 92, 58, 0.2)' : 'none'
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Gallery Full Photo Grid (Pure Photos Without Titles) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {filteredPhotos.map((item) => (
              <div
                key={item.id}
                className="fade-up-element"
                onClick={() => setActiveImage(item)}
                style={{
                  position: 'relative',
                  height: '280px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  background: '#f1f5f9',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid #e2e8f0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 14px 30px rgba(0,0,0,0.12)';
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1.06)';
                  const overlay = e.currentTarget.querySelector('.photo-hover-overlay');
                  if (overlay) overlay.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.06)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  const img = e.currentTarget.querySelector('img');
                  if (img) img.style.transform = 'scale(1)';
                  const overlay = e.currentTarget.querySelector('.photo-hover-overlay');
                  if (overlay) overlay.style.opacity = '0';
                }}
              >
                {/* Full High-Quality Image */}
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

                {/* Subtle Hover Zoom Overlay */}
                <div
                  className="photo-hover-overlay"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(15, 23, 42, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    backdropFilter: 'blur(2px)'
                  }}
                >
                  <div
                    style={{
                      background: 'white',
                      color: 'var(--primary)',
                      padding: '12px 20px',
                      borderRadius: '99px',
                      fontWeight: '700',
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                    }}
                  >
                    <Eye size={18} /> Lihat Foto
                  </div>
                </div>

                {/* Admin Action Buttons on Top Right */}
                {isAdminLoggedIn && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', gap: '8px', zIndex: 10 }}
                  >
                    <button
                      onClick={(e) => handleOpenEdit(item, e)}
                      title="Edit Foto"
                      style={{ background: 'white', color: 'var(--primary)', padding: '8px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', cursor: 'pointer', border: 'none' }}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClick(item, e)}
                      title="Hapus Foto"
                      style={{ background: 'white', color: '#ef4444', padding: '8px', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.15)', cursor: 'pointer', border: 'none' }}
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

      {/* Lightbox Preview Modal (Displays Title, Category & Description when Clicked) */}
      {activeImage && (
        <div className="modal-backdrop" onClick={() => setActiveImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ background: 'transparent', maxWidth: '900px', boxShadow: 'none' }}>
            <button className="modal-close" onClick={() => setActiveImage(null)} style={{ background: 'white' }}>
              <X size={20} />
            </button>
            <img src={activeImage.img} alt={activeImage.title} style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} />
            <div style={{ textAlign: 'center', marginTop: '16px', color: 'white', background: 'rgba(15, 23, 42, 0.9)', padding: '24px 30px', borderRadius: '20px', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: '800', letterSpacing: '0.08em', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 14px', borderRadius: '99px' }}>
                {activeImage.cat}
              </span>
              <h3 style={{ fontSize: '1.5rem', color: 'white', margin: '10px 0 8px', fontWeight: '800' }}>
                {activeImage.title}
              </h3>
              {activeImage.desc && (
                <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: '1.6', margin: 0 }}>
                  {activeImage.desc}
                </p>
              )}
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
