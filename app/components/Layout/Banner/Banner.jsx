"use client";
import Link from "next/link";

const Banner = (props) => {
  return (
    <>
      <section id="common_banner_one" className=" tw-mx-auto">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_banner_text">
                <h2 className="tw-capitalize tw-text-white">{props.title}</h2>
                <ul>
                  <li>
                    <Link href="/" scroll={false}>
                      Page D&apos;acceuil
                    </Link>
                  </li>
                  <li className="slash">/</li>
                  <li className="active !tw-text-gray-300 tw-capitalize">
                    {props.title}
                  </li>
                  {props.subtitle && (
                    <>
                      <li className="slash">/</li>
                      <li className="active !tw-text-gray-300 tw-capitalize">
                        {props.subtitle}
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
