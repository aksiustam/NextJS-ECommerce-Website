"use server";
import prisma from "@/lib/prismadb";

export default async function getNewsMail() {
  try {
    const mail = await prisma.NewsMail.findMany();

    return mail;
  } catch (error) {
    throw new Error(error);
  }
}
