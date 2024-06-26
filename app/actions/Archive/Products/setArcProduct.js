"use server";
import prisma from "@/lib/prismadb";

export default async function setArcProduct(data) {
  try {
    await prisma.product.update({
      where: { id: data.id },
      data: {
        archive: false,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
