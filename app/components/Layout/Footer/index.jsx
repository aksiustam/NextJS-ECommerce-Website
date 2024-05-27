import logo from "@/public/assets/img/common/logo-web-alt.png";
import cart1 from "@/public/assets/img/common/cart1.jpg";
import cart2 from "@/public/assets/img/common/cart2.webp";
import cart3 from "@/public/assets/img/common/cart3.jpg";
import cart4 from "@/public/assets/img/common/cart4.png";
import Cookie from "./Cookie";
import Feature from "../Feature";
import Trending from "../Trending";

import CookieBtn from "./CookieBtn";
import Link from "next/link";
import FooterLink from "./FooterLink";
import Image from "next/image";
import { cookies } from "next/headers";

const Footer = () => {
  const cookieStore = cookies();
  const hasCookie = cookieStore.has("cookie");
  const getCookie = cookieStore.get("cookie") || null;

  const FooterData = [
    {
      title: "A propos de Nilrio",
      links: [
        { linkTitle: "Nos certificats", link: "/certificate" },
        { linkTitle: "Notre Histoire", link: "/about" },
        { linkTitle: "Contact", link: "/contact" },
      ],
    },
    {
      title: "Nos politiques",
      links: [
        { linkTitle: "Mentions légales", link: "/privacy-policy/legalnotice" },
        {
          linkTitle: "politique de confidentialité",
          link: "/privacy-policy/privacy",
        },
        {
          linkTitle: "politique de remboursement",
          link: "/privacy-policy/refund",
        },
        {
          linkTitle: "Conditions de vente",
          link: "/privacy-policy/termsofsale",
        },
      ],
    },
    {
      title: "Aide et assistance",
      links: [
        { linkTitle: "Suivez votre commande", link: "/ordertrack" },

        { linkTitle: "Guide des tailles", link: "/guidetaille" },
      ],
    },
  ];
  const datenow = new Date();
  return (
    <>
      <Feature />
      <Trending />
      <footer id="footer_one" style={{ backgroundColor: "#191919" }}>
        <div className="container">
          <div className="row ">
            <div className="col-lg-3 col-md-12 col-sm-12 col-12 tw-py-4 md:tw-py-8 md:tw-pl-16 tw-text-center md:tw-text-left">
              {FooterData?.slice(0, 1).map((data, index) => (
                <div
                  className="footer_one_widget tw-capitalize tw-text-white"
                  key={index}
                >
                  <h3 className="tw-text-white tw-font-extrabold tw-italic tw-pb-4">
                    {data?.title}
                  </h3>
                  <ul>
                    {data?.links?.map((link, index) => (
                      <li key={index}>
                        <FooterLink link={link} check={true} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-12 tw-py-4 md:tw-py-8 md:tw-pl-16 tw-text-center md:tw-text-left">
              {FooterData.slice(1, 2).map((data, index) => (
                <div
                  className="footer_one_widget tw-capitalize tw-text-white"
                  key={index}
                >
                  <h3 className="tw-text-white tw-font-extrabold tw-italic tw-pb-4">
                    {data?.title}
                  </h3>
                  <ul>
                    {data?.links.map((link, index) => (
                      <li key={index}>
                        <FooterLink link={link} check={true} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-12 tw-py-4 md:tw-py-8 md:tw-pl-16 tw-text-center md:tw-text-left">
              {FooterData.slice(2, 3).map((data, index) => (
                <div
                  className="footer_one_widget tw-capitalize tw-text-white"
                  key={index}
                >
                  <h3 className="tw-text-white tw-font-extrabold tw-italic tw-pb-4">
                    {data.title}
                  </h3>
                  <ul>
                    {data?.links.map((link, index) => (
                      <li key={index}>
                        <FooterLink link={link} check={true} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-12 tw-py-8 ">
              <div className="tw-flex tw-items-center tw-justify-center tw-flex-col -tw-mt-6">
                <Link href="/">
                  <Image
                    src={logo}
                    alt="Nilrio Logo"
                    width={300}
                    height={300}
                    loading="eager"
                    className="tw-w-[100px] tw-h-[100px] md:tw-w-[170px] md:tw-h-[170px] tw-object-contain"
                  />
                </Link>

                <div className="footer_left_side_icon">
                  <ul>
                    <li>
                      <a href="https://api.whatsapp.com/send?phone=33781825139">
                        <i className="fa fa-lg fa-whatsapp"></i>
                      </a>
                    </li>

                    <li>
                      <a href="https://www.instagram.com/nilrio_/">
                        <i className="fa fa-lg fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.youtube.com/@nilrio">
                        <i className="fa fa-lg fa-youtube-play"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <section id="copyright_one">
        <div className="container">
          <CookieBtn getCookie={getCookie} />
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="copyright_left">
                <h4 className="tw-text-white tw-font-bold tw-text-xs">
                  © CopyRight {datenow?.getFullYear()} NILRIO By{" "}
                  <a href="https://www.aydtanitim.com/">
                    <span>AYDTanıtım</span>
                  </a>
                </h4>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="tw-flex tw-items-center tw-gap-2 tw-justify-end">
                <Image
                  src={cart1}
                  alt="payment"
                  width={500}
                  height={500}
                  loading="eager"
                  className="tw-w-[40px] tw-h-full tw-object-contain"
                />
                <Image
                  src={cart2}
                  alt="payment"
                  width={500}
                  height={500}
                  loading="eager"
                  className="tw-w-[40px] tw-h-full tw-object-contain"
                />
                <Image
                  src={cart3}
                  alt="payment"
                  width={500}
                  height={500}
                  loading="eager"
                  className="tw-w-[40px] tw-h-full tw-object-contain"
                />
                <Image
                  src={cart4}
                  alt="payment"
                  width={500}
                  height={500}
                  loading="eager"
                  className="tw-w-[40px] tw-h-full tw-object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {!hasCookie ? <Cookie /> : null}
    </>
  );
};

export default Footer;
