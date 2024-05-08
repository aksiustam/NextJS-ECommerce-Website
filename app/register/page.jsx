import MenuData from "../components/Layout/Header/MenuData";
import RegisterClient from "./comp/RegisterClient";
import Header from "../components/Layout/Header";
import Banner from "../components/Layout/Banner/Banner";
import Footer from "../components/Layout/Footer";
const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="S'inscrire" />
      <main>
        <RegisterClient />
      </main>
      <Footer />
    </>
  );
};

export default page;
