import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  const data = await req.json();
  const { id } = params;
  await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      archive: data.archive,
    },
  });

  return NextResponse.json({ message: "Success" });
}

export async function PUT(req, { params }) {
  const data = await req.json();
  const { id } = params;

  await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      Brand: {
        set: [],
      },
    },
  });
  await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: data.name,
      desc: data.desc,
      price: parseFloat(data.price),
      inprice: parseFloat(data.inprice),
      Brand: {
        connect: data.brand.map((item) => {
          return { id: item.value };
        }),
      },
      quill: data.quill,
      guideurl: data.guideurl,
    },
  });

  const product = await prisma.product.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      Category: {
        include: {
          SizeType: true,
        },
      },
      Brand: true,
      ProductColorSize: {
        include: {
          Color: true,
          SizeStock: {
            include: {
              Size: true,
            },
          },
        },
      },
    },
  });
  for (const key in data) {
    const parts = key.split("_");
    const [gram, type, gramsize] = parts.map((part) =>
      decodeURIComponent(part)
    );

    if (gram === "gram") {
      const gramValue = parseInt(data[key]);
      switch (type) {
        case "dress":
          const mysize = await prisma.Size.findFirst({
            where: {
              name: gramsize,
              SizeType: { type: type },
            },
          });

          const parcelData = {
            gram: gramValue,
            Size: { connect: { id: mysize.id } },
            Product: { connect: { id: product.id } },
          };

          const parcel = await prisma.ParcelGram.findFirst({
            where: {
              Product: { id: product.id },
              Size: { id: mysize.id },
            },
          });

          if (parcel) {
            await prisma.ParcelGram.update({
              where: { id: parcel.id },
              data: parcelData,
            });
          } else {
            await prisma.ParcelGram.create({ data: parcelData });
          }
          break;

        case "acc":
          const mysize2 = await prisma.Size.findFirst({
            where: {
              SizeType: { type: type },
            },
          });

          const parcelData2 = {
            gram: gramValue,
            Size: { connect: { id: mysize2.id } },
            Product: { connect: { id: product.id } },
          };

          const parcel2 = await prisma.ParcelGram.findFirst({
            where: {
              Product: { id: product.id },
              Size: { id: mysize2.id },
            },
          });

          if (parcel2) {
            await prisma.ParcelGram.update({
              where: { id: parcel2.id },
              data: parcelData2,
            });
          } else {
            await prisma.ParcelGram.create({ data: parcelData2 });
          }
          break;

        default:
          break;
      }
    }
  }

  const color = await prisma.color.findMany({
    where: {
      archive: false,
    },
  });
  const size = await prisma.size.findMany({
    where: {
      archive: false,
      SizeType: { type: product.Category.SizeType.type },
    },
    include: {
      SizeType: true,
    },
  });

  for (const key in data) {
    const parts = key.split("_");
    const [colorpart, sizepart] = parts.map((part) => decodeURIComponent(part));

    const mycolor = color.find((item) => item.name === colorpart);
    const mysize = size.find((item) => item.name === sizepart);
    if (mycolor && mysize) {
      const stockValue = parseInt(data[key]);
      const pcstoupdate = await prisma.ProductColorSize.findFirst({
        where: {
          colorId: mycolor.id,
          productId: product.id,
        },
        include: {
          SizeStock: {
            include: {
              Size: true,
            },
          },
        },
      });

      if (pcstoupdate) {
        const find = pcstoupdate.SizeStock.find(
          (item) => item.sizeId === mysize.id
        );

        if (find) {
          await prisma.SizeStock.update({
            where: { id: find.id },
            data: {
              stock: stockValue,
            },
          });
        } else {
          await prisma.SizeStock.create({
            data: {
              stock: stockValue,
              productColorSizeId: pcstoupdate.id,
              sizeId: mysize.id,
            },
          });
        }
      } else {
        const pcstocreate = await prisma.ProductColorSize.create({
          data: {
            productId: product.id,
            colorId: mycolor.id,
          },
        });
        await prisma.SizeStock.create({
          data: {
            stock: stockValue,
            productColorSizeId: pcstocreate.id,
            sizeId: mysize.id,
          },
        });
      }
    }
  }

  for (const key in data) {
    const parts = key.split("_");
    const [imgpart, colorpart] = parts.map((part) => decodeURIComponent(part));

    if (imgpart === "Image") {
      const mycolor = color.find((item) => item.name === colorpart);
      if (data[key].length > 0) {
        if (mycolor) {
          const ImageValue = data[key];
          const pcstoupdate = await prisma.ProductColorSize.findFirst({
            where: {
              colorId: mycolor.id,
              productId: product.id,
            },
          });

          if (pcstoupdate) {
            await prisma.ProductColorSize.update({
              where: { id: pcstoupdate.id },
              data: {
                images: ImageValue,
              },
            });
          } else {
            await prisma.ProductColorSize.create({
              data: {
                productId: product.id,
                colorId: mycolor.id,
                images: ImageValue,
              },
            });
          }
        }
      }
    }
  }

  return NextResponse.json({ message: "Success" });
}
