"use server";
import prisma from "@/lib/prismadb";

export default async function updateProducts(formData) {
  try {
    const updatedProducts = await Promise.all(
      formData.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: {
            id: item.id,
          },
        });
        return {
          ...item,
          price: product.price,
          inprice: product.inprice,
          indirim: product.indirim,
        };
      })
    );

    return updatedProducts;
  } catch (error) {
    throw new Error(error);
  }
}
