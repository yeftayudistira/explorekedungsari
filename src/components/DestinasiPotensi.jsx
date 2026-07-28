import React, { useState } from 'react';
import Hero from './Hero';
import { Sparkles, MapPin, Star, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function DestinasiPotensi() {
  const { destinasiList, addDestinasi, updateDestinasi, deleteDestinasi, isAdminLoggedIn } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    cat: 'Wisata Alam',
    rating: '5.0',
    desc: '',
    img: '/images/landmark1.jpg',
    lokasi: 'Dusun Kedung I'
  });

  const umkmList = [
    { name: 'Kopi Tubruk Kedungsari', type: 'Kuliner & Minuman', harga: 'Rp 15.000 / bungkus', img: '/images/history.jpg' },
    { name: 'Kerajinan Ukir Kayu Jati', type: 'Kerajinan Tangan', harga: 'Mulai Rp 50.000', img: '/images/landmark2.jpg' },
    { name: 'Beras Organik Kedungsari', type: 'Hasil Tani', harga: 'Rp 16.000 / kg', img: '/images/landmark1.jpg' },
    { name: 'Keripik Pisang Gula Aren', type: 'Oleh-Oleh Khas', harga: 'Rp 12.000 / bungkus', img: '/images/hero.jpg' }
  ];

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      title: '',
      cat: 'Wisata Alam',
      rating: '5.0',
      desc: '',
      img: '/images/landmark1.jpg',
      lokasi: 'Dusun Kedung I'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      cat: item.cat,
      rating: item.rating,
      desc: item.desc,
      img: item.img || '/images/landmark1.jpg',
      lokasi: item.lokasi
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus destinasi ini dari daftar?')) {
      deleteDestinasi(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateDestinasi(editingId, form);
    } else {
      addDestinasi(form);
    }
    setIsModalOpen(false);
  };

  return (
    <main className="destinasi-page">
      <Hero
        title="Destinasi Wisata & Potensi Desa"
        subtitle="Jelajahi keindahan alam memukau dan dukung produk UMKM asli Desa Kedungsari."
        bgImage="/images/landmark1.jpg"
        badge="Wisata & Ekonomi Kreatif"
      />

      {/* Wisata Utama */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Pesona Alam</span>
              <h2 style={{ fontSize: '2.4rem', marginTop: '4px' }}>Destinasi Wisata Favorit</h2>
              <p style={{ color: '#64748b' }}>Nikmati ketenangan alam dan kekayaan landmark budaya Kedungsari.</p>
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
                <Plus size={18} /> Tambah Destinasi Wisata
              </button>
            )}
          </div>

          <div className="news-grid">
            {destinasiList.map((item) => (
              <div key={item.id} className="news-card">
                <div style={{ position: 'relative' }}>
                  <img src={item.img} alt={item.title} className="news-img" />
                  {isAdminLoggedIn && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        style={{ background: 'white', color: 'var(--primary)', padding: '8px', borderRadius: '50%', boxShadow: 'var(--shadow-md)' }}
                        title="Edit Destinasi"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{ background: 'white', color: '#ef4444', padding: '8px', borderRadius: '50%', boxShadow: 'var(--shadow-md)' }}
                        title="Hapus Destinasi"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="news-body">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span className="news-badge">{item.cat}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.88rem', fontWeight: '700', color: 'var(--accent)' }}>
                      <Star size={16} fill="var(--accent)" color="var(--accent)" /> {item.rating}
                    </span>
                  </div>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-excerpt">{item.desc}</p>
                  <div className="news-footer">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                      <MapPin size={14} /> {item.lokasi}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UMKM & Produk Lokal */}
      <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
            <span style={{ color: 'var(--accent)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Produk Lokal</span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '8px' }}>Pemberdayaan UMKM Kedungsari</h2>
            <p style={{ color: '#64748b' }}>Oleh-oleh khas dan produk olahan warga desa berkualitas tinggi.</p>
          </div>

          <div className="news-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {umkmList.map((u, idx) => (
              <div key={idx} style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', padding: '20px', boxShadow: 'var(--shadow-sm)' }}>
                <img src={u.img} alt={u.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase' }}>{u.type}</span>
                <h4 style={{ fontSize: '1.1rem', color: '#0f172a', margin: '4px 0 8px' }}>{u.name}</h4>
                <p style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '0.95rem' }}>{u.harga}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Form Destinasi */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '550px' }}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '20px' }}>
              {editingId ? '✏️ Edit Destinasi Wisata' : '➕ Tambah Destinasi Wisata'}
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Nama Destinasi</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Kategori</label>
                  <input
                    type="text"
                    required
                    value={form.cat}
                    onChange={(e) => setForm({ ...form, cat: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Lokasi Dusun</label>
                  <input
                    type="text"
                    required
                    value={form.lokasi}
                    onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Pilih Foto Destinasi</label>
                <select
                  value={form.img}
                  onChange={(e) => setForm({ ...form, img: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}
                >
                  <option value="/images/landmark1.jpg">Foto Waduk Kedungsari (/images/landmark1.jpg)</option>
                  <option value="/images/landmark2.jpg">Foto Monumen Prasasti (/images/landmark2.jpg)</option>
                  <option value="/images/history.jpg">Foto Sunrise & Sawah (/images/history.jpg)</option>
                  <option value="/images/hero.jpg">Foto Balai Desa (/images/hero.jpg)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Deskripsi Destinasi</label>
                <textarea
                  rows="4"
                  required
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                ></textarea>
              </div>

              <button
                type="submit"
                style={{ background: 'var(--primary)', color: 'white', padding: '14px', borderRadius: '99px', fontWeight: '700', marginTop: '10px' }}
              >
                Simpan Destinasi
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
