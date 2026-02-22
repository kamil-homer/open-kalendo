"use server";

import { database } from "@repo/database";

export const getEvents = async () => {
  try {
    const events = await database.event.findMany({
      orderBy: {
        date: "asc",
      },
    });

    return { data: events };
  } catch (error) {
    return { error: "Failed to fetch events" };
  }
};

export const getEventById = async (id: string) => {
  try {
    const event = await database.event.findUnique({
      where: { id },
    });

    return { data: event };
  } catch (error) {
    return { error: "Failed to fetch event" };
  }
};
