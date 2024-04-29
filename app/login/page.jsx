import MenuData from "../components/Layout/Header/MenuData";
import LoginClient from "./comp/LoginClient";
import Header from "../components/Layout/Header";
import Banner from "../components/Layout/Banner/Banner";
const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="Se Connecter" />
      <main>
        <LoginClient />
      </main>
    </>
  );
};

export default page;
