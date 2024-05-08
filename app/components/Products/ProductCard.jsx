"use client";
import { useState } from "react";
import ofgimg from "@/public/assets/img/common/logo-france.png";
import bioimg from "@/public/assets/img/common/bio.png";
import errimg from "@/public/assets/img/common/defproductimg.webp";
import ReactGA from "react-ga4";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const ProductCard = (props) => {
  const product = props.data;

  const router = useRouter();
  const [color, setColor] = useState(product?.ProductColorSize[0]);
  const handleLinkClick = () => {
    ReactGA.event({
      category: "event",
      action: product?.name,
      label: product?.name + " detayına gitti",
    });
    router.push(`/product/${product.slug}`);
  };

  return (
    <>
      <div className="product_wrappers_one">
        <div className="thumb">
          <Link
            href={`/product/${product.slug}`}
            className="image"
            onClick={handleLinkClick}
          >
            <Image
              src={color?.images[0]?.imageurl}
              alt={product?.name}
              width={1200}
              height={1200}
              onError={(e) => {
                e.target.src = errimg;
              }}
              className="tw-max-w-[750px] tw-max-h-[900px] tw-object-contain"
            />
            <Image
              src={color?.images[1]?.imageurl}
              alt={product?.name}
              width={1200}
              height={1200}
              onError={(e) => {
                e.target.src = errimg;
              }}
              className="hover-image tw-max-w-[750px] tw-max-h-[900px] tw-object-contain"
            />
          </Link>
          <span className="badges">
            <span className="indirim !tw-text-xs md:!tw-text-sm">
              {product.indirim ? "Reductions" : ""}
            </span>
            <span className="yeni !tw-text-xs md:!tw-text-sm">
              {product.yeni ? "Nouveau" : ""}
            </span>
          </span>
          <span className="newbadges">
            {product?.bio ? (
              <Image
                src={bioimg}
                alt="bio"
                width={25}
                height={25}
                className="tw-w-5 tw-h-5"
              />
            ) : (
              ""
            )}
            {product?.ofg ? (
              <Image
                src={ofgimg}
                alt="ofg"
                width={25}
                height={25}
                className="tw-w-5 tw-h-5"
              />
            ) : (
              ""
            )}
          </span>
        </div>
        <div className="content">
          <h3 className="title tw-italic tw-font-bold ">
            <Link
              href={`/product/${product?.slug}`}
              className="hover:!tw-text-slate-600"
            >
              {product?.name}
            </Link>
          </h3>

          <div className="product-variable-color tw-flex tw-items-center tw-justify-center">
            {product?.ProductColorSize?.map((item) => {
              return (
                <label key={item.id}>
                  <input
                    name="modal-product-color"
                    className="color-select"
                    type="radio"
                    onChange={() => {
                      setColor(item);
                    }}
                    hidden
                  />
                  <span
                    className="tw-border-2 !tw-h-5 !tw-w-5 md:!tw-h-6 md:!tw-w-6  tw-border-gray-300 !tw-rounded-full"
                    style={{
                      backgroundColor: item?.Color?.hex,
                    }}
                  ></span>
                </label>
              );
            })}
          </div>
          <span className="price">
            <span className="new tw-italic">
              {product.indirim === true ? product?.inprice : product?.price}€
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
