import { useEffect, useState } from "react";
import api from "../api";
import { toast } from "react-hot-toast";
import ManageCalendarEvent from "./ManageCalendar";

const Home = () => {
  const [events, setEvents] = useState([
    {
      name: "event",
      _id: "hello",
    },
  ]);
  const [isFetching, setISFetching] = useState(false);

  const getEvents = async () => {
    try {
      setISFetching(true);
      const {
        data: { data },
      } = await api.get("/event/events");

      // setEvents(data);
      setISFetching(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Could not fetch data");
    }
  };
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      {" "}
      <ManageCalendarEvent events={events} isFetching={isFetching} getEvents={getEvents} />{" "}
    </>
  );
};

export default Home;
