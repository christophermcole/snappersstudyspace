"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { auth } from "../library/firebase";
import GoogleAuth from "../components/googleauth"; // Ensure correct import

const LandingPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Section>
      <Overlay>
        <Container>
          <HeroTextColumn>
            <Header>Welcome to Snapper’s Study Space!</Header>
            <SubheaderAndStarsColumn>
              <SubHeader>A personalized study hub for you!</SubHeader>
              <SubHeader>Sign in to access the rest of the space.</SubHeader>
              {user ? (
                <>
                  <UserInfo>
                    <ProfileImage src={user.photoURL} alt="User Profile" />
                    <p>Signed in as {user.displayName}</p>
                    <CTAButton onClick={() => auth.signOut()}>Sign Out</CTAButton>
                  </UserInfo>
                </>
              ) : (
                <GoogleAuth />
              )}
            </SubheaderAndStarsColumn>
          </HeroTextColumn>
        </Container>
      </Overlay>
    </Section>
  );
};

// Styled components
const Section = styled.section`
  background: #32643F;
  border: 15px solid #1E2F23;
  border-radius: 35px;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F9ECCC;
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
  margin-bottom: 10px;
  white-space: nowrap;
  text-align: center;
`;

const SubHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2px;
  margin-top: 0px;
  text-align: center;
`;

const SubheaderAndStarsColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CTAButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #1E2F23;
  color: #F9ECCC;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color:rgb(11, 17, 13);
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export default LandingPage;