"use server";

import { database } from "@repo/database";
import { revalidatePath } from "next/cache";

export const deleteEvent = async (id: string) => {
  try {
    await database.event.delete({
      where: { id },
    });

    revalidatePath("/admin/events");
    revalidatePath("/events");

    return { success: true };
  } catch (error) {
    return { error: "Failed to delete event" };
  }
};
