"use client";
import { useEffect, useState } from "react";
import errimg from "@/public/assets/img/common/defproductimg.webp";
import ReactGA from "react-ga4";
import UseCart from "@/hooks/useCart";
import Link from "next/link";
import { FaTrashAlt } from "react-icons/fa";
import getParcelGram from "../actions/Parcel/getParcelGram";
import Image from "next/image";
const CartClient = () => {
  const { removeBasket, basket } = UseCart();

  const totalprice = basket
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2);

  const indirimprice = (
    totalprice -
    basket.reduce((acc, item) => {
      if (item.indirim === true) {
        return acc + item.quantity * item.inprice;
      } else {
        return acc + item.quantity * item.price;
      }
    }, 0)
  ).toFixed(2);
  const totalgram =
    basket.reduce((acc, item) => {
      return acc + item.quantity * item.parcelgram;
    }, 0) || 100;

  const [senddata, setSendData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let ct = "FR";
      const data = await getParcelGram(ct, totalgram);
      setSendData(data);
    };
    fetchData();
  }, [totalgram]);
  const toplam = totalprice - indirimprice;
  const checkshipping = (toplam * 100).toFixed(0) < 10000 ? false : true;

  return (
    <>
      {basket.length > 0 ? (
        <section id="cart_area_three" className="ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                <div className="tw-mb-6">
                  <h3 className="tw-text-2xl tw-font-bold tw-mb-5">
                    VOTRE PANIER
                  </h3>
                  <Link
                    href="/boutique"
                    className="theme-btn-one tw-border-2 tw-border-black btn_sm tw-font-bold "
                  >
                    Continuer les achats
                  </Link>
                </div>
                <div className="table_desc tw-mb-4">
                  <div className="table_page table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th className="product_thumb">Image</th>
                          <th className="product_name">Produits</th>
                          <th className="product-price">Prix unitaire</th>
                          <th className="product_quantity">Quantité</th>
                          <th className="product_total">Prix Total</th>
                          <th className="product_remove">Supprimer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {basket.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="product_thumb">
                                <Link href={`/product/${item.slug}`}>
                                  <Image
                                    src={item.image.imageurl}
                                    alt={item.name}
                                    width={300}
                                    height={300}
                                    loading="eager"
                                  />
                                </Link>
                              </td>
                              <td className="product_name">
                                <Link href={`/product/${item.slug}`}>
                                  {item.name} {item.color}{" "}
                                  {item.size === "null" ? "" : item.size}
                                </Link>
                              </td>
                              <td className="product-price">
                                {item.price.toFixed(2)}€
                              </td>
                              <td className="product_quantity">
                                {item.quantity}
                              </td>
                              <td className="product_total">
                                {(item.price * item.quantity).toFixed(2)}€
                              </td>
                              <td className="product_remove">
                                <a
                                  href="#!"
                                  onClick={() => removeBasket(data)}
                                  className="tw-flex tw-items-center tw-justify-center"
                                >
                                  <FaTrashAlt size={18} color="red" />
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="tw-font-bold tw-bg-gray-200 tw-p-3 tw-rounded-full">
                  <span>
                    Les articles dans le panier ne sont pas réservés !
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="coupon_code left">
                  <h3>APERÇU</h3>
                  <div className="total_cart_inner">
                    <form action="#!" id="total_cart_form_three">
                      <label className="custom_boxed tw-text-sm">
                        Sous-Total{" "}
                        <span className="rigth_cart">{totalprice}€</span>
                      </label>
                      <label className="custom_boxed tw-text-sm">
                        Réduction
                        <span className="rigth_cart">-{indirimprice}€</span>
                      </label>
                      <label className="custom_boxed tw-text-sm">
                        Frais de livraison
                        <span className="rigth_cart">
                          {checkshipping === false
                            ? senddata?.colissimo + "€"
                            : "GRATUITS"}
                        </span>
                      </label>
                    </form>
                    <div className="total_catr_three_bottom tw-text-sm relative">
                      <h5>
                        TOTAL{" "}
                        <span className="tw-text-[9px] !tw-float-none tw-absolute tw-pl-1 tw-font-light">
                          TVA comprise
                        </span>
                        <span className="rigth_cart">
                          {parseFloat(
                            toplam +
                              (!checkshipping
                                ? parseFloat(senddata?.colissimo)
                                : 0)
                          ).toFixed(2)}
                          €
                        </span>
                      </h5>
                    </div>
                    <div className="cart_submit">
                      <Link
                        href="/checkout"
                        className="theme-btn-one btn-black-overlay btn_sm"
                        onClick={() => {
                          ReactGA.event({
                            category: "event",
                            action: "SepetDevamEt",
                            label: "Sepetten Satın Almaya Gitti",
                          });
                        }}
                      >
                        Valider la commande
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section id="empty_cart_area" className="ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                <div className="empaty_cart_area">
                  <h2>Votre panier et vide</h2>

                  <Link href="/shop" className="btn btn-black-overlay btn_md">
                    Remplissez votre panier
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CartClient;
