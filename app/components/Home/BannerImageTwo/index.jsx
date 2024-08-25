"use client";

import Image from "next/image";
import Link from "next/link";
import "./shine.css";
const Index = (props) => {
  const { settings } = props;
  const image1 = settings.bannerb3.image1;
  const image2 = settings.bannerb3.image2;
  const image3 = settings.bannerb3.image3;
  const image4 = settings.bannerb3.image4;

  const images = [image1, image2, image3, image4];
  const checkedImages = images.filter((image) => image.check === "true");
  const colClass = `col-${12 / checkedImages.length} img-shine img-zoom-hover`;

  return (
    <>
      <section className="tw-mt-2">
        <div className="row no-gutters">
          {checkedImages.map((image, index) => (
            <div key={index} className={colClass}>
              <Link href={image?.url || "/"}>
                <Image
                  src={image?.imageurl}
                  alt={`Nilrio Banner image ${index + 1}`}
                  width={1200}
                  height={1200}
                  loading="eager"
                  className="tw-w-full tw-object-contain"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Index;
