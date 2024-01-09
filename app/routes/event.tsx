import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "~/style/Event.module.css";
import { Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";

// Helper function to parse query parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const images = [
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
];

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

let MapContainer: typeof import("react-leaflet")["MapContainer"];
let TileLayer: typeof import("react-leaflet")["TileLayer"];
let Marker: typeof import("react-leaflet")["Marker"];
let useMapEvents: typeof import("react-leaflet")["useMapEvents"];

if (typeof window !== "undefined") {
  const leaflet = require("react-leaflet");
  MapContainer = leaflet.MapContainer;
  TileLayer = leaflet.TileLayer;
  Marker = leaflet.Marker;
  useMapEvents = leaflet.useMapEvents;
  require("leaflet/dist/leaflet.css");
}

export default function EventDetails() {
  const navigate = useNavigate();
  const query = useQuery();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const eventId = query.get("id");
    if (eventId) {
      getEvent(eventId).then(setEvent);
    } else {
      navigate("/app/home"); // Redirect if no ID is found
    }
  }, [query]);

  if (!event) {
    return <div>Načítání...</div>;
  }

  const Markers = () => {
    // <Marker position={[location.latitude, location.longitude]} interactive={false} />;
  };

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={400} />
    </Carousel.Slide>
  ));

  return (
    <div className={classes.content}>
      <Carousel
        slideSize="100%"
        height="50%"
        slideGap="md"
        controlSize={29}
        loop
        withIndicators
        className={classes.carouselcon}
        classNames={{
          root: classes.carousel,
          controls: classes.carouselControls,
          indicator: classes.carouselIndicator,
        }}
      >
        {slides}
      </Carousel>
      <div className={classes.container}>
        <div className={classes.text}>
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p>{event.place}</p>
          {formatDate(event.from_date)} - {formatDate(event.to_date)}
        </div>

        <div className={classes.map}>
          {typeof window !== "undefined" && (
            <MapContainer
              center={[50.6594, 14.0416]}
              zoom={13}
              className={classes.map}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {/*<Markers /> */}
            </MapContainer>
          )}
        </div>
      </div>
    </div>
  );
}
