import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  height: 100vh;
`;

export const Sidebar = styled.div`
  width: 250px;
  background-color: #2c3e50;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SidebarItem = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const SidebarDropdown = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

export const SidebarLink = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 10px 0;
  display: block;
  width: 100%;
  &:hover {
    background-color: #34495e;
  }
`;

export const Content = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const SidebarLinkStyled = styled(Link)`
  text-decoration: none;
  color: white;
  padding: 10px 0;
  display: block;
  width: 100%;
  &:hover {
    background-color: #34495e;
  }
`;

export const StyledTambahAdmin = styled.div`
  padding: 20px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #3EB492;
    text-align: left;
  }
`;

export const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  cursor: pointer;
  text-align: center;
  &:hover {
    background-color: #2980b9;
  }
`;

export const DangerButton = styled(Button)`
  background-color: red;
  &:hover {
    background-color: rgb(243, 71, 32);
  }
`;

export const ShowButton = styled(Button)`
  background-color: yellowgreen;
  &:hover {
    background-color: rgb(105, 151, 12);
  }
`;

export const FormContainer = styled.div`
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

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const FormInput = styled.input`
  padding: 8px;
  width: 80%;
  margin-bottom: 8px;
  border: 1px solid gray;
`;
