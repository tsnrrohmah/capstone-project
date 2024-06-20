import styled from 'styled-components';

export const DashboardContainer = styled.div`
    padding: 20px;
    background-color: #f8f9fa;
`;

export const DashboardTitle = styled.h2`
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
`;

export const ServiceStatistics = styled.div`
    margin-bottom: 20px;
`;

export const ServiceList = styled.div`
    margin-bottom: 20px;

    h3 {
        font-size: 20px;
        margin-bottom: 10px;
    }
`;

export const ServiceItem = styled.div`
    background-color: #fff;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const GraphContainer = styled.div`
    margin-bottom: 20px;
`;

export const SearchButton = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
`;

export const AddServiceButton = styled.button`
    background-color: #28a745;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
