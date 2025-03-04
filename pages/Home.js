"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Image from "next/image";
import { createGlobalStyle } from "styled-components";
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
    overflow: hidden; /* Ensures no scrolling */
    background-color: #32643F; /* Matches your background */
  }
`;

const Home = () => {
  return (
    <Section>
      <VerticalContainer>
        <WelcomeContainer>
          <WelcomeMessage>
            <Header>Welcome to Snapper’s Study Space!</Header>
            <SubHeader>Stay focused and make the most of your study time.</SubHeader>
          </WelcomeMessage>
        </WelcomeContainer>
        <Container>
          <TitleContainer>
            <h2>Stopwatch</h2>
            <StopwatchContainer>
              <Stopwatch />
            </StopwatchContainer>
          </TitleContainer>

          <div>
          <Image src="/SnapperStudying.png" alt="SnapperStudying" width={500} height={500} style={{ maxWidth: "100%", height: "auto", display: "block" }} />
          </div>

          <TitleContainer>
            <h2>Pomodoro Timer</h2>
            <TimerContainer>
              <Timer />
            </TimerContainer>
          </TitleContainer>
        </Container>
        <Text>The Pomodoro Technique involves working for 25 minutes, followed by a 5-minute break, with a longer break after four cycles. Give it a try!</Text>
      </VerticalContainer>
    </Section>
  );
};

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => setTime((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <TimeContainer>
      <TimeDisplay>{new Date(time * 1000).toISOString().substr(11, 8)}</TimeDisplay>
      <ButtonRow>
        <CTAButton onClick={() => setRunning(!running)}>{running ? "Pause" : "Start"}</CTAButton>
        <CTAButton onClick={() => { setTime(0); setRunning(false); }}>Reset</CTAButton>
      </ButtonRow>
    </TimeContainer>
  );
};

const Timer = () => {
  const [time, setTime] = useState(1500);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running && time > 0) {
      interval = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  return (
    <TimeContainer>
      <TimeDisplay>{new Date(time * 1000).toISOString().substr(14, 5)}</TimeDisplay>
      <ButtonRow>
        <CTAButton onClick={() => setRunning(!running)}>{running ? "Pause" : "Start"}</CTAButton>
        <CTAButton onClick={() => { setTime(1500); setRunning(false); }}>Reset</CTAButton>
      </ButtonRow>
    </TimeContainer>
  );
};

// Styled Components
const Section = styled.section`
  background: #32643F;
  border: 15px solid #1E2F23;
  border-radius: 35px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F9ECCC;
  margin: 0;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
`;



const VerticalContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw; 
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
`;



const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 100vw;
  gap: 50px;
  flex-wrap: wrap; 
  overflow: hidden;
  box-sizing: border-box;
`;



const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
  max-width: 250px;
`;

const StopwatchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #32643F;
  border: 15px solid #1E2F23;
  border-radius: 35px;
  width: 300px;
  height: 20vh;
  color: #F9ECCC;
`;

const TimerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #32643F;
  border: 15px solid #1E2F23;
  border-radius: 35px;
  width: 300px;
  height: 20vh;
  color: #F9ECCC;
`;

const WelcomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #F9ECCC;
  line-height: 1.5;
  max-width: 500px;
  text-align: center;
`;

const WelcomeMessage = styled.div`
  text-align: center;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SubHeader = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const TimeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const TimeDisplay = styled.span`
  font-size: 2rem;
  font-family: monospace;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
`;

const CTAButton = styled.button`
  padding: 10px 20px;
  width: 100px;
  font-size: 1.2rem;
  background-color: #1E2F23;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: rgb(11, 17, 13);
  }
`;

export default withAuth(Home);
