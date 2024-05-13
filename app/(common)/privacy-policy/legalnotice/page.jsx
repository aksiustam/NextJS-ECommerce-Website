import MenuData from "../../../components/Layout/Header/MenuData";

import Header from "../../../components/Layout/Header";
import Banner from "../../../components/Layout/Banner/Banner";
import Footer from "../../../components/Layout/Footer";
import Image from "next/image";

const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="Mentions Légales" />
      <main>
        <section id="privacy-policy_area" className="ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-12 tw-flex tw-justify-center tw-mb-12">
                <Image
                  src={"/img/nilrio-logo.png"}
                  width={1000}
                  height={500}
                  alt="Nilrio Logo"
                  className="tw-w-64 tw-h-auto"
                />
              </div>
              <div className="col-12 tw-text-center">
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">
                  MENTIONS LÉGALES
                </h1>
                <p className="tw-mb-6">
                  Ce site est édité par la société ISPA, société à
                  responsabilité limitée au capital social de 1,000 euros,{" "}
                  <br />
                  inscrite au Registre du Commerce et des Sociétés de Bobigny
                  sous le numéro 804 763 704, <br /> et dont le siège social est
                  situé 6 rue de Palestro, 93500 Pantin.
                </p>

                <ul className="tw-mb-2">
                  <li className="tw-mb-2">
                    Téléphone :{" "}
                    <span className="tw-font-bold">09 52 64 72 46</span> au prix
                    d’un appel local
                  </li>
                  <li className="tw-mb-2">
                    Adresse électronique :{" "}
                    <span className="tw-font-bold">nilrio.info@gmail.com</span>
                  </li>
                  <li className="tw-mb-2">
                    Numéro de TVA intracommunautaire :{" "}
                    <span className="tw-font-bold">FR21804763704</span>
                  </li>
                  <li className="tw-mb-2">
                    Le directeur de la publication est Monsieur{" "}
                    <span className="tw-font-bold">Ali SAHIN</span>
                  </li>
                </ul>

                <p className="tw-text-sm tw-mt-6">
                  Ce site est hébergé par la société HostArmada, 501 Silverside
                  Rd, Wilmington, DE 19809, USA
                </p>
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
