import styled from "styled-components";

export const Section = styled.section`
  background: #FFFFFF;
`;

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
`;

export const Column = styled.div`
  flex: ${({ size }) => (size === 'large' ? '0 0 50%' : '1')};
  display: flex;
  flex-direction: column;
  align-items: ${({ size }) => (size === 'large' ? 'center' : 'flex-start')};
  text-align: ${({ size }) => (size === 'large' ? 'center' : 'left')};
`;

export const CenteredHeading = styled.h1`
  text-align: center;
  width: 100%;
  color: rgb(29, 228, 228);
`;

export const Image = styled.img`
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
`;

export const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 1rem;
  span {
    color: #BC0001;
  }
`;

export const LeadText = styled.p`
  font-size: 1.125rem;
  line-height: 1.5;
  color: #333;
  margin-bottom: 1rem;
`;

export const Navbar = styled.nav`
  background-color: #BC0001;
`;

export const NavItem = styled.div`
  margin-right: 30px;
`;

export const NavbarNav = styled.div`
  color: black;
  font-weight: bold;
`;

export const NavbarBrand = styled.div`
  font-weight: bold;
  color: black;
`;

export const BtnInfo = styled.button`
  padding: 5px 5px;
  min-width: 250px;
  color: aliceblue;
  font-size: 19px;
  font-style: oblique;
  font-weight: bolder;
`;

export const Footer = styled.footer`
  background-color: #BC0001;
  color: white;
  padding: 20px 0;
  margin-top: 50px;
`;

export const FeatureIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  border-radius: 0.75rem;
`;

export const ImgLogo = styled.div`
  margin-left: 40px;
`;

export const H2 = styled.h2`
  text-align: center;
  margin-top: 30px;
`;

export const FormControl = styled.input`
  background-color: transparent;
  border: 1px solid black;
`;
