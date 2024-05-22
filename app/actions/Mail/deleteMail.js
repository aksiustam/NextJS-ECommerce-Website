"use server";
import prisma from "@/lib/prismadb";

export default async function deleteMail(role, data) {
  try {
    switch (role) {
      case "stock":
        await prisma.StockMail.delete({
          where: {
            id: data.id,
          },
        });
        break;

      case "news":
        await prisma.NewsMail.delete({
          where: {
            id: data.id,
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
