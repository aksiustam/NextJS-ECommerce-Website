"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";
import axios from "axios";
import { TfiRulerAlt } from "react-icons/tfi";
import ReactGA from "react-ga4";
import Modal from "react-bootstrap/Modal";
import { FaMinus, FaPlus, FaCheck } from "react-icons/fa";
import UseCart from "@/hooks/useCart";
import toast from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";
import RelatedProduct from "./RelatedProduct";
import setStockMail from "@/app/actions/Mail/setStockMail";
import { useRouter, useSearchParams } from "next/navigation";
const ProductClient = (props) => {
  const { product, user, products } = props;
  const { addToBasket, basket } = UseCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedColor = searchParams.get("color");

  const [modalShow, setModalShow] = useState(false);

  const [count, setCount] = useState(1);
  const [color, setColor] = useState(
    product.ProductColorSize.find(
      (item) => item.Color.name === selectedColor
    ) || product.ProductColorSize[0]
  );
  const [size, setSize] = useState(
    product.Category.SizeType.type === "acc" ? color.SizeStock[0] : ""
  );
  const [news, setNews] = useState(false);

  const [stocksShown, setStocksShown] = useState({ stock: 1, bool: false });
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const lastClickedTime = localStorage.getItem("lastClickedTime");
    if (lastClickedTime) {
      const elapsedTime = Date.now() - parseInt(lastClickedTime);
      if (elapsedTime < 100000) {
        // Eğer son tıklama 3 dakika içinde yapıldıysa
        setClicked(true);
        setTimeout(() => {
          setClicked(false); // 3 dakika sonra tekrar tıklamaya izin ver
        }, 100000 - elapsedTime);
      }
    }
  }, []);

  useEffect(() => {
    let matchingItem = false;

    matchingItem = basket.find(
      (item) =>
        item.id === product?.id &&
        item.color === color?.Color?.name &&
        item.size === size?.Size?.name
    );

    if (matchingItem) {
      let stock = size?.stock;
      const remainingStock = stock - matchingItem.quantity;
      if (remainingStock === 0) setNews(true);
      else setNews(false);
      const stockToShow =
        remainingStock < 11
          ? { stock: remainingStock, bool: true }
          : { stock: remainingStock, bool: false };
      setStocksShown(stockToShow);
    } else {
      const stdata = size?.stock;
      if (stdata === 0) setNews(true);
      else setNews(false);
      if (stdata < 11) setStocksShown({ stock: stdata, bool: true });
      else setStocksShown({ stock: stdata, bool: false });
    }
  }, [basket, color, product, size, setStocksShown, setNews]);

  useEffect(() => {
    const postClick = async () => {
      if (product && product.id) {
        const formData = { id: product.id };
        await axios.post(`/api/product/click`, formData);
      }
    };

    postClick();
  }, [product]);

  const addBasket = async () => {
    if (!product) {
      return;
    }
    if (stocksShown.stock === 0) {
      return;
    }
    if (size === "") {
      toast.error("Choisissez Une Taille");
      return;
    }

    let gram;
    const findgram = product?.ParcelGram?.find(
      (item) => item.sizeId === size.Size.id
    );
    gram = findgram?.gram || 220;

    if (count <= stocksShown.stock) {
      const data = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        inprice: product.inprice,
        indirim: product.indirim,
        parcelgram: gram,
        quantity: count,
        image: color.images[0],
        color: color.Color.name,
        size: size.Size.name,
      };

      ReactGA.event({
        category: "event",
        action: product?.name + " Sepete Ekledi",
        label: product?.name + " ürününü Sepete Ekledi",
      });
      addToBasket(data);
      toast.success("Article ajouté");
    } else {
      toast.error("Il n'y a pas assez de stock.");
    }
  };
  const incNum = () => {
    if (count > 9) {
    } else {
      setCount(count + 1);
    }
  };
  const decNum = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(1);
    }
  };

  const onMailSubmit = async () => {
    if (clicked) {
      await Swal.fire(
        "Question",
        "Vous avez récemment effectué une transaction similaire.",
        "question"
      );
      return;
    }
    if (user && user.email !== null) {
      if (!clicked) {
        setClicked(true);
        localStorage.setItem("lastClickedTime", Date.now().toString());
        const formData = {
          email: user.email,
          name: product.name,
          color: color?.Color?.name,
          size: size.Size.name,
          productId: product.id,
        };
        const res = await setStockMail(formData);
        if (res === true)
          await Swal.fire(
            "Succès",
            "Merci, nous vous tiendrons au courant.",
            "success"
          );

        setTimeout(() => {
          setClicked(false); // 3 dakika sonra tekrar tıklamaya izin ver
        }, 300000);
      }
    } else {
      navigate("/register");
    }
  };
  const mysizestock = color?.SizeStock ? [...color.SizeStock] : [];
  if (mysizestock && mysizestock.length >= 2) {
    mysizestock?.sort((a, b) => (a?.Size?.index || 0) - (b?.Size?.index || 0));
  }

  return (
    <>
      {product ? (
        <section id="product_single_one" className="ptb-100">
          <div className="container">
            <div className="row area_boxed">
              <div className="col-lg-4">
                <ProductImage color={color} />
              </div>
              <div className="col-lg-8">
                <div className="product_details_right_one">
                  <div className="modal_product_content_one">
                    <h1 className="tw-text-2xl tw-font-bold tw-mb-2">
                      {product?.name}
                    </h1>

                    {product.indirim === true ? (
                      <span className="tw-font-bold tw-text-lg">
                        {product?.inprice}€{" "}
                        <del className="tw-pl-3">{product?.price}€</del>{" "}
                      </span>
                    ) : (
                      <span className="tw-font-bold tw-text-lg">
                        {product?.price}€{" "}
                      </span>
                    )}
                    <div className=" tw-border-b-[1px] tw-border-black tw-w-full md:tw-w-96 tw-mt-3" />
                    <div className="variable-single-item ">
                      <span>Couleur</span>
                      <div className="product-variable-color ">
                        {product?.ProductColorSize?.map((item, index) => {
                          return (
                            <label key={item.id}>
                              <input
                                name="modal-product-color"
                                className="color-select"
                                type="radio"
                                defaultChecked={color.id === item.id && true}
                                onChange={() => {
                                  router.replace(`?color=${item.Color.name}`, {
                                    scroll: false,
                                  });
                                  setColor(item);
                                  product.Category.SizeType.type === "acc"
                                    ? setSize(item.SizeStock[0])
                                    : setSize("");
                                }}
                              />
                              <span
                                className="tw-border-2 tw-border-gray-300  "
                                style={{
                                  backgroundColor: item?.Color?.hex,
                                }}
                              >
                                <FaCheck
                                  className="iconsvg"
                                  size={18}
                                  color="white"
                                />
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    {product?.Category?.CategoryType.type !== "acc" ? (
                      <div className=" tw-border-t-[1px]  tw-border-black tw-w-full md:tw-w-96 tw-my-2" />
                    ) : (
                      ""
                    )}

                    {product?.Category?.CategoryType.type !== "acc" ? (
                      <div className="variable-single-item">
                        <span>Taille</span>
                        <div className="product-variable-size">
                          {mysizestock?.map((item) => {
                            return (
                              <label
                                key={item.id}
                                className={item.stock === 0 ? "disabled" : ""}
                              >
                                <input
                                  name="modal-product-size"
                                  className="size-select"
                                  type="radio"
                                  onChange={() => {
                                    setSize(item);
                                    setNews(false);
                                    if (item.stock === 0) setNews(true);
                                  }}
                                />
                                <span
                                  className={`tw-flex tw-items-center tw-justify-center tw-font-bold ${
                                    item === size
                                      ? "tw-border tw-border-black"
                                      : ""
                                  } `}
                                >
                                  {item?.Size?.name}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {product?.Category?.CategoryType?.type !== "acc" && (
                      <a
                        href="#!"
                        onClick={() => setModalShow(true)}
                        className="tw-flex tw-gap-2 tw-text-xs tw-mb-2"
                      >
                        <TfiRulerAlt size={16} />
                        Guide Des Tailles
                      </a>
                    )}
                    <div className=" tw-border-b-[1px]  tw-border-black tw-w-full md:tw-w-96 tw-mb-4" />
                    {stocksShown.bool && stocksShown.stock !== 0 && (
                      <div className="tw-text-red-600 tw-mb-2 tw-font-bold">
                        *Plus que {stocksShown?.stock} disponibles. Commandez
                        dès maintenant.
                      </div>
                    )}
                    {stocksShown.stock === 0 && (
                      <div className="tw-text-red-600 tw-mb-2 tw-font-bold">
                        *Nous sommes désolés,{" "}
                        {product?.Category?.CategoryType?.type === "acc"
                          ? "cet article est en rupture de stock."
                          : "cette taille est en rupture de stock."}
                      </div>
                    )}

                    {news === true ? (
                      <div className="tw-w-96">
                        <p className="tw-mb-3 tw-text-sm ">
                          Article épuisé, nous vous contacterons par mail
                          lorsque cet article sera de retour en stock
                        </p>
                        <div id="mc_embed_signup" className="subscribe-form">
                          <div className="tw-flex">
                            <button
                              type="button"
                              className="theme-btn-one btn_md !tw-border-2 tw-border-black hover:tw-bg-slate-100"
                              onClick={() => onMailSubmit()}
                            >
                              Me tenir au courant
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div id="product_count_form_two">
                      <div className="product_count_one">
                        <div className="plus-minus-input">
                          <div className="input-group-button">
                            <button
                              type="button"
                              className="button tw-items-center tw-justify-center"
                              onClick={decNum}
                            >
                              <FaMinus color="white" />
                            </button>
                          </div>
                          <input
                            className="form-control !tw-w-16"
                            type="number"
                            value={count}
                            readOnly
                          />
                          <div className="input-group-button">
                            <button
                              type="button"
                              className="button tw-items-center tw-justify-center"
                              onClick={incNum}
                            >
                              <FaPlus color="white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="links_Product_areas">
                      <button
                        className="theme-btn-one btn-black-overlay btn_sm"
                        onClick={() => addBasket()}
                        disabled={news}
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ProductInfo product={product} />
          </div>
        </section>
      ) : (
        <div className="container ptb-100">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
              <div className="empty_cart_area">
                <h2>Produit non trouvé </h2>
                <h3>Le produit que vous recherchez n&apos;a pas été trouvé</h3>
                <Link href="/shop" className="btn btn-black-overlay btn_sm">
                  Continuez Vos Achats
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <RelatedProduct products={products} />

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="tw-bg-[#CECAC5]">
          <div
            className="modal-dialog modal-dialog-centered modal-lg "
            role="document"
          >
            <Image
              src={product?.guideurl?.imageurl}
              alt="guidestaile"
              width={1500}
              height={1500}
              className="tw-object-contain"
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductClient;
