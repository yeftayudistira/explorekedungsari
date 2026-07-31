import React, { useState } from 'react';
import Hero from './Hero';
import { Mail, Phone, MapPin, Clock, Edit2, X, Compass, Navigation, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';

export default function KontakLayanan() {
  const { contactInfo, updateContactInfo, isAdminLoggedIn } = useData();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [form, setForm] = useState({
    alamat: contactInfo.alamat,
    jamKerja: contactInfo.jamKerja,
    telepon: contactInfo.telepon,
    email: contactInfo.email
  });

  const handleOpenEdit = () => {
    setForm({
      alamat: contactInfo.alamat,
      jamKerja: contactInfo.jamKerja,
      telepon: contactInfo.telepon,
      email: contactInfo.email
    });
    setIsEditOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateContactInfo(form);
    setIsEditOpen(false);
  };

  return (
    <main className="kontak-page">
      <Hero
        title="Kontak & Lokasi Desa Kedungsari"
        subtitle="Alamat resmi, peta lokasi balai desa, jam kunjungan, dan kontak pengelola Desa Kedungsari."
        bgImage="/images/galeri_kkn_balai_desa.jpg"
        badge="Informasi Kontak & Lokasi"
      />

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={{ color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.85rem' }}>Hubungi Kami</span>
              <h2 style={{ fontSize: '2.4rem', marginTop: '4px' }}>Lokasi Balai Desa & Kontak Resmi</h2>
              <p style={{ color: '#64748b' }}>Kami menyambut hangat kedatangan para wisatawan dan tamu di Desa Kedungsari.</p>
            </div>

            {isAdminLoggedIn && (
              <button
                onClick={handleOpenEdit}
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
                <Edit2 size={18} /> Edit Informasi Kontak
              </button>
            )}
          </div>

          {/* Contact Details Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '60px' }}>
            <div style={{ background: 'white', padding: '32px 28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MapPin size={26} />
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '10px' }}>Alamat Balai Desa</h4>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7' }}>
                {contactInfo.alamat}
              </p>
            </div>

            <div style={{ background: 'white', padding: '32px 28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Clock size={26} />
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '10px' }}>Jam Kunjungan Balai Desa</h4>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7' }}>
                {contactInfo.jamKerja}
              </p>
            </div>

            <div style={{ background: 'white', padding: '32px 28px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Phone size={26} />
              </div>
              <h4 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '10px' }}>Kontak Resmi & Email</h4>
              <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.7' }}>
                <strong>WhatsApp Hotline:</strong> {contactInfo.telepon}<br />
                <strong>Email:</strong> {contactInfo.email}
              </p>
            </div>
          </div>

          {/* Interactive Map Showcase */}
          <div style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Navigation size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#0f172a' }}>Peta Panduan Akses Lokasi Desa</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Lokasi strategis Desa Kedungsari berjarak 15 menit dari pusat kota.</p>
              </div>
            </div>

            <div style={{ borderRadius: '16px', overflow: 'hidden', height: '380px', background: '#e2e8f0', position: 'relative' }}>
              <iframe
                title="Peta Lokasi Desa Kedungsari"
                src="https://maps.google.com/maps?q=Indonesia&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Contact Modal */}
      {isEditOpen && (
        <div className="modal-backdrop" onClick={() => setIsEditOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ padding: '32px', maxWidth: '550px' }}>
            <button className="modal-close" onClick={() => setIsEditOpen(false)}>
              <X size={20} />
            </button>
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '20px' }}>
              ✏️ Edit Informasi Kontak Desa
            </h3>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Alamat Balai Desa</label>
                <textarea
                  rows="3"
                  required
                  value={form.alamat}
                  onChange={(e) => setForm({ ...form, alamat: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                ></textarea>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Jam Kunjungan / Operasional</label>
                <input
                  type="text"
                  required
                  value={form.jamKerja}
                  onChange={(e) => setForm({ ...form, jamKerja: e.target.value })}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>No. WhatsApp Hotline</label>
                  <input
                    type="text"
                    required
                    value={form.telepon}
                    onChange={(e) => setForm({ ...form, telepon: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: '700', marginBottom: '6px' }}>Email Resmi Desa</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{ background: 'var(--primary)', color: 'white', padding: '14px', borderRadius: '99px', fontWeight: '700', marginTop: '10px' }}
              >
                Simpan Perubahan Kontak
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
