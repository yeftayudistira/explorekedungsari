import React, { useState } from 'react';
import Hero from './Hero';
import { Target, Award, Users, MapPin, Building2, Landmark, CheckCircle2, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ProfilDesa() {
  const { sotkList, addSotk, updateSotk, deleteSotk, isAdminLoggedIn } = useData();

  // Form modal state for SOTK
  const [isSotkModalOpen, setIsSotkModalOpen] = useState(false);
  const [editingSotkId, setEditingSotkId] = useState(null);
  const [sotkForm, setSotkForm] = useState({
    nama: '',
    jabatan: '',
    role: ''
  });

  const handleOpenCreateSotk = () => {
    setEditingSotkId(null);
    setSotkForm({ nama: '', jabatan: '', role: '' });
    setIsSotkModalOpen(true);
  };

  const handleOpenEditSotk = (item) => {
    setEditingSotkId(item.id);
    setSotkForm({ nama: item.nama, jabatan: item.jabatan, role: item.role });
    setIsSotkModalOpen(true);
  };

  const handleDeleteSotk = (id) => {
    if (window.confirm('Hapus perangkat desa ini dari daftar?')) {
      deleteSotk(id);
    }
  };

  const handleSotkSubmit = (e) => {
    e.preventDefault();
    if (editingSotkId) {
      updateSotk(editingSotkId, sotkForm);
    } else {
      addSotk(sotkForm);
    }
    setIsSotkModalOpen(false);
  };

  return (
    <main className="profil-desa-page">
      {/* Hero Banner Sesuai Gambar Acuan 1 */}
      <Hero
        title="Jelajahi Kisah Menakjubkan Desa Kedungsari"
        subtitle="Perjalanan melintasi waktu di desa tercinta kami, tempat tradisi bertemu dengan kemajuan."
        bgImage="/images/hero.jpg"
        badge="Profil Resmi Desa"
      />

      {/* Section 1: Landmark Ikonik (Sesuai Gambar Acuan 2) */}
      <section className="landmark-section">
        <div className="container">
          <div className="landmark-grid">
            {/* Split Images di sebelah kiri persis seperti Screenshot 2 */}
            <div className="landmark-images">
              <div className="landmark-img-card">
                <img src="/images/landmark1.jpg" alt="Pemandangan Asri Kedungsari" />
              </div>
              <div className="landmark-img-card">
                <img src="/images/landmark2.jpg" alt="Monumen Prasasti Kedungsari" />
              </div>
            </div>

            {/* Teks Penjelasan Landmark di sebelah kanan persis seperti Screenshot 2 */}
            <div className="landmark-text-content">
              <h2>Landmark Ikonik</h2>
              <p>
                Waduk Panorama Kedungsari dan Monumen Prasasti Sejarah adalah dua landmark ikonik yang sarat akan makna di Desa Kedungsari. Waduk Kedungsari terkenal sebagai destinasi wisata yang memikat dengan perairan yang jernih, pepohonan kelapa yang rimbun, dan pemandangan matahari terbenam yang memukau, menjadi favorit bagi wisatawan lokal maupun luar daerah.
              </p>
              <p>
                Tak jauh dari sana, berdiri Monumen Prasasti Pendopo Desa sebagai pengingat akan peristiwa sejarah pendirian desa, sekaligus simbol keteguhan dan semangat gotong royong masyarakat Kedungsari. Kedua landmark ini bukan hanya destinasi wisata, tetapi juga mencerminkan sejarah, budaya, dan daya tarik emosional bagi siapa pun yang megunjunginya.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Awal Dari Perjalanan Kami / Sejarah (Sesuai Gambar Acuan 3) */}
      <section className="history-section">
        <div className="container">
          <div className="history-grid">
            {/* Teks Sejarah di sebelah kiri persis seperti Screenshot 3 */}
            <div className="history-text-content">
              <h2>Awal Dari Perjalanan Kami</h2>
              <p>
                Desa Kedungsari merupakan salah satu desa di wilayah pesisir dan perbukitan yang terkenal dengan keindahan alamnya serta kekayaan budaya dan tradisi yang masih terjaga hingga saat ini. Terletak di kawasan yang subur dan hijau, desa ini menjadi ikon pariwisata daerah dengan persawahannya yang mempesona, sekaligus pusat kehidupan masyarakat yang tetap lestarikan kearifan lokal di tengah arus modernisasi.
              </p>
              <p>
                Sebagai desa yang mandiri dan berdaya, Kedungsari memiliki sistem tata kelola pemerintahan yang berlandaskan pada nilai-nilai kebersamaan dan hukum yang berlaku. Masyarakatnya masih memegang teguh tradisi gotong royong dan kearifan lokal yang diwariskan secara turun-temurun, menjadikan Desa Kedungsari sebagai salah satu pilar penting dalam menjaga warisan budaya.
              </p>
              <p>
                Website resmi Desa Kedungsari ini hadir sebagai sarana informasi dan komunikasi transparan bagi masyarakat serta wisatawan yang ingin mengenal lebih dalam tentang Desa Kedungsari.
              </p>
              <p>
                Melalui platform digital ini, kami menyajikan berbagai informasi terkait sejarah desa, adat dan budaya, kegiatan masyarakat, potensi pariwisata, serta pengumuman dan agenda resmi desa.
              </p>
            </div>

            {/* Foto Sejarah di sebelah kanan persis seperti Screenshot 3 */}
            <div className="history-image-card">
              <img src="/images/history.jpg" alt="Awal Perjalanan Desa Kedungsari" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Visi & Misi Desa */}
      <section className="section-padding" style={{ background: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Arah Pembangunan</span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '8px' }}>Visi & Misi Desa Kedungsari</h2>
            <p style={{ color: '#64748b' }}>Komitmen bersama mewujudkan desa yang mandiri, sejahtera, agraris, berbudaya, dan berbasis teknologi informasi.</p>
          </div>

          <div className="visi-misi-grid">
            <div className="card-visi-misi" style={{ borderTop: '4px solid var(--primary)' }}>
              <h3>
                <Target size={28} color="var(--primary)" />
                Visi Desa Kedungsari
              </h3>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#334155', lineHeight: '1.7', marginTop: '12px' }}>
                "Terwujudnya Desa Kedungsari yang Maju, Sejahtera, Transparan, Berdaya Saing Tinggi, serta Lestari Budaya dan Alamnya Menuju Masyarakat Berakhlak Mulia."
              </p>
            </div>

            <div className="card-visi-misi" style={{ borderTop: '4px solid var(--accent)' }}>
              <h3>
                <Award size={28} color="var(--accent)" />
                Misi Utama Pembangunan
              </h3>
              <ul className="misi-list" style={{ marginTop: '12px' }}>
                <li>
                  <span className="misi-num">1</span>
                  <span>Meningkatkan transparansi dan pelayanan informasi publik berbasis digital.</span>
                </li>
                <li>
                  <span className="misi-num">2</span>
                  <span>Mendorong perekonomian warga melalui UMKM dan pariwisata desa.</span>
                </li>
                <li>
                  <span className="misi-num">3</span>
                  <span>Melestarikan nilai gotong royong dan kesenian budaya lokal Kedungsari.</span>
                </li>
                <li>
                  <span className="misi-num">4</span>
                  <span>Membangun infrastruktur desa yang merata, modern, dan ramah lingkungan.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: SOTK & Aparatur Pemerintahan Desa */}
      <section className="section-padding" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Tata Kelola Desa</span>
              <h2 style={{ fontSize: '2.4rem', marginTop: '4px' }}>Aparatur Pemerintahan Desa</h2>
              <p style={{ color: '#64748b' }}>Struktur Organisasi dan Tata Kerja (SOTK) Pemerintah Desa Kedungsari.</p>
            </div>

            {isAdminLoggedIn && (
              <button
                onClick={handleOpenCreateSotk}
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
                <Plus size={18} /> Tambah Aparatur Desa
              </button>
            )}
          </div>

          <div className="news-grid">
            {sotkList.map((st) => (
              <div key={st.id} style={{ background: 'white', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)', position: 'relative' }}>
                {isAdminLoggedIn && (
                  <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleOpenEditSotk(st)}
                      style={{ background: 'var(--light-gray)', color: 'var(--primary)', padding: '6px', borderRadius: '50%' }}
                      title="Edit Perangkat Desa"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => handleDeleteSotk(st.id)}
                      style={{ background: 'var(--light-gray)', color: '#ef4444', padding: '6px', borderRadius: '50%' }}
                      title="Hapus Perangkat Desa"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )}
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Users size={24} />
                </div>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '4px' }}>{st.nama}</h3>
                <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.92rem', marginBottom: '8px' }}>{st.jabatan}</p>
                <p style={{ color: '#64748b', fontSize: '0.88rem' }}>{st.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOTK Form Modal */}
      {isSotkModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsSotkModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '500px' }}>
            <button className="modal-close" onClick={() => setIsSotkModalOpen(false)}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '20px' }}>
              {editingSotkId ? '✏️ Edit Aparatur Desa' : '➕ Tambah Aparatur Desa'}
            </h3>

            <form onSubmit={handleSotkSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: H. Bambang Sugiarto, S.E."
                  value={sotkForm.nama}
                  onChange={(e) => setSotkForm({ ...sotkForm, nama: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Jabatan Resmi</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Kepala Desa / Kaur Keuangan"
                  value={sotkForm.jabatan}
                  onChange={(e) => setSotkForm({ ...sotkForm, jabatan: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Tugas & Peran (Role)</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pimpinan Pemerintah Desa"
                  value={sotkForm.role}
                  onChange={(e) => setSotkForm({ ...sotkForm, role: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <button
                type="submit"
                style={{ background: 'var(--primary)', color: 'white', padding: '14px', borderRadius: '99px', fontWeight: '700', marginTop: '10px' }}
              >
                Simpan Perangkat Desa
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
