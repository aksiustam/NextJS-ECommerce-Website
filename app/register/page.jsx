import MenuData from "../components/Layout/Header/MenuData";
import RegisterClient from "./comp/RegisterClient";
import Header from "../components/Layout/Header";
import Banner from "../components/Layout/Banner/Banner";
const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="S'inscrire" />
      <main>
        <RegisterClient />
      </main>
    </>
  );
};

export default page;
