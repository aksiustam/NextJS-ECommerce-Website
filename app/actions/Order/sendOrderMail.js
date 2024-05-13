"use server";
import prisma from "@/lib/prismadb";
import nodemailer from "nodemailer";

function sendMail(mailOptions, transporter) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
}
export default async function sendOrderMail(formdata) {
  try {
    const { email, html, htmladmin, sipid } = formdata;

    let transporter = nodemailer.createTransport({
      host: "mail.nilrio.com",
      port: 465,
      secure: true, // TLS
      auth: {
        user: "info@nilrio.com",
        pass: "SS$RrkRlAkn*",
      },
    });
    // INVOICE MAIL
    let mailOptions = {
      from: "info@nilrio.com",
      to: email,
      subject: "NILRIO-INVOICE",
      html: html,
      attachments: [
        {
          filename: "invoice.html",
          content: html,
        },
      ],
    };
    const set = await prisma.ayarlar.findFirst();

    const sendmailto = set.settings.mailto;
    let adminmailOptions = {
      from: "info@nilrio.com",
      to: sendmailto,
      subject: "NİLRİO SİPARİŞ NO:" + sipid,
      html: htmladmin,
      attachments: [
        {
          filename: `invoice-${sipid}.html`,
          content: html,
        },
      ],
    };
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });
    await sendMail(adminmailOptions, transporter);
    let error = "null";
    try {
      await sendMail(mailOptions, transporter);
      error = "Gönderildi";
    } catch (err) {
      error = "Başarısız";
    }

    await prisma.Siparis.update({
      where: {
        id: parseInt(sipid),
      },
      data: {
        sendmail: error,
      },
    });

    return true;
  } catch (error) {
    throw new Error(error);
  }
}
