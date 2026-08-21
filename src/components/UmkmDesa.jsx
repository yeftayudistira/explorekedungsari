import React, { useState } from 'react';
import Hero from './Hero';
import { Search, MapPin, Phone, User, Tag, Plus, Edit2, Trash2, X, ShoppingBag, ArrowRight, Upload, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { uploadImage } from '../lib/supabase';

export default function UmkmDesa() {
  const { umkmList, addUmkm, updateUmkm, deleteUmkm, isAdminLoggedIn } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedUmkm, setSelectedUmkm] = useState(null);

  // Form modal state for Create/Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    category: 'Peternakan',
    pemilik: '',
    dusun: 'Dusun Wonosaran',
    hargaInfo: '',
    kontakWa: '',
    img: '/images/galeri_persawahan_sunset.jpg',
    excerpt: '',
    content: ''
  });

  const categories = ['Semua', 'Peternakan', 'Pertanian', 'Kuliner Tradisional', 'Kerajinan Tangan', 'Perdagangan & Jasa'];
  const dusunOptions = ['Dusun Paingan', 'Dusun Karangrejo', 'Dusun Wonosaran', 'Dusun Kedungan & Pranan', 'Dusun Kwangsan'];

  const filteredUmkm = (umkmList || []).filter((item) => {
    if (!item) return false;
    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = (item.nama || item.title || '').toLowerCase().includes(searchLower);
    const ownerMatch = (item.pemilik || '').toLowerCase().includes(searchLower);
    const dusunMatch = (item.dusun || item.lokasi || '').toLowerCase().includes(searchLower);
    const descMatch = (item.excerpt || item.desc || '').toLowerCase().includes(searchLower);
    return matchesCategory && (titleMatch || ownerMatch || dusunMatch || descMatch);
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      nama: '',
      category: 'Peternakan',
      pemilik: '',
      dusun: 'Dusun Wonosaran',
      hargaInfo: '',
      kontakWa: '',
      img: '/images/galeri_persawahan_sunset.jpg',
      excerpt: '',
      content: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item, e) => {
    e.stopPropagation();
    setEditingId(item.id);
    setFormData({
      nama: item.nama || item.title || '',
      category: item.category || item.cat || 'Peternakan',
      pemilik: item.pemilik || '',
      dusun: item.dusun || item.lokasi || 'Dusun Wonosaran',
      hargaInfo: item.hargaInfo || '',
      kontakWa: item.kontakWa || '',
      img: item.img || '/images/galeri_persawahan_sunset.jpg',
      excerpt: item.excerpt || item.desc || '',
      content: item.content || item.desc || ''
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Apakah Anda yakin ingin menghapus data UMKM ini?')) {
      deleteUmkm(id);
    }
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadedUrl = await uploadImage(file, 'desa-images');
      if (uploadedUrl) {
        setFormData((prev) => ({ ...prev, img: uploadedUrl }));
      }
    } catch (err) {
      alert('Gagal mengunggah foto produk. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateUmkm(editingId, formData);
    } else {
      await addUmkm(formData);
    }
    setIsFormOpen(false);
  };

  return (
    <main className="umkm-page">
      <Hero
        title="Potensi Ekonomi & UMKM Kedungsari"
        subtitle="Mendukung dan mempromosikan komoditas lokal unggulan, peternakan, kuliner, dan usaha warga Desa Kedungsari."
        bgImage="/images/galeri_persawahan_sunset.jpg"
        badge="Pemberdayaan Ekonomi Desa"
      />

      <section className="section-padding">
        <div className="container">
          {/* Header Controls & Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
              <input
                type="text"
                placeholder="Cari produk UMKM, pemilik, atau dusun..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 20px 14px 48px',
                  borderRadius: '99px',
                  border: '1px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.95rem'
                }}
              />
              <Search size={20} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
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
                <Plus size={18} /> Tambah Produk / UMKM Baru
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '99px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  background: activeCategory === cat ? 'var(--primary)' : 'white',
                  color: activeCategory === cat ? 'white' : '#475569',
                  border: activeCategory === cat ? 'none' : '1px solid #cbd5e1',
                  transition: 'var(--transition)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* UMKM Cards Grid */}
          <div className="news-grid">
            {filteredUmkm.map((item) => (
              <div key={item.id} className="news-card">
                <div style={{ position: 'relative' }}>
                  <img src={item.img || '/images/galeri_persawahan_sunset.jpg'} alt={item.nama || item.title} className="news-img" />
                  {isAdminLoggedIn && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={(e) => handleOpenEdit(item, e)}
                        title="Edit UMKM"
                        style={{ background: 'white', color: 'var(--primary)', padding: '8px', borderRadius: '50%', boxShadow: 'var(--shadow-md)' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(item.id, e)}
                        title="Hapus UMKM"
                        style={{ background: 'white', color: '#ef4444', padding: '8px', borderRadius: '50%', boxShadow: 'var(--shadow-md)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="news-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="news-badge">{item.category || item.cat || 'UMKM'}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: '700' }}>{item.dusun || item.lokasi}</span>
                  </div>
                  <h3 className="news-title">{item.nama || item.title}</h3>
                  {item.pemilik && (
                    <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <User size={14} color="var(--primary)" /> {item.pemilik}
                    </p>
                  )}
                  <p className="news-excerpt">{item.excerpt || item.desc}</p>

                  {item.hargaInfo && (
                    <div style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>
                      {item.hargaInfo}
                    </div>
                  )}

                  <div className="news-footer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.82rem' }}>
                      <MapPin size={14} /> {item.dusun || item.lokasi}
                    </span>
                    <button
                      onClick={() => setSelectedUmkm(item)}
                      style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.88rem' }}
                    >
                      Detail Produk →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredUmkm.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              <h3>Tidak ada produk UMKM ditemukan untuk kategori ini.</h3>
            </div>
          )}
        </div>
      </section>

      {/* Modal Detail UMKM */}
      {selectedUmkm && (
        <div className="modal-backdrop" onClick={() => setSelectedUmkm(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '650px' }}>
            <button className="modal-close" onClick={() => setSelectedUmkm(null)}>
              <X size={20} />
            </button>
            <span className="news-badge" style={{ marginBottom: '12px', display: 'inline-block' }}>{selectedUmkm.category || selectedUmkm.cat}</span>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '12px', lineHeight: '1.3' }}>{selectedUmkm.nama || selectedUmkm.title}</h2>

            <div style={{ display: 'flex', gap: '20px', color: '#64748b', fontSize: '0.9rem', marginBottom: '16px', flexWrap: 'wrap' }}>
              {selectedUmkm.pemilik && <span><User size={15} style={{ display: 'inline', marginRight: '4px' }} /> Pemilik: <strong>{selectedUmkm.pemilik}</strong></span>}
              <span><MapPin size={15} style={{ display: 'inline', marginRight: '4px' }} /> Lokasi: <strong>{selectedUmkm.dusun || selectedUmkm.lokasi}</strong></span>
            </div>

            {selectedUmkm.hargaInfo && (
              <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '12px 16px', borderRadius: '8px', fontWeight: '700', marginBottom: '20px' }}>
                💡 Info Harga / Kapasitas: {selectedUmkm.hargaInfo}
              </div>
            )}

            <img src={selectedUmkm.img || '/images/galeri_persawahan_sunset.jpg'} alt={selectedUmkm.nama || selectedUmkm.title} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }} />

            <div style={{ fontSize: '1.02rem', color: '#334155', lineHeight: '1.8', marginBottom: '24px' }}>
              <p>{selectedUmkm.content || selectedUmkm.desc}</p>
            </div>

            {selectedUmkm.kontakWa && (
              <a
                href={`https://wa.me/${selectedUmkm.kontakWa.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '10px',
                  background: '#25D366',
                  color: 'white',
                  padding: '14px 28px',
                  borderRadius: '99px',
                  fontWeight: '700',
                  width: '100%',
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
                }}
              >
                <Phone size={20} /> Hubungi Penjual via WhatsApp ({selectedUmkm.kontakWa})
              </a>
            )}
          </div>
        </div>
      )}

      {/* Admin Create / Edit UMKM Modal */}
      {isFormOpen && (
        <div className="modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '650px' }}>
            <button className="modal-close" onClick={() => setIsFormOpen(false)}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '20px' }}>
              {editingId ? '✏️ Edit Data UMKM / Potensi' : '➕ Tambah UMKM / Potensi Baru'}
            </h3>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Nama Produk / Usaha</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama UMKM atau komoditas..."
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Kategori Usaha</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}
                  >
                    {categories.filter(c => c !== 'Semua').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Lokasi Dusun</label>
                  <select
                    value={formData.dusun}
                    onChange={(e) => setFormData({ ...formData, dusun: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}
                  >
                    {dusunOptions.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Nama Pemilik / Kelompok</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kelompok Tani Wonosaran"
                    value={formData.pemilik}
                    onChange={(e) => setFormData({ ...formData, pemilik: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Kontak WhatsApp</label>
                  <input
                    type="text"
                    placeholder="Contoh: 081234567890"
                    value={formData.kontakWa}
                    onChange={(e) => setFormData({ ...formData, kontakWa: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Info Harga / Kapasitas Produksi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Produksi 22 butir/ekor/bulan ATAU Rp 15.000 / kg"
                  value={formData.hargaInfo}
                  onChange={(e) => setFormData({ ...formData, hargaInfo: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              {/* Upload Foto Produk UMKM */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>
                  📸 Upload Foto Produk UMKM
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
                    {isUploading ? 'Mengunggah...' : 'Pilih File Foto Produk'}
                    <input type="file" accept="image/*" onChange={handleImageFileChange} disabled={isUploading} style={{ display: 'none' }} />
                  </label>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Format: JPG, PNG, WEBP</span>
                </div>

                {formData.img ? (
                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={formData.img} alt="Preview Produk" style={{ width: '70px', height: '46px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: '600' }}>✓ Foto Produk Terpasang</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, img: '' }))}
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
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Ringkasan Singkat (Excerpt)</label>
                <input
                  type="text"
                  required
                  placeholder="Ringkasan 1-2 kalimat..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Deskripsi Lengkap Produk & Usaha</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Penjelasan mendalam potensi UMKM..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                style={{ background: 'var(--primary)', color: 'white', padding: '14px', borderRadius: '99px', fontWeight: '700', fontSize: '1rem', marginTop: '10px', opacity: isUploading ? 0.6 : 1 }}
              >
                {editingId ? 'Simpan Perubahan UMKM' : 'Publikasikan UMKM Baru'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
