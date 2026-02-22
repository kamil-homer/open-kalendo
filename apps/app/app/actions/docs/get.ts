"use server";

import { database } from "@repo/database";

export const getDocs = async () => {
  try {
    const articles = await database.doc.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return { data: articles };
  } catch (error) {
    return { error: `Failed to fetch docs, ${error}` };
  }
};

export const getDocBySlug = async (slug: string) => {
  try {
    const doc = await database.doc.findUnique({
      where: { slug },
    });

    return { data: doc };
  } catch (error) {
    return { error: `Failed to fetch doc, ${error}` };
  }
};

export const getDocById = async (id: string) => {
  try {
    const doc = await database.doc.findUnique({
      where: { id },
    });

    return { data: doc };
  } catch (error) {
    return { error: `Failed to fetch doc, ${error}` };
  }
};
