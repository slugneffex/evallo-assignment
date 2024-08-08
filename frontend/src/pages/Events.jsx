import React from "react";
import BigCalendar from "../components/BigCalendar";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import api from "../api";
import LoadingPage from "../components/loading/loading";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [isFetching, setISFetching] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getEvents = async () => {
    try {
      setISFetching(true);
      const {
        data: { data },
      } = await api.get("/event/events");

      const eventlist = data
        ?.map((item) => {
          // Combine the date and time strings into a single valid date-time string
          const dateTimeString = `${item.date}T${item.time}`;
          const currentDate = new Date(dateTimeString);

          // Ensure the date is valid
          if (isNaN(currentDate)) {
            console.error("Invalid date:", dateTimeString);
            return null;
          }

          const durationInMs = item.duration * 60 * 60 * 1000; // Convert duration from hours to milliseconds

          return {
            ...item,
            id: item._id,
            title: item.title,
            start: currentDate, // Start time
            end: new Date(currentDate.getTime() + durationInMs), // End time is start time plus duration
          };
        })
        .filter(Boolean); // Filter out any invalid dates

      setEvents(eventlist);
      setISFetching(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Could not fetch data");
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  console.log({ events });

  return (
    <div>
      {isFetching ? (
        <LoadingPage />
      ) : (
        <BigCalendar
          setSelectedDate={setSelectedDate}
          selectedDate={selectedDate}
          myEventsList={events}
        />
      )}
    </div>
  );
};

export default Events;
