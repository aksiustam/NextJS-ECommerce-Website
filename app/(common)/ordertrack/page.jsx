import MenuData from "../../components/Layout/Header/MenuData";
import Header from "../../components/Layout/Header";
import Banner from "../../components/Layout/Banner/Banner";
import Footer from "../../components/Layout/Footer";
import OrderTrackClient from "./OrderTrackClient";
const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="Suivez Votre Commande" />
      <main>
        <OrderTrackClient />
      </main>
      <Footer />
    </>
  );
};

export default page;
