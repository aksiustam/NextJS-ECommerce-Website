"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./style.css";
import Link from "next/link";
import Image from "next/image";

const Banner = (props) => {
  const { settings } = props;

  const data = settings?.banner;
  console.log(data);
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

  return (
    <>
      <section
        id="banner_one"
        style={{
          backgroundImage: `url(${data?.banner?.imageurl})`,
        }}
      >
        <div className="container">
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
                    {data?.buttonName}
                  </Link>
                )}
              </div>
            </div>

            <div className="col-6 tw-pr-0">
              {data?.banneryan?.length > 1 ? (
                <Slider {...slidersettings} className="tw-absolute">
                  {data?.banneryan?.map((item, index) => {
                    return (
                      <Image
                        key={index}
                        src={item?.imageurl}
                        alt="Nilrio BannerYan"
                        width={800}
                        height={800}
                        loading="eager"
                        className="tw-w-full tw-h-[200px] lg:tw-h-[600px] tw-object-contain"
                      />
                    );
                  })}
                </Slider>
              ) : (
                <Image
                  src={data?.banneryan[0]?.imageurl}
                  alt="Nilrio BannerYan"
                  width={800}
                  height={800}
                  loading="eager"
                  className="tw-w-full tw-h-[200px] lg:tw-h-[600px] tw-object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
