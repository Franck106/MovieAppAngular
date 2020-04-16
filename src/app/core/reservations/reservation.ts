import { JSONSchema } from "@ngx-pwa/local-storage";

export interface Reservation {
  movieTitle: string;
  theaterTitle: string;
  scheduleId: number;
  scheduleHour: string;
}

export const reservationSchema: JSONSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      movieTitle: { type: "string" },
      theaterTitle: { type: "string" },
      scheduleId: { type: "number" },
      scheduleHour: { type: "string" },
    },
    required: ["movieTitle", "theaterTitle", "scheduleId", "scheduleHour"],
  },
};
