"use client";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "./style.css";
import { API_URL } from "@/lib/config";
import axios from "axios";
import Link from "next/link";

const Banner = async () => {
  let slidersettings = {
    autoplay: true,
    arrows: false,
    dots: false,
    infinite: true,
    speed: 200,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
  };
  const response = await axios.get(API_URL + "/settings/all");
  const settings = response.data;

  // bannercolor
  const banner = settings?.banner;

  return (
    <>
      <section
        id="banner_one"
        className={``}
        style={{
          backgroundImage: `url(${API_URL}${banner?.bannerRes?.url})`,
        }}
      >
        <div className="container ">
          <div className="row">
            <div className="col-6 tw-px-0">
              <div className="banner_text_one">
                <h1
                  className={`wow flipInX `}
                  data-wow-duration="3.0s"
                  data-wow-delay=".3s"
                  style={{ color: banner?.bannercolor }}
                >
                  {banner?.bannerUst}
                  <span
                    className="wow flipInX"
                    data-wow-duration="2.0s"
                    data-wow-delay=".5s"
                    style={{ color: banner?.bannercolor }}
                  >
                    {banner?.bannerAlt}
                  </span>
                </h1>

                {banner?.btncheck === "true" && (
                  <Link
                    href={banner?.buttonUrl}
                    className="theme-btn-one btn_sm tw-border-[3px] tw-rounded-2xl tw-text-xs lg:tw-text-xl"
                    style={{
                      color: banner?.bannercolor,
                      borderColor: banner?.bannercolor,
                    }}
                  >
                    {banner?.button}
                  </Link>
                )}
              </div>
            </div>

            <div className="col-6 tw-pr-0">
              <Slider {...slidersettings} className="tw-absolute">
                {banner?.bannerYan.map((item, index) => {
                  return (
                    <img
                      src={API_URL + item?.url}
                      alt="img"
                      className="tw-w-full tw-h-[200px] lg:tw-h-[600px] tw-object-contain"
                      key={index}
                    />
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
