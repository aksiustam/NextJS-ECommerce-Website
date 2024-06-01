import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
export async function POST(req) {
  const { data, code } = await req.json();

  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    return NextResponse.json(
      { message: "Cet utilisateur n'a pas été trouvé!" },
      { status: 500 }
    );
  }

  if (user) {
    if (code !== user.code)
      return NextResponse.json(
        { message: "Le code que vous avez saisie est invalide!" },
        { status: 500 }
      );

    await prisma.user.update({
      where: {
        email: data.email,
      },
      data: {
        emailVerified: true,
      },
    });
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
    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Welcome to Nilrio<div></div></div><body style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif"><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:610px;margin:30px auto;background-color:#fff"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="display:flex;justify-content:center;aling-items:center;padding:30px"><tbody><tr><td><img alt="logo" height="50" src="https://testtest.nilrio.com/assets/img/nilrio-logo.png" style="display:flex;outline:0;border:none;text-decoration:none;justify-content:center;aling-items:center;padding:30px" width="285"></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding:5px 20px 10px 20px"><tbody><tr><td><p style="font-size:16px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Bienvenue chez NILRIO, USER !</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Désormais, vous pouvez profiter de notre superbe gamme de produits.</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Restez à l&#x27;écoute pour des réductions exclusives, des annonces de nouveaux produits et bien plus encore.</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Nous vous souhaitons d’agréable achat !</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Merci d’avoir choisi NILRIO</p></td></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;margin:0 auto"><tbody><tr><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">© CopyRight Nilrio, All Rights Reserved<br>6 Rue de Palestro Pantin, France</p></tr></tbody></table></td></tr></tbody></table></body></html>`;

    const username = user.name + " " + user.lastname;

    const modifiedHtml = html.replace(/USER/g, username);

    // Login Welcome Mail
    let mailOptions = {
      from: "info@nilrio.com",
      to: user.email,
      subject: "Bienvenue Sur Nilrio",
      html: modifiedHtml,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("E-posta gönderildi: " + info.response);
      }
    });
  }

  return NextResponse.json({ message: "Success" });
}
