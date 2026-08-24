import React, { useState } from 'react';
import Hero from './Hero';
import { Target, Award, Users, MapPin, Building2, Landmark, CheckCircle2, Plus, Edit2, Trash2, X } from 'lucide-react';
import { useData } from '../context/DataContext';

import ConfirmDeleteModal from './ConfirmDeleteModal';

export default function ProfilDesa() {
  const { sotkList, addSotk, updateSotk, deleteSotk, visiMisi, updateVisiMisi, sambutanKades, updateSambutanKades, isAdminLoggedIn } = useData();
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Form modal state for SOTK
  const [isSotkModalOpen, setIsSotkModalOpen] = useState(false);
  const [editingSotkId, setEditingSotkId] = useState(null);
  const [sotkForm, setSotkForm] = useState({
    nama: '',
    jabatan: '',
    role: ''
  });

  // Form modal state for Visi & Misi
  const [isVmModalOpen, setIsVmModalOpen] = useState(false);
  const [vmForm, setVmForm] = useState({
    visi: '',
    misiText: ''
  });

  // Form modal state for Sambutan Kepala Desa
  const [isKadesModalOpen, setIsKadesModalOpen] = useState(false);
  const [isUploadingKadesImg, setIsUploadingKadesImg] = useState(false);
  const [kadesForm, setKadesForm] = useState({
    judul: '',
    nama: '',
    jabatan: '',
    content: '',
    img: ''
  });

  const defaultSambutanKades = {
    judul: 'Sambutan Kepala Desa Kedungsari',
    nama: 'NAMA KEPALA DESA',
    jabatan: 'Kepala Desa Kedungsari',
    content: 'Selamat datang di Website Digital Branding Desa Kedungsari. Website ini dibangun untuk memperluas jangkauan informasi, mempublikasikan potensi keasrian alam hortikultura, kebudayaan, serta produk unggulan UMKM warga Desa Kedungsari kepada masyarakat luas.',
    img: '/images/img2.jpg'
  };

  const activeKades = (sambutanKades && typeof sambutanKades === 'object' && (sambutanKades.content || sambutanKades.nama))
    ? sambutanKades
    : defaultSambutanKades;

  const handleOpenEditKades = () => {
    setKadesForm({
      judul: activeKades.judul || defaultSambutanKades.judul,
      nama: activeKades.nama || defaultSambutanKades.nama,
      jabatan: activeKades.jabatan || defaultSambutanKades.jabatan,
      content: activeKades.content || defaultSambutanKades.content,
      img: activeKades.img || defaultSambutanKades.img
    });
    setIsKadesModalOpen(true);
  };

  const handleKadesImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploadingKadesImg(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setKadesForm((prev) => ({ ...prev, img: reader.result }));
        setIsUploadingKadesImg(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKadesSubmit = async (e) => {
    e.preventDefault();
    await updateSambutanKades(kadesForm);
    setIsKadesModalOpen(false);
  };

  const defaultVisi = "Terwujudnya Desa Kedungsari yang Makmur, Sejahtera, Sehat Lingkungan (ODF), Berbudaya, serta Berdaya Saing Tinggi Berbasis Sektor Pertanian & Peternakan Unggulan.";
  const defaultMisi = [
    "Meningkatkan transparansi dan tata kelola pemerintah desa berbasis teknologi informasi.",
    "Mengembangkan produktivitas komoditas hortikultura dan peternakan itik petelur terpadu.",
    "Melestarikan kearifan lokal kebudayaan adat dan semangat gotong royong warga.",
    "Mempertahankan status Desa Sehat ODF dan meningkatkan kualitas lingkungan hidup."
  ];

  const activeVisi = (visiMisi && typeof visiMisi === 'object' && visiMisi.visi) ? visiMisi.visi : defaultVisi;
  const activeMisi = (visiMisi && typeof visiMisi === 'object' && Array.isArray(visiMisi.misi)) ? visiMisi.misi : defaultMisi;

  const handleOpenEditVm = () => {
    setVmForm({
      visi: activeVisi,
      misiText: activeMisi.join('\n')
    });
    setIsVmModalOpen(true);
  };

  const handleVmSubmit = async (e) => {
    e.preventDefault();
    const misiArray = vmForm.misiText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    await updateVisiMisi({
      visi: vmForm.visi,
      misi: misiArray
    });
    setIsVmModalOpen(false);
  };

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
        bgImage="/images/mm.jpg"
        badge="Profil Desa"
      />

      {/* Section 1: Asal Usul Nama & Geografi */}
      <section className="landmark-section">
        <div className="container">
          <div className="landmark-grid fade-up-element">
            {/* Single Image di sebelah kiri */}
            <div className="history-image-card">
              <img src="/images/img2.jpg" alt="Asal Usul & Geografi Desa Kedungsari" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

      {/* Section 2: Sambutan Kepala Desa Kedungsari */}
      <section className="history-section" style={{ background: '#f8fafc', padding: '60px 0' }}>
        <div className="container">
          <div
            className="fade-up-element"
            style={{
              background: 'white',
              borderRadius: '24px',
              padding: '40px 36px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              flexWrap: 'wrap',
              position: 'relative'
            }}
          >
            {isAdminLoggedIn && (
              <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10 }}>
                <button
                  onClick={handleOpenEditKades}
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '8px 20px',
                    borderRadius: '99px',
                    fontWeight: '700',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(13, 92, 58, 0.25)',
                    border: 'none'
                  }}
                >
                  <Edit2 size={15} /> Edit Sambutan Kepala Desa
                </button>
              </div>
            )}

            {/* Sisi Kiri: Foto Profil Lingkaran (Circular Avatar) */}
            <div style={{ flex: '0 0 auto', margin: '0 auto', textAlign: 'center' }}>
              <div
                style={{
                  width: '210px',
                  height: '210px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '5px solid #ffffff',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
                  background: '#f1f5f9',
                  margin: '0 auto'
                }}
              >
                <img
                  src={activeKades.img || '/images/img2.jpg'}
                  alt={activeKades.nama || 'Kepala Desa'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Sisi Kanan: Judul, Nama, Jabatan & Isi Sambutan */}
            <div style={{ flex: '1 1 400px' }}>
              <h2 style={{ fontSize: '2.1rem', color: 'var(--primary)', fontWeight: '800', marginBottom: '8px', lineHeight: '1.2' }}>
                {activeKades.judul || 'Sambutan Kepala Desa Kedungsari'}
              </h2>
              <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {activeKades.nama || 'NAMA KEPALA DESA'}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '20px' }}>
                {activeKades.jabatan || 'KEPALA DESA KEDUNGSARI'}
              </div>

              <div
                style={{
                  borderLeft: '4px solid var(--accent)',
                  paddingLeft: '20px',
                  marginTop: '12px'
                }}
              >
                <p style={{ color: '#334155', lineHeight: '1.8', fontSize: '0.98rem', margin: 0, whiteSpace: 'pre-line' }}>
                  {activeKades.content || defaultSambutanKades.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Visi & Misi Desa */}
      <section className="section-padding" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="fade-up-element" style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 40px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Arah Pembangunan</span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '8px' }}>Visi & Misi Desa Kedungsari</h2>
            <p style={{ color: '#64748b' }}>Komitmen bersama mewujudkan desa yang makmur, agraris, berbudaya, sehat, dan berbasis pelayanan digital.</p>

            {isAdminLoggedIn && (
              <div style={{ marginTop: '16px' }}>
                <button
                  onClick={handleOpenEditVm}
                  style={{
                    background: 'var(--primary)',
                    color: 'white',
                    padding: '10px 24px',
                    borderRadius: '99px',
                    fontWeight: '700',
                    fontSize: '0.88rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(13, 92, 58, 0.25)',
                    border: 'none'
                  }}
                >
                  <Edit2 size={16} /> Edit Visi & Misi Desa
                </button>
              </div>
            )}
          </div>

          <div className="visi-misi-grid fade-up-element">
            <div className="card-visi-misi" style={{ borderTop: '4px solid var(--primary)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Target size={28} color="var(--primary)" />
                  Visi Desa Kedungsari
                </h3>
                {isAdminLoggedIn && (
                  <button
                    onClick={handleOpenEditVm}
                    style={{
                      background: 'rgba(13, 92, 58, 0.1)',
                      color: 'var(--primary)',
                      border: '1px solid var(--primary)',
                      padding: '6px 14px',
                      borderRadius: '99px',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Edit2 size={14} /> Edit Visi &amp; Misi
                  </button>
                )}
              </div>
              <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: '#334155', lineHeight: '1.7' }}>
                "{activeVisi}"
              </p>
            </div>

            <div className="card-visi-misi" style={{ borderTop: '4px solid var(--accent)', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Award size={28} color="var(--accent)" />
                  Misi Utama Pembangunan
                </h3>
                {isAdminLoggedIn && (
                  <button
                    onClick={handleOpenEditVm}
                    style={{
                      background: '#fef3c7',
                      color: '#b45309',
                      border: '1px solid #f59e0b',
                      padding: '6px 14px',
                      borderRadius: '99px',
                      fontWeight: '700',
                      fontSize: '0.8rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <Edit2 size={14} /> Edit Visi &amp; Misi
                  </button>
                )}
              </div>
              <ul className="misi-list">
                {activeMisi.map((misiItem, idx) => (
                  <li key={idx}>
                    <span className="misi-num">{idx + 1}</span>
                    <span>{misiItem}</span>
                  </li>
                ))}
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
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Jabatan Perangkat Desa</label>
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

      {/* Admin Form Modal for Visi & Misi Edit */}
      {isVmModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsVmModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '600px' }}>
            <button className="modal-close" onClick={() => setIsVmModalOpen(false)}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '20px' }}>
              ✏️ Edit Visi & Misi Desa Kedungsari
            </h3>

            <form onSubmit={handleVmSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>
                  Visi Desa Kedungsari
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Tuliskan Visi Desa..."
                  value={vmForm.visi}
                  onChange={(e) => setVmForm({ ...vmForm, visi: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}
                ></textarea>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>
                  Poin-poin Misi Pembangunan (1 Kalimat Per Baris)
                </label>
                <textarea
                  rows="6"
                  required
                  placeholder="Tuliskan setiap poin misi dalam baris baru..."
                  value={vmForm.misiText}
                  onChange={(e) => setVmForm({ ...vmForm, misiText: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}
                ></textarea>
                <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  💡 Petunjuk: Tekan Enter untuk menambah poin nomor 1, 2, 3, dst.
                </span>
              </div>

              <button
                type="submit"
                style={{ background: 'var(--primary)', color: 'white', padding: '14px', borderRadius: '99px', fontWeight: '700', fontSize: '1rem', marginTop: '8px', cursor: 'pointer' }}
              >
                Simpan Perubahan Visi & Misi
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Form Modal for Sambutan Kepala Desa Edit */}
      {isKadesModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsKadesModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto' }}>
            <button className="modal-close" onClick={() => setIsKadesModalOpen(false)}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '20px' }}>
              ✏️ Edit Sambutan Kepala Desa
            </h3>

            <form onSubmit={handleKadesSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>
                  Judul Sambutan
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Sambutan Kepala Desa Kedungsari"
                  value={kadesForm.judul}
                  onChange={(e) => setKadesForm({ ...kadesForm, judul: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>
                    Nama Kepala Desa
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: NAMA KEPALA DESA"
                    value={kadesForm.nama}
                    onChange={(e) => setKadesForm({ ...kadesForm, nama: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>
                    Jabatan / Subtitle
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: KEPALA DESA KEDUNGSARI"
                    value={kadesForm.jabatan}
                    onChange={(e) => setKadesForm({ ...kadesForm, jabatan: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>
                  Foto Profil Kepala Desa
                </label>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', overflow: 'hidden', border: '2px solid #e2e8f0', background: '#f1f5f9', flexShrink: 0 }}>
                    {kadesForm.img ? (
                      <img src={kadesForm.img} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8', fontSize: '0.75rem' }}>No Foto</div>
                    )}
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleKadesImageUpload}
                      style={{ fontSize: '0.88rem', marginBottom: '6px', width: '100%' }}
                    />
                    <input
                      type="text"
                      placeholder="Atau masukkan URL Foto (http://...)"
                      value={kadesForm.img.startsWith('data:') ? '' : kadesForm.img}
                      onChange={(e) => setKadesForm({ ...kadesForm, img: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
                {isUploadingKadesImg && <span style={{ fontSize: '0.78rem', color: 'var(--primary)', marginTop: '4px', display: 'block' }}>⏳ Mengunggah foto...</span>}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>
                  Isi Narasi Sambutan
                </label>
                <textarea
                  rows="6"
                  required
                  placeholder="Tuliskan isi paragraf sambutan..."
                  value={kadesForm.content}
                  onChange={(e) => setKadesForm({ ...kadesForm, content: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.95rem', lineHeight: '1.6' }}
                ></textarea>
              </div>

              <button
                type="submit"
                style={{ background: 'var(--primary)', color: 'white', padding: '14px', borderRadius: '99px', fontWeight: '700', fontSize: '1rem', marginTop: '8px', cursor: 'pointer', border: 'none' }}
              >
                Simpan Perubahan Sambutan
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
