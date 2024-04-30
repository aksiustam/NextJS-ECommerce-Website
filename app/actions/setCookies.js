"use server";
import { cookies } from "next/headers";

export default async function setCookies(props) {
  try {
    const formData = {
      gacheck: props.gacheck,
      advertcheck: props.advertcheck,
    };
    cookies().set("cookie", JSON.stringify(formData), {
      secure: true,
      path: "/",
    });

    return true;
  } catch (error) {
    return null;
  }
}
