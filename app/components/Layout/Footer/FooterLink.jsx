"use client";

import Link from "next/link";
import ReactGA from "react-ga4";
const FooterLink = (props) => {
  const { check, link } = props;
  return (
    <Link
      href={link?.link}
      className="tw-text-sm tw-font-bold"
      onClick={() => {
        if (check)
          ReactGA.event({
            category: "event",
            action: link?.linkTitle,
            label: link?.linkTitle + " a gitti",
          });
      }}
    >
      {link?.linkTitle}
    </Link>
  );
};

export default FooterLink;
