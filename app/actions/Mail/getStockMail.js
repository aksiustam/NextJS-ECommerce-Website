"use server";
import prisma from "@/lib/prismadb";

export default async function getStockMail() {
  try {
    const mail = await prisma.StockMail.findMany({
      include: {
        Product: true,
      },
    });

    return mail;
  } catch (error) {
    throw new Error(error);
  }
}
