"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiWorld } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { BiAperture } from "react-icons/bi";
import { FaTshirt, FaArchive } from "react-icons/fa";
import { MdDiscount } from "react-icons/md";
import { FaShopify } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import { MdConnectWithoutContact } from "react-icons/md";

const SideBar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className="tw-block md:tw-hidden tw-absolute tw-z-20">
        <div className="tw-w-screen tw-h-screen tw-bg-slate-300 tw-flex tw-items-center tw-justify-center">
          Bilgisayardan Giriniz
        </div>
      </div>

      <nav className="md:tw-left-0 md:tw-block md:tw-fixed md:tw-top-0 md:tw-bottom-0 md:tw-overflow-y-auto md:tw-flex-row md:tw-flex-nowrap md:tw-overflow-hidden tw-shadow-xl tw-bg-white tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-relative md:tw-w-64 tw-z-10 tw-py-4 tw-px-6">
        <div className="md:tw-flex-col md:tw-items-stretch md:tw-min-h-full md:tw-flex-nowrap tw-px-0 tw-flex tw-flex-wrap tw-items-center tw-justify-between tw-w-full tw-mx-auto">
          {/* Brand */}
          <Link
            href="/admin"
            className="md:tw-flex tw-text-left md:tw-pb-2  tw-mr-0 tw-inline-block tw-whitespace-nowrap tw-text-sm tw-uppercase tw-font-bold tw-p-4 tw-px-0"
          >
            <FaTshirt size={36} color="black" />
            <span className="tw-line-clamp-2 tw-text-wrap tw-text-center">
              Nilrio Admin Paneli
            </span>

            <FaTshirt size={36} color="black" className="tw-scale-x-[-1]" />
          </Link>

          {/* Collapse */}
          <div
            className={
              "md:tw-flex md:tw-flex-col md:tw-items-stretch md:tw-opacity-100 md:tw-relative md:tw-mt-4 md:tw-shadow-none tw-shadow tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-z-40 tw-overflow-y-auto tw-overflow-x-hidden tw-h-auto tw-items-center tw-flex-1 tw-rounded "
            }
          >
            {/* Divider */}
            <hr className="tw-my-4 md:tw-min-w-full" />

            {/* Navigation */}

            <ul className="md:tw-flex-col md:tw-min-w-full tw-flex tw-flex-col tw-list-none">
              <li className="tw-items-center">
                <Link
                  href="/"
                  className={
                    "tw-text-xs tw-uppercase tw-py-3 tw-font-bold tw-flex tw-flex-row tw-items-center tw-justify-start " +
                    (pathname.indexOf("/home") !== -1
                      ? "tw-text-sky-500 hover:tw-text-sky-600"
                      : "hover:tw-text-sky-500")
                  }
                >
                  <BiWorld size={24} className={"tw-mr-2 "} />
                  WEBSİTE
                </Link>
              </li>
              <li className="tw-items-center">
                <Link
                  href="/admin"
                  className={
                    "tw-text-xs tw-uppercase tw-py-3 tw-font-bold tw-flex tw-flex-row tw-items-center tw-justify-start " +
                    (pathname === "/admin"
                      ? "tw-text-sky-500 hover:tw-text-sky-600"
                      : "hover:tw-text-sky-500")
                  }
                >
                  <FaHome size={24} className={"tw-mr-2 "} />
                  ANASAYFA
                </Link>
              </li>
              <li className="tw-items-center">
                <Link
                  href="/admin/products"
                  className={
                    "tw-text-xs tw-uppercase tw-py-3 tw-font-bold tw-flex tw-flex-row tw-items-center tw-justify-start " +
                    (pathname.indexOf("/products") !== -1
                      ? "tw-text-sky-500 hover:tw-text-sky-600"
                      : "hover:tw-text-sky-600")
                  }
                >
                  <FaTshirt size={24} className={"tw-mr-2 "} />
                  ÜRÜNLER
                </Link>
              </li>
              <li className="tw-items-center">
                <Link
                  href="/admin/disc"
                  className={
                    "tw-text-xs tw-uppercase tw-py-3 tw-font-bold tw-flex tw-flex-row tw-items-center tw-justify-start " +
                    (pathname.indexOf("/admin/disc") !== -1
                      ? "tw-text-sky-500 hover:tw-text-sky-600"
                      : "hover:tw-text-sky-500")
                  }
                >
                  <MdDiscount size={24} className={"tw-mr-2 "} />
                  İNDİRİM AYARLARI
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="tw-my-2 md:tw-min-w-full" />
            {/* Heading */}
            <h6 className="md:tw-min-w-full  tw-text-xs tw-uppercase tw-font-bold tw-block tw-pt-1 tw-pb-4 tw-no-underline">
              SATIŞ
            </h6>
            {/* Navigation */}

            <ul className="md:tw-flex-col md:tw-min-w-full tw-flex tw-flex-col tw-list-none md:tw-mb-4">
              <li className="tw-items-center">
                <Link
                  href="/admin/order"
                  className={
                    "tw-text-xs tw-uppercase tw-py-3 tw-font-bold tw-flex tw-flex-row tw-items-center tw-justify-start " +
                    (pathname.indexOf("/admin/order") !== -1
                      ? "tw-text-sky-500 hover:tw-text-sky-600"
                      : "hover:tw-text-sky-500")
                  }
                >
                  <FaShopify size={24} className={"tw-mr-2 "} />
                  SİPARİŞLER
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="tw-my-2 md:tw-min-w-full" />
            {/* Heading */}
            <h6 className="md:tw-min-w-full  tw-text-xs tw-uppercase tw-font-bold tw-block tw-pt-1 tw-pb-4 tw-no-underline">
              AYARLAR
            </h6>
            {/* Navigation */}

            <ul className="md:tw-flex-col md:tw-min-w-full tw-flex tw-flex-col tw-list-none md:tw-mb-4">
              <li className="tw-items-center">
                <Link
                  href="/admin/category"
                  className={
                    "tw-text-xs tw-uppercase tw-py-3 tw-font-bold tw-flex tw-flex-row tw-items-center tw-justify-start " +
                    (pathname.indexOf("/admin/category") !== -1
                      ? "tw-text-sky-500 hover:tw-text-sky-600"
                      : "hover:tw-text-sky-500")
                  }
                >
                  <MdOutlineCategory size={24} className={"tw-mr-2 "} />
                  KATEGORİ AYARLARI
                </Link>
              </li>
              <li className="tw-items-center">
                <Link
                  href="/admin/settings"
                  className={
                    "tw-text-xs tw-uppercase tw-py-3 tw-font-bold tw-flex tw-flex-row tw-items-center tw-justify-start " +
                    (pathname.indexOf("/admin/settings") !== -1
                      ? "tw-text-sky-500 hover:tw-text-sky-600"
                      : "hover:tw-text-sky-500")
                  }
                >
                  <BiAperture size={24} className={"tw-mr-2 "} />
                  SİTE AYARLARI
                </Link>
              </li>
            </ul>

            {/* Divider */}
            <hr className="tw-my-2 md:tw-min-w-full" />
            {/* Heading */}
            <h6 className="md:tw-min-w-full tw-text-xs tw-uppercase tw-font-bold tw-block tw-pt-1 tw-pb-4 tw-no-underline">
              DİĞER
            </h6>
            {/* Navigation */}
            <ul className="md:tw-flex-col md:tw-min-w-full tw-flex tw-flex-col tw-list-none md:tw-mb-4">
              <li className="tw-items-center">
                <Link
                  href="/admin/user"
                  className={
                    "tw-text-xs tw-uppercase tw-py-3 tw-font-bold tw-flex tw-flex-row tw-items-center tw-justify-start " +
                    (pathname.indexOf("/admin/user") !== -1
                      ? "tw-text-sky-500 hover:tw-text-sky-600"
                      : "hover:tw-text-sky-500")
                  }
                >
                  <FaHouseUser size={24} className={"tw-mr-2 "} />
                  KULLANICILAR
                </Link>
              </li>
              <li className="tw-items-center">
                <Link
                  href="/admin/contact"
                  className={
                    "tw-text-xs tw-uppercase tw-py-3 tw-font-bold tw-flex tw-flex-row tw-items-center tw-justify-start " +
                    (pathname.indexOf("/admin/contact") !== -1
                      ? "tw-text-sky-500 hover:tw-text-sky-600"
                      : "hover:tw-text-sky-500")
                  }
                >
                  <MdConnectWithoutContact size={24} className={"tw-mr-2 "} />
                  İLETİŞİM
                </Link>
              </li>
              <li className="tw-items-center">
                <Link
                  href="/admin/archive"
                  className={
                    "tw-text-xs tw-uppercase tw-py-3 tw-font-bold tw-flex tw-flex-row tw-items-center tw-justify-start " +
                    (pathname.indexOf("/admin/archive") !== -1
                      ? "tw-text-sky-500 hover:tw-text-sky-600"
                      : "hover:tw-text-sky-500")
                  }
                >
                  <FaArchive size={24} className={"tw-mr-2 "} />
                  ARŞİVLER
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
