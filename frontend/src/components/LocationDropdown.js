import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';

function LocationDropdown({ onSelect }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Mengambil data lokasi dari API
    axios.get('http://localhost:5000/kategori') // Gantilah URL ini sesuai dengan endpoint API lokasi Anda
      .then(response => {
        // Mengubah data API menjadi format yang sesuai untuk Dropdown dan menghapus duplikasi
        const uniqueLocations = Array.from(new Set(response.data.data.map(item => item.lokasi)));
        const apiData = uniqueLocations.map(lokasi => ({
          label: lokasi,
          value: lokasi
        }));
        setOptions(apiData);
      })
      .catch(error => {
        console.error('Terjadi kesalahan saat mengambil data lokasi:', error);
      });
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    // Anda dapat melakukan logika lain yang diperlukan dengan pilihan yang dipilih di sini
  };

  return (
    <div>
      <Dropdown options={options} onSelect={handleSelect} placeholder="Pilih Lokasi" />
    </div>
  );
}

export default LocationDropdown;
