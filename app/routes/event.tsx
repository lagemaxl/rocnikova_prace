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


function formatDate(dateStr: string): string {
  // Vytvoření Date objektu z ISO řetězce
  const date = new Date(dateStr);

  // Nastavení lokalizace a formátu
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  // Formátování data do požadovaného formátu
  return date.toLocaleString("cs-CZ", options).replace(",", "");
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
      navigate('/app/home'); // Redirect if no ID is found
    }
  }, [query]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.content}>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.place}</p>
      {formatDate(event.from_date)} - {formatDate(event.to_date)}
    </div>
  );
}
