"use server";
import prisma from "@/lib/prismadb";

export default async function delArchiveCategory(role, data) {
  try {
    const catbrand = role;

    switch (catbrand) {
      case "category":
        await prisma.category.delete({
          where: { id: data.id },
        });

        break;
      case "brand":
        await prisma.brand.delete({
          where: { id: data.id },
        });

        break;
      case "color":
        await prisma.color.delete({
          where: { id: data.id },
        });

        break;

      case "size":
        await prisma.size.delete({
          where: { id: data.id },
        });

        break;

      default:
        break;
    }
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
