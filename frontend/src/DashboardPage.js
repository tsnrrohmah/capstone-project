import React from "react";
import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarItem,
  SidebarDropdown,
  SidebarLink,
  Container,
  Content,
  UserProfile,
  UserName,
} from "./StyledApp";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const role = localStorage.getItem("role"); // Mendapatkan peran dari localStorage
  const username = localStorage.getItem("username"); // Mendapatkan peran dari localStorage
  console.log("User Role:", role); // Menambahkan log untuk memverifikasi peran yang diambil
  console.log("User Role:", username); // Menambahkan log untuk memverifikasi peran yang diambil

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login"); // Ganti dengan rute halaman login Anda
  };

  return (
    <Container>
      <Sidebar>
        <UserProfile>
          <img src="https://via.placeholder.com/50" alt="Profile" />
          <UserName>{username}</UserName>
        </UserProfile>
        <SidebarItem>
          <SidebarDropdown>
            {(role === "superadmin" || role === "admin") && (
              <>
                <SidebarLink to="/dashboard">Dashboard</SidebarLink>
                <SidebarLink to="/dashboard/tambah-layanan">
                  Tambah Layanan
                </SidebarLink>
                <SidebarLink to="/dashboard/tambah-teknisi">
                  Tambah Teknisi
                </SidebarLink>
                <SidebarLink to="/dashboard/pesanan">Pesanan</SidebarLink>
              </>
            )}
            {role === "superadmin" && (
              <>
                <SidebarLink to="/dashboard/admin">Admin</SidebarLink>
                <SidebarLink to="/dashboard/kelola-user">
                  Kelola User
                </SidebarLink>
              </>
            )}
            {(role === "superadmin" || role === "admin") && (
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            )}
          </SidebarDropdown>
        </SidebarItem>
      </Sidebar>
      <Content>
        <Outlet /> {/* This renders the matched child route */}
      </Content>
    </Container>
  );
};

export default DashboardPage;
