import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "~/style/NewEvent.module.css";

// Helper function to parse query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  collectionId: string;
  from_date: string;
  to_date: string;
  owner: string;
  place: string;
}

async function getEvent(eventId: string): Promise<Event | null> {
  try {
    const res = await fetch(
      `http://127.0.0.1:8090/api/collections/events/records/${eventId}`,
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
}

export default function EventDetails() {
  const navigate = useNavigate();
  const query = useQuery();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const eventId = query.get('id');
    if (eventId) {
      getEvent(eventId).then(setEvent);
    } else {
      navigate('/path-to-redirect-if-no-id'); // Redirect if no ID is found
    }
  }, [query]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.content}>
      <h1>Event Details</h1>
      <p>{event.title}</p>
      {/* Add more details as needed */}
    </div>
  );
}
