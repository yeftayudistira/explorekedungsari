import React, { useState } from 'react';
import Hero from './Hero';
import { Search, Calendar, User, ArrowRight, X, Plus, Edit2, Trash2, CheckCircle2, Upload, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { uploadImage } from '../lib/supabase';

export default function Berita() {
  const { newsList, addNews, updateNews, deleteNews, isAdminLoggedIn } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [selectedNews, setSelectedNews] = useState(null);

  // Form modal state for Create/Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Pengumuman',
    author: 'Admin Desa',
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    img: '/images/galeri_kkn_balai_desa.jpg',
    excerpt: '',
    content: ''
  });

  const categories = ['Semua', 'Pengumuman', 'Pembangunan', 'Kegiatan Warga', 'Pariwisata', 'Kesehatan'];

  const filteredNews = (newsList || []).filter((item) => {
    if (!item) return false;
    const matchesCategory = activeCategory === 'Semua' || item.category === activeCategory;
    const searchLower = searchTerm.toLowerCase();
    const titleMatch = (item.title || '').toLowerCase().includes(searchLower);
    const excerptMatch = (item.excerpt || '').toLowerCase().includes(searchLower);
    return matchesCategory && (titleMatch || excerptMatch);
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Pengumuman',
      author: 'Admin Desa',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      img: '/images/galeri_kkn_balai_desa.jpg',
      excerpt: '',
      content: ''
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (newsItem, e) => {
    e.stopPropagation();
    setEditingId(newsItem.id);
    setFormData({
      title: newsItem.title,
      category: newsItem.category,
      author: newsItem.author || 'Admin Desa',
      date: newsItem.date,
      img: newsItem.img || '/images/galeri_kkn_balai_desa.jpg',
      excerpt: newsItem.excerpt,
      content: newsItem.content
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
      deleteNews(id);
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
      alert('Gagal mengunggah foto. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateNews(editingId, formData);
    } else {
      await addNews(formData);
    }
    setIsFormOpen(false);
  };

  return (
    <main className="berita-page">
      <Hero
        title="Warta & Pengumuman Desa Kedungsari"
        subtitle="Dapatkan informasi terkini mengenai kegiatan, pembangunan, dan berita terbaru seputar Desa Kedungsari."
        bgImage="/images/galeri_kkn_balai_desa.jpg"
        badge="Informasi Publik"
      />

      <section className="section-padding">
        <div className="container">
          {/* Header Controls & Search */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
              <input
                type="text"
                placeholder="Cari berita atau pengumuman..."
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
                <Plus size={18} /> Tambah Berita Baru
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

          {/* News List Grid */}
          <div className="news-grid">
            {filteredNews.map((news) => (
              <div key={news.id} className="news-card">
                <div style={{ position: 'relative' }}>
                  <img src={news.img} alt={news.title} className="news-img" />
                  {isAdminLoggedIn && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={(e) => handleOpenEdit(news, e)}
                        title="Edit Berita"
                        style={{ background: 'white', color: 'var(--primary)', padding: '8px', borderRadius: '50%', boxShadow: 'var(--shadow-md)' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(news.id, e)}
                        title="Hapus Berita"
                        style={{ background: 'white', color: '#ef4444', padding: '8px', borderRadius: '50%', boxShadow: 'var(--shadow-md)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="news-body">
                  <span className="news-badge">{news.category}</span>
                  <h3 className="news-title">{news.title}</h3>
                  <p className="news-excerpt">{news.excerpt}</p>
                  <div className="news-footer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} /> {news.date}
                    </span>
                    <button
                      onClick={() => setSelectedNews(news)}
                      style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.88rem' }}
                    >
                      Detail Artikel →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              <h3>Tidak ada berita ditemukan untuk pencarian ini.</h3>
            </div>
          )}
        </div>
      </section>

      {/* Detail News Modal */}
      {selectedNews && (
        <div className="modal-backdrop" onClick={() => setSelectedNews(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px' }}>
            <button className="modal-close" onClick={() => setSelectedNews(null)}>
              <X size={20} />
            </button>
            <span className="news-badge" style={{ marginBottom: '12px', display: 'inline-block' }}>{selectedNews.category}</span>
            <h2 style={{ fontSize: '1.8rem', color: '#0f172a', marginBottom: '12px', lineHeight: '1.3' }}>{selectedNews.title}</h2>
            <div style={{ display: 'flex', gap: '20px', color: '#64748b', fontSize: '0.85rem', marginBottom: '20px' }}>
              <span><Calendar size={14} style={{ display: 'inline', marginRight: '4px' }} /> {selectedNews.date}</span>
              <span><User size={14} style={{ display: 'inline', marginRight: '4px' }} /> {selectedNews.author}</span>
            </div>
            <img src={selectedNews.img} alt={selectedNews.title} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }} />
            <div style={{ fontSize: '1.02rem', color: '#334155', lineHeight: '1.8' }}>
              <p>{selectedNews.content}</p>
            </div>
          </div>
        </div>
      )}

      {/* Admin Create / Edit News Modal */}
      {isFormOpen && (
        <div className="modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '650px' }}>
            <button className="modal-close" onClick={() => setIsFormOpen(false)}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '20px' }}>
              {editingId ? '✏️ Edit Berita Desa' : '➕ Tambah Berita Baru'}
            </h3>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Judul Berita</label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan judul berita..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Kategori</label>
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
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Penulis / Author</label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              {/* Upload Foto Berita */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>
                  📸 Upload Foto Headline Berita
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
                    {isUploading ? 'Mengunggah...' : 'Pilih File Foto dari HP/PC'}
                    <input type="file" accept="image/*" onChange={handleImageFileChange} disabled={isUploading} style={{ display: 'none' }} />
                  </label>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Format: JPG, PNG, WEBP</span>
                </div>

                {formData.img ? (
                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'white', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={formData.img} alt="Preview Headline" style={{ width: '70px', height: '46px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: '600' }}>✓ Foto Terpasang</span>
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
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Isi Lengkap Artikel</label>
                <textarea
                  rows="5"
                  required
                  placeholder="Tuliskan isi berita secara mendalam..."
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
                {editingId ? 'Simpan Perubahan Berita' : 'Publikasikan Berita'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
