import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  participants: [String],
  date: { type: String, required: true },
  time: { type: String, required: true },
  duration: { type: Number, required: true },
  sessionNotes: String,
  googleCalendarEventId: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;