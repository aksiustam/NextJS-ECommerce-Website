import "@/public/assets/css/bootstrap.min.css";
import "@/public/assets/css/style.css";
import "@/public/assets/css/color.css";
import "@/public/assets/css/responsive.css";
import "@/public/assets/css/animate.min.css";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import CartProvider from "@/provider/CartProvider";

export const metadata = {
  title: "Next Nilrio",
  description: "Generated by Next Nilrio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <CartProvider>
          {children}
          <Toaster
            position="top-right"
            containerStyle={{ marginTop: "130px" }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
