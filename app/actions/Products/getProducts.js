import prisma from "@/lib/prismadb";

export default async function getProducts() {
  try {
    const productsWithDetails = await prisma.product.findMany({
      where: {
        archive: false,
      },
      include: {
        ParcelGram: true,
        Category: true,
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
