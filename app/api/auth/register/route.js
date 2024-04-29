import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

function generateRandomCode() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10); // 0-9 arası rastgele sayı ekle
  }
  return code;
}
export async function POST(req) {
  const data = await req.json();
  const { name, lastname, email, password, checked } = data;
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({
      message: "L'adresse e-mail est déjà associée à un autre compte.",
    });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  const code = generateRandomCode();
  await prisma.user.create({
    data: {
      name: name,
      lastname: lastname,
      email: email,
      code: code,
      password: encryptedPassword,
      newscheck: checked,
    },
  });

  return NextResponse.json({ message: "Success" });
}
