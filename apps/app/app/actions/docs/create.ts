"use server";

import { database } from "@repo/database";
import { revalidatePath } from "next/cache";

export const createDoc = async (data: {
  title: string;
  slug: string;
  content: any; // Json
  link?: string;
  published?: boolean;
}) => {
  try {
    const doc = await database.docs.create({
      data,
    });

    revalidatePath("/admin/docs");
    revalidatePath("/docs");

    return { data: doc };
  } catch (error) {
    return { error: `Failed to create doc, ${error}` };
  }
};
