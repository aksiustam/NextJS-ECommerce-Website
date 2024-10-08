"use client";

import React, { useState, useEffect } from "react";

import logo from "@/public/assets/img/common/logo-nilrio-icon.png";
import logoWhite from "@/public/assets/img/logo-white.png";
import errimg from "@/public/assets/img/common/defproductimg.webp";
import frflag from "@/public/assets/img/svg/flag-france.svg";
import trflag from "@/public/assets/img/svg/flag-turkey.svg";
import svg from "@/public/assets/img/svg/cancel.svg";
import { RxCross2 } from "react-icons/rx";
import {
  FaTrashAlt,
  FaShoppingBasket,
  FaSearch,
  FaUser,
  FaUserCircle,
  FaBars,
  FaYoutubeSquare,
  FaWhatsappSquare,
  FaInstagramSquare,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { MdClose, MdAdminPanelSettings } from "react-icons/md";
import { IoExit } from "react-icons/io5";
import ReactGA from "react-ga4";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import UseCart from "@/hooks/useCart";
const Header = (props) => {
  const MenuData = props.headerdata;
  const User = props.user;
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    handleSearch();
    router.push(`/search/${data.search}`);
  };
  const [click, setClick] = useState(false);
  const [show, setShow] = useState();
  const [showflag, setShowFlag] = useState(false);

  const { removeBasket, basket } = UseCart();

  const cartTotal = () => {
    return basket
      .reduce((acc, item) => {
        if (item.indirim === true) {
          return acc + item.quantity * item.inprice;
        } else {
          return acc + item.quantity * item.price;
        }
      }, 0)
      .toFixed(2);
  };

  const handleClick = () => {
    if (click) {
      document.querySelector("#offcanvas-add-cart").style =
        "transform: translateX(100%);";
    } else {
      document.querySelector("#offcanvas-add-cart").style =
        "transform: translateX(0%);";
    }
    setClick(!click);
  };
  const handleSearch = () => {
    if (click) {
      document.querySelector("#search").style =
        "transform: translate(-100%, 0); opacity: 0";
    } else {
      document.querySelector("#search").style =
        "transform: translate(0px, 0px); opacity: 1";
    }
    setClick(!click);
  };
  const handlemenu = () => {
    if (click) {
      document.querySelector("#mobile-menu-offcanvas").style =
        "transform: translateX(100%);";
    } else {
      document.querySelector("#mobile-menu-offcanvas").style =
        "transform: translateX(0%);";
    }
    setClick(!click);
  };

  const handleShow = (value) => {
    if (value === show) {
      setShow("");
    } else {
      setShow(value);
    }
  };
  const closeMenu = () => {
    if (click) {
      document.querySelector("#mobile-menu-offcanvas").style =
        "transform: translateX(100%);";
    } else {
      document.querySelector("#mobile-menu-offcanvas").style =
        "transform: translateX(0%);";
    }
    setClick(!click);
  };
  // Sticky Menu Area
  useEffect(() => {
    const header = document.querySelector(".header-section");

    const isSticky = () => {
      const scrollTop = window.scrollY;
      scrollTop >= 75
        ? header.classList.add("is-sticky")
        : header.classList.remove("is-sticky");
    };

    window.addEventListener("scroll", isSticky);

    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, []);

  const logout = () => {
    signOut();
    router.push("/");
    router.refresh();
  };
  //#endregion

  return (
    <>
      <header className="header-section d-none d-lg-block tw-w-screen tw-z-20 tw-fixed">
        <div className="header-wrapper ">
          <div className="header-bottom  section-fluid sticky-header sticky-color--golden ">
            <div className="container">
              <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-center">
                  <div className="header-logo">
                    <div className="logo">
                      <Link href="/" scroll={false}>
                        <Image
                          src={logo}
                          alt="Nilrio Logo"
                          width={350}
                          heigth={350}
                          loading="eager"
                          priority="true"
                          className=" tw-h-[105px] tw-w-[105px] tw-object-contain"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row tw-border-y-2 tw-mx-0 tw-px-0">
            <div className="col-lg-0 col-xl-2"></div>
            <div className="col-lg-10 col-xl-8">
              <div className="main-menu menu-color--black menu-hover-color--golden d-none d-lg-flex ">
                <nav>
                  <ul>
                    {MenuData?.map((item, index) => {
                      return (
                        <li className="has-dropdown" key={index}>
                          <Link
                            href={item.href !== "" ? item.href : "#!"}
                            className="main-menu-link !tw-text-white lg:!tw-text-xs xl:!tw-text-[14px]"
                            onClick={() => {
                              ReactGA.event({
                                category: "event",
                                action: item?.name,
                                label: item?.name + " a gitti",
                              });
                            }}
                          >
                            {item?.name}
                            {item?.children?.length !== 0 && (
                              <i className="fa fa-angle-down"></i>
                            )}
                          </Link>
                          {item?.children?.length !== 0 && (
                            <ul className="sub-menu">
                              {item?.children?.map((data, index) => (
                                <li key={index}>
                                  <Link
                                    href={data.href}
                                    className="!tw-font-bold"
                                    onClick={() => {
                                      ReactGA.event({
                                        category: "event",
                                        action: data?.name,
                                        label: data?.name + " a gitti",
                                      });
                                    }}
                                  >
                                    {data?.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-2 tw-flex tw-items-center tw-justify-center">
              <ul className="header-action-link action-color--black action-hover-color--golden tw-flex tw-gap-4">
                <li>
                  <a href="#!" className="search_width" onClick={handleSearch}>
                    <FaSearch size={26} color="white" />
                  </a>
                </li>
                <li>
                  {basket.length ? (
                    <a
                      href="#!"
                      className="offcanvas-toggle"
                      onClick={handleClick}
                    >
                      <FaShoppingBasket size={25} color="white" />
                      <span className="tw-absolute tw-bottom-3 tw-left-3">
                        {basket.length}
                      </span>
                    </a>
                  ) : (
                    <a href="#!" className="offcanvas-toggle">
                      <FaShoppingBasket size={25} color="white" />
                      <span className="tw-absolute tw-bottom-3 tw-left-3">
                        {basket.length}
                      </span>
                    </a>
                  )}
                </li>

                <li className="after_login">
                  <FaUserCircle className="tw-text-white" size={26} />
                  <ul className="custom_dropdown">
                    {User ? (
                      <>
                        <li className="tw-flex tw-items-center tw-gap-2">
                          <FaUser size={16} />
                          <Link href="/profile">Mon Profil</Link>
                        </li>

                        {User && User.Role === "ADMIN" ? (
                          <li className="tw-flex tw-items-center tw-gap-2">
                            <MdAdminPanelSettings size={16} />
                            <Link href="/admin">Admin</Link>
                          </li>
                        ) : (
                          ""
                        )}
                        <li className="tw-flex tw-items-center tw-gap-2">
                          <IoExit size={16} />
                          <Link href="#!" onClick={logout}>
                            Déconnexion
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="tw-flex tw-items-center tw-gap-2">
                          <FaUser size={16} />
                          <Link href="/login">Se connecter / S’inscrire</Link>
                        </li>
                      </>
                    )}
                  </ul>
                </li>
                <li>
                  <button
                    onClick={() => setShowFlag(!showflag)}
                    className="tw-flex tw-items-center tw-justify-center"
                  >
                    <Image
                      src={frflag}
                      alt="france"
                      width={25}
                      height={25}
                      loading="eager"
                    />
                  </button>
                  {showflag && (
                    <div className="-tw-translate-x-44 tw-translate-y-3 tw-fixed tw-z-20">
                      <div className="tw-flex tw-flex-col tw-items-start tw-pb-2 tw-bg-white tw-space-y-4">
                        <div className="tw-bg-black tw-flex tw-items-center tw-justify-between tw-py-4 tw-px-3">
                          <div className="tw-text-white tw-font-bold tw-text-xs tw-mr-12 tw-text-nowrap">
                            Choisir votre pays
                          </div>
                          <div
                            className="tw-cursor-pointer tw-flex tw-items-center tw-justify-center"
                            onClick={() => setShowFlag(false)}
                          >
                            <RxCross2 size={16} color="white" />
                          </div>
                        </div>
                        <a
                          href="https://deneme.nilrio.com/"
                          className="tw-w-[80%] tw-flex tw-items-center tw-space-x-3 tw-ml-4 tw-pb-2 tw-border-b-2 tw-cursor-pointer"
                        >
                          <Image
                            src={frflag}
                            alt="france"
                            width={25}
                            height={25}
                            loading="eager"
                          />
                          <div className="tw-text-sm tw-font-bold tw-text-black">
                            France
                          </div>
                        </a>
                        <a
                          href="https://denemetr.nilrio.com/"
                          className="tw-w-[80%] tw-flex tw-items-center tw-space-x-3 tw-ml-4 tw-pb-2 tw-cursor-pointer"
                        >
                          <Image
                            src={trflag}
                            alt="turkey"
                            width={25}
                            height={25}
                            loading="eager"
                            className="tw-rounded-sm"
                          />
                          <div className="tw-text-sm tw-font-bold tw-text-black">
                            Turkey
                          </div>
                        </a>
                      </div>
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="mobile-header sticky-header sticky-color--golden tw-bg-black section-fluid d-md-block d-lg-none">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-between">
              <div className="mobile-header-left">
                <ul className="mobile-menu-logo">
                  <li>
                    <Link href="/" scroll={false}>
                      <div className="logo">
                        <Image
                          src={logoWhite}
                          alt={"logo"}
                          width={125}
                          heigth={80}
                          loading="eager"
                        />
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="mobile-right-side">
                <ul className="header-action-link action-color--black action-hover-color--golden tw-gap-2">
                  <li>
                    <a
                      href="#!"
                      className="search_width"
                      onClick={handleSearch}
                    >
                      <FaSearch size={24} color="white" />
                    </a>
                  </li>
                  <li>
                    {basket.length ? (
                      <a
                        href="#!"
                        className="offcanvas-toggle"
                        onClick={handleClick}
                      >
                        <FaShoppingBasket size={25} color="white" />
                        <span className="tw-absolute tw-top-0 tw-left-3">
                          {basket.length}
                        </span>
                      </a>
                    ) : (
                      <a href="#!" className="offcanvas-toggle">
                        <FaShoppingBasket size={25} color="white" />
                        <span className="tw-absolute tw-top-0 tw-left-3">
                          {basket.length}
                        </span>
                      </a>
                    )}
                  </li>
                  <li className="after_login">
                    <FaUserCircle className="tw-text-white" size={24} />
                    <ul className="custom_dropdown">
                      {User ? (
                        <>
                          <li className="tw-flex tw-items-center tw-gap-2">
                            <FaUser size={16} />
                            <Link href="/profile">Mon Profil</Link>
                          </li>

                          {User && User.Role === "ADMIN" ? (
                            <li className="tw-flex tw-items-center tw-gap-2">
                              <MdAdminPanelSettings size={16} />
                              <Link href="/admin">Admin</Link>
                            </li>
                          ) : (
                            ""
                          )}
                          <li className="tw-flex tw-items-center tw-gap-2">
                            <IoExit size={16} />
                            <Link href="#!" onClick={logout}>
                              Déconnexion
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="tw-flex tw-items-center tw-gap-2">
                            <FaUser size={16} />
                            <Link href="/login">Se connecter / S’inscrire</Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowFlag(!showflag)}
                      className="tw-flex tw-items-center tw-justify-center"
                    >
                      <Image
                        src={frflag}
                        alt="france"
                        width={25}
                        height={25}
                        loading="eager"
                      />
                    </button>
                    {showflag && (
                      <div className="-tw-translate-x-44 tw-translate-y-4 tw-fixed tw-z-20">
                        <div className="tw-flex tw-flex-col tw-items-start tw-pb-2 tw-bg-white tw-space-y-4">
                          <div className="tw-bg-black tw-flex tw-items-center tw-justify-between tw-py-3 tw-px-3">
                            <div className="tw-text-white tw-font-bold tw-text-xs tw-mr-12 tw-text-nowrap">
                              Choisir votre pays
                            </div>
                            <div
                              className="tw-cursor-pointer tw-flex tw-items-center tw-justify-center"
                              onClick={() => setShowFlag(false)}
                            >
                              <RxCross2 size={16} color="white" />
                            </div>
                          </div>
                          <a
                            href="https://deneme.nilrio.com/"
                            className="tw-w-[80%] tw-flex tw-items-center tw-space-x-3 tw-ml-4 tw-pb-2 tw-border-b-2 tw-cursor-pointer"
                          >
                            <Image
                              src={frflag}
                              alt="france"
                              width={25}
                              height={25}
                              loading="eager"
                            />
                            <div className="tw-text-sm tw-font-bold tw-text-black">
                              France
                            </div>
                          </a>
                          <a
                            href="https://denemetr.nilrio.com/"
                            className="tw-w-[80%] tw-flex tw-items-center tw-space-x-3 tw-ml-4 tw-pb-2 tw-cursor-pointer"
                          >
                            <Image
                              src={trflag}
                              alt="turkey"
                              width={25}
                              height={25}
                              loading="eager"
                              className="tw-rounded-sm"
                            />
                            <div className="tw-text-sm tw-font-bold tw-text-black">
                              Turkey
                            </div>
                          </a>
                        </div>
                      </div>
                    )}
                  </li>
                  <li>
                    <a
                      href="#!"
                      className="offcanvas-toggle offside-menu tw-flex tw-items-center tw-justify-center"
                      onClick={handlemenu}
                    >
                      <FaBars size={25} color="white" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu-offcanvas"
        className="offcanvas offcanvas-rightside offcanvas-mobile-menu-section"
      >
        <div className="offcanvas-header text-right">
          <button className="offcanvas-close" onClick={handlemenu}>
            <MdClose size={24} color="white" />
          </button>
        </div>
        <div className="offcanvas-mobile-menu-wrapper">
          <div className="mobile-menu-bottom">
            <div className="offcanvas-menu">
              <ul>
                {MenuData?.map((item, index) => {
                  return (
                    <li key={index}>
                      <Link
                        href={item.href !== "" ? item.href : "#!"}
                        className="main-menu-link tw-italic"
                        onClick={() => {
                          handleShow(item.name);
                          item.children.length === 0 && closeMenu();
                          ReactGA.event({
                            category: "event",
                            action: item?.name,
                            label: item?.name + " a gitti",
                          });
                        }}
                      >
                        {item?.name}
                      </Link>
                      {item.children.length !== 0 && show === item.name && (
                        <ul className="mobile-sub-menu tw-mt-2 tw-ml-4">
                          <li>
                            <Link
                              href={item.href}
                              onClick={() => closeMenu()}
                              className="tw-italic"
                            >
                              Voir Tout
                            </Link>
                          </li>
                          {item.children?.map((data, index) => (
                            <li key={index}>
                              <Link
                                href={data?.href}
                                onClick={() => {
                                  closeMenu();
                                  ReactGA.event({
                                    category: "event",
                                    action: data?.name,
                                    label: data?.name + " a gitti",
                                  });
                                }}
                                className="tw-italic"
                              >
                                {data?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="mobile-contact-info">
            <div className="logo">
              <Link href="/" scroll={false}>
                <Image
                  src={logoWhite}
                  alt="Nilrio Logo White"
                  width={200}
                  height={70}
                  loading="eager"
                />
              </Link>
            </div>
            <address className="address">
              <span>Whatsapp: +33 7 8182 51 39</span>
              <span>E-mail: nilrio.info@gmail.com</span>
            </address>
            <ul className="social-link">
              <li>
                <a href="https://api.whatsapp.com/send?phone=33781825139">
                  <FaYoutubeSquare size={32} color="white" />
                </a>
              </li>

              <li>
                <a href="https://www.instagram.com/nilrio_/">
                  <FaWhatsappSquare size={32} color="white" />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@nilrio">
                  <FaInstagramSquare size={32} color="white" />
                </a>
              </li>
            </ul>
            <ul className="user-link">
              <li>
                <Link href="/cart">Voir mon panier</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        id="offcanvas-add-cart"
        className="offcanvas offcanvas-rightside offcanvas-add-cart-section"
      >
        <div className="offcanvas-header text-right">
          <button className="offcanvas-close" onClick={handleClick}>
            <Image
              src={svg}
              alt="close icon"
              width={50}
              height={50}
              loading="eager"
            />
          </button>
        </div>
        <div className="offcanvas-add-cart-wrapper">
          <div className="offcanvas-title tw-font-bold">MON PANIER</div>
          <ul className="offcanvas-cart">
            {basket?.map((data, index) => (
              <li className="offcanvas-wishlist-item-single" key={index}>
                <div className="offcanvas-wishlist-item-block">
                  <Link
                    href={`/product/${data.slug}`}
                    className="offcanvas-wishlist-item-image-link"
                  >
                    <Image
                      src={data.image?.imageurl}
                      alt={data.name}
                      width={300}
                      height={300}
                      loading="eager"
                      className="offcanvas-wishlist-image"
                      onError={(e) => {
                        e.target.src = errimg;
                      }}
                    />
                  </Link>
                  <div className="offcanvas-wishlist-item-content">
                    <Link
                      href={`/product/${data.slug}`}
                      className="offcanvas-wishlist-item-link"
                    >
                      {data.name} {data.color}{" "}
                      {data.size === "null" ? "" : data.size}
                    </Link>
                    <div className="offcanvas-wishlist-item-details">
                      <span className="offcanvas-wishlist-item-details-quantity">
                        {data.quantity || 1} x
                      </span>
                      <span className="offcanvas-wishlist-item-details-price">
                        {data.indirim === true ? data.inprice : data.price}€
                      </span>
                    </div>
                  </div>
                </div>
                <div className="offcanvas-wishlist-item-delete text-right">
                  <a
                    href="#!"
                    className="offcanvas-wishlist-item-delete"
                    onClick={() => removeBasket(data)}
                  >
                    <FaTrashAlt size={20} color="red" />
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <div className="offcanvas-cart-total-price">
            <span className="offcanvas-cart-total-price-text">
              TOTAL{" "}
              <span className="tw-text-[9px] !tw-float-none tw-absolute tw-pl-1 tw-font-light">
                TVA comprise
              </span>
            </span>
            <span className="offcanvas-cart-total-price-value">
              {cartTotal()}€
            </span>
          </div>
          <ul className="offcanvas-cart-action-button tw-gap-5">
            <li>
              <Link
                href="/cart"
                className="theme-btn-one tw-text-black tw-border-[2px] tw-border-black tw-min-w-full tw-p-3 tw-font-bold tw-text-center"
              >
                Voir Mon Panier
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="theme-btn-one tw-text-black tw-border-[2px] tw-border-black tw-min-w-full tw-p-3 tw-font-bold tw-text-center"
              >
                Valider la commande
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div id="search" className="search-modal">
        <button type="button" className="close" onClick={handleSearch}>
          <Image
            src={svg}
            alt="close icon"
            width={50}
            height={50}
            loading="eager"
          />
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="search"
            placeholder=""
            {...register("search", {
              required: "En az 3 karakter giriniz",
              pattern: {
                value: /^.{3,}$/,
                message: "En az 3 karakter giriniz",
              },
            })}
          />
          <button type="submit" className="btn btn-lg btn-main-search">
            Rechercher
          </button>
        </form>
      </div>
    </>
  );
};

export default Header;
