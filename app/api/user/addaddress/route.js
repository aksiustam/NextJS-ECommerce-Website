import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const data = await req.json();

  await prisma.Address.create({
    data: {
      User: {
        connect: { id: parseInt(data.userid) },
      },
      name: data.name,
      adress: data.adress,
      country: data.country,
      state: data.state,
      zipcode: data.zipcode,
      category: data.category,
      company: data.company,
      companytva: data.companytva,
    },
  });
  return NextResponse.json({ message: "Success" });
}
