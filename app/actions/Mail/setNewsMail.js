"use server";
import prisma from "@/lib/prismadb";
import { HaberlereAbone } from "../../reactemail/haberlereabone";

export default async function setNewsMail(data) {
  try {
    const { email } = data;

    await prisma.NewsMail.create({
      data: {
        email: email,
      },
    });

    const nodemailer = await import("nodemailer");

    const { render } = await import("@react-email/render");
    const html = render(<HaberlereAbone />);

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
      to: email,
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
