import React from 'react';
import { DashboardContainer, DashboardTitle, ServiceStatistics, ServiceList, ServiceItem, GraphContainer, SearchButton, AddServiceButton } from './StyledDashboard';

const Dashboard = () => {
    return (
        <DashboardContainer>
            <DashboardTitle>Dashboard</DashboardTitle>
            <ServiceStatistics>
                <h3>Service Statistics</h3>
                <p>Total services: 100</p>
                <p>New services this month: 20</p>
            </ServiceStatistics>
            <ServiceList>
                <h3>Popular Services</h3>
                <ServiceItem>Service 1</ServiceItem>
                <ServiceItem>Service 2</ServiceItem>
                <ServiceItem>Service 3</ServiceItem>
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
