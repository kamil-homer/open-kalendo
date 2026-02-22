"use server";

import { database } from "@repo/database";
import { revalidatePath } from "next/cache";

export const createArticle = async (data: {
  title: string;
  slug: string;
  content: any; // Json
  link?: string;
  published?: boolean;
}) => {
  try {
    const article = await database.article.create({
      data,
    });

    revalidatePath("/admin/articles");
    revalidatePath("/docs");

    return { data: article };
  } catch (error) {
    return { error: "Failed to create article" };
  }
};
