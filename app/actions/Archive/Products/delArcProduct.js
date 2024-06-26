"use server";
import prisma from "@/lib/prismadb";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function delArcProduct(data) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: data.id,
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

    for (const item of product.ProductColorSize) {
      for (const value of item.images) {
        await cloudinary.uploader.destroy(value.imageid);
      }
    }

    await prisma.product.delete({
      where: { id: data.id },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
