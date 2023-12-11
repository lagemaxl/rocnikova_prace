import React, { useEffect, useState } from 'react';
import pb from "../lib/pocketbase";
import classes from "~/style/BadgeCard.module.css";

interface Event {
  id: string;
  title: string;
  description: string;
  images: string[]; 
  collectionId: string;
}

async function getEvents(): Promise<Event[]> {
  try {
    const res = await fetch(
      "http://127.0.0.1:8090/api/collections/events/records/",
      { cache: "no-store" }
    );
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const data = await res.json();
    return data?.items || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents().then(setEvents);
  }, []);

  return (
    <div className={classes.home}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export function EventCard({ event }: { event: Event }) {
  const imageUrl = event.images.length > 0 
    ? `http://127.0.0.1:8090/api/files/${event.collectionId}/${event.id}/${event.images[0]}` 
    : 'default_image_path.jpg';

  const shortDescription = event.description.length > 100 
    ? `${event.description.substring(0, 97)}...` 
    : event.description;

  return (
    <div className={classes.card}>
      <img src={imageUrl} alt="Event Image" className={classes.image} />
      <div className={classes.info}>
        <h1>{event.title}</h1>
        <p>{shortDescription}</p>
      </div>
    </div>
  );
}
