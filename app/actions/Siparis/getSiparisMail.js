"use server";
import prisma from "@/lib/prismadb";

export default async function getSiparisMail(mail) {
  try {
    const siparis = await prisma.siparis.findMany({
      where: {
        email: mail,
      },
    });
    if (siparis.length === 0)
      return { message: "Vous n'avez pas de commande en attente !" };

    return siparis;
  } catch (error) {
    throw new Error(error);
  }
}
