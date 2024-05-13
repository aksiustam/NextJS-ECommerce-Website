import MenuData from "../components/Layout/Header/MenuData";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { getCurrentUser } from "../actions/getCurrentUser";
import Banner from "../components/Layout/Banner/Banner";
import CartClient from "./CartClient";

const page = async () => {
  const headerdata = await MenuData();
  const user = await getCurrentUser();

  return (
    <>
      <Header headerdata={headerdata} user={user} />
      <Banner title="Panier" />
      <main>
        <CartClient />
      </main>
      <Footer />
    </>
  );
};

export default page;
