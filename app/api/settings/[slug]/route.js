import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
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
      let setbanner = set.banner;

      setbanner = {
        bannercolor: data.bannercolor,
        btncheck: data.btncheck,
        bannerUst: data.bannerUst ? data.bannerUst : setbanner.bannerUst,
        bannerAlt: data.bannerAlt ? data.bannerAlt : setbanner.bannerAlt,
        buttonName: data.buttonName ? data.buttonName : setbanner.buttonName,
        buttonUrl: data.buttonUrl ? data.buttonUrl : setbanner.buttonUrl,
        banner: data.banner ? data.banner : setbanner.banner,
        banneryan: data.banneryan ? data.banneryan : setbanner.banneryan,
      };
      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          banner: setbanner,
        },
      });

      break;
    case "bannerb":
      let setbannerb = data ? data : set.bannerb;
      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          bannerb: setbannerb,
        },
      });
      break;
    case "discountpage":
      let discountpage = set.discountpage;

      discountpage = {
        bannerColor: data.bannerColor,
        bannerUst: data.bannerUst ? data.bannerUst : discountpage.bannerUst,
        bannerAlt: data.bannerAlt ? data.bannerAlt : discountpage.bannerAlt,
        buttonName: data.buttonName ? data.buttonName : discountpage.buttonName,
        buttonUrl: data.buttonUrl ? data.buttonUrl : discountpage.buttonUrl,
        bannerImageId: data.discres.imageid
          ? data.discres.imageid
          : discountpage.bannerImageId,
        bannerImageUrl: data.discres.imageurl
          ? data.discres.imageurl
          : discountpage.bannerImageUrl,
      };

      await prisma.ayarlar.update({
        where: { id: 1 },
        data: {
          discountpage: discountpage,
        },
      });
      break;
    case "discountupdate":
      let discountset = set.discountset;

      discountset = {
        checkbox: data.checkbox,
        date: data.date,
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
