import prisma from "@/lib/prismadb";

export default async function getAdminSiparis() {
  try {
    const siparis = await prisma.siparis.findMany({
      include: {
        User: true,
      },
    });

    return siparis;
  } catch (error) {
    throw new Error(error);
  }
}
