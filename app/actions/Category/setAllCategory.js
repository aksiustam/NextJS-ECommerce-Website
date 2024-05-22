"use server";
import prisma from "@/lib/prismadb";
import slugify from "slugify";

export default async function setAllCategory(role, data) {
  try {
    const catbrand = role;

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
          return { message: "Bu Kategoriden aynısı var!" };
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
            CategoryType: { connect: { id: parseInt(data.cattype) } },
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
          return { message: "Bu Çeşitten aynısı var!" };
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
          return { message: "Bu Renkten aynısı var!" };
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
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
