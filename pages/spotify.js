"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import withAuth from "@/components/withAuth";


const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #32643F;
    font-family: Arial, sans-serif;
  }
`;

const SpotifyPage = () => {
    const router = useRouter();
    const { token } = router.query;
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (token) {
            fetch(`/api/profile?token=${token}`)
                .then(res => res.json())
                .then(data => setProfile(data));
        }
    }, [token]);

    return (
        <Container>
            <GlobalStyle />
            {profile ? (
                <CenteredContainer>
                    <Header>
                        <ProfilePic src={profile.images?.[0]?.url} alt="Profile" />
                        <h1>Welcome, {profile.display_name}!</h1>
                    </Header>
                    
                    <SpotifyEmbed 
                        src="https://open.spotify.com/embed/playlist/37i9dQZF1DX8Uebhn9wzrS"
                        frameBorder="0"
                        allow="encrypted-media">
                    </SpotifyEmbed>
                </CenteredContainer>
            ) : (
                <LoginContainer>
                    <SnapperImage>
                        <Image 
                            src="/snappermusic.png" 
                            alt="Snapper Music" 
                            width={300} 
                            height={300} 
                        />
                    </SnapperImage>
                    <LoginButton href="/api/login">Login with Spotify</LoginButton>
                </LoginContainer>
            )}
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    padding: 20px;
    background-color: #32643F;
    color: #F9ECCC;
`;

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;
    padding: 20px;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
`;

const ProfilePic = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 3px solid #F9ECCC;
`;

const SpotifyEmbed = styled.iframe`
    border-radius: 12px;
    width: 80%;
    max-width: 1200px;
    height: 70vh;
    margin-top: 20px;
`;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #1E2F23;
    padding: 30px;
    border-radius: 20px;
`;

const SnapperImage = styled.div`
    margin-bottom: 20px;
`;

const LoginButton = styled.a`
    padding: 12px 24px;
    background-color: #32643F;
    color: #F9ECCC;
    text-decoration: none;
    border-radius: 50px;
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 20px;
    transition: background 0.3s ease;

    &:hover {
        background-color: #1E2F23;
    }
`;

export default withAuth(SpotifyPage);
