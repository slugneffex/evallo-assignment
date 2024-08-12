import express from "express";
const router = express.Router();
import {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getParticularEvent,
} from "../controllers/event.controller.js";

// Create event
router.post("/", createEvent);

// Get all events for a user
router.get("/events", getEvent);


// Get all events for a user
router.get("/:id", getParticularEvent);

// Update event
router.put("/:id", updateEvent);

// Delete event
router.delete("/:id", deleteEvent);

export default router;