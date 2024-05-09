import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  await prisma.product.update({
    where: {
      id: data.id,
    },
    data: {
      onclick: {
        increment: 1,
      },
    },
  });

  return NextResponse.json({ message: "Success" });
}
