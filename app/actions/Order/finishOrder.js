"use server";
import prisma from "@/lib/prismadb";

export default async function finishOrder(formdata) {
  try {
    let { data, basket, note, billcategory, sendcategory, shipping } = formdata;

    const id = data.customer.reference;
    const setShip = { name: shipping.name, price: shipping.price };

    let username = "invité";
    let user = null;

    if (id !== "invité") {
      user = await prisma.user.findFirst({
        where: {
          id: parseInt(id),
        },
      });
      username = user.name;
    }

    const formData = {
      username: username,
      userId: user === null ? null : parseInt(user.id),
      email: data.customer.email,
      billadress: {
        firstName: data.customer.billingDetails.firstName,
        lastName: data.customer.billingDetails.lastName,
        phoneNumber: data.customer.billingDetails.phoneNumber,
        category: data.customer.billingDetails.category,
        country: data.customer.billingDetails.country,
        address: data.customer.billingDetails.address,
        city: data.customer.billingDetails.city,
        zipCode: data.customer.billingDetails.zipCode,
        company: billcategory.company,
        companytva: billcategory.companytva,
      },
      sendadress: {
        firstName: data.customer.shippingDetails.firstName,
        lastName: data.customer.shippingDetails.lastName,
        phoneNumber: data.customer.shippingDetails.phoneNumber,
        category: data.customer.shippingDetails.category,
        country: data.customer.shippingDetails.country,
        address: data.customer.shippingDetails.address,
        city: data.customer.shippingDetails.city,
        zipCode: data.customer.shippingDetails.zipCode,
        company: sendcategory.company,
        companytva: sendcategory.companytva,
      },
      basket: [],
      note: note,
      shipping: setShip,
      sendmail: "null",
      amount: parseFloat(data.amount) / 100,
      status: "paid",
      error: "null",
    };

    formData.basket.push(
      ...basket.map((item) => ({
        id: item.id,
        name: item.name,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.indirim ? item.inprice : item.price,
      }))
    );

    await Promise.all(
      basket.map(async (basketitem) => {
        const pcs = await prisma.ProductColorSize.findFirst({
          where: {
            Color: { name: basketitem.color },
            productId: parseInt(basketitem.id),
          },
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
        });
        console.log(pcs);
        if (pcs) {
          await prisma.product.update({
            where: {
              id: parseInt(basketitem.id),
            },
            data: {
              sells: {
                increment: parseInt(basketitem.quantity),
              },
            },
          });
          await prisma.ProductColorSize.update({
            where: {
              id: parseInt(pcs.id),
            },
            data: {
              sells: {
                increment: parseInt(basketitem.quantity),
              },
            },
          });
          const sizestock =
            pcs.SizeStock.find((item) => item.Size.name === basketitem.size) ||
            null;
          if (sizestock !== null) {
            await prisma.SizeStock.update({
              where: {
                id: parseInt(sizestock.id),
              },
              data: {
                stock: {
                  decrement: parseInt(basketitem.quantity),
                },
              },
            });
          }
        }
      })
    );

    const newSiparis = await prisma.Siparis.create({ data: formData });

    return newSiparis;
  } catch (error) {
    throw new Error(error);
  }
}
