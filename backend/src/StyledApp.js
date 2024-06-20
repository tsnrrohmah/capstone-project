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
