"use client";

import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./productStyle.css";
const ProductImage = (props) => {
  const { color } = props;

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
    dots: true,
    infinite: true,
    speed: 200,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    initialSlide: 0,
  };

  return (
    <div className="product_single_one_img tw-relative">
      <Slider {...slidersettings}>
        {color?.images?.map((item, index) => (
          <InnerImageZoom key={index} src={item?.imageurl} />
        ))}
      </Slider>
    </div>
  );
};

export default ProductImage;
