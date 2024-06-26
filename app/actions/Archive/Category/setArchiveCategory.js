"use server";
import prisma from "@/lib/prismadb";

export default async function setArchiveCategory(role, data) {
  try {
    const catbrand = role;

    switch (catbrand) {
      case "category":
        await prisma.category.update({
          where: { id: data.id },
          data: {
            archive: false,
          },
        });

        break;
      case "brand":
        await prisma.brand.update({
          where: { id: data.id },
          data: {
            archive: false,
          },
        });

        break;
      case "color":
        await prisma.color.update({
          where: { id: data.id },
          data: {
            archive: false,
          },
        });

        break;
      case "size":
        await prisma.size.update({
          where: { id: data.id },
          data: {
            archive: false,
          },
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
