import React, { useState, ChangeEvent } from "react";
import { TextInput, Textarea, FileInput, Button } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import classes from "~/style/NewEvent.module.css";
import pb from "../lib/pocketbase";

type FormData = {
  title: string;
  description: string;
  image: File | null;
  from_date: Date | null;
  to_date: Date | null;
  place: string;
  owner: string;
};

export default function NewEvent() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    image: null,
    from_date: null,
    to_date: null,
    place: "",
    owner: "oj9iuh2dajc5edo",
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
      // Process successful result
      console.log("Event created:", record);
    } catch (error) {
      console.error("Failed to create event:", error);
      // Process error
    }
  };

  return (
    <div className={classes.content}>
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <TextInput
            required
            label="Event Title"
            placeholder="Enter event title"
            value={formData.title}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange("title")(event.currentTarget.value)
            }
          />
          <Textarea
            required
            label="Description"
            placeholder="Enter event description"
            value={formData.description}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              handleChange("description")(event.currentTarget.value)
            }
          />
          <FileInput
            label="Event Image"
            placeholder="Upload an image"
            onChange={(file: File | null) => handleChange("image")(file)}
          />
          <DateTimePicker
            valueFormat="YYYY-MM-DD HH:mm:ss"
            label="Start Date and Time"
            placeholder="Select start date"
            value={formData.from_date}
            onChange={(date: Date | null) => handleChange("from_date")(date)}
          />
          <DateTimePicker
            valueFormat="YYYY-MM-DD HH:mm:ss"
            label="End Date and Time"
            placeholder="Select end date"
            value={formData.to_date}
            onChange={(date: Date | null) => handleChange("to_date")(date)}
          />
          <TextInput
            required
            label="Location"
            placeholder="Enter event location"
            value={formData.place}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              handleChange("place")(event.currentTarget.value)
            }
          />
          <Button type="submit">
            Submit Event
          </Button>
        </form>
      </div>
    </div>
  );
}