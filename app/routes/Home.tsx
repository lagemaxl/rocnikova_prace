import React, { useEffect, useState } from "react";
import pb from "../lib/pocketbase";
import classes from "~/style/BadgeCard.module.css";
import { IconMapPin, IconCalendarEvent } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

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

interface UserData {
  id?: string;
  avatar?: string;
  name?: string;
  surname?: string;
  username?: string;
}

async function getEvents(): Promise<Event[]> {
  try {
    const res = await fetch(
      "http://127.0.0.1:8090/api/collections/events/records/",
      //`${process.env.DATABASE_URL_STRING}/api/collections/events/records/`,
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
  const imageUrl = `http://127.0.0.1:8090/api/files/${event.collectionId}/${event.id}/${event.image}`;

  const shortDescription =
    event.description.length > 100
      ? `${event.description.substring(0, 97)}...`
      : event.description;

  const [dataUser, setDataUser] = useState<UserData | null>(null);
  const [eventUsers, setEventUsers] = useState<{ users: string[] }>({
    users: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8090/api/collections/users/records/${pb?.authStore?.model?.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData: UserData = await response.json();
        setDataUser(jsonData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    if (pb.authStore.isValid) {
      fetchData();
    }
  }, [pb?.authStore?.isValid]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8090/api/collections/events/records/${event.id}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setEventUsers(jsonData);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, []);

  const data = {
    users: [
      ...eventUsers.users.filter(user => user !== dataUser?.id),
    ],
  };
  
  const isUserInEvent = eventUsers.users.includes(dataUser?.id ?? '');
  
  const handleJoinEvent = async (eventId:string) => {
    // If the user is in the event, remove them
    if (isUserInEvent) {
      data.users = eventUsers.users.filter(user => user !== dataUser?.id);
    } 
    // Otherwise, add them to the event
    else {
      data.users = [dataUser?.id ?? '', ...eventUsers.users];
    }
  
    // Update the event data
    await pb.collection("events").update(eventId, data);
  
    // After updating, re-fetch the event users data
    try {
      const response = await fetch(
        `http://127.0.0.1:8090/api/collections/events/records/${eventId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setEventUsers(jsonData); // Update the event users state
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  
  const navigate = useNavigate();
  const handleAboutEvent = async (eventId: string) => {
    navigate(`/app/event?id=${eventId}`);
  };

  return (
    <div className={classes.card}>
      <div className={classes.cardcontent}>
        <div className={classes.imgcontainer}>
          <img src={imageUrl} alt="Event Image" className={classes.image} />
        </div>
        <div className={classes.info}>
          <h1>{event.title}</h1>
          <p>{shortDescription}</p>
          <div className={classes.icontext}>
            <IconMapPin /> {event.place}
          </div>
          <div className={classes.icontext}>
            <IconCalendarEvent />
            <p>
              {formatDate(event.from_date)} - {formatDate(event.to_date)}
            </p>
          </div>
        </div>
      </div>
      <div className={classes.buttons}>
        {isUserInEvent ? (
          <button
            className={classes.buttonjoinNO}
            onClick={() => handleJoinEvent(event.id)}
          >
            Už nemám zájem
          </button>
        ) : (
          <button
            className={classes.buttonjoin}
            onClick={() => handleJoinEvent(event.id)}
          >
            Mám zájem
          </button>
        )}
        <button
          className={classes.buttonabout}
          onClick={() => handleAboutEvent(event.id)}
        >
          Více informací
        </button>
      </div>
    </div>
  );
  
}
