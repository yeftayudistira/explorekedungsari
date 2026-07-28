import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const initialNews = [
  {
    id: 1,
    title: 'Pemerintah Desa Kedungsari Meluncurkan Portal Digital Resmi Desa',
    date: '24 Juli 2026',
    author: 'Admin Desa',
    category: 'Pengumuman',
    img: '/images/hero.jpg',
    excerpt: 'Untuk meningkatkan keterbukaan informasi publik dan promosi potensi wisata desa, Pemerintah Desa Kedungsari meresmikan portal digital.',
    content: `Pemerintah Desa Kedungsari dengan bangga mengumumkan peluncuran portal digital terpadu Desa Kedungsari. Website ini dirancang untuk memfasilitasi publik dalam mendapatkan informasi terbaru terkait keindahan wisata desa, kebudayaan, sejarah, serta statistik kemasyarakatan.`
  },
  {
    id: 2,
    title: 'Pembersihan Massal & Penghijauan di Sekitar Waduk Kedungsari',
    date: '20 Juli 2026',
    author: 'Kasi Kesejahteraan',
    category: 'Kegiatan Warga',
    img: '/images/landmark1.jpg',
    excerpt: 'Warga Kedungsari bergotong royong menanam 500 bibit pohon mahoni dan merapikan kawasan wisata waduk desa.',
    content: `Sebagai langkah melestarikan lingkungan hidup dan menyongsong liburan akhir pekan, warga masyarakat Desa Kedungsari menggelar aksi penanaman 500 bibit pohon di sepanjang tepian Waduk Kedungsari.`
  },
  {
    id: 3,
    title: 'Pembangunan Jalan Tani & Drainase Dusun Sari Timur Selesai 100%',
    date: '16 Juli 2026',
    author: 'Tim TPK Desa',
    category: 'Pembangunan',
    img: '/images/landmark2.jpg',
    excerpt: 'Pembangunan akses jalan pertanian sepanjang 1.2 km telah rampung dan siap mempermudah pengangkutan hasil panen padi warga.',
    content: `Proyek pavingisasi jalan tani dan pembuatan drainase air di Dusun Sari Timur yang bersumber dari Dana Desa APBDES 2026 telah rampung dikerjakan.`
  },
  {
    id: 4,
    title: 'Festival Seni & Pasar Kuliner Tradisional Kedungsari Bulan Depan',
    date: '10 Juli 2026',
    author: 'Karang Taruna',
    category: 'Pariwisata',
    img: '/images/history.jpg',
    excerpt: 'Karang Taruna Desa Kedungsari siap menggelar festival kebudayaan dan pameran UMKM lokal untuk menarik pengunjung luar daerah.',
    content: `Guna mengangkat potensi kerajinan dan kuliner lokal, Desa Kedungsari akan menggelar Festival Seni & Kuliner Budaya. Acara akan diisi dengan tarian tradisional, pertunjukan musik angklung, serta puluhan stan kuliner khas desa.`
  }
];

const initialSotk = [
  { id: 1, nama: 'H. Bambang Sugiarto, S.E.', jabatan: 'Kepala Desa Kedungsari', role: 'Pimpinan Pemerintah Desa' },
  { id: 2, nama: 'Siti Rahmawati, S.AP.', jabatan: 'Sekretaris Desa', role: 'Administrator & Pelayanan Umum' },
  { id: 3, nama: 'Budi Santoso, S.Sos.', jabatan: 'Kaur Keuangan', role: 'Pengelola Anggaran APBDES' },
  { id: 4, nama: 'Dewi Lestari, A.Md.', jabatan: 'Kaur Umum & Perencanaan', role: 'Aset & Perencanaan Pembangunan' },
  { id: 5, nama: 'Eko Prasetyo', jabatan: 'Kasi Pemerintahan', role: 'Administrasi & Keamanan' },
  { id: 6, nama: 'Rina Wijaya, S.Pd.', jabatan: 'Kasi Kesejahteraan & Pelayanan', role: 'Sosial, Pemberdayaan & Wisata' }
];

const initialDestinasi = [
  {
    id: 1,
    title: 'Waduk & Danau Wisata Kedungsari',
    cat: 'Wisata Alam',
    rating: '4.9',
    desc: 'Spot pemandangan danau perairan jernih dengan latar perbukitan hijau, dilengkapi gazebo santai dan perahu kayuh.',
    img: '/images/landmark1.jpg',
    lokasi: 'Dusun Kedung I'
  },
  {
    id: 2,
    title: 'Monumen & Taman Budaya Desa',
    cat: 'Wisata Sejarah',
    rating: '4.8',
    desc: 'Landmark monumen ukiran prasasti bersejarah tempat pagelaran seni dan foto kenangan wisatawan.',
    img: '/images/landmark2.jpg',
    lokasi: 'Dusun Kedung I'
  },
  {
    id: 3,
    title: 'Bukit Sunrise & Persawahan Terraces',
    cat: 'Agrowisata',
    rating: '5.0',
    desc: 'Gardu pandang menikmati matahari terbit dan keindahan hamparan terasering persawahan.',
    img: '/images/history.jpg',
    lokasi: 'Dusun Sari Barat'
  }
];

const initialContact = {
  alamat: 'Jl. Raya Utama Kedungsari No. 01, Dusun Kedung I, Kec. Kedungsari',
  jamKerja: 'Senin - Kamis: 08.00 - 15.00 WIB | Jumat: 08.00 - 11.30 WIB',
  telepon: '0812-3456-7890',
  email: 'pemdes@kedungsari.id'
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
