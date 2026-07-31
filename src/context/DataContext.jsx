import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const initialNews = [
  {
    id: 1,
    title: 'Desa Kedungsari Resmi Raih Predikat Bebas ODF (Open Defecation Free)',
    date: '24 Juli 2026',
    author: 'Pemerintah Desa',
    category: 'Kesehatan & Lingkungan',
    img: '/images/hero.jpg',
    excerpt: 'Desa Kedungsari bersama Gandusari dan Sidorejo berhasil dinyatakan bebas dari praktik buang air besar sembarangan demi kesehatan masyarakat.',
    content: `Melalui kesadaran tinggi masyarakat dan dukungan program Sanitasi Total Berbasis Masyarakat (STBM), Desa Kedungsari, Kecamatan Bandongan secara resmi meraih predikat Open Defecation Free (ODF). Hal ini membuktikan komitmen warga Kedungsari dalam menciptakan lingkungan hidup yang bersih dan sehat.`
  },
  {
    id: 2,
    title: 'Pengembangan Usaha Peternakan Itik Petelur Sistem Umbaran di Kedungsari',
    date: '20 Juli 2026',
    author: 'Kelompok Tani-Ternak',
    category: 'Ekonomi Lokal',
    img: '/images/landmark1.jpg',
    excerpt: 'Peternak itik Desa Kedungsari mengoptimalkan sistem umbaran di lahan persawahan dengan produktivitas mencapai 22 butir per ekor per bulan.',
    content: `Sektor peternakan itik petelur di Desa Kedungsari berkembang pesat dengan memanfaatkan sistem umbaran tradisional. Lahan persawahan pasca panen menjadi sarana penggembala alami yang menghasilkan telur itik berkualitas tinggi dan mendukung pendapatan keluarga tani.`
  },
  {
    id: 3,
    title: 'Melestarikan Tradisi Budaya Tedhak Siten dan Makna Jadah 7 Warna',
    date: '16 Juli 2026',
    author: 'Tokoh Adat & Kebudayaan',
    category: 'Kebudayaan',
    img: '/images/history.jpg',
    excerpt: 'Warga Kedungsari secara turun-temurun menjaga tradisi Tedhak Siten sebagai wujud syukur dan doa keselamatan bagi anak yang mulai menginjak tanah.',
    content: `Tradisi Tedhak Siten di Desa Kedungsari tetap lestari hingga kini. Ritual penginjakan tanah pertama bagi bayi ini dimeriahkan dengan sajian Jadah 7 Warna (Hitam, Ungu, Merah, Biru, Kuning, Hijau, Putih) yang masing-masing melambangkan nilai kecerdasan, ketenangan, keberanian, hingga kesucian.`
  },
  {
    id: 4,
    title: 'Panen Raya Hortikultura: Cabai dan Sayuran Semusim Kedungsari',
    date: '10 Juli 2026',
    author: 'Kasi Pelayanan',
    category: 'Pertanian',
    img: '/images/landmark2.jpg',
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
    img: '/images/landmark1.jpg',
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
    img: '/images/history.jpg',
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
    img: '/images/landmark2.jpg',
    excerpt: 'Kuliner kearifan lokal berbahan beras ketan dengan 7 variasi warna bermakna doa dan filosofi kehidupan.',
    content: `Sajian Jadah 7 Warna merupakan bagian penting dari upacara adat Tedhak Siten di Desa Kedungsari. Tujuh warna jadah melambangkan nilai filosofis: Hitam (kecerdasan), Ungu (ketenangan), Merah (keberanian), Biru (kesetiaan), Kuning (kemakmuran), Hijau (kesuburan), dan Putih (kesucian).`
  },
  {
    id: 4,
    nama: 'Kerajinan Olahan Industri Rumah Tangga',
    category: 'Kerajinan Tangan',
    pemilik: 'Kreatif Usaha Warga Kedungsari',
    dusun: 'Dusun Kedungan & Pranan',
    hargaInfo: 'Mulai Rp 20.000 / produk',
    kontakWa: '0812-3456-7894',
    img: '/images/hero.jpg',
    excerpt: 'Berbagai produk kerajinan tangan dan industri olahan rumah tangga buatan pengrajin lokal.',
    content: `Industri rumah tangga di Dusun Kedungan & Pranan memproduksi aneka kerajinan olahan tangan dan barang seni perdesaan. Produk kerajinan ini menjadi bukti kemandirian dan kreativitas wirausaha masyarakat Kedungsari.`
  }
];

const initialGaleri = [
  { id: 1, title: 'Persawahan Hortikultura Desa Kedungsari', cat: 'Pertanian & Alam', img: '/images/landmark1.jpg' },
  { id: 2, title: 'Tradisi Budaya Tedhak Siten & Jadah 7 Warna', cat: 'Kebudayaan', img: '/images/landmark2.jpg' },
  { id: 3, title: 'Peternakan Itik Petelur Sistem Umbaran', cat: 'Ekonomi Warga', img: '/images/history.jpg' },
  { id: 4, title: 'Kantor Balai Desa Kedungsari (Dusun Paingan)', cat: 'Pemerintahan', img: '/images/hero.jpg' },
  { id: 5, title: 'Suasana Alam Desa Kedungsari Bandongan', cat: 'Pertanian & Alam', img: '/images/landmark1.jpg' },
  { id: 6, title: 'Kegiatan Gotong Royong & Rembuk Warga', cat: 'Kegiatan Warga', img: '/images/history.jpg' }
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

  const [newsList, setNewsList] = useState(() => {
    const saved = localStorage.getItem('kedungsari_news');
    return saved ? JSON.parse(saved) : initialNews;
  });

  const [sotkList, setSotkList] = useState(() => {
    const saved = localStorage.getItem('kedungsari_sotk');
    return saved ? JSON.parse(saved) : initialSotk;
  });

  const [umkmList, setUmkmList] = useState(() => {
    const saved = localStorage.getItem('kedungsari_umkm');
    return saved ? JSON.parse(saved) : initialUmkm;
  });

  const [galeriList, setGaleriList] = useState(() => {
    const saved = localStorage.getItem('kedungsari_galeri');
    return saved ? JSON.parse(saved) : initialGaleri;
  });

  const [contactInfo, setContactInfo] = useState(() => {
    const saved = localStorage.getItem('kedungsari_contact');
    return saved ? JSON.parse(saved) : initialContact;
  });

  // Persist Data to LocalStorage
  useEffect(() => {
    localStorage.setItem('kedungsari_news', JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem('kedungsari_sotk', JSON.stringify(sotkList));
  }, [sotkList]);

  useEffect(() => {
    localStorage.setItem('kedungsari_umkm', JSON.stringify(umkmList));
  }, [umkmList]);

  useEffect(() => {
    localStorage.setItem('kedungsari_galeri', JSON.stringify(galeriList));
  }, [galeriList]);

  useEffect(() => {
    localStorage.setItem('kedungsari_contact', JSON.stringify(contactInfo));
  }, [contactInfo]);

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
  const addNews = (item) => {
    const newItem = { ...item, id: Date.now() };
    setNewsList([newItem, ...newsList]);
  };

  const updateNews = (id, updatedFields) => {
    setNewsList(newsList.map((n) => (n.id === id ? { ...n, ...updatedFields } : n)));
  };

  const deleteNews = (id) => {
    setNewsList(newsList.filter((n) => n.id !== id));
  };

  // SOTK CRUD
  const addSotk = (item) => {
    const newItem = { ...item, id: Date.now() };
    setSotkList([...sotkList, newItem]);
  };

  const updateSotk = (id, updatedFields) => {
    setSotkList(sotkList.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)));
  };

  const deleteSotk = (id) => {
    setSotkList(sotkList.filter((s) => s.id !== id));
  };

  // UMKM CRUD
  const addUmkm = (item) => {
    const newItem = { ...item, id: Date.now() };
    setUmkmList([newItem, ...umkmList]);
  };

  const updateUmkm = (id, updatedFields) => {
    setUmkmList(umkmList.map((u) => (u.id === id ? { ...u, ...updatedFields } : u)));
  };

  const deleteUmkm = (id) => {
    setUmkmList(umkmList.filter((u) => u.id !== id));
  };

  // Galeri CRUD
  const addGaleri = (item) => {
    const newItem = { ...item, id: Date.now() };
    setGaleriList([newItem, ...galeriList]);
  };

  const updateGaleri = (id, updatedFields) => {
    setGaleriList(galeriList.map((g) => (g.id === id ? { ...g, ...updatedFields } : g)));
  };

  const deleteGaleri = (id) => {
    setGaleriList(galeriList.filter((g) => g.id !== id));
  };

  // Contact Update
  const updateContactInfo = (newInfo) => {
    setContactInfo({ ...contactInfo, ...newInfo });
  };

  return (
    <DataContext.Provider
      value={{
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
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
