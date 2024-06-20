import React from "react";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import AboutUs from "./AboutUs/AboutUs";
import JenisLayanan from "./JenisLayanan/JenisLayanan";
import DaftarTeknisi from "./DaftarTeknisi/DaftarTeknisi";
import KelolaUser from "./KelolaUser/KelolaUser";
import Keuangan from "./Keuangan/Keuangan";
import { Sidebar, SidebarItem, SidebarDropdown, SidebarLink, Container, Content } from "./StyledApp";

const App = () => {
  return (
    <Router>
      <Container>
        <Sidebar>
          <SidebarItem>
            <SidebarLink to="/">Dashboard</SidebarLink>
            <SidebarDropdown>
              <SidebarLink to="/jenis-layanan">Jenis Layanan</SidebarLink>
              <SidebarLink to="/daftar-teknisi">Daftar Teknisi</SidebarLink>
              <SidebarLink to="/kelola-user">Kelola User</SidebarLink>
              <SidebarLink to="/keuangan">Keuangan</SidebarLink>
            </SidebarDropdown>
          </SidebarItem>
          <SidebarItem>
            <SidebarLink to="/about-us">About Us</SidebarLink>
          </SidebarItem>
        </Sidebar>
        <Content>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/jenis-layanan" element={<JenisLayanan />} />
            <Route path="/daftar-teknisi" element={<DaftarTeknisi />} />
            <Route path="/kelola-user" element={<KelolaUser />} />
            <Route path="/keuangan" element={<Keuangan />} />
          </Routes>
        </Content>
      </Container>
    </Router>
  );
};

export default App;
