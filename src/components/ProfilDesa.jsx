import React, { useState } from 'react';
import Hero from './Hero';
import { Target, Award, Users, MapPin, Building2, Landmark, CheckCircle2, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData } from '../context/DataContext';

import ConfirmDeleteModal from './ConfirmDeleteModal';

export default function ProfilDesa() {
  const { sotkList, addSotk, updateSotk, deleteSotk, isAdminLoggedIn } = useData();
  const [deleteTarget, setDeleteTarget] = useState(null);

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

  const handleDeleteSotkClick = (item) => {
    setDeleteTarget(item);
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
        bgImage="/images/home-image.jpeg"
        badge="Profil Resmi Desa"
      />

      {/* Section 1: Asal Usul Nama & Geografi */}
      <section className="landmark-section">
        <div className="container">
          <div className="landmark-grid">
            {/* Split Images di sebelah kiri */}
            <div className="landmark-images">
              <div className="landmark-img-card">
                <img src="/images/galeri_persawahan_sunset.jpg" alt="Persawahan Desa Kedungsari" />
              </div>
              <div className="landmark-img-card">
                <img src="/images/galeri_koperasi_merah_putih.jpg" alt="Suasana Desa Kedungsari" />
              </div>
            </div>

            {/* Teks Penjelasan Asal Usul & Geografi */}
            <div className="landmark-text-content">
              <h2>Asal Usul Nama & Geografi</h2>
              <p>
                Nama <strong>"Kedungsari"</strong> berasal dari dua kata Bahasa Jawa, yaitu <em>Kedung</em> (wadah atau tempat menampung) dan <em>Sari</em> (kemakmuran atau inti kebaikan). Dengan demikian, Kedungsari bermakna <strong>"Tempat yang Makmur"</strong>.
              </p>
              <p>
                Desa Kedungsari merupakan salah satu dari 14 desa di Kecamatan Bandongan, Kabupaten Magelang, Jawa Tengah (Kode Pos 56151). Dengan luas wilayah sekitar <strong>1,54 km²</strong>, desa ini merupakan desa terkecil di Kecamatan Bandongan namun memiliki kepadatan penduduk yang dinamis (~1.597 jiwa/km²). Desa ini terletak di bagian barat Kabupaten Magelang dan berbatasan langsung dengan Kecamatan Windusari (Utara), Kota Magelang (Timur), Kecamatan Tempuran (Selatan), dan Kecamatan Kaliangkrik (Barat).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Sejarah Perjuangan & Perkembangan Wilayah */}
      <section className="history-section">
        <div className="container">
          <div className="history-grid">
            {/* Teks Sejarah di sebelah kiri */}
            <div className="history-text-content">
              <h2>Awal Dari Perjalanan Kami</h2>
              <p>
                Sejarah Desa Kedungsari sarat akan kisah perjuangan. Pada masa kolonial Belanda (sekitar tahun 1800-an), warga Kedungsari mengalami penderitaan akibat sistem tanam paksa. Rakyat bertahan hidup dengan mengonsumsi <em>debok</em> (jantung) dan bonggol pisang serta mengenakan pakaian dari karung goni. Penindasan berlanjut pada masa pendudukan Jepang (1942–1945) melalui perampasan hasil panen.
              </p>
              <p>
                Pasca kemerdekaan 17 Agustus 1945, kehidupan sosial dan ekonomi masyarakat berangsur bangkit. Awalnya Kedungsari terdiri dari <strong>9 dusun</strong> (Jetis, Karang, Tundan, Jenggotan, Kedungan, Pranan, Wonosaran, Gatak Paingan, Kwangsan). Namun seiring penataan tanah kas desa (bengkok), wilayah ini disederhanakan menjadi <strong>5 Dusun Utama</strong>: Karangrejo, Kedungan & Pranan, Wonosaran, Paingan, dan Kwangsan.
              </p>
              <p>
                Kini Desa Kedungsari tumbuh menjadi desa agraris yang mandiri, berbudaya, serta meraih predikat resmi <strong>Open Defecation Free (ODF)</strong> yang menjamin standar sanitasi dan kesehatan masyarakat.
              </p>
            </div>

            {/* Foto Sejarah di sebelah kanan */}
            <div className="history-image-card">
              <img src="/images/galeri_kkn_balai_desa.jpg" alt="Sejarah & Tradisi Kedungsari" />
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
            <p style={{ color: '#64748b' }}>Komitmen bersama mewujudkan desa yang makmur, agraris, berbudaya, sehat, dan berbasis pelayanan digital.</p>
          </div>

          <div className="visi-misi-grid">
            <div className="card-visi-misi" style={{ borderTop: '4px solid var(--primary)' }}>
              <h3>
                <Target size={28} color="var(--primary)" />
                Visi Desa Kedungsari
              </h3>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#334155', lineHeight: '1.7', marginTop: '12px' }}>
                "Terwujudnya Desa Kedungsari yang Makmur, Sejahtera, Sehat Lingkungan (ODF), Berbudaya, serta Berdaya Saing Tinggi Berbasis Sektor Pertanian & Peternakan Unggulan."
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
                  <span>Meningkatkan transparansi dan tata kelola pemerintah desa berbasis teknologi informasi.</span>
                </li>
                <li>
                  <span className="misi-num">2</span>
                  <span>Mengembangkan produktivitas komoditas hortikultura dan peternakan itik petelur terpadu.</span>
                </li>
                <li>
                  <span className="misi-num">3</span>
                  <span>Melestarikan kearifan lokal budaya tradisi Tedhak Siten dan semangat gotong royong.</span>
                </li>
                <li>
                  <span className="misi-num">4</span>
                  <span>Mempertahankan status Desa Sehat ODF dan meningkatkan kualitas lingkungan hidup.</span>
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
                      onClick={() => handleDeleteSotkClick(st)}
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
      {/* Custom Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteSotk(deleteTarget?.id)}
        title="Perangkat Desa"
        itemName={deleteTarget?.nama}
      />
    </main>
  );
}
