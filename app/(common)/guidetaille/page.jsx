import MenuData from "../../components/Layout/Header/MenuData";

import Header from "../../components/Layout/Header";
import Banner from "../../components/Layout/Banner/Banner";
import Footer from "../../components/Layout/Footer";
import Image from "next/image";
import img1 from "@/public/assets/img/common/Guides1.jpg";
import img2 from "@/public/assets/img/common/Guides2.jpg";
import img3 from "@/public/assets/img/common/Guides3.jpg";

const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="Guide des Taille" />
      <main>
        <section id="Taille" className="tw-bg-[#CECAC5]">
          <div className="container">
            <div className="row tw-flex tw-items-center tw-justify-center">
              <div className="tw-w-5/6">
                <Image
                  src={img1}
                  alt="guides1"
                  width={1500}
                  height={1000}
                  loading="eager"
                  className="tw-object-contain"
                />
                <Image
                  src={img2}
                  alt="guides2"
                  width={1500}
                  height={1000}
                  loading="eager"
                  className="tw-object-contain"
                />
                <Image
                  src={img3}
                  alt="guides3"
                  width={1500}
                  height={1000}
                  loading="eager"
                  className="tw-object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
