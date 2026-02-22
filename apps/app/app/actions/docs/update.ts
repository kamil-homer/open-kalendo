"use server";

import { database } from "@repo/database";
import { revalidatePath } from "next/cache";

export const updateDoc = async (
  id: string,
  data: {
    title?: string;
    slug?: string;
    content?: any;
    link?: string;
    published?: boolean;
  }
) => {
  try {
    const doc = await database.docs.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/docs");
    revalidatePath(`/admin/docs/${doc.slug}`);
    revalidatePath("/docs");
    revalidatePath(`/docs/${doc.slug}`);

    return { data: doc };
  } catch (error) {
    return { error: `Failed to update doc, ${error}` };
  }
};
