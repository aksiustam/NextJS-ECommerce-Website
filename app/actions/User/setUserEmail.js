"use server";
import prisma from "@/lib/prismadb";
import nodemailer from "nodemailer";
function generateRandomCode() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}
export default async function setUserEmail(id, formData) {
  try {
    const code = generateRandomCode();

    const data = { ...formData, code: code };
    delete data.email;

    await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: data,
    });
    let transporter = nodemailer.createTransport({
      host: "mail.nilrio.com",
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: "info@nilrio.com",
        pass: "SS$RrkRlAkn*",
      },
    });
    const html = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html dir="ltr" lang="en"><head><meta content="text/html; charset=UTF-8" http-equiv="Content-Type"></head><body style="background-color:#fff;font-family:HelveticaNeue,Helvetica,Arial,sans-serif"><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:360px;background-color:#fff;border:1px solid #eee;border-radius:5px;box-shadow:0 5px 10px rgba(20,50,70,.2);margin-top:20px;margin:0 auto;padding:68px 0 130px"><tbody><tr style="width:100%"><td><img alt="logo" height="50" src="https://testtest.nilrio.com/assets/img/nilrio-logo.png" style="display:block;outline:0;border:none;text-decoration:none;margin:0 auto" width="285"><p style="font-size:11px;line-height:16px;margin:16px 8px 8px 8px;color:#0a85ea;font-weight:700;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;height:16px;letter-spacing:0;text-transform:uppercase;text-align:center">VERIFICATION DE VOTRE IDENTITE</p><h1 style="color:#000;display:inline-block;font-family:HelveticaNeue-Medium,Helvetica,Arial,sans-serif;font-size:20px;font-weight:500;line-height:24px;margin-bottom:0;margin-top:0;text-align:center">Entrez le code suivant pour confirmer votre adresse.</h1><table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:rgba(0,0,0,.05);border-radius:4px;margin:16px auto 14px;vertical-align:middle;width:280px"><tbody><tr><td><p style="font-size:32px;line-height:40px;margin:0 auto;color:#000;display:inline-block;font-family:HelveticaNeue-Bold;font-weight:700;letter-spacing:6px;padding-bottom:8px;padding-top:8px;width:100%;text-align:center">validationCode</p></td></tr></tbody></table><p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Si vous n’êtes pas à l’origine de ce mail.</p><p style="font-size:15px;line-height:23px;margin:0;color:#444;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;letter-spacing:0;padding:0 40px;text-align:center">Contactez-nous a l’adresse<a href="mailto:info@nilrio.com" style="color:#444;text-decoration:underline" target="_blank">info@nilrio.com</a></p></td></tr></tbody></table><p style="font-size:12px;line-height:23px;margin:0;color:#000;font-weight:800;letter-spacing:0;margin-top:20px;font-family:HelveticaNeue,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase">SECURİSER PAR NİLRİO</p></body></html>`;
    const modifiedHtml = html.replace(/validationCode/g, code);
    // EMAİL CODE VERİFY MAİL
    let mailOptions = {
      from: "info@nilrio.com",
      to: formData.email,
      subject: "Verification de votre adresse e-mail",
      html: modifiedHtml,
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
