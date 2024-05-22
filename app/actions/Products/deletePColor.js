"use server";
import prisma from "@/lib/prismadb";

export default async function deletePColor(id) {
  try {
    await prisma.ProductColorSize.delete({
      where: {
        id: id,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
