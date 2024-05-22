"use server";
import prisma from "@/lib/prismadb";
import nodemailer from "nodemailer";
import { EmailTaslak } from "../../reactemail/emailtaslak";
import { render } from "@react-email/render";
export default async function sendAllMail(formData) {
  try {
    const { mailto, text, mailBaslik } = formData;
    //KOALA MAIL
    let transporter = nodemailer.createTransport({
      host: "mail.nilrio.com",
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: "info@nilrio.com",
        pass: "SS$RrkRlAkn*",
      },
    });

    const html = render(<EmailTaslak text={text} />);

    // TASLAK MAIL
    let mailOptions = {
      from: "info@nilrio.com",
      subject: mailBaslik,
      html: html,
    };

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    if (mailto === "user") {
      const user = await prisma.user.findMany({
        where: {
          newscheck: true,
        },
      });
      user.forEach((item) => {
        // Alıcıyı güncelle
        mailOptions.to = item.email;

        // E-postayı gönder
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("E-posta gönderilirken hata oluştu:", error);
          } else {
            console.log("E-posta başarıyla gönderildi:", info.response);
          }
        });
      });
    }
    if (mailto === "news") {
      const user = await prisma.NewsMail.findMany();

      user.forEach((item) => {
        mailOptions.to = item.email;

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("E-posta gönderilirken hata oluştu:", error);
          } else {
            console.log("E-posta başarıyla gönderildi:", info.response);
          }
        });
      });
    }
    if (mailto === "stock") {
      const user = await prisma.StockMail.findMany();

      user.forEach((item) => {
        mailOptions.to = item.email;

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("E-posta gönderilirken hata oluştu:", error);
          } else {
            console.log("E-posta başarıyla gönderildi:", info.response);
          }
        });
      });
    }

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
