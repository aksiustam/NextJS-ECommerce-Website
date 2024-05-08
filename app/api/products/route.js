import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import slugify from "slugify";
export async function POST(req) {
  const data = await req.json();

  const category = await prisma.category.findFirst({
    where: {
      name: data.category,
    },
  });

  const CharacterMap = {
    É: "E",
    é: "e",
    À: "A",
    à: "a",
    È: "E",
    è: "e",
    Ù: "U",
    ù: "u",
    Â: "A",
    â: "a",
    Ê: "E",
    ê: "e",
    Î: "I",
    î: "i",
    Ô: "O",
    ô: "o",
    Û: "U",
    û: "u",
    Ë: "E",
    ë: "e",
    Ç: "C",
    ç: "c",
    œ: "oe",
    æ: "ae",
  };

  const slug = slugify(data.name, {
    lower: true,
    replacement: (char) => CharacterMap[char] || (char === " " ? "-" : char),
    remove: /[*+~.()'"!:@]/g,
  });

  await prisma.product.create({
    data: {
      name: data.name,
      slug: slug,
      desc: data.desc,
      gender: data.gender,
      Category: {
        connect: category,
      },
      Brand: {
        connect: data.brand.map((item) => {
          return { id: item.value };
        }),
      },
      price: parseFloat(data.price),
      inprice: parseFloat(data.inprice),
      indirim: false,
      yeni: false,
      ilk: false,
      ofg: false,
      bio: false,
      onclick: 0,
      archive: false,
      quill: data.quill,
    },
  });

  return NextResponse.json({ message: "Success" });
}
