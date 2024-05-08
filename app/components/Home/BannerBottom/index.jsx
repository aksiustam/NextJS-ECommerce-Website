"use client";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
const index = (props) => {
  const { settings } = props;

  return (
    <>
      <section className="tw-mt-2">
        <ReactPlayer
          url={settings.bannerb?.imageurl}
          playing={true}
          loop={true}
          muted={true}
          light={false}
          pip={true}
          width="100%"
          height="100%"
          playsinline={true}
        />
        <source src={settings.bannerb?.imageurl} type="video/mp4" />
      </section>
    </>
  );
};

export default index;
