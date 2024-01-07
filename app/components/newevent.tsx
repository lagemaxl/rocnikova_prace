import React, { useState, useEffect, ChangeEvent } from "react";
import { TextInput, Textarea, FileInput, Button } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import classes from "~/style/NewEvent.module.css";
import pb from "../lib/pocketbase";
import "@mantine/dates/styles.css";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

// Dynamic imports for Leaflet components
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

type FormData = {
  title: string;
  description: string;
  image: File | null;
  from_date: Date | null;
  to_date: Date | null;
  place: string;
  owner: string;
  location: [number, number];
};

export default function NewEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    image: null,
    from_date: null,
    to_date: null,
    place: "",
    owner: "oj9iuh2dajc5edo",
    location: [50.6594, 14.0416],
  });
  const handleChange =
    (field: keyof FormData) => (value: string | Date | File | null) => {
      setFormData({ ...formData, [field]: value });
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    if (formData.from_date) {
      data.append("from_date", formData.from_date.toISOString());
    }
    if (formData.to_date) {
      data.append("to_date", formData.to_date.toISOString());
    }
    data.append("place", formData.place);
    data.append("owner", formData.owner);

    if (formData.image) {
      data.append("image", formData.image, formData.image.name);
    }

    try {
      const record = await pb.collection("events").create(data);
      navigate("/app/home");
      console.log("Event created:", record);
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      require("leaflet/dist/leaflet.css");
    }
  }, []);

  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        setFormData({ ...formData, location: [e.latlng.lat, e.latlng.lng] });
      },
    });

    console.log(formData.location);

    return formData.location ? (
      <Marker position={formData.location} interactive={false} />
    ) : null;
  };

  return (
    <div className={classes.content}>
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <TextInput
            required
            label="Název"
            placeholder="Napište název události"
            value={formData.title}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange("title")(event.currentTarget.value)
            }
          />
          <Textarea
            required
            label="Popis"
            placeholder="Napište popis události"
            value={formData.description}
            className={classes.input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              handleChange("description")(event.currentTarget.value)
            }
          />
          <FileInput
            required
            label="Obrázek"
            placeholder="Nahrajte obrázek události"
            className={classes.input}
            onChange={(file: File | null) => handleChange("image")(file)}
          />
          <DateTimePicker
            required
            valueFormat="YYYY-MM-DD HH:mm:ss"
            label="Od"
            placeholder="Vyberte datum a čas začátku události"
            value={formData.from_date}
            className={classes.input}
            onChange={(date: Date | null) => handleChange("from_date")(date)}
          />
          <DateTimePicker
            required
            valueFormat="YYYY-MM-DD HH:mm:ss"
            label="Do"
            placeholder="Vyberte datum a čas konce události"
            className={classes.input}
            value={formData.to_date}
            onChange={(date: Date | null) => handleChange("to_date")(date)}
          />
          <TextInput
            required
            label="Místo"
            placeholder="Napište místo konání události"
            value={formData.place}
            className={classes.input}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange("place")(event.currentTarget.value)
            }
          />
          <Button type="submit" className={classes.input}>
            Přidat událost
          </Button>
        </form>
      </div>
      <div className={classes.container}>
        {typeof window !== "undefined" && (
          <MapContainer
            center={[50.6594, 14.0416]}
            zoom={13}
            className={classes.map}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Markers />
          </MapContainer>
        )}

        <p>Na mapě označte přesné místo konání akce</p>
      </div>
    </div>
  );
}
