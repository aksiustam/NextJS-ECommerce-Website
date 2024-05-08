import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import slugify from "slugify";
export async function POST(req, { params }) {
  const { catbrand } = params;
  const data = await req.json();
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

  switch (catbrand) {
    case "category":
      const slug = slugify(data.slug, {
        lower: true,
        replacement: (char) =>
          CharacterMap[char] || (char === " " ? "-" : char),
        remove: /[*+~.()'"!:@]/g,
      });

      const category = await prisma.category.findUnique({
        where: {
          slug: slug,
        },
      });
      if (category) {
        return NextResponse.json(
          { message: "Bu Kategoriden aynısı var!" },
          { status: 500 }
        );
      }

      await prisma.category.create({
        data: {
          index: parseInt(data.index),
          name: data.name,
          slug: slug,
          Brand: {
            connect: data.brand.map((item) => {
              return { id: item.value };
            }),
          },
          desc: data.metadesc,
          keywords: data.metakey,
          gender: data.gender,
          cattype: data.cattype,
          SizeType: { connect: { id: parseInt(data.sizetype) } },
          season: data.season,
          archive: false,
        },
      });

      break;
    case "brand":
      const brand = await prisma.brand.findFirst({
        where: {
          name: data.name,
        },
      });
      if (brand) {
        return NextResponse.json(
          { message: "Bu Çeşitten aynısı var!" },
          { status: 500 }
        );
      }
      await prisma.brand.create({
        data: {
          index: parseInt(data.index),
          name: data.name,
          archive: false,
        },
      });

      break;
    case "color":
      const color = await prisma.color.findFirst({
        where: {
          name: data.name,
        },
      });
      if (color) {
        return NextResponse.json(
          { message: "Bu Renkten aynısı var!" },
          { status: 500 }
        );
      }
      const slugcolor = slugify(data.name, {
        lower: true,
        replacement: (char) =>
          CharacterMap[char] || (char === " " ? "-" : char),
        remove: /[*+~.()'"!:@]/g,
      });
      await prisma.color.create({
        data: {
          index: parseInt(data.index),
          name: data.name,
          slug: slugcolor,
          hex: data.hex,
          archive: false,
        },
      });

      break;

    default:
      break;
  }

  return NextResponse.json({ message: "Success" });
}

export async function PUT(req, { params }) {
  const { catbrand } = params;
  const data = await req.json();

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

  switch (catbrand) {
    case "category":
      let check = false;
      let slug = "";
      if (data.slug && data.slug !== "") {
        check = true;
        slug = slugify(data.slug, {
          lower: true,
          replacement: (char) =>
            CharacterMap[char] || (char === " " ? "-" : char),
          remove: /[*+~.()'"!:@]/g,
        });
      }
      await prisma.category.update({
        where: { id: data.id },
        data: {
          Brand: {
            set: [],
          },
        },
      });

      await prisma.category.update({
        where: { id: data.id },
        data: {
          index: parseInt(data.index) || undefined,
          name: data.name,
          slug: check === true ? slug : undefined,
          Brand: {
            connect: data.brand.map((item) => {
              if (item.value) return { id: item.value };
              else return { id: item.id };
            }),
          },
          desc: data.metadesc,
          keywords: data.metakey,
          gender: data.gender,
          cattype: data.cattype,
          sizeTypeId: parseInt(data.sizetype) || undefined,
          season: data.season,
          archive: data.archive,
        },
      });

      break;
    case "brand":
      const brandData = {
        index: parseInt(data.index),
        name: data.name,
        archive: data.archive,
      };
      await prisma.brand.update({
        where: { id: data.id },
        data: brandData,
      });

      break;
    case "color":
      const slugcolor = slugify(data.name, {
        lower: true,
        replacement: (char) =>
          CharacterMap[char] || (char === " " ? "-" : char),
        remove: /[*+~.()'"!:@]/g,
      });
      const colorData = {
        index: parseInt(data.index),
        name: data.name,
        slug: slugcolor,
        hex: data.hex,
        archive: data.archive,
      };
      await prisma.color.update({
        where: { id: data.id },
        data: colorData,
      });

      break;

    case "size":
      const sizeData = {
        index: parseFloat(data.index),
        name: data.name,
        archive: data.archive,
      };
      await prisma.size.update({
        where: { id: data.id },
        data: sizeData,
      });

      break;

    default:
      break;
  }

  return NextResponse.json({ message: "Success" });
}
