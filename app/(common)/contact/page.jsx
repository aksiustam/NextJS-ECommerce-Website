import MenuData from "../../components/Layout/Header/MenuData";

import Header from "../../components/Layout/Header";
import Banner from "../../components/Layout/Banner/Banner";
import Footer from "../../components/Layout/Footer";
import ContactClient from "./ContactClient";

const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="Contact" />
      <main>
        <ContactClient />
      </main>
      <Footer />
    </>
  );
};

export default page;
