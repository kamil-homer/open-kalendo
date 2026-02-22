"use server";

import { database } from "@repo/database";
import { revalidatePath } from "next/cache";

export const updateEvent = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    date?: Date;
    location?: string;
    link?: string;
    published?: boolean;
  }
) => {
  try {
    const event = await database.event.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/events");
    revalidatePath(`/admin/events/${id}`);
    revalidatePath("/events");
    revalidatePath(`/events/${id}`);

    return { data: event };
  } catch (error) {
    return { error: "Failed to update event" };
  }
};
