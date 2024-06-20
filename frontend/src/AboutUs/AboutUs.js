import React from "react";
import { 
  Section, Container, Row, Column, CenteredHeading, Image, Heading, LeadText 
} from "./StyledAboutUs";

const AboutUs = () => {
  return (
    <Section>
      <Container>
          <CenteredHeading>
            About <span style={{ color: "#1D204F" }}>us</span>
          </CenteredHeading>
        <Row reverse>
          <Column size="large">
            <Image 
              src="https://via.placeholder.com/100" 
              alt="About Us" 
              width="300" 
              height="150" 
            />
          </Column>
          <Column>
            <Heading>
              Nikmati Layanan Bersama Jasaku
              <span style={{ color: "#1D204F" }}>Sepuasnya!</span>
            </Heading>
            <LeadText>
              Jasaku adalah penyedia jasa  yang berdedikasi dalam memberikan layanan ac teknisi berkualitas tinggi dengan harga yang murah. Jasaku adalah penyedia jasa  yang berdedikasi dalam memberikan layanan ac teknisi berkualitas tinggi dengan harga yang murah.
            </LeadText>
          </Column>
        </Row>
        <Row reverse>
          <Column>
            <Heading>
              Nikmati Layanan Dengan Teknisi<span style={{ color: "#1D204F" }}>Berkualitas</span>
            </Heading>
            <LeadText>
            Jasaku adalah penyedia jasa  yang berdedikasi dalam memberikan layanan ac teknisi berkualitas tinggi dengan harga yang murah. Jasaku adalah penyedia jasa  yang berdedikasi dalam memberikan layanan ac teknisi berkualitas tinggi dengan harga yang murah.
            </LeadText>
          </Column>
          <Column size="large">
            <Image 
              src="https://via.placeholder.com/100"
              alt="About Us" 
              width="300" 
              height="150" 
            />
          </Column>
        </Row>
      </Container>
    </Section>
  );
};

export default AboutUs;
