import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/index";
import { useEffect, useState } from "react";

const EventForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [isFetching, setISFetching] = useState(false);
  const [events, setEvents] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({});

  const getParticularEvents = async () => {
    try {
      if (!id) return;
      setISFetching(true);
      const {
        data: { data },
      } = await api.get(`/event/${id}`);

      setEvents(data);
      reset({ ...data, participants: data?.participants?.join(",") });
      setISFetching(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Could not fetch data");
    }
  };
  useEffect(() => {
    getParticularEvents();
  }, [id]);

  const onSubmit = async (data) => {
    if (!data?._id) {
      try {
        const formattedData = {
          ...data,
          participants: data.participants.split(",").map((p) => p.trim()),
        };
        await api.post("/event", formattedData);
        toast.success("Event created successfully!");
        reset(); // Reset the form after successful submission
        navigate("/"); // Redirect to events page
      } catch (error) {
        toast.error("Failed to create event.");
        console.error(error);
      }
    } else {
      try {
        console.log({ data });

        const formattedData = {
          ...data,
          participants: data?.participants?.split(",").map((p) => p.trim()),
        };
        await api.put(`/event/${id}`, formattedData);
        toast.success("Event Edit successfully!");
        reset(); // Reset the form after successful submission
        navigate("/"); // Redirect to events page
      } catch (error) {
        toast.error("Failed to edit event.");
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">
        {id ? "Edit" : "Create"} Event
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Participants */}
        <div className="mb-4">
          <label
            htmlFor="participants"
            className="block text-sm font-medium text-gray-700"
          >
            Participants (comma-separated emails)
          </label>
          <input
            type="text"
            {...register("participants")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        {/* Time */}
        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Time
          </label>
          <input
            type="time"
            {...register("time", { required: "Time is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
          )}
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700"
          >
            Duration (hours)
          </label>
          <input
            type="number"
            step="0.1"
            {...register("duration", {
              required: "Duration is required",
              min: 0.1,
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.duration && (
            <p className="text-red-500 text-sm mt-1">
              {errors.duration.message}
            </p>
          )}
        </div>

        {/* Session Notes */}
        <div className="mb-4">
          <label
            htmlFor="sessionNotes"
            className="block text-sm font-medium text-gray-700"
          >
            Session Notes
          </label>
          <textarea
            {...register("sessionNotes")}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {id ? "Edit" : "Create"} Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;
