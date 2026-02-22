"use server";

import { database } from "@repo/database";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (id: string) => {
  try {
    const article = await database.article.delete({
      where: { id },
    });

    revalidatePath("/admin/articles");
    revalidatePath("/docs");
    revalidatePath(`/docs/${article.slug}`);

    return { success: true };
  } catch (error) {
    return { error: "Failed to delete article" };
  }
};
