import React, { useState, useEffect } from "react";

const CalendarEvents = ({ accessToken }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!accessToken) return;

    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/GoogleCalendar", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await response.json();
        setEvents(data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [accessToken]);

  return (
    <div>
      <h2>Google Calendar Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.summary}</strong> - {event.start?.dateTime || event.start?.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarEvents;
