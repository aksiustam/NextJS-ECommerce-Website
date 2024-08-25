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
    case "trendler":
      let form = {
        name: data.name,
        checkname: data.checkname,
      };

      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          trend: form,
        },
      });

      break;
    case "trendlertwo":
      let form55 = {
        name: data.name,
        checkname: data.checkname,
      };

      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          trend2: form55,
        },
      });

      break;
    case "bannerb1":
      let formData5 = {
        imageid: set?.bannerb1?.imageid,
        imageurl: set?.bannerb1?.imageurl,
        check: data.check,
      };

      if (data.imageid !== null && data.imageurl !== null) {
        const uuid = set?.bannerb1?.imageid;

        await cloudinary.uploader.destroy(uuid, {
          resource_type: "video",
        });

        formData5.imageid = data.imageid;
        formData5.imageurl = data.imageurl;
      }

      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          bannerb1: formData5,
        },
      });

      break;
    case "bannerb2":
      let formData6 = {
        image1: {
          imageid: set?.bannerb2?.image1?.imageid,
          imageurl: set?.bannerb2?.image1?.imageurl,
          check: data.image1.check,
          url: data.image1.url,
        },
        image2: {
          imageid: set?.bannerb2?.image2?.imageid,
          imageurl: set?.bannerb2?.image2?.imageurl,
          check: data.image2.check,
          url: data.image2.url,
        },
      };

      if (data.image1.imageid !== null && data.image1.imageurl !== null) {
        const uuid = set?.bannerb2?.image1?.imageid;
        await cloudinary.uploader.destroy(uuid);
        formData6.image1.imageid = data.image1.imageid;
        formData6.image1.imageurl = data.image1.imageurl;
      }

      if (data.image2.imageid !== null && data.image2.imageurl !== null) {
        const uuid = set?.bannerb2?.image2?.imageid;
        await cloudinary.uploader.destroy(uuid);
        formData6.image2.imageid = data.image2.imageid;
        formData6.image2.imageurl = data.image2.imageurl;
      }
      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          bannerb2: formData6,
        },
      });

      break;
    case "bannerb3":
      let formData7 = {
        image1: {
          imageid: set?.bannerb3?.image1?.imageid,
          imageurl: set?.bannerb3?.image1?.imageurl,
          check: data.image1.check,
          url: data.image1.url,
        },
        image2: {
          imageid: set?.bannerb3?.image2?.imageid,
          imageurl: set?.bannerb3?.image2?.imageurl,
          check: data.image2.check,
          url: data.image2.url,
        },
        image3: {
          imageid: set?.bannerb3?.image3?.imageid,
          imageurl: set?.bannerb3?.image3?.imageurl,
          check: data.image3.check,
          url: data.image3.url,
        },
        image4: {
          imageid: set?.bannerb3?.image4?.imageid,
          imageurl: set?.bannerb3?.image4?.imageurl,
          check: data.image4.check,
          url: data.image4.url,
        },
      };

      if (data.image1.imageid !== null && data.image1.imageurl !== null) {
        const uuid = set?.bannerb3?.image1?.imageid;
        await cloudinary.uploader.destroy(uuid);
        formData7.image1.imageid = data.image1.imageid;
        formData7.image1.imageurl = data.image1.imageurl;
      }

      if (data.image2.imageid !== null && data.image2.imageurl !== null) {
        const uuid = set?.bannerb3?.image2?.imageid;
        await cloudinary.uploader.destroy(uuid);
        formData7.image2.imageid = data.image2.imageid;
        formData7.image2.imageurl = data.image2.imageurl;
      }
      if (data.image3.imageid !== null && data.image3.imageurl !== null) {
        const uuid = set?.bannerb3?.image3?.imageid;
        await cloudinary.uploader.destroy(uuid);
        formData7.image3.imageid = data.image3.imageid;
        formData7.image3.imageurl = data.image3.imageurl;
      }
      if (data.image4.imageid !== null && data.image4.imageurl !== null) {
        const uuid = set?.bannerb3?.image4?.imageid;
        await cloudinary.uploader.destroy(uuid);
        formData7.image4.imageid = data.image4.imageid;
        formData7.image4.imageurl = data.image4.imageurl;
      }
      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          bannerb3: formData7,
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
