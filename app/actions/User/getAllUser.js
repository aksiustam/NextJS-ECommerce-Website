"use server";
import prisma from "@/lib/prismadb";

export default async function getAllUser() {
  try {
    const users = await prisma.user.findMany({
      include: {
        Siparis: true,
      },
    });

    return users;
  } catch (error) {
    throw new Error(error);
  }
}
