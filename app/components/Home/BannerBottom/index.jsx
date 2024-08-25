"use client";
import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });
const index = (props) => {
  const { settings } = props;

  const video = settings?.bannerb1;

  return (
    <>
      {video?.check === "true" && (
        <section className="tw-mt-2">
          <ReactPlayer
            url={video?.imageurl}
            playing={true}
            loop={true}
            muted={true}
            light={false}
            pip={true}
            width="100%"
            height="100%"
            playsinline={true}
          />
          <source src={video?.imageurl} type="video/mp4" />
        </section>
      )}
    </>
  );
};

export default index;
