"use server";

import { database } from "@repo/database";
import { revalidatePath } from "next/cache";

export const deleteDoc = async (id: string) => {
  try {
    const article = await database.docs.delete({
      where: { id },
    });

    revalidatePath("/admin/docs");
    revalidatePath("/docs");
    revalidatePath(`/docs/${article.slug}`);

    return { success: true };
  } catch (error) {
    return { error: `Failed to delete doc, ${error}` };
  }
};
