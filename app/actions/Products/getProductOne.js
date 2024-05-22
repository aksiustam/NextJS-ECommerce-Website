"use server";
import prisma from "@/lib/prismadb";

export default async function getProductOne(id) {
  try {
    const productsWithDetails = await prisma.product.findFirst({
      where: {
        id: parseInt(id),
        archive: false,
      },
      include: {
        ParcelGram: true,
        Category: {
          include: {
            CategoryType: true,
            SizeType: true,
          },
        },
        Brand: true,
        ProductColorSize: {
          include: {
            Color: true,
            SizeStock: {
              include: {
                Size: true,
              },
            },
          },
        },
      },
    });

    return productsWithDetails;
  } catch (error) {
    throw new Error(error);
  }
}
