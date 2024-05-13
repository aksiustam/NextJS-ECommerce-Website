import React from "react";
import UseCart from "@/hooks/useCart";

const YourOrders = (props) => {
  const { shipping } = props;
  const { basket } = UseCart();
  const toplam = basket
    .reduce((acc, item) => {
      if (item.indirim === true) {
        return acc + item.quantity * item.inprice;
      } else {
        return acc + item.quantity * item.price;
      }
    }, 0)
    .toFixed(2);
  const checkshipping =
    shipping.country === "FR" && shipping.name === "colissimo"
      ? (toplam * 100).toFixed(0) < 10000
        ? false
        : true
      : false;

  const parcelprice = checkshipping ? 0 : shipping.price;

  const TOTAL = (
    basket.reduce((acc, item) => {
      if (item.indirim === true) {
        return acc + item.quantity * item.inprice;
      } else {
        return acc + item.quantity * item.price;
      }
    }, 0) + parseFloat(parcelprice)
  ).toFixed(2);

  return (
    <>
      <div className="order_review  box-shadow bg-white">
        <div className="check-heading">
          <h3>Votre Commande</h3>
        </div>
        <div className="table-responsive order_table">
          <table className="table">
            <thead>
              <tr>
                <th>Produits</th>
                <th>Prix</th>
              </tr>
            </thead>
            <tbody>
              {basket.map((item, index) => {
                let totalprice = 0;
                if (item.indirim === true) {
                  totalprice = (item.quantity * item.inprice).toFixed(2);
                } else {
                  totalprice = (item.quantity * item.price).toFixed(2);
                }

                return (
                  <tr key={index}>
                    <td>
                      {item.name} {item.color}{" "}
                      {item.size === "null" ? "" : item.size}
                      <span className="product-qty"> x {item.quantity}</span>
                    </td>
                    <td>{totalprice}€</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>Sous total</th>
                <td className="product-subtotal">{toplam}€</td>
              </tr>
              <tr>
                <th className="tw-flex ">Frais de livraison</th>
                <td>{checkshipping ? "GRATUITS" : parcelprice + "€"}</td>
              </tr>
              <tr>
                <th>
                  TOTAL{" "}
                  <span className="tw-text-[9px] !tw-float-none tw-absolute tw-pl-1 tw-font-light">
                    TVA comprise
                  </span>
                </th>
                <td className="product-subtotal">{TOTAL}€</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default YourOrders;
