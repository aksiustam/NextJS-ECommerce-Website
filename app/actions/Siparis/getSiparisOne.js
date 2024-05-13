import prisma from "@/lib/prismadb";

export default async function getSiparisOne(id) {
  try {
    const siparis = await prisma.siparis.findUnique({
      where: {
        id: parseInt(id),
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
