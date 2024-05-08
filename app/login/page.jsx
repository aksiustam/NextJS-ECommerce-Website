import MenuData from "../components/Layout/Header/MenuData";
import LoginClient from "./comp/LoginClient";
import Header from "../components/Layout/Header";
import Banner from "../components/Layout/Banner/Banner";
import Footer from "../components/Layout/Footer";
const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="Se Connecter" />
      <main>
        <LoginClient />
      </main>
      <Footer />
    </>
  );
};

export default page;
