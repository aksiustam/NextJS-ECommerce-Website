"use server";
import prisma from "@/lib/prismadb";

export default async function setSettings(role, formData) {
  try {
    await prisma.Ayarlar.update({
      where: {
        id: 1,
      },
      data: {
        settings: formData,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
