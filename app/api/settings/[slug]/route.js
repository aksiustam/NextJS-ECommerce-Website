import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req, { params }) {
  const { slug } = params;

  const data = await req.json();

  const set = await prisma.ayarlar.findFirst();

  switch (slug) {
    case "header":
      let setheader = set.header;

      const headerToUpdate = data.headername;
      const indexToUpdate = setheader.findIndex(
        (item) => item.index === headerToUpdate
      );

      if (indexToUpdate !== -1) {
        setheader[indexToUpdate] = {
          index: data.headername,
          name: data.name,
          url: data.url,
          header: data.header,
        };
      } else {
        const newItem = {
          index: data.headername,
          name: data.name,
          url: data.url,
          header: data.header,
        };

        setheader.push(newItem);
      }
      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          header: setheader,
        },
      });

      break;
    case "banner":
      let formData2 = {
        bannercolor: data.bannercolor,
        bannerUst: data.bannerUst,
        bannerAlt: data.bannerAlt,
        buttonName: data.buttonName,
        buttonUrl: data.buttonUrl,
        btncheck: data.btncheck,
        banner: set.banner.banner,
        banneryan: set.banner.banneryan,
      };
      if (data.banner !== null) {
        await cloudinary.uploader.destroy(formData2.banner.imageid);
        formData2.banner = data.banner;
      }
      if (data.banneryan !== null) {
        for (const item of formData2.banneryan) {
          await cloudinary.uploader.destroy(item.imageid);
        }

        formData2.banneryan = data.banneryan;
      }

      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          banner: formData2,
        },
      });

      break;
    case "bannerb":
      await cloudinary.uploader.destroy(set.bannerb.imageid);
      let setbannerb = data;
      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          bannerb: setbannerb,
        },
      });
      break;
    case "discountpage":
      let formData = {
        bannerColor: data.bannerColor,
        bannerUst: data.bannerUst,
        bannerAlt: data.bannerAlt,
        buttonName: data.buttonName,
        buttonUrl: data.buttonUrl,
        checkbox: data.checkbox,
        date: data.date,
        discres: set.discountpage.discres,
      };
      if (data.discres !== null) {
        await cloudinary.uploader.destroy(formData.discres.imageid);
        formData.discres = data.discres;
      }

      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          discountpage: formData,
        },
      });
      break;
    case "discountupdate":
      let discountset = set.discountset;

      discountset = {
        indirim1: data.indirim1,
        indirim2: data.indirim2,
        indirim3: data.indirim3,
      };

      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          discountset: discountset,
        },
      });
      break;

    default:
      break;
  }

  return NextResponse.json({ message: "Success" });
}
