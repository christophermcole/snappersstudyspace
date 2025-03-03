import React from 'react';
import styled from 'styled-components';

const CalendarPage = () => {
  return (
    <PageContainer>
      <Header>My Calendar</Header>
      <CalendarContainer>
        <PlaceholderText>Google Calendar will be integrated here...</PlaceholderText>
      </CalendarContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  background: #32643f;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #f9eccc;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const CalendarContainer = styled.div`
  width: 80%;
  height: 70vh;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
`;

const PlaceholderText = styled.p`
  opacity: 0.7;
`;

export default CalendarPage;
