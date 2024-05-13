"use client";
import { FaUserCircle } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart, FaLockOpen, FaMapMarkerAlt } from "react-icons/fa";
import { IoMdExit } from "react-icons/io";

const ProfileSidebar = (props) => {
  const { user } = props;
  const pathname = usePathname();
  const router = useRouter();
  const logout = () => {
    signOut();
    router.push("/");
    router.refresh();
  };
  return (
    <>
      <div className="col-sm-12 col-md-12 col-lg-3">
        <div className="dashboard_tab_button">
          <div className="tw-flex tw-items-center tw-gap-6 tw-p-4 tw-border tw-border-slate-300 tw-mb-8 tw-bg-slate-100">
            <FaUserCircle size={35} />
            <div className="tw-flex tw-flex-col">
              <span>Bonjour,</span>
              <span>
                {user?.name} {user?.lastname}
              </span>
            </div>
          </div>
          <ul role="tablist" className="nav flex-column dashboard-list">
            <li>
              <Link
                href="/profile"
                className={pathname === "/profile" ? "active" : null}
              >
                <div className="tw-flex tw-gap-3 tw-items-center">
                  <FaShoppingCart size={22} /> Mes commandes
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/info"
                className={pathname === "/profile/info" ? "active" : null}
              >
                <div className="tw-flex tw-gap-3 tw-items-center">
                  <FaUser size={22} /> Mes informations
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/address"
                className={pathname === "/profile/address" ? "active" : null}
              >
                <div className="tw-flex tw-gap-3 tw-items-center">
                  <FaMapMarkerAlt size={22} /> Mes adresses
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/profile/password"
                className={pathname === "/profile/password" ? "active" : null}
              >
                <div className="tw-flex tw-gap-3 tw-items-center">
                  <FaLockOpen size={22} /> Mon mot de passe
                </div>
              </Link>
            </li>
            <li onClick={() => logout()}>
              <Link href="!#">
                <div className="tw-flex tw-gap-3 tw-items-center">
                  <IoMdExit size={22} /> Se déconnecter
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;
