"use server";
import prisma from "@/lib/prismadb";
import slugify from "slugify";
export default async function putAllCategory(role, data) {
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
                return { id: item.value };
              }),
            },
            desc: data.metadesc,
            keywords: data.metakey,
            gender: data.gender,
            categoryTypeId: parseInt(data.cattype) || undefined,
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
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
