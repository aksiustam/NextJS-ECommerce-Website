import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

const CheckStockMail = async (product, pcs, sizestock) => {
  const stockmail = await prisma.StockMail.findMany({
    where: {
      productId: product.id,
    },
  });
  let mails = [];
  if (stockmail.length > 0) {
    stockmail.forEach(async (item) => {
      if (item.color === pcs.Color.name && item.size === sizestock.Size.name)
        mails.push(item.email);

      await prisma.StockMail.delete({
        where: {
          id: item.id,
        },
      });
    });
  }

  if (mails.length > 0) {
    const nodemailer = await import("nodemailer");

    let transporter = nodemailer.createTransport({
      host: "mail.nilrio.com",
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: "info@nilrio.com",
        pass: "SS$RrkRlAkn*",
      },
    });

    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Le produit que vous avez demandé est maintenant en stock.<div></div></div><body style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif"><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;margin:30px auto;background-color:#fff"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="display:flex;justify-content:center;aling-items:center;padding:15px"><tbody><tr><td><img alt="logo" height="50" src="https://testtest.nilrio.com/assets/img/nilrio-logo.png" style="display:flex;outline:0;border:none;text-decoration:none;justify-content:center;aling-items:center;padding:15px" width="285"></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding:5px 20px 10px 20px"><tbody><tr><td><p style="font-size:14px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Bonne Nouvelle,</p><p style="font-size:14px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Nous sommes heureux de vous informer que l&#x27;un des produits que vous attendez.</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">PRODUCTNAME</p><p style="font-size:14px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Est maintenant DİSPONİBLE</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Vous pouvez désormais<a href="PRODUCTLINK" style="color:#067df7;text-decoration:none" target="_blank">passer votre commande et finaliser votre achat.</a></p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Veuillez noter que nos stocks peuvent s&#x27;épuiser de nouveau en cas de forte demande.</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Merci d’avoir choisi NILRIO</p></td></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;margin:0 auto"><tbody><tr><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">© CopyRight Nilrio, All Rights Reserved<br>6 Rue de Palestro Pantin, France</p></tr></tbody></table></td></tr></tbody></table></body></html>`;

    const productname = `"${product.name}" couleur "${pcs.Color.name}" ${
      product.Category.SizeType.type === "acc"
        ? ""
        : `taille "${sizestock.Size.name}"`
    }`;

    const productlink = `https://deneme.nilrio.com/product/${product.slug}`;

    const modifiedHtml = html.replace(/PRODUCTNAME/g, productname);

    const lastHtml = modifiedHtml.replace(/PRODUCTLINK/g, productlink);

    mails.forEach((email) => {
      const mailOptions = {
        from: "info@nilrio.com",
        to: email,
        subject: "Nouvelles excitantes",
        html: lastHtml,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("E-posta gönderildi: " + info.response);
        }
      });
    });
    return true;
  }
  return false;
};

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
      pid: data.pid,
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
      ParcelGram: true,
      Category: {
        include: {
          CategoryType: true,
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
          Color: true,
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
          /// STOCKKONTROLMAİL
          CheckStockMail(product, pcstoupdate, find);
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
