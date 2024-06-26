"use server";
import prisma from "@/lib/prismadb";

export default async function getSlugCategory(slug) {
  try {
    const category = await prisma.category.findFirst({
      where: {
        slug: slug,
        archive: false,
      },
      include: {
        SizeType: true,
        Brand: true,
        CategoryType: true,
      },
    });

    if (category) return category;
    else return null;
  } catch (error) {
    throw new Error(error);
  }
}
