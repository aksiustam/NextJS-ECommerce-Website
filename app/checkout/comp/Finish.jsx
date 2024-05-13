"use client";

import React, { useEffect } from "react";
import InvoiceEmail from "@/app/reactemail/invoicemail";
import { render } from "@react-email/render";
import AdminSiparis from "@/app/reactemail/adminsiparis";
import Link from "next/link";
import UseCart from "@/hooks/useCart";
import sendOrderMail from "../../actions/Order/sendOrderMail";
const Finish = (props) => {
  const { finishBasket, user } = props;
  const { emptyBasket } = UseCart();

  useEffect(() => {
    const sendMail = async () => {
      emptyBasket();

      const html = render(<InvoiceEmail sipdata={finishBasket} />);

      // console.log(html);

      const htmlto = render(<AdminSiparis sipdata={finishBasket} />);

      // console.log(htmlto);

      const formData = {
        email: finishBasket.email,
        html: html,
        htmladmin: htmlto,
        sipid: finishBasket.id,
      };
      await sendOrderMail(formData);
    };
    sendMail();
  }, [emptyBasket, finishBasket]);
  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
      <div>Votre commande a bien été prise en compte</div>
      <div>
        <Link
          className="tw-text-blue-600 tw-cursor-pointer"
          href={`/order-complete/${finishBasket?.id}`}
        >
          Cliquez
        </Link>{" "}
        pour voir votre facture
      </div>
      {user !== null && (
        <div>
          Vous pouvez acceder au suivi de votre commande depuis votre espace
          profil
        </div>
      )}
      {user === null && (
        <Link
          className="tw-text-blue-600 tw-cursor-pointer"
          href={`/ordertrack`}
        >
          Suivez votre commande
        </Link>
      )}
    </div>
  );
};

export default Finish;
