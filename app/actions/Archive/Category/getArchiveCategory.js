"use server";
import prisma from "@/lib/prismadb";

export default async function getArchiveCategory() {
  try {
    const category = await prisma.category.findMany({
      where: {
        archive: true,
      },
      include: {
        SizeType: true,
        Brand: true,
        CategoryType: true,
      },
    });
    const brand = await prisma.brand.findMany({
      where: {
        archive: true,
      },
    });
    const color = await prisma.color.findMany({
      where: {
        archive: true,
      },
    });
    const size = await prisma.size.findMany({
      where: {
        archive: true,
      },
      include: {
        SizeType: true,
      },
    });

    const data = {
      category: category,
      brand: brand,
      color: color,
      size: size,
    };
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
