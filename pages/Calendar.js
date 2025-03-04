import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("googleAccessToken");

    if (!accessToken) {
      console.error("No access token found. Redirecting to login...");
      window.location.href = "/"; // Redirect to login page if token is missing
      return;
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/GoogleCalendar", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching calendar events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <PageContainer>
      <Header>My Calendar</Header>
      <CalendarContainer>
        {loading ? (
          <PlaceholderText>Loading events...</PlaceholderText>
        ) : events.length > 0 ? (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.summary}</strong> -{" "}
                {event.start?.dateTime || event.start?.date}
              </li>
            ))}
          </ul>
        ) : (
          <PlaceholderText>No events found</PlaceholderText>
        )}
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
  padding: 20px;
  color: white;
  font-size: 1.5rem;
  overflow-y: auto;
`;

const PlaceholderText = styled.p`
  opacity: 0.7;
`;

export default Calendar;
