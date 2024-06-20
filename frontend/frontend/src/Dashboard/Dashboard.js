import React, { useState } from 'react';
import { 
  DashboardContainer, 
  DashboardTitle, 
  ServiceStatistics, 
  ServiceList, 
  ServiceItem, 
  GraphContainer, 
  SearchButton, 
  AddServiceButton, 
  UserProfile, 
  UserInfo, 
  EditButton, 
  EditFormContainer, 
  EditForm, 
  SaveButton 
} from './StyledDashboard';
// import classes from './Dashboard.module.css';

const Dashboard = () => {
    const [isEditVisible, setIsEditVisible] = useState(false);
    const [userDetails, setUserDetails] = useState({
        username: 'User Name',
        address: 'Jl. Mawar Semarang Timur',
        profileImage: 'https://via.placeholder.com/50',
    });

    const [editDetails, setEditDetails] = useState({
        username: userDetails.username,
        address: userDetails.address,
    });

    const handleEditClick = () => {
        setIsEditVisible(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditDetails({
            ...editDetails,
            [name]: value,
        });
    };

    const handleSave = () => {
        setUserDetails({
            ...userDetails,
            username: editDetails.username,
            address: editDetails.address,
        });
        setIsEditVisible(false);
    };

    return (
        <DashboardContainer>
            <UserProfile>
                <img src={userDetails.profileImage} alt="Profile" />
                <UserInfo>
                    <p>{userDetails.username}</p>
                    <p>{userDetails.address}</p>
                    <EditButton onClick={handleEditClick}>Edit Biodata</EditButton>
                </UserInfo>
            </UserProfile>

            {isEditVisible && (
                <EditFormContainer>
                    <EditForm>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={editDetails.username}
                            onChange={handleInputChange}
                        />
                        <label>Alamat</label>
                        <input
                            type="text"
                            name="address"
                            value={editDetails.address}
                            onChange={handleInputChange}
                        />
                        <SaveButton onClick={handleSave}>Save</SaveButton>
                    </EditForm>
                </EditFormContainer>
            )}

            <DashboardTitle>Dashboard</DashboardTitle>
            <ServiceStatistics>
                <p>Service Statistics</p>
                <p>Total Pelayanan: 100</p>
                <p>Layananan Baru di Bulan ini: 20</p>
            </ServiceStatistics>
            <ServiceList>
                <h3>Layanan Populer</h3>
                <ServiceItem>layanan 1</ServiceItem>
                <ServiceItem>layanan 2</ServiceItem>
                <ServiceItem>layanan 3</ServiceItem>
                {/* Tambahkan daftar layanan populer di sini */}
            </ServiceList>
            <GraphContainer>
                {/* Tambahkan grafik atau diagram di sini */}
            </GraphContainer>
            <SearchButton>Search Service</SearchButton>
            <AddServiceButton>Add New Service</AddServiceButton>
        </DashboardContainer>
    );
};

export default Dashboard;
