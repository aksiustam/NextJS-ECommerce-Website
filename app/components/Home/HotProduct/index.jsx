"use client";
import ProductCard from "../../Products/ProductCard";
import ofgimg from "@/public/assets/img/common/logo-france.png";
import bioimg from "@/public/assets/img/common/bio.png";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./productStyle.css";
const HotProduct = (props) => {
  const { products, settings } = props;
  const trendname = settings?.trend?.name;
  const trend = settings?.trend?.checkname;
  const check = settings?.trend?.check;

  const pdata = () => {
    let bucket;
    switch (trend) {
      case "Nouveautés":
        bucket = products
          .filter((product) => product.indirim === true)
          .slice(0, 12);
        break;

      case "Top Ventes":
        bucket = [...products]
          .sort((a, b) => b.onclick - a.onclick)
          .slice(0, 12);

        break;
      case "Promotions":
        bucket = products
          .filter((product) => product.yeni === true)
          .slice(0, 12);

        break;
      case "Bio":
        bucket = products
          .filter((product) => product.bio === true)
          .slice(0, 12);

        break;
      case "Origine France Garantie":
        bucket = products
          .filter((product) => product.ofg === true)
          .slice(0, 12);

        break;

      default:
        bucket = products.slice(0, 12);
        break;
    }

    return bucket;
  };

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow right-arrow" onClick={onClick}>
        <FaChevronRight color="white" />
      </div>
    );
  };
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="slick-arrow left-arrow" onClick={onClick}>
        <FaChevronLeft color="white" />
      </div>
    );
  };

  let slidersettings = {
    autoplay: true,
    arrows: true,
    dots: false,
    infinite: pdata().length > 6 ? true : false,
    speed: 200,
    autoplaySpeed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1444,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      {check === true && (
        <section id="hot_Product_area" className="tw-mt-2 md:tw-mt-2">
          <div className="flex flex-col">
            <div className="w-full">
              <div className="tw-w-full tw-flex tw-items-center tw-justify-center">
                <div className="tw-mt-1 md:tw-text-xl tw-font-extrabold tw-uppercase tw-flex tw-items-center tw-justify-center">
                  {trendname}{" "}
                  {trend === "Bio" && (
                    <Image
                      src={bioimg}
                      alt="Nilrio Bio"
                      width={300}
                      height={300}
                      loading="eager"
                      className="tw-ml-4 tw-w-4 tw-h-4 md:tw-w-6 md:tw-h-6 tw-object-contain"
                    />
                  )}
                  {trend === "Origine France Garantie" && (
                    <Image
                      src={ofgimg}
                      alt="Nilrio OFG"
                      width={300}
                      height={300}
                      loading="eager"
                      className="tw-ml-4 tw-w-4 tw-h-4 md:tw-w-6 md:tw-h-6 tw-object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="w-full">
              <div className="w-full tw-relative">
                {pdata() && (
                  <Slider {...slidersettings} className="w-full">
                    {pdata().map((data) => (
                      <div className="tw-w-full tw-px-1" key={data.id}>
                        <ProductCard data={data} />
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default HotProduct;
