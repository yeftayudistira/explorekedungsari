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

const initialDestinasi = [
  {
    id: 1,
    title: 'Sentra Peternakan Itik Petelur Kedungsari',
    cat: 'Potensi Peternakan',
    rating: '4.9',
    desc: 'Kawasan penggembalaan itik petelur sistem umbaran alami di hamparan persawahan hijau Dusun Wonosaran.',
    img: '/images/landmark1.jpg',
    lokasi: 'Dusun Wonosaran'
  },
  {
    id: 2,
    title: 'Kawasan Persawahan Hortikultura Bandongan',
    cat: 'Agrowisata',
    rating: '4.8',
    desc: 'Lahan pertanian produktif komoditas cabai, terong, ketimun, dan pepaya dengan latar pemandangan dataran tinggi.',
    img: '/images/history.jpg',
    lokasi: 'Dusun Karangrejo'
  },
  {
    id: 3,
    title: 'Pusat Kebudayaan & Tradisi Tedhak Siten',
    cat: 'Wisata Budaya',
    rating: '5.0',
    desc: 'Lokasi prosesi upacara adat kearifan lokal Tedhak Siten dan pembuatan Jadah 7 Warna.',
    img: '/images/landmark2.jpg',
    lokasi: 'Dusun Paingan'
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

  const [newsList, setNewsList] = useState(() => {
    const saved = localStorage.getItem('kedungsari_news');
    return saved ? JSON.parse(saved) : initialNews;
  });

  const [sotkList, setSotkList] = useState(() => {
    const saved = localStorage.getItem('kedungsari_sotk');
    return saved ? JSON.parse(saved) : initialSotk;
  });

  const [destinasiList, setDestinasiList] = useState(() => {
    const saved = localStorage.getItem('kedungsari_destinasi');
    return saved ? JSON.parse(saved) : initialDestinasi;
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
    localStorage.setItem('kedungsari_destinasi', JSON.stringify(destinasiList));
  }, [destinasiList]);

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

  // Destinasi CRUD
  const addDestinasi = (item) => {
    const newItem = { ...item, id: Date.now() };
    setDestinasiList([...destinasiList, newItem]);
  };

  const updateDestinasi = (id, updatedFields) => {
    setDestinasiList(destinasiList.map((d) => (d.id === id ? { ...d, ...updatedFields } : d)));
  };

  const deleteDestinasi = (id) => {
    setDestinasiList(destinasiList.filter((d) => d.id !== id));
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
        destinasiList,
        addDestinasi,
        updateDestinasi,
        deleteDestinasi,
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
