import Event from "../models/event.model.js";
import {
  createGoogleCalendarEvent,
  updateGoogleCalendarEvent,
  deleteGoogleCalendarEvent,
} from "../utils/googleEvent.js";

//create
export const createEvent = async (req, res) => {
  try {
    const event = await Event.create({ ...req.body, userId: req.user._id });

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

//get
export const getEvent = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getParticularEvent = async (req, res) => {
  try {
    const events = await Event.findOne({ _id: req.params.id });
    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//update
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }

    // Sync with Google Calendar
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(400).send(error);
  }
};

//delete
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send({ message: "Event not found" });
    }

    // Sync with Google Calendar
    // await deleteGoogleCalendarEvent(event.googleEventId);
    res.status(200).send({ message: "Event deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};
