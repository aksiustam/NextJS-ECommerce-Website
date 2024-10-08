"use client";
import img from "@/public/assets/img/ecom-cart.gif";
import Image from "next/image";
import { useState } from "react";

const Loader = ({ children }) => {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  return (
    <>
      {loading ? (
        <div className="loader_wrapper">
          <Image
            src={img}
            alt="Logo"
            width={200}
            height={200}
            loading="eager"
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Loader;
