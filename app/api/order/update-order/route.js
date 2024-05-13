import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();
  await prisma.Siparis.update({
    where: {
      id: parseInt(data.id),
    },
    data: {
      status: data.status,
      error: data.message,
      kargono: data.kargono,
    },
  });

  return NextResponse.json({ message: "Success" });
}
