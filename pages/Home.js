"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Home = () => {
  return (
    <Section>
      <Container>
        <StopwatchContainer>
          <h2>Stopwatch</h2>
          <Stopwatch />
        </StopwatchContainer>
        
        <WelcomeMessage>
          <Header>Welcome to Snapper’s Study Space!</Header>
          <SubHeader>Stay focused and make the most of your study time.</SubHeader>
        </WelcomeMessage>
        
        <TimerContainer>
          <h2>Timer</h2>
          <Timer />
        </TimerContainer>
      </Container>
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
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F9ECCC;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  max-width: 900px;
`;

const StopwatchContainer = styled.div`
  text-align: center;
`;

const TimerContainer = styled.div`
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

export default Home;
