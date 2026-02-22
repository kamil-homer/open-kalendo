"use server";

import { database } from "@repo/database";
import { revalidatePath } from "next/cache";

export const updateArticle = async (
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
    const article = await database.article.update({
      where: { id },
      data,
    });

    revalidatePath("/admin/articles");
    revalidatePath(`/admin/articles/${article.slug}`);
    revalidatePath("/docs");
    revalidatePath(`/docs/${article.slug}`);

    return { data: article };
  } catch (error) {
    return { error: "Failed to update article" };
  }
};
