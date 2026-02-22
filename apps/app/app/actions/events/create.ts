"use server";

import { database } from "@repo/database";
import { revalidatePath } from "next/cache";

export const createEvent = async (data: {
  title: string;
  description?: string;
  date: Date;
  location?: string;
  link?: string;
  published?: boolean;
}) => {
  try {
    const event = await database.event.create({
      data,
    });

    revalidatePath("/admin/events");
    revalidatePath("/events");

    return { data: event };
  } catch (error) {
    return { error: "Failed to create event" };
  }
};
