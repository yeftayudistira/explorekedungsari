import React from 'react';
import Hero from './Hero';
import { MapPin, Users, Home, Phone, Shield } from 'lucide-react';

export default function DukuhWilayah() {
  const dusunList = [
    {
      nama: 'Dusun Paingan',
      kepala: 'Kepala Dusun Paingan',
      kontak: '(0293) 364712',
      rt: 'RT 05 / RW 04',
      penduduk: 'Pusat Balai Desa',
      desc: 'Pusat pelayanan administrasi Kantor Desa Kedungsari, fasilitas umum, dan kawasan permukiman terpadu.',
      img: '/images/galeri_kkn_balai_desa.jpg'
    },
    {
      nama: 'Dusun Karangrejo',
      kepala: 'Kepala Dusun Karangrejo',
      kontak: 'Hubungi Kantor Desa',
      rt: 'Wilayah RW 01',
      penduduk: 'Sentra Pertanian',
      desc: 'Kawasan persawahan hortikultura penghasil cabai rawit, terong, ketimun, dan pepaya semusim.',
      img: '/images/galeri_jalan_tani_sumbing.jpg'
    },
    {
      nama: 'Dusun Wonosaran',
      kepala: 'Kepala Dusun Wonosaran',
      kontak: 'Hubungi Kantor Desa',
      rt: 'Wilayah RW 02',
      penduduk: 'Sentra Peternakan',
      desc: 'Lokasi utama peternakan itik petelur dengan sistem umbaran alami di lahan persawahan desa.',
      img: '/images/galeri_persawahan_sunset.jpg'
    },
    {
      nama: 'Dusun Kedungan & Pranan',
      kepala: 'Kepala Dusun Kedungan-Pranan',
      kontak: 'Hubungi Kantor Desa',
      rt: 'Dusun Gabungan',
      penduduk: 'Pemukiman & Kerajinan',
      desc: 'Wilayah dusun gabungan bersejarah dengan potensi industri rumah tangga dan pengrajin lokal.',
      img: '/images/galeri_koperasi_merah_putih.jpg'
    },
    {
      nama: 'Dusun Kwangsan',
      kepala: 'Kepala Dusun Kwangsan',
      kontak: 'Hubungi Kantor Desa',
      rt: 'Wilayah RW 03',
      penduduk: 'Sentra Perdagangan',
      desc: 'Kawasan permukiman warga berbasis usaha perdagangan keliling, montir, dan jasa lokal.',
      img: '/images/galeri_aktivitas_warga.jpg'
    }
  ];

  return (
    <main className="dukuh-page">
      <Hero
        title="Dusun & Pembagian Wilayah Desa"
        subtitle="Mengenal 5 Dusun wilayah administrasi Desa Kedungsari, Kecamatan Bandongan, Kabupaten Magelang."
        bgImage="/images/galeri_jalan_tani_sumbing.jpg"
        badge="Administrasi Wilayah"
      />

      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Wilayah Administrasi</span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '8px' }}>Peta Pembagian 5 Dusun Kedungsari</h2>
            <p style={{ color: '#64748b' }}>Dari semula 9 dusun, kini Desa Kedungsari terbagi atas 5 Dusun Utama yang saling bersinergi membangun desa.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
            {dusunList.map((d, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
                <img src={d.img} alt={d.nama} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
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
    </main>
  );
}
