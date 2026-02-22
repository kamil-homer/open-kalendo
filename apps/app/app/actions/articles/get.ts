"use server";

import { database } from "@repo/database";

export const getArticles = async () => {
  try {
    const articles = await database.article.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data: articles };
  } catch (error) {
    return { error: "Failed to fetch articles" };
  }
};

export const getArticleBySlug = async (slug: string) => {
  try {
    const article = await database.article.findUnique({
      where: { slug },
    });

    return { data: article };
  } catch (error) {
    return { error: "Failed to fetch article" };
  }
};

export const getArticleById = async (id: string) => {
  try {
    const article = await database.article.findUnique({
      where: { id },
    });

    return { data: article };
  } catch (error) {
    return { error: "Failed to fetch article" };
  }
};
