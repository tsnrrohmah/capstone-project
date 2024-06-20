import styled from 'styled-components';

export const DashboardContainer = styled.div`
  padding: 20px;
`;

export const DashboardTitle = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
`;

export const ServiceStatistics = styled.div`
  margin-bottom: 20px;
`;

export const ServiceList = styled.div`
  margin-bottom: 20px;
`;

export const ServiceItem = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
`;

export const GraphContainer = styled.div`
  margin-bottom: 20px;
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;

export const AddServiceButton = styled.button`
  padding: 10px 20px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #27ae60;
  }
`;

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const UserInfo = styled.div`
  flex: 1;
  margin-left: 10px;
`;

export const EditButton = styled.button`
  padding: 5px 10px;
  background-color: #f39c12;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e67e22;
  }
`;

export const EditFormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  background-color: white;
  padding: 2rem;
  border: 1px solid rgb(70, 70, 244);
  border-radius: 1rem;
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    margin-bottom: 10px;
  }

  input {
    padding: 8px;
    width: 100%;
    margin-bottom: 10px;
    border: 1px solid gray;
    border-radius: 5px;
  }
`;

export const SaveButton = styled.button`
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;



export const UserName = styled.div`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;