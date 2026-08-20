import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DataContext = createContext();

const initialNews = [
  {
    id: 1,
    title: 'Desa Kedungsari Resmi Raih Predikat Bebas ODF (Open Defecation Free)',
    date: '24 Juli 2026',
    author: 'Pemerintah Desa',
    category: 'Kesehatan & Lingkungan',
    img: '/images/galeri_kkn_balai_desa.jpg',
    excerpt: 'Desa Kedungsari bersama Gandusari dan Sidorejo berhasil dinyatakan bebas dari praktik buang air besar sembarangan demi kesehatan masyarakat.',
    content: `Melalui kesadaran tinggi masyarakat dan dukungan program Sanitasi Total Berbasis Masyarakat (STBM), Desa Kedungsari, Kecamatan Bandongan secara resmi meraih predikat Open Defecation Free (ODF). Hal ini membuktikan komitmen warga Kedungsari dalam menciptakan lingkungan hidup yang bersih dan sehat.`
  },
  {
    id: 2,
    title: 'Pengembangan Usaha Peternakan Itik Petelur Sistem Umbaran di Kedungsari',
    date: '20 Juli 2026',
    author: 'Kelompok Tani-Ternak',
    category: 'Ekonomi Lokal',
    img: '/images/galeri_persawahan_sunset.jpg',
    excerpt: 'Peternak itik Desa Kedungsari mengoptimalkan sistem umbaran di lahan persawahan dengan produktivitas mencapai 22 butir per ekor per bulan.',
    content: `Sektor peternakan itik petelur di Desa Kedungsari berkembang pesat dengan memanfaatkan sistem umbaran tradisional. Lahan persawahan pasca panen menjadi sarana penggembala alami yang menghasilkan telur itik berkualitas tinggi dan mendukung pendapatan keluarga tani.`
  },
  {
    id: 3,
    title: 'Melestarikan Tradisi Budaya Tedhak Siten dan Makna Jadah 7 Warna',
    date: '16 Juli 2026',
    author: 'Tokoh Adat & Kebudayaan',
    category: 'Kebudayaan',
    img: '/images/galeri_aktivitas_warga.jpg',
    excerpt: 'Warga Kedungsari secara turun-temurun menjaga tradisi Tedhak Siten sebagai wujud syukur dan doa keselamatan bagi anak yang mulai menginjak tanah.',
    content: `Tradisi Tedhak Siten di Desa Kedungsari tetap lestari hingga kini. Ritual penginjakan tanah pertama bagi bayi ini dimeriahkan dengan sajian Jadah 7 Warna (Hitam, Ungu, Merah, Biru, Kuning, Hijau, Putih) yang masing-masing melambangkan nilai kecerdasan, ketenangan, keberanian, hingga kesucian.`
  },
  {
    id: 4,
    title: 'Panen Raya Hortikultura: Cabai dan Sayuran Semusim Kedungsari',
    date: '10 Juli 2026',
    author: 'Kasi Pelayanan',
    category: 'Pertanian',
    img: '/images/galeri_jalan_tani_sumbing.jpg',
    excerpt: 'Petani Kedungsari menikmati hasil panen cabai rawit, ketimun, dan terong melimpah yang dipasarkan hingga ke Kota Magelang.',
    content: `Sebagai desa agraris di Kecamatan Bandongan, komoditas sayuran semusim seperti cabai merah, cabai rawit, ketimun, dan terong di Desa Kedungsari melimpah. Hasil pertanian ini menjadi pilar utama perekonomian warga.`
  }
];

const initialSotk = [
  { id: 1, nama: 'Pemerintah Desa Kedungsari', jabatan: 'Kepala Desa Kedungsari', role: 'Pimpinan Pemerintah Desa (Kantor: Dusun Paingan)' },
  { id: 2, nama: 'Sekretariat Desa', jabatan: 'Sekretaris Desa Kedungsari', role: 'Administrator & Pelayanan Publik' },
  { id: 3, nama: 'Kaur Keuangan & Perencanaan', jabatan: 'Kepala Urusan Keuangan', role: 'Pengelolaan APBDES & Aset Desa' },
  { id: 4, nama: 'Kasi Pemerintahan & Pembangunan', jabatan: 'Kepala Seksi Pemerintahan', role: 'Administrasi Wilayah & Infrastruktur' },
  { id: 5, nama: 'Kasi Kesejahteraan & Pelayanan', jabatan: 'Kepala Seksi Kesejahteraan', role: 'Pemberdayaan Masyarakat & Sosial' }
];

const initialUmkm = [
  {
    id: 1,
    nama: 'Peternakan Itik Petelur Sistem Umbaran',
    category: 'Peternakan',
    pemilik: 'Kelompok Peternak Itik Kedungsari',
    dusun: 'Dusun Wonosaran',
    hargaInfo: 'Produksi 22 butir/ekor/bulan (32 Ekor/Peternak)',
    kontakWa: '0812-3456-7891',
    img: '/images/galeri_persawahan_sunset.jpg',
    excerpt: 'Budidaya itik petelur unggulan dengan metode umbaran alami di lahan persawahan pasca panen.',
    content: `Peternakan itik petelur di Desa Kedungsari menggunakan sistem penggembalaan umbaran alami di persawahan. Rata-rata peternak mengelola 32 ekor itik dengan rata-rata hasil produksi 22 butir telur/ekor/bulan. Usaha ini terbukti sangat menguntungkan (R/C ratio 1.58) dan menjadi penopang ekonomi warga Dusun Wonosaran.`
  },
  {
    id: 2,
    nama: 'Hasil Tani Hortikultura (Cabai & Sayuran)',
    category: 'Pertanian',
    pemilik: 'Gapoktan Kedungsari',
    dusun: 'Dusun Karangrejo',
    hargaInfo: 'Komoditas Cabai Rawit, Terong & Pepaya',
    kontakWa: '0812-3456-7892',
    img: '/images/galeri_jalan_tani_sumbing.jpg',
    excerpt: 'Komoditas tanaman sayuran semusim berkualitas tinggi dari lahan agraris subur Kedungsari.',
    content: `Sebagian besar penduduk Desa Kedungsari bekerja sebagai petani hortikultura. Hasil bumi utama meliputi cabai merah, cabai rawit, ketimun, terong, dan pepaya semusim yang dipasarkan secara luas ke pasar-pasar lokal hingga Kota Magelang.`
  },
  {
    id: 3,
    nama: 'Jadah 7 Warna Kuliner Adat Tedhak Siten',
    category: 'Kuliner Tradisional',
    pemilik: 'Ibu-Ibu Pengrajin Kuliner Paingan',
    dusun: 'Dusun Paingan',
    hargaInfo: 'Sajian Adat 7 Warna Makna Simbolis',
    kontakWa: '0812-3456-7893',
    img: '/images/galeri_aktivitas_warga.jpg',
    excerpt: 'Kuliner kearifan lokal berbahan beras ketan dengan 7 variasi warna bermakna doa dan filosofi kehidupan.',
    content: `Sajian Jadah 7 Warna merupakan bagian penting dari upacara adat Tedhak Siten di Desa Kedungsari. Tujuh warna jadah melambangkan nilai filosofis: Hitam (kecerdasan), Ungu (ketenangan), Merah (keberanian), Biru (kesetiaan), Kuning (kemakmuran), Hijau (kesuburan), dan Putih (kesucian).`
  },
  {
    id: 4,
    nama: 'Kerajinan Olahan Industri Rumah Tangga & Koperasi',
    category: 'Kerajinan Tangan',
    pemilik: 'Kreatif Usaha Warga Kedungsari',
    dusun: 'Dusun Kedungan & Pranan',
    hargaInfo: 'Mulai Rp 20.000 / produk',
    kontakWa: '0812-3456-7894',
    img: '/images/galeri_koperasi_merah_putih.jpg',
    excerpt: 'Berbagai produk kerajinan tangan dan industri olahan rumah tangga buatan pengrajin lokal.',
    content: `Industri rumah tangga di Dusun Kedungan & Pranan memproduksi aneka kerajinan olahan tangan dan barang seni perdesaan. Produk kerajinan ini menjadi bukti kemandirian dan kreativitas wirausaha masyarakat Kedungsari.`
  }
];

const initialGaleri = [
  {
    id: 1,
    title: 'Pesona Gunung Sumbing & Akses Jalan Tani Kedungsari',
    cat: 'Pertanian & Alam',
    img: '/images/galeri_jalan_tani_sumbing.jpg',
    desc: 'Pemandangan lanskap persawahan hortikultura Desa Kedungsari di sore hari dengan kemegahan latar Gunung Sumbing yang membingkai langit senja.'
  },
  {
    id: 2,
    title: 'Gedung Koperasi Merah Putih Desa Kedungsari',
    cat: 'Pemerintahan',
    img: '/images/galeri_koperasi_merah_putih.jpg',
    desc: 'Bangunan fasilitas Koperasi Merah Putih Desa Kedungsari sebagai wadah pemberdayaan ekonomi dan sarana koperatif usaha warga.'
  },
  {
    id: 3,
    title: 'Lahan Hortikultura & Sunset Persawahan Kedungsari',
    cat: 'Pertanian & Alam',
    img: '/images/galeri_persawahan_sunset.jpg',
    desc: 'Hamparan terasering tanaman hortikultura (cabai & terong) bermulsa plastik yang membentang indah dengan latar senja perbukitan Magelang.'
  },
  {
    id: 4,
    title: 'Kegiatan Mahasiswa KKN di Kantor Sekretariat PPS Balai Desa',
    cat: 'Kegiatan Warga',
    img: '/images/galeri_kkn_balai_desa.jpg',
    desc: 'Dokumentasi kebersamaan dan keceriaan Mahasiswa KKN saat mengabdi serta menjalankan program kerja di Sekretariat PPS Balai Desa Kedungsari.'
  },
  {
    id: 5,
    title: 'Kebersamaan Warga & Pedagang Keliling Desa',
    cat: 'Ekonomi Warga',
    img: '/images/galeri_aktivitas_warga.jpg',
    desc: 'Suasana kehangatan aktivitas sosial warga, anak-anak sekolah, mahasiswa KKN, dan pedagang keliling di bawah pepohonan rindang Kedungsari.'
  }
];

const initialContact = {
  alamat: 'Dusun Paingan RT 05 RW 04, Desa Kedungsari, Kec. Bandongan, Kab. Magelang 56151',
  jamKerja: 'Senin - Kamis: 08.00 - 15.00 WIB | Jumat: 08.00 - 11.00 WIB',
  telepon: '(0293) 364712',
  email: 'kedungsaribandongan@gmail.com'
};

export function DataProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('kedungsari_admin') === 'true';
  });

  const [newsList, setNewsList] = useState([]);
  const [sotkList, setSotkList] = useState([]);
  const [umkmList, setUmkmList] = useState([]);
  const [galeriList, setGaleriList] = useState([]);
  const [contactInfo, setContactInfo] = useState(initialContact);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch Data from Supabase with Auto Seed if empty
  useEffect(() => {
    async function loadSupabaseData() {
      setIsLoadingData(true);

      if (!isSupabaseConfigured() || !supabase) {
        // Fallback to local storage or initial constants if Supabase is not configured
        const savedNews = localStorage.getItem('kedungsari_news');
        setNewsList(savedNews ? JSON.parse(savedNews) : initialNews);

        const savedSotk = localStorage.getItem('kedungsari_sotk');
        setSotkList(savedSotk ? JSON.parse(savedSotk) : initialSotk);

        const savedUmkm = localStorage.getItem('kedungsari_umkm');
        setUmkmList(savedUmkm ? JSON.parse(savedUmkm) : initialUmkm);

        const savedGaleri = localStorage.getItem('kedungsari_galeri');
        setGaleriList(savedGaleri ? JSON.parse(savedGaleri) : initialGaleri);

        const savedContact = localStorage.getItem('kedungsari_contact');
        setContactInfo(savedContact ? JSON.parse(savedContact) : initialContact);

        setIsLoadingData(false);
        return;
      }

      try {
        // 1. Load News
        const { data: newsData, error: newsErr } = await supabase
          .from('news')
          .select('*')
          .order('id', { ascending: false });

        if (newsErr) {
          console.error('Supabase News Fetch Error:', newsErr);
        } else if (newsData && newsData.length > 0) {
          setNewsList(newsData);
        } else {
          // Auto Seed Initial News to Supabase
          const seedPayload = initialNews.map(({ id, ...rest }) => rest);
          const { data: seeded, error: seedErr } = await supabase.from('news').insert(seedPayload).select();
          if (!seedErr && seeded) {
            setNewsList(seeded);
          } else {
            setNewsList(initialNews);
          }
        }

        // 2. Load SOTK
        const { data: sotkData, error: sotkErr } = await supabase
          .from('sotk')
          .select('*')
          .order('id', { ascending: true });

        if (sotkErr) {
          console.error('Supabase SOTK Fetch Error:', sotkErr);
        } else if (sotkData && sotkData.length > 0) {
          setSotkList(sotkData);
        } else {
          // Auto Seed SOTK
          const seedPayload = initialSotk.map(({ id, ...rest }) => rest);
          const { data: seeded } = await supabase.from('sotk').insert(seedPayload).select();
          setSotkList(seeded && seeded.length > 0 ? seeded : initialSotk);
        }

        // 3. Load UMKM
        const { data: umkmData, error: umkmErr } = await supabase
          .from('umkm')
          .select('*')
          .order('id', { ascending: false });

        if (umkmErr) {
          console.error('Supabase UMKM Fetch Error:', umkmErr);
        } else if (umkmData && umkmData.length > 0) {
          const mappedUmkm = umkmData.map(u => ({
            id: u.id,
            nama: u.nama,
            category: u.category,
            pemilik: u.pemilik,
            dusun: u.dusun,
            hargaInfo: u.harga_info || u.hargaInfo,
            kontakWa: u.kontak_wa || u.kontakWa,
            img: u.img,
            excerpt: u.excerpt,
            content: u.content
          }));
          setUmkmList(mappedUmkm);
        } else {
          // Auto Seed UMKM
          const seedPayload = initialUmkm.map(({ id, hargaInfo, kontakWa, ...rest }) => ({
            ...rest,
            harga_info: hargaInfo,
            kontak_wa: kontakWa
          }));
          const { data: seeded } = await supabase.from('umkm').insert(seedPayload).select();
          if (seeded && seeded.length > 0) {
            setUmkmList(seeded.map(u => ({
              id: u.id,
              nama: u.nama,
              category: u.category,
              pemilik: u.pemilik,
              dusun: u.dusun,
              hargaInfo: u.harga_info || u.hargaInfo,
              kontakWa: u.kontak_wa || u.kontakWa,
              img: u.img,
              excerpt: u.excerpt,
              content: u.content
            })));
          } else {
            setUmkmList(initialUmkm);
          }
        }

        // 4. Load Galeri
        const { data: galeriData, error: galeriErr } = await supabase
          .from('galeri')
          .select('*')
          .order('id', { ascending: false });

        if (galeriErr) {
          console.error('Supabase Galeri Fetch Error:', galeriErr);
        } else if (galeriData && galeriData.length > 0) {
          setGaleriList(galeriData);
        } else {
          // Auto Seed Galeri
          const seedPayload = initialGaleri.map(({ id, ...rest }) => rest);
          const { data: seeded } = await supabase.from('galeri').insert(seedPayload).select();
          setGaleriList(seeded && seeded.length > 0 ? seeded : initialGaleri);
        }

        // 5. Load Contact Info
        const { data: contactData, error: contactErr } = await supabase
          .from('contact_info')
          .select('*')
          .eq('id', 1)
          .single();

        if (contactData) {
          setContactInfo({
            alamat: contactData.alamat,
            jamKerja: contactData.jam_kerja || contactData.jamKerja,
            telepon: contactData.telepon,
            email: contactData.email
          });
        } else {
          await supabase.from('contact_info').upsert({
            id: 1,
            alamat: initialContact.alamat,
            jam_kerja: initialContact.jamKerja,
            telepon: initialContact.telepon,
            email: initialContact.email
          });
        }
      } catch (err) {
        console.error('Error syncing with Supabase:', err);
      } finally {
        setIsLoadingData(false);
      }
    }

    loadSupabaseData();
  }, []);

  // Persist Admin State
  useEffect(() => {
    localStorage.setItem('kedungsari_admin', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Auth Functions
  const loginAdmin = (username, password) => {
    if (username === 'admin' && password === 'kedungsari2026') {
      setIsAdminLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: 'Username atau Password Admin salah!' };
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  // News CRUD
  const addNews = async (item) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('news')
        .insert([{
          title: item.title,
          date: item.date,
          author: item.author,
          category: item.category,
          img: item.img,
          excerpt: item.excerpt,
          content: item.content
        }])
        .select();

      if (error) {
        console.error('Supabase Add News Error:', error);
        alert('Gagal menyimpan ke Supabase: ' + error.message);
      } else if (data && data.length > 0) {
        setNewsList(prev => [data[0], ...prev]);
        return;
      }
    }

    // Local Fallback
    const newItem = { ...item, id: Date.now() };
    setNewsList(prev => [newItem, ...prev]);
  };

  const updateNews = async (id, updatedFields) => {
    setNewsList(prev => prev.map((n) => (n.id === id ? { ...n, ...updatedFields } : n)));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('news').update(updatedFields).eq('id', id);
      if (error) console.error('Supabase Update News Error:', error);
    }
  };

  const deleteNews = async (id) => {
    setNewsList(prev => prev.filter((n) => n.id !== id));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) console.error('Supabase Delete News Error:', error);
    }
  };

  // SOTK CRUD
  const addSotk = async (item) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('sotk')
        .insert([{
          nama: item.nama,
          jabatan: item.jabatan,
          role: item.role
        }])
        .select();

      if (!error && data && data.length > 0) {
        setSotkList(prev => [...prev, data[0]]);
        return;
      }
    }

    const newItem = { ...item, id: Date.now() };
    setSotkList(prev => [...prev, newItem]);
  };

  const updateSotk = async (id, updatedFields) => {
    setSotkList(prev => prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('sotk').update(updatedFields).eq('id', id);
      if (error) console.error('Supabase Update SOTK Error:', error);
    }
  };

  const deleteSotk = async (id) => {
    setSotkList(prev => prev.filter((s) => s.id !== id));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('sotk').delete().eq('id', id);
      if (error) console.error('Supabase Delete SOTK Error:', error);
    }
  };

  // UMKM CRUD
  const addUmkm = async (item) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('umkm')
        .insert([{
          nama: item.nama,
          category: item.category,
          pemilik: item.pemilik,
          dusun: item.dusun,
          harga_info: item.hargaInfo,
          kontak_wa: item.kontakWa,
          img: item.img,
          excerpt: item.excerpt,
          content: item.content
        }])
        .select();

      if (!error && data && data.length > 0) {
        const dbItem = data[0];
        const insertedUmkm = {
          id: dbItem.id,
          nama: dbItem.nama,
          category: dbItem.category,
          pemilik: dbItem.pemilik,
          dusun: dbItem.dusun,
          hargaInfo: dbItem.harga_info || dbItem.hargaInfo,
          kontakWa: dbItem.kontak_wa || dbItem.kontakWa,
          img: dbItem.img,
          excerpt: dbItem.excerpt,
          content: dbItem.content
        };
        setUmkmList(prev => [insertedUmkm, ...prev]);
        return;
      }
    }

    const newItem = { ...item, id: Date.now() };
    setUmkmList(prev => [newItem, ...prev]);
  };

  const updateUmkm = async (id, updatedFields) => {
    setUmkmList(prev => prev.map((u) => (u.id === id ? { ...u, ...updatedFields } : u)));

    if (isSupabaseConfigured() && supabase) {
      const payload = { ...updatedFields };
      if (payload.hargaInfo !== undefined) {
        payload.harga_info = payload.hargaInfo;
        delete payload.hargaInfo;
      }
      if (payload.kontakWa !== undefined) {
        payload.kontak_wa = payload.kontakWa;
        delete payload.kontakWa;
      }
      const { error } = await supabase.from('umkm').update(payload).eq('id', id);
      if (error) console.error('Supabase Update UMKM Error:', error);
    }
  };

  const deleteUmkm = async (id) => {
    setUmkmList(prev => prev.filter((u) => u.id !== id));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('umkm').delete().eq('id', id);
      if (error) console.error('Supabase Delete UMKM Error:', error);
    }
  };

  // Galeri CRUD
  const addGaleri = async (item) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('galeri')
        .insert([{
          title: item.title,
          cat: item.cat,
          img: item.img,
          desc: item.desc
        }])
        .select();

      if (!error && data && data.length > 0) {
        setGaleriList(prev => [data[0], ...prev]);
        return;
      }
    }

    const newItem = { ...item, id: Date.now() };
    setGaleriList(prev => [newItem, ...prev]);
  };

  const updateGaleri = async (id, updatedFields) => {
    setGaleriList(prev => prev.map((g) => (g.id === id ? { ...g, ...updatedFields } : g)));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('galeri').update(updatedFields).eq('id', id);
      if (error) console.error('Supabase Update Galeri Error:', error);
    }
  };

  const deleteGaleri = async (id) => {
    setGaleriList(prev => prev.filter((g) => g.id !== id));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('galeri').delete().eq('id', id);
      if (error) console.error('Supabase Delete Galeri Error:', error);
    }
  };

  // Contact Update
  const updateContactInfo = async (newInfo) => {
    const updated = { ...contactInfo, ...newInfo };
    setContactInfo(updated);

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('contact_info').upsert({
        id: 1,
        alamat: updated.alamat,
        jam_kerja: updated.jamKerja,
        telepon: updated.telepon,
        email: updated.email
      });
      if (error) console.error('Supabase Update Contact Error:', error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        isLoadingData,
        newsList,
        addNews,
        updateNews,
        deleteNews,
        sotkList,
        addSotk,
        updateSotk,
        deleteSotk,
        umkmList,
        addUmkm,
        updateUmkm,
        deleteUmkm,
        galeriList,
        addGaleri,
        updateGaleri,
        deleteGaleri,
        destinasiList: umkmList,
        addDestinasi: addUmkm,
        updateDestinasi: updateUmkm,
        deleteDestinasi: deleteUmkm,
        contactInfo,
        updateContactInfo,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
