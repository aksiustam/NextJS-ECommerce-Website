"use server";
import prisma from "@/lib/prismadb";

export default async function getAllUser() {
  try {
    const mail = await prisma.NewsMail.findMany();

    return mail;
  } catch (error) {
    throw new Error(error);
  }
}
