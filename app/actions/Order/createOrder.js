"use server";
import prisma from "@/lib/prismadb";

const processCartData = async (basket) => {
  let hata = { message: null, check: false };

  const cartdata = await Promise.all(
    basket.map(async (basketitem) => {
      const product = await prisma.product.findFirst({
        where: {
          id: parseInt(basketitem.id),
          archive: false,
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
                  Size: {
                    include: {
                      SizeType: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (product) {
        const pcs =
          product.ProductColorSize.find(
            (item) => item.Color.name === basketitem.color
          ) || null;

        if (pcs === null) {
          hata = {
            message:
              product.name +
              " Désolé, l'article que vous avez choisi est en rupture.",
            check: true,
          };
          return null;
        }
        if (pcs) {
          if (product.Category === null) {
            hata = {
              message: "l'article que vous avez choisi est en rupture.",
              check: true,
            };
            return null;
          }

          const mysizestock =
            pcs.SizeStock.find((item) => item.Size.name === basketitem.size) ||
            null;

          if (mysizestock !== null) {
            if (
              mysizestock !== null &&
              mysizestock.stock > 0 &&
              mysizestock.stock >= basketitem.quantity
            ) {
              const price = product.indirim ? product.inprice : product.price;
              let name = product.name + " " + pcs.Color.name + " ";
              name +=
                mysizestock.Size.name !== "null" ? mysizestock.Size.name : "";

              const topprice = (price * 100).toFixed(0);
              const NoVat = (topprice / 1.2).toFixed(0);
              const Vat = (parseFloat(topprice) - parseFloat(NoVat)).toFixed(0);

              return {
                productType: "CLOTHING_AND_ACCESSORIES",
                productQty: basketitem.quantity,
                productLabel: name,
                productRef: product.id.toString(),
                productAmount: (price * 100).toFixed(0),
                productVat: Vat,
              };
            } else {
              const name = product.name + " " + pcs.Color.name;
              hata = {
                message:
                  " Désolé, " +
                  name +
                  " l'article que vous avez choisi est en rupture.",
                check: true,
              };
              return null;
            }
          } else {
            hata = {
              message: "Désolé,l'article que vous avez choisi est en rupture.",
              check: true,
            };
            return null;
          }
        } else {
          hata = {
            message: "Désolé,l'article que vous avez choisi est en rupture.",
            check: true,
          };
          return null;
        }
      } else {
        hata = {
          message: "Désolé,l'article que vous avez choisi est en rupture.",
          check: true,
        };
        return null;
      }
    })
  );
  return { hata: hata, data: cartdata };
};
export default async function createOrder(formdata) {
  try {
    let { data, basket } = formdata;
    const siparis =
      (await prisma.Siparis.findMany({
        orderBy: {
          id: "desc",
        },
        take: 1,
      })) || null;

    const latestsiparis = siparis[0] || null;
    let index = "1";

    if (latestsiparis !== null) index = latestsiparis.id;
    data.orderId = "Order-" + index + 1;

    const result = await processCartData(basket);

    if (result.hata.check === true) {
      return { message: result.hata.message };
    }

    result.data.forEach((item) => {
      data.customer.shoppingCart.cartItemInfo.push(item);
    });

    const username = process.env.SG_USERNAME;
    const password = process.env.SG_PASSWORD;

    const credentials = btoa(`${username}:${password}`);

    const sgresponse = await fetch(
      "https://api-sogecommerce.societegenerale.eu/api-payment/V4/Charge/CreatePayment",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const response = await sgresponse.json();

    const formToken = response.answer.formToken;

    return formToken;
  } catch (error) {
    throw new Error(error);
  }
}
