import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DataContext = createContext();

const initialContact = {
  alamat: 'Dusun Paingan RT 05 RW 04, Desa Kedungsari, Kec. Bandongan, Kab. Magelang 56151',
  jamKerja: 'Senin - Kamis: 08.00 - 15.00 WIB | Jumat: 08.00 - 11.00 WIB',
  telepon: '(0293) 364712',
  email: 'kedungsaribandongan@gmail.com'
};

const defaultVisiMisi = {
  visi: "Terwujudnya Desa Kedungsari yang Makmur, Sejahtera, Sehat Lingkungan (ODF), Berbudaya, serta Berdaya Saing Tinggi Berbasis Sektor Pertanian & Peternakan Unggulan.",
  misi: [
    "Meningkatkan transparansi dan tata kelola pemerintah desa berbasis teknologi informasi.",
    "Mengembangkan produktivitas komoditas hortikultura dan peternakan itik petelur terpadu.",
    "Melestarikan kearifan lokal kebudayaan adat dan semangat gotong royong warga.",
    "Mempertahankan status Desa Sehat ODF dan meningkatkan kualitas lingkungan hidup."
  ]
};

const defaultSambutanKades = {
  judul: 'Sambutan Kepala Desa Kedungsari',
  nama: 'NAMA KEPALA DESA',
  jabatan: 'Kepala Desa Kedungsari',
  content: 'Selamat datang di Website Digital Branding Desa Kedungsari. Website ini dibangun untuk memperluas jangkauan informasi, mempublikasikan potensi keasrian alam hortikultura, kebudayaan, serta produk unggulan UMKM warga Desa Kedungsari kepada masyarakat luas.',
  img: '/images/img2.jpg'
};

export function DataProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('kedungsari_admin') === 'true';
  });

  const [newsList, setNewsList] = useState([]);
  const [sotkList, setSotkList] = useState([]);
  const [umkmList, setUmkmList] = useState([]);
  const [galeriList, setGaleriList] = useState([]);
  const [dusunList, setDusunList] = useState([]);
  const [contactInfo, setContactInfo] = useState(initialContact);
  const [visiMisi, setVisiMisi] = useState(() => {
    try {
      const saved = localStorage.getItem('kedungsari_visi_misi');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.visi && Array.isArray(parsed.misi)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse kedungsari_visi_misi:', e);
    }
    return defaultVisiMisi;
  });
  const [sambutanKades, setSambutanKades] = useState(() => {
    try {
      const saved = localStorage.getItem('kedungsari_sambutan_kades');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.content) {
          return parsed;
        }
      }
    } catch (e) {}
    return defaultSambutanKades;
  });
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch Data strictly from Supabase Database (No Hardcoded Fallbacks)
  useEffect(() => {
    async function loadSupabaseData() {
      setIsLoadingData(true);

      if (!isSupabaseConfigured() || !supabase) {
        setIsLoadingData(false);
        return;
      }

      try {
        // 1. Load News from Supabase
        const { data: newsData, error: newsErr } = await supabase
          .from('news')
          .select('*')
          .order('id', { ascending: false });

        if (newsErr) {
          console.warn('Supabase News Table Not Ready or Empty:', newsErr.message);
          setNewsList([]);
        } else {
          setNewsList(newsData || []);
        }

        // 2. Load SOTK from Supabase
        const { data: sotkData, error: sotkErr } = await supabase
          .from('sotk')
          .select('*')
          .order('id', { ascending: true });

        if (sotkErr) {
          console.warn('Supabase SOTK Table Not Ready or Empty:', sotkErr.message);
          setSotkList([]);
        } else {
          setSotkList(sotkData || []);
        }

        // 3. Load UMKM from Supabase
        const { data: umkmData, error: umkmErr } = await supabase
          .from('umkm')
          .select('*')
          .order('id', { ascending: false });

        if (umkmErr) {
          console.warn('Supabase UMKM Table Not Ready or Empty:', umkmErr.message);
          setUmkmList([]);
        } else if (umkmData) {
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
        }

        // 4. Load Galeri from Supabase
        const { data: galeriData, error: galeriErr } = await supabase
          .from('galeri')
          .select('*')
          .order('id', { ascending: false });

        if (galeriErr) {
          console.warn('Supabase Galeri Table Not Ready or Empty:', galeriErr.message);
          setGaleriList([]);
        } else {
          setGaleriList(galeriData || []);
        }

        // 5. Load Dusun from Supabase
        const { data: dusunData, error: dusunErr } = await supabase
          .from('dusun')
          .select('*')
          .order('id', { ascending: true });

        if (dusunErr) {
          console.warn('Supabase Dusun Table Not Ready or Empty:', dusunErr.message);
          setDusunList([]);
        } else {
          setDusunList(dusunData || []);
        }

        // 6. Load Contact Info & Visi Misi from Supabase
        const { data: contactData } = await supabase
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
          if (contactData.visi_misi) {
            setVisiMisi(contactData.visi_misi);
          }
        }

        // 7. Load Visi Misi from Supabase 'visi_misi' or 'settings' table
        try {
          const { data: vmData } = await supabase
            .from('visi_misi')
            .select('*')
            .eq('id', 1)
            .single();

          if (vmData && vmData.visi) {
            setVisiMisi({
              visi: vmData.visi,
              misi: Array.isArray(vmData.misi) ? vmData.misi : (typeof vmData.misi === 'string' ? JSON.parse(vmData.misi) : defaultVisiMisi.misi)
            });
          }
        } catch (e) {}

        // 8. Load Sambutan Kades from Supabase
        try {
          const { data: kadesData } = await supabase
            .from('sambutan_kades')
            .select('*')
            .eq('id', 1)
            .single();

          if (kadesData && (kadesData.content || kadesData.nama)) {
            setSambutanKades({
              judul: kadesData.judul || defaultSambutanKades.judul,
              nama: kadesData.nama || defaultSambutanKades.nama,
              jabatan: kadesData.jabatan || defaultSambutanKades.jabatan,
              content: kadesData.content || defaultSambutanKades.content,
              img: kadesData.img || kadesData.foto || defaultSambutanKades.img
            });
          }
        } catch (e) {}
      } catch (err) {
        console.error('Error fetching data from Supabase:', err);
      } finally {
        setIsLoadingData(false);
      }
    }

    loadSupabaseData();
  }, []);

  // Persist Admin Login State
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

  // News CRUD (Strictly Supabase Database)
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
        alert('Gagal menyimpan ke Supabase Database: ' + error.message);
      } else if (data && data.length > 0) {
        setNewsList(prev => [data[0], ...prev]);
      }
    }
  };

  const updateNews = async (id, updatedFields) => {
    setNewsList(prev => prev.map((n) => (n.id === id ? { ...n, ...updatedFields } : n)));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('news').update(updatedFields).eq('id', id);
      if (error) {
        console.error('Supabase Update News Error:', error);
        alert('Gagal memperbarui di Supabase Database: ' + error.message);
      }
    }
  };

  const deleteNews = async (id) => {
    const backupList = [...newsList];
    setNewsList(prev => prev.filter((n) => n.id !== id));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('news').delete().eq('id', id);
      if (error) {
        console.error('Supabase Delete News Error:', error);
        alert('Gagal menghapus dari Supabase Database!\n\nPenyebab: ' + error.message);
        setNewsList(backupList);
      }
    }
  };

  // SOTK CRUD (Strictly Supabase Database)
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

      if (error) {
        alert('Gagal menyimpan Aparatur ke Supabase: ' + error.message);
      } else if (data && data.length > 0) {
        setSotkList(prev => [...prev, data[0]]);
      }
    }
  };

  const updateSotk = async (id, updatedFields) => {
    setSotkList(prev => prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('sotk').update(updatedFields).eq('id', id);
      if (error) console.error('Supabase Update SOTK Error:', error);
    }
  };

  const deleteSotk = async (id) => {
    const backup = [...sotkList];
    setSotkList(prev => prev.filter((s) => s.id !== id));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('sotk').delete().eq('id', id);
      if (error) {
        alert('Gagal menghapus Aparatur dari Supabase: ' + error.message);
        setSotkList(backup);
      }
    }
  };

  // UMKM CRUD (Strictly Supabase Database)
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

      if (error) {
        alert('Gagal menyimpan UMKM ke Supabase: ' + error.message);
      } else if (data && data.length > 0) {
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
      }
    }
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
    const backup = [...umkmList];
    setUmkmList(prev => prev.filter((u) => u.id !== id));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('umkm').delete().eq('id', id);
      if (error) {
        alert('Gagal menghapus UMKM dari Supabase: ' + error.message);
        setUmkmList(backup);
      }
    }
  };

  // Galeri CRUD (Strictly Supabase Database)
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

      if (error) {
        alert('Gagal menyimpan Galeri ke Supabase: ' + error.message);
      } else if (data && data.length > 0) {
        setGaleriList(prev => [data[0], ...prev]);
      }
    }
  };

  const updateGaleri = async (id, updatedFields) => {
    setGaleriList(prev => prev.map((g) => (g.id === id ? { ...g, ...updatedFields } : g)));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('galeri').update(updatedFields).eq('id', id);
      if (error) console.error('Supabase Update Galeri Error:', error);
    }
  };

  const deleteGaleri = async (id) => {
    const backup = [...galeriList];
    setGaleriList(prev => prev.filter((g) => g.id !== id));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('galeri').delete().eq('id', id);
      if (error) {
        alert('Gagal menghapus foto dari Supabase: ' + error.message);
        setGaleriList(backup);
      }
    }
  };

  // Dusun CRUD (Strictly Supabase Database)
  const addDusun = async (item) => {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase
        .from('dusun')
        .insert([{
          nama: item.nama,
          kepala: item.kepala,
          kontak: item.kontak,
          rt: item.rt,
          penduduk: item.penduduk,
          desc: item.desc,
          img: item.img
        }])
        .select();

      if (error) {
        alert('Gagal menyimpan Dusun ke Supabase: ' + error.message);
      } else if (data && data.length > 0) {
        setDusunList(prev => [...prev, data[0]]);
      }
    }
  };

  const updateDusun = async (id, updatedFields) => {
    setDusunList(prev => prev.map((d) => (d.id === id ? { ...d, ...updatedFields } : d)));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('dusun').update(updatedFields).eq('id', id);
      if (error) console.error('Supabase Update Dusun Error:', error);
    }
  };

  const deleteDusun = async (id) => {
    const backup = [...dusunList];
    setDusunList(prev => prev.filter((d) => d.id !== id));

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('dusun').delete().eq('id', id);
      if (error) {
        alert('Gagal menghapus Dusun dari Supabase: ' + error.message);
        setDusunList(backup);
      }
    }
  };

  // Contact Update (Strictly Supabase Database)
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

  // Visi Misi Update (Multi-table Database Persistence)
  const updateVisiMisi = async (newVisiMisi) => {
    setVisiMisi(newVisiMisi);
    try {
      localStorage.setItem('kedungsari_visi_misi', JSON.stringify(newVisiMisi));
    } catch (e) {}

    if (isSupabaseConfigured() && supabase) {
      // 1. Try upsert to 'visi_misi' table
      try {
        await supabase.from('visi_misi').upsert({
          id: 1,
          visi: newVisiMisi.visi,
          misi: newVisiMisi.misi
        });
      } catch (e) {}

      // 2. Try upsert to 'contact_info' table (visi_misi JSON column)
      try {
        await supabase.from('contact_info').upsert({
          id: 1,
          visi_misi: newVisiMisi
        });
      } catch (e) {}

      // 3. Try upsert to 'settings' table
      try {
        await supabase.from('settings').upsert({
          id: 'visi_misi',
          data: newVisiMisi
        });
      } catch (e) {}
    }
  };

  // Sambutan Kades Update (Multi-table Database Persistence)
  const updateSambutanKades = async (newSambutan) => {
    setSambutanKades(newSambutan);
    try {
      localStorage.setItem('kedungsari_sambutan_kades', JSON.stringify(newSambutan));
    } catch (e) {}

    if (isSupabaseConfigured() && supabase) {
      // 1. Try upsert to 'sambutan_kades' table
      try {
        await supabase.from('sambutan_kades').upsert({
          id: 1,
          judul: newSambutan.judul,
          nama: newSambutan.nama,
          jabatan: newSambutan.jabatan,
          content: newSambutan.content,
          img: newSambutan.img
        });
      } catch (e) {}

      // 2. Try upsert to 'contact_info' table (sambutan_kades JSON column)
      try {
        await supabase.from('contact_info').upsert({
          id: 1,
          sambutan_kades: newSambutan
        });
      } catch (e) {}

      // 3. Try upsert to 'settings' table
      try {
        await supabase.from('settings').upsert({
          id: 'sambutan_kades',
          data: newSambutan
        });
      } catch (e) {}
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
        dusunList,
        addDusun,
        updateDusun,
        deleteDusun,
        destinasiList: umkmList,
        addDestinasi: addUmkm,
        updateDestinasi: updateUmkm,
        deleteDestinasi: deleteUmkm,
        contactInfo,
        updateContactInfo,
        visiMisi,
        updateVisiMisi,
        sambutanKades,
        updateSambutanKades,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
