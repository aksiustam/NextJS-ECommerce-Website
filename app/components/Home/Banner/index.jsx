"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "./style.css";
import { API_URL } from "@/lib/config";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Banner = () => {
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
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(API_URL + "/settings/all");
      const settings = response.data.banner;
      setData(settings);
    };
    fetchData();
  }, []);

  return (
    <>
      <section
        id="banner_one"
        style={{
          backgroundImage: `${data !== null ? `url(${API_URL}${data?.bannerRes?.url})`: "" } `,
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
                  style={{ color: data?.bannercolor }}
                >
                  {data?.bannerUst}
                  <span
                    className="wow flipInX"
                    data-wow-duration="2.0s"
                    data-wow-delay=".5s"
                    style={{ color: data?.bannercolor }}
                  >
                    {data?.bannerAlt}
                  </span>
                </h1>

                {data?.btncheck === "true" && (
                  <Link
                    href={data?.buttonUrl}
                    className="theme-btn-one btn_sm tw-border-[3px] tw-rounded-2xl tw-text-xs lg:tw-text-xl"
                    style={{
                      color: data?.bannercolor,
                      borderColor: data?.bannercolor,
                    }}
                  >
                    {data?.button}
                  </Link>
                )}
              </div>
            </div>

            <div className="col-6 tw-pr-0">
              <Slider {...slidersettings} className="tw-absolute">
                {data?.bannerYan.map((item, index) => {
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
