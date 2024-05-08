import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  await Promise.all(
    data.map(async (item) => {
      await prisma.product.update({
        where: {
          id: parseInt(item.id),
        },
        data: {
          yeni: item.yeni,
          ilk: item.ilk,
          ofg: item.ofg,
          bio: item.bio,
          indirim: item.indirim,
          indirimsize: item.indirimsize,
          inprice: parseFloat(item.inprice.toFixed(2)),
        },
      });
    })
  );

  return NextResponse.json({ message: "Success" });
}
