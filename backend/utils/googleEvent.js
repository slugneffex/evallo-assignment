import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;
import dotenv from "dotenv";

dotenv.config();

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  // "http://localhost:3000/oauth2callback"
);

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export async function createGoogleCalendarEvent(event) {
  try {
    console.log({ event });

    const eventDetails = {
      summary: event.title,
      description: event.description,
      start: {
        dateTime: new Date(event.date).toISOString(),
      },
      end: {
        dateTime: new Date(
          new Date(event.date).getTime() + event.duration * 60 * 60 * 1000
        ).toISOString(),
      },
      attendees: event.participants.map((email) => ({ email })),
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: eventDetails,
    });

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw new Error("Failed to create event");
  }
}

export async function updateGoogleCalendarEvent(event) {
  const eventDetails = {
    summary: event.title,
    description: event.description,
    start: {
      dateTime: new Date(event.date).toISOString(),
    },
    end: {
      dateTime: new Date(
        event.date.getTime() + event.duration * 60 * 60 * 1000
      ).toISOString(),
    },
    attendees: event.participants.map((email) => ({ email })),
  };

  const response = await calendar.events.update({
    calendarId: "primary",
    eventId: event.googleEventId, // Assuming you store the Google event ID in your database
    resource: eventDetails,
  });

  return response.data;
}

export async function deleteGoogleCalendarEvent(eventId) {
  await calendar.events.delete({
    calendarId: "primary",
    eventId: eventId,
  });
}
