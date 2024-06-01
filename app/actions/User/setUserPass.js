"use server";
import prisma from "@/lib/prismadb";
import bcrypt from "bcryptjs";

export default async function setUserPass(formData) {
  try {
    const { id, pastpass, pass, repass } = formData;
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    const isPasswordValid = await bcrypt.compare(pastpass, user.password);

    if (!isPasswordValid) {
      return {
        message:
          "Ancien mot de passe incorrect. Saisissez à nouveau votre ancien mot de passe.",
      };
    }

    if (pass !== repass) {
      return {
        message: "Les mots de passe ne correspondent pas",
      };
    }

    if (pastpass === pass && pastpass === repass) {
      return { message: "Votre nouveau mot de passe ne peut pas" };
    }

    const encryptedPassword = await bcrypt.hash(pass, 10);

    await prisma.User.update({
      where: {
        id: parseInt(user.id),
      },
      data: {
        password: encryptedPassword,
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
    // RESET PASS MAİL

    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head><div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Changement de mot de passe Nilrio<div></div></div><body style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif"><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:610px;margin:30px auto;background-color:#fff"><tbody><tr style="width:100%"><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="display:flex;justify-content:center;aling-items:center;padding:30px"><tbody><tr><td><img alt="logo" height="50" src="https://testtest.nilrio.com/assets/img/nilrio-logo.png" style="display:flex;outline:0;border:none;text-decoration:none;justify-content:center;aling-items:center;padding:30px" width="285"></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="padding:5px 20px 10px 20px"><tbody><tr><td><p style="font-size:16px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Bonjour USER,</p><p style="font-size:16px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Vous avez mis à jour le mot de passe de votre compte NILRIO</p><p style="font-size:16px;line-height:26px;margin:16px 0;text-align:center;font-weight:700">Le TARİH</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Si vous êtes à l’origine de cela, aucune autre action n&#x27;est requise.</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Cependant, si vous n&#x27;avez PAS effectué ce changement de mot de passe, veuillez réinitialiser immédiatement votre mot de passe sur votre compte.</p><p style="font-size:14px;line-height:1.5;margin:16px 0;text-align:center">Merci<br>L&#x27;équipe NILRIO</p></td></tr></tbody></table></td></tr></tbody></table><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:580px;margin:0 auto"><tbody><tr><td><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"><tbody style="width:100%"><tr style="width:100%"><p style="font-size:14px;line-height:24px;margin:16px 0;text-align:center;color:#706a7b">© CopyRight Nilrio, All Rights Reserved<br>6 Rue de Palestro Pantin, France</p></tr></tbody></table></td></tr></tbody></table></body></html>`;

    const modifiedHtml = html.replace(/USER/g, user.name);

    const updatedAtDate = new Date(user.updatedAt);

    const gun = updatedAtDate.getDate();
    const ay = updatedAtDate.getMonth() + 1;
    const yil = updatedAtDate.getFullYear();
    const saat = updatedAtDate.getHours();
    const dakika = updatedAtDate.getMinutes();
    const formattedDakika = dakika < 10 ? "0" + dakika : dakika;

    const formattedDate = `${gun}/${ay}/${yil} ${saat}:${formattedDakika}`;
    const modifiedHtmlto = modifiedHtml.replace(/TARİH/g, formattedDate);

    let mailOptions = {
      from: "info@nilrio.com",
      to: user.email,
      subject: "Changement de mot de passe Nilrio",
      html: modifiedHtmlto,
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
