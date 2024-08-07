import express from "express";
const router = express.Router();
import {
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

// Create event
router.post("/events", createEvent);

// Get all events for a user
router.get("/events/:userId", getEvent);

// Update event
router.put("/events/:id", updateEvent);

// Delete event
router.delete("/events/:id", deleteEvent);

export default router;