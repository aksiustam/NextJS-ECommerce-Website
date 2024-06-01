"use server";

import { EmailTaslak } from "../../reactemail/emailtaslak";

export default async function sendMail(formData) {
  try {
    const { mailto, text, mailBaslik } = formData;

    const nodemailer = await import("nodemailer");

    const { render } = await import("@react-email/render");
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

    let mailOptions = {
      from: "info@nilrio.com",
      to: mailto,
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
