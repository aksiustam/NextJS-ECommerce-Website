import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
function generatePasswordCode() {
  const upperCaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
  const numericCharacters = "0123456789";

  let code = "";

  for (let i = 0; i < 8; i++) {
    // Rastgele bir tür seç
    let typeIndex = Math.floor(Math.random() * 3);
    if (i < 3) typeIndex = i;
    // Rastgele karakter seç
    let randomChar;
    switch (typeIndex) {
      case 0:
        randomChar = upperCaseCharacters.charAt(
          Math.floor(Math.random() * upperCaseCharacters.length)
        );
        break;
      case 1:
        randomChar = lowerCaseCharacters.charAt(
          Math.floor(Math.random() * lowerCaseCharacters.length)
        );
        break;
      case 2:
        randomChar = numericCharacters.charAt(
          Math.floor(Math.random() * numericCharacters.length)
        );
        break;
    }

    // Kodu oluştur
    code += randomChar;
  }

  return code;
}

export async function POST(req) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email: email } });

  if (!user) {
    return NextResponse.json(
      { message: "Adresse e-mail invalide" },
      { status: 500 }
    );
  }

  if (user) {
    const pass = generatePasswordCode();
    const encryptedPassword = await bcrypt.hash(pass, 10);
    await prisma.user.update({
      where: { email: email },
      data: { password: encryptedPassword },
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

    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Mot de passe oublié de Nilrio<div></div></div><body style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif"><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;margin:30px auto;background-color:#fff"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="display:flex;justify-content:center;aling-items:center;padding:15px"><tbody><tr><td><img alt="logo" height="50" src="https://testtest.nilrio.com/assets/img/nilrio-logo.png" style="display:flex;outline:0;border:none;text-decoration:none;justify-content:center;aling-items:center;padding:15px" width="285"></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding:5px 20px 10px 20px"><tbody><tr><td><p style="font-size:14px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Bonjour USER</p><p style="font-size:14px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Voici votre nouveau mot de passe :<p style="font-size:14px;line-height:26px;margin:16px 0;color:red;font-weight:700;text-align:center">PASSWORD</p></p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Nous vous rappelons que ce mot de passe remplace celui que vous utilisiez précédemment. Veillez à bien respecter les majuscules et les minuscules.</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">N’hésitez pas à le changer depuis votre espace profil</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">(Attention 6 caractères contenant une majuscule, une minuscule et un chiffre minimum)</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Merci<br>L&#x27;équipe NILRIO</p></td></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;margin:0 auto"><tbody><tr><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">© CopyRight Nilrio, All Rights Reserved<br>6 Rue de Palestro Pantin, France</p></tr></tbody></table></td></tr></tbody></table></body></html>`;

    const modifiedHtml = html.replace(/USER/g, user.name);

    const modifiedHtmlto = modifiedHtml.replace(/PASSWORD/g, pass);
    // Şifremi Unuttum Mail
    let mailOptions = {
      from: "info@nilrio.com",
      to: email,
      subject: "Votre nouveau mot de passe",
      html: modifiedHtmlto,
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
