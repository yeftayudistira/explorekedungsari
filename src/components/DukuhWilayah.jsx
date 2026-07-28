import React from 'react';
import Hero from './Hero';
import { MapPin, Users, Home, Phone, Shield } from 'lucide-react';

export default function DukuhWilayah() {
  const dusunList = [
    {
      nama: 'Dusun Kedung I (Pusat Desa)',
      kepala: 'Bpk. Suparno',
      kontak: '0812-3456-7891',
      rt: '6 RT / 2 RW',
      penduduk: '1,240 Jiwa',
      desc: 'Pusat pemerintahan balai desa, Waduk Utama Kedungsari, serta sentra pertokoan warga.',
      img: '/images/hero.jpg'
    },
    {
      nama: 'Dusun Kedung II (Sari Makmur)',
      kepala: 'Bpk. Slamet Riyadi',
      kontak: '0812-3456-7892',
      rt: '6 RT / 1 RW',
      penduduk: '1,150 Jiwa',
      desc: 'Wilayah persawahan subur, sentra beras organik, dan peternakan sapi terpadu.',
      img: '/images/history.jpg'
    },
    {
      nama: 'Dusun Sari Timur',
      kepala: 'Bpk. Hendra Wijaya',
      kontak: '0812-3456-7893',
      rt: '6 RT / 1 RW',
      penduduk: '1,080 Jiwa',
      desc: 'Wilayah kerajinan ukir kayu, UMKM olahan makanan tradisional, dan sekolah dasar.',
      img: '/images/landmark1.jpg'
    },
    {
      nama: 'Dusun Sari Barat',
      kepala: 'Bpk. Agus Setiawan',
      kontak: '0812-3456-7894',
      rt: '6 RT / 2 RW',
      penduduk: '1,058 Jiwa',
      desc: 'Kawasan bukit panorama, destinasi wisata alam tempat spot foto sunrise.',
      img: '/images/landmark2.jpg'
    }
  ];

  return (
    <main className="dukuh-page">
      <Hero
        title="Dukuh & Pembagian Wilayah Desa"
        subtitle="Mengenal 4 Dusun wilayah administrasi Desa Kedungsari lengkap dengan kontak Kepala Dusun."
        bgImage="/images/landmark2.jpg"
        badge="Administrasi Wilayah"
      />

      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Wilayah Wilayah</span>
            <h2 style={{ fontSize: '2.4rem', marginTop: '8px' }}>Peta Pembagian Dusun / Dukuh</h2>
            <p style={{ color: '#64748b' }}>Desa Kedungsari terbagi atas 4 Dusun utama yang saling bersinergi membangun desa.</p>
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
