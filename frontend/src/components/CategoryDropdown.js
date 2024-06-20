import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';

function CategoryDropdown({ onSelect }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // Mengambil data dari API
    axios.get('http://localhost:5000/kategori')
      .then(response => {
        // Mengubah data API menjadi format yang sesuai untuk Dropdown dan menghapus duplikasi
        const uniqueCategories = Array.from(new Set(response.data.data.map(item => item.nama_katagori)));
        const apiData = uniqueCategories.map(kategori => ({
          label: kategori,
          value: kategori
        }));
        setOptions(apiData);
      })
      .catch(error => {
        console.error('Terjadi kesalahan saat mengambil data kategori:', error);
      });
  }, []);

  const handleSelect = (option) => {
    onSelect(option);
    // Anda dapat melakukan logika lain yang diperlukan dengan pilihan yang dipilih di sini
  };

  return (
    <div>
      <Dropdown options={options} onSelect={handleSelect} placeholder="Semua Kategori" />
    </div>
  );
}

export default CategoryDropdown;
