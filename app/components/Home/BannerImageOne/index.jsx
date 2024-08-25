"use client";

import Image from "next/image";
import Link from "next/link";
import "./shine.css";
const Index = (props) => {
  const { settings } = props;
  const image1 = settings.bannerb2.image1;
  const image2 = settings.bannerb2.image2;
  const bothTrue = image1.check === "true" && image2.check === "true";

  return (
    <>
      <section className="tw-mt-2">
        <div className="row no-gutters">
          {image1.check === "true" && (
            <div
              className={
                bothTrue
                  ? "col-6 img-shine img-zoom-hover"
                  : "col-12 img-shine img-zoom-hover"
              }
            >
              <Link href={image1?.url || "/"}>
                <Image
                  src={image1.imageurl}
                  alt="Nilrio Banner image"
                  width={1200}
                  height={1200}
                  loading="eager"
                  className="tw-w-full tw-h-auto tw-object-contain"
                />
              </Link>
            </div>
          )}
          {image2.check === "true" && (
            <div
              className={
                bothTrue
                  ? "col-6 img-shine img-zoom-hover"
                  : "col-12 img-shine img-zoom-hover"
              }
            >
              <Link href={image2?.url || "/"}>
                <Image
                  src={image2.imageurl}
                  alt="Nilrio Banner image"
                  width={1200}
                  height={1200}
                  loading="eager"
                  className="tw-w-full tw-h-auto tw-object-contain"
                />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Index;
