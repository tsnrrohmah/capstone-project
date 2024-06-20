import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import Login from "./LoginRegister/Login";
import Signup from "./LoginRegister/Signup";
import CatalogProduct from "./pages/CatalogProduct";
import DashboardPage from "./DashboardPage";
import TestAPI from './pages/TestAPI';
import AboutUsPage from "./pages/AboutUsPage";
// import Dashboard from "./Dashboard/Dashboard";
import AboutUs from "./AboutUs/AboutUs";
import KelolaUser from "./AddUser/AddUser";
import Pesanan from "./Pesanan/Pesanan";
import TambahLayanan from "./AddLayanan/AddLayanan";
import TambahTeknisi from "./AddTeknisi/AddTeknisi";
import TambahAdmin from "./Admin/AddAdmin";

import LayananDetail from './pages/LayananDetail'; // Halaman detail

import { AuthProvider } from "./AuthContext";
// import './App.css';
import LoginAdmin from "./LoginRegister/LoginAdmin";
import SignupAdmin from "./LoginRegister/SignupAdmin";
import Pembelian from "./Pembelian/Pembelian";
import UserProfile from "./User/UserProfile";




function App() {
  const role = localStorage.getItem("role"); // Mendapatkan peran dari localStorage
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupadmin" element={<SignupAdmin />} />
          <Route path="/catalog" element={<CatalogProduct />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/testapi" element={<TestAPI />} />
          <Route path="/formpembelian" element={<Pembelian />} />
          <Route path="/userprofile" element={<UserProfile />} />
          
          <Route path="/layanan/:id" element={<LayananDetail />} /> {/* Rute untuk halaman detail */}
          {(role === "superadmin" || role === "admin") && (
          <Route path="/dashboard/*" element={<DashboardPage />}>
            {/* <Route path="" element={<Dashboard />} /> */}
            <Route path="admin" element={<TambahAdmin />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="kelola-user" element={<KelolaUser />} />
            <Route path="pesanan" element={<Pesanan />} />
            <Route path="tambah-layanan" element={<TambahLayanan />} />
            <Route path="tambah-teknisi" element={<TambahTeknisi />} />
          </Route>
                 )}

        </Routes>
      </div>
    </Router>

    </AuthProvider>
  );
}

export default App;
