import MenuData from "../../components/Layout/Header/MenuData";

import Header from "../../components/Layout/Header";
import Banner from "../../components/Layout/Banner/Banner";
import Footer from "../../components/Layout/Footer";
import CertificateClient from "./CertificateClient";
const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="Nos Certificats" />
      <main>
        <CertificateClient />
      </main>
      <Footer />
    </>
  );
};

export default page;
