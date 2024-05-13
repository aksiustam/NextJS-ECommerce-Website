"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiWorld } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { BiAperture } from "react-icons/bi";
import { FaTshirt } from "react-icons/fa";
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
      <div className="col-sm-12 col-md-12 col-lg-2 col_xl_2">
        <div className="dashboard_tab_button">
          <ul role="tablist" className="nav flex-column dashboard-list">
            <li>
              <Link href="/">
                <div className="tw-flex tw-gap-2 tw-items-center">
                  <BiWorld size={20} /> Website
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className={pathname === "/admin" ? "active" : null}
              >
                <div className="tw-flex tw-gap-2 tw-items-center">
                  <FaHome size={20} /> Anasayfa
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className={pathname === "/admin/products" ? "active" : null}
              >
                <div className="tw-flex tw-gap-2 tw-items-center">
                  <FaTshirt size={20} /> Ürün Ayarları
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/disc"
                className={pathname === "/admin/disc" ? "active" : null}
              >
                <div className="tw-flex tw-gap-2 tw-items-center">
                  <MdDiscount size={20} /> İndirim Ayarları
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/order"
                className={pathname === "/admin/order" ? "active" : null}
              >
                <div className="tw-flex tw-gap-2 tw-items-center">
                  <FaShopify size={20} /> Siparişler
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/settings"
                className={pathname === "/admin/settings" ? "active" : null}
              >
                <div className="tw-flex tw-gap-2 tw-items-center">
                  <BiAperture size={20} /> Site Ayarları
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/category"
                className={pathname === "/admin/category" ? "active" : null}
              >
                <div className="tw-flex tw-gap-2 tw-items-center">
                  <MdOutlineCategory size={20} /> Kategori Ayarları
                </div>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/user"
                className={pathname === "/admin/user" ? "active" : null}
              >
                <div className="tw-flex tw-gap-2 tw-items-center">
                  <FaHouseUser size={20} /> Kullanıcılar
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/contact"
                className={pathname === "/admin/contact" ? "active" : null}
              >
                <div className="tw-flex tw-gap-2 tw-items-center">
                  <MdConnectWithoutContact size={20} /> İletişim
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
