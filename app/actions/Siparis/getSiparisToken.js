"use server";
import prisma from "@/lib/prismadb";

export default async function getSiparisToken(token) {
  try {
    const siparis = await prisma.siparis.findFirst({
      where: {
        token: token,
      },
      include: {
        User: true,
      },
    });

    return siparis;
  } catch (error) {
    throw new Error(error);
  }
}
