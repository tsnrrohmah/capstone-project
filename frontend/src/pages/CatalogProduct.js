import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import LocationDropdown from '../components/LocationDropdown';
import CategoryDropdown from '../components/CategoryDropdown';
import classes from './CatalogProduct.module.css';
import LayananCard from '../components/LayananCard';
import Footer from './SectionPage/Footers';
import { AuthContext } from '../AuthContext';


const CatalogProduct = () => {
  const [dataLayanan, setDataLayanan] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const { isLoggedIn } = useContext(AuthContext);


  useEffect(() => {
    axios.get('http://localhost:5000/kategori')
      .then(response => {
        setDataLayanan(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const filteredLayanan = dataLayanan.filter((layanan) => {
    return (
      (selectedCategory ? layanan.nama_katagori === selectedCategory : true) &&
      (selectedLocation ? layanan.lokasi === selectedLocation : true)
    );
  });

  const baseURL = 'http://localhost:5000';

  return (
    <>
      <div className={classes.navMargin}>
        <Navbar />
      </div>

      <div className={classes.catalogProduct}>
        <div className={classes.searchCatalog}>
          <h1>Cari Layanan AC Terpercaya dan Murah Disini</h1>
          <p>JasaKu menyediakan berbagai layanan AC yang dapat memberikan kenyamanan kesejukan Anda</p>
          <div className={classes.containerDropdown}>
            <LocationDropdown onSelect={handleLocationSelect} />
            <CategoryDropdown onSelect={handleCategorySelect} />
          </div>
        </div>
      </div>
      <div className={classes.searchResult}>
        <div className={classes.containerFilter}>
          <h4>Menampilkan Layanan {selectedCategory || 'Semua Kategori'} di {selectedLocation || 'Semua Lokasi'}</h4>
        </div>
        <div className={classes.containerResult}>
          {filteredLayanan.map((layanan) => (
            <LayananCard
              key={layanan.id_katagori}
              id_katagori={layanan.id_katagori}
              imageLayanan={`${baseURL}/uploads/catagori/${layanan.gambar}`}
              title={layanan.judul}
              location={layanan.lokasi}
              price={parseInt(layanan.harga, 10).toLocaleString('de-DE')}
              isLoggedIn={isLoggedIn} // Pass isLoggedIn to LayananCard
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CatalogProduct;
