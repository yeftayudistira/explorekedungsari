import React, { useState } from 'react';
import Hero from './Hero';
import { MapPin, Users, Home, Phone, Plus, Edit2, Trash2, X, Upload, Loader2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import { uploadImage } from '../lib/supabase';

export default function DukuhWilayah() {
  const { dusunList, addDusun, updateDusun, deleteDusun, isAdminLoggedIn } = useData();

  // Admin Modal Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({
    nama: '',
    kepala: '',
    kontak: '',
    rt: '',
    penduduk: '',
    desc: '',
    img: '/images/galeri_kkn_balai_desa.jpg'
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm({
      nama: '',
      kepala: '',
      kontak: 'Hubungi Kantor Desa',
      rt: 'Wilayah RW 01',
      penduduk: 'Wilayah Permukiman',
      desc: '',
      img: '/images/galeri_kkn_balai_desa.jpg'
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (dusun, e) => {
    e.stopPropagation();
    setEditingId(dusun.id);
    setForm({
      nama: dusun.nama || '',
      kepala: dusun.kepala || '',
      kontak: dusun.kontak || '',
      rt: dusun.rt || '',
      penduduk: dusun.penduduk || '',
      desc: dusun.desc || '',
      img: dusun.img || '/images/galeri_kkn_balai_desa.jpg'
    });
    setIsFormOpen(true);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Apakah Anda yakin ingin menghapus data dusun ini?')) {
      deleteDusun(id);
    }
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
      alert('Gagal mengunggah foto dusun. Silakan coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateDusun(editingId, form);
    } else {
      await addDusun(form);
    }
    setIsFormOpen(false);
  };

  return (
    <main className="dukuh-page">
      <Hero
        title="Dusun & Pembagian Wilayah Desa"
        subtitle="Mengenal wilayah administrasi dan dusun-dusun di Desa Kedungsari, Kecamatan Bandongan, Kabupaten Magelang."
        bgImage="/images/galeri_jalan_tani_sumbing.jpg"
        badge="Administrasi Wilayah"
      />

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Wilayah Administrasi</span>
              <h2 style={{ fontSize: '2.4rem', marginTop: '4px' }}>Peta Pembagian Wilayah Dusun</h2>
              <p style={{ color: '#64748b' }}>Wilayah dusun Desa Kedungsari yang saling bersinergi membangun desa.</p>
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
                <Plus size={18} /> Tambah Dusun Baru
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
            {(dusunList || []).map((d) => (
              <div key={d.id} style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <div style={{ position: 'relative' }}>
                  <img src={d.img || '/images/galeri_kkn_balai_desa.jpg'} alt={d.nama} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  {isAdminLoggedIn && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px', zIndex: 10 }}>
                      <button
                        onClick={(e) => handleOpenEdit(d, e)}
                        title="Edit Dusun"
                        style={{ background: 'white', color: 'var(--primary)', padding: '8px', borderRadius: '50%', boxShadow: 'var(--shadow-md)' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={(e) => handleDelete(d.id, e)}
                        title="Hapus Dusun"
                        style={{ background: 'white', color: '#ef4444', padding: '8px', borderRadius: '50%', boxShadow: 'var(--shadow-md)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>Kedungsari Sub-district</span>
                    <h3 style={{ fontSize: '1.4rem', color: '#0f172a', margin: '6px 0 12px' }}>{d.nama}</h3>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.6' }}>{d.desc}</p>
                  </div>

                  <div style={{ background: 'var(--bg-light)', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#334155' }}>
                      <span><strong>Kepala Dusun:</strong> {d.kepala}</span>
                      <span style={{ color: 'var(--primary)', fontWeight: '700' }}><Phone size={14} style={{ display: 'inline', marginRight: '4px' }} />{d.kontak}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                      <span><Home size={14} style={{ display: 'inline', marginRight: '4px' }} /> {d.rt}</span>
                      <span><Users size={14} style={{ display: 'inline', marginRight: '4px' }} /> {d.penduduk}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Form Modal for Add/Edit Dusun */}
      {isFormOpen && (
        <div className="modal-backdrop" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '600px' }}>
            <button className="modal-close" onClick={() => setIsFormOpen(false)}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '20px' }}>
              {editingId ? '✏️ Edit Data Dusun' : '➕ Tambah Dusun Baru'}
            </h3>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Nama Dusun</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Dusun Paingan"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Kepala Dusun (Kadus)</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Sugiarto"
                    value={form.kepala}
                    onChange={(e) => setForm({ ...form, kepala: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Kontak Dusun</label>
                  <input
                    type="text"
                    placeholder="Contoh: (0293) 364712"
                    value={form.kontak}
                    onChange={(e) => setForm({ ...form, kontak: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Cakupan RT / RW</label>
                  <input
                    type="text"
                    placeholder="Contoh: RT 05 / RW 04"
                    value={form.rt}
                    onChange={(e) => setForm({ ...form, rt: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Fokus / Potensi Wilayah</label>
                  <input
                    type="text"
                    placeholder="Contoh: Sentra Pertanian / Balai Desa"
                    value={form.penduduk}
                    onChange={(e) => setForm({ ...form, penduduk: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              {/* Upload Foto Dusun */}
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '8px', color: '#0f172a' }}>
                  📸 Upload Foto Wilayah Dusun
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
                      <img src={form.img} alt="Preview Dusun" style={{ width: '70px', height: '46px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                      <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: '600' }}>✓ Foto Dusun Terpasang</span>
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
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Deskripsi Dusun</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Penjelasan karakter dan potensi dusun..."
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
                {editingId ? 'Simpan Perubahan Dusun' : 'Tambahkan Dusun'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
