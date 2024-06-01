"use server";
import prisma from "@/lib/prismadb";
import { StockBittiAbone } from "../../reactemail/stockbittiabone";

export default async function setStockMail(formData) {
  try {
    await prisma.StockMail.create({
      data: {
        email: formData.email,
        name: formData.name,
        color: formData.color,
        size: formData.size,
        productId: formData.productId,
      },
    });
    const nodemailer = await import("nodemailer");

    const { render } = await import("@react-email/render");
    const html = render(<StockBittiAbone />);

    let transporter = nodemailer.createTransport({
      host: "mail.nilrio.com",
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: "info@nilrio.com",
        pass: "SS$RrkRlAkn*",
      },
    });
    // Stock Bitti Abone

    let mailOptions = {
      from: "info@nilrio.com",
      to: formData.email,
      subject: "Nouvelles Excitantes",
      html: html,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("E-posta gönderildi: " + info.response);
      }
    });
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
