import { google } from "googleapis";
const OAuth2 = google.auth.OAuth2;

export const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/oauth2callback" // your redirect URL
);

const calendar = google.calendar({ version: "v3", auth: oauth2Client });

export async function createGoogleCalendarEvent(event) {
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

  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: eventDetails,
  });

  return response.data;
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
