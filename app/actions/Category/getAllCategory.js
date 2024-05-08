import prisma from "@/lib/prismadb";

export default async function getAllCategory() {
  try {
    const category = await prisma.category.findMany({
      where: {
        archive: false,
      },
      include: {
        SizeType: true,
        Brand: true,
      },
    });
    const brand = await prisma.brand.findMany({
      where: {
        archive: false,
      },
    });
    const color = await prisma.color.findMany({
      where: {
        archive: false,
      },
    });
    const size = await prisma.size.findMany({
      where: {
        archive: false,
      },
      include: {
        SizeType: true,
      },
    });
    const sizetype = await prisma.SizeType.findMany();
    const data = {
      category: category,
      brand: brand,
      color: color,
      sizetype: sizetype,
      size: size,
    };
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
