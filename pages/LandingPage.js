import React from 'react';
import styled from 'styled-components';

const LandingPage = () => {
  return (
    <Section>
      <Overlay>
        <Container>
          <HeroTextColumn>
            <Header>Welcome to Snapper’s Study Space!</Header>
            <SubheaderAndStarsColumn>
              <SubHeader>a personalized study hub for you!</SubHeader>
              <CTAButton>sign in to study</CTAButton>
            </SubheaderAndStarsColumn>
          </HeroTextColumn>
        </Container>
      </Overlay>
    </Section>
  );
};

const Section = styled.section`
  background: linear-gradient(to bottom right, #0b3d02, #1a5e20);
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Container = styled.div`
  max-width: 600px;
  padding: 20px;
  text-align: center;
`;

const HeroTextColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  white-space: nowrap;
  text-align: center;
`;

const Highlight = styled.span`
  color: #9acd32;
  font-weight: bold;
`;

const SubHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
  color: #3cb371;
`;

const SubheaderAndStarsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CTAButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #2e8b57;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: #3cb371;
  }
`;

export default LandingPage;
