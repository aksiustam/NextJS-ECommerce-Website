import MenuData from "../../components/Layout/Header/MenuData";
import RegisterClient from "./RegisterClient";
import Header from "../../components/Layout/Header";
import Banner from "../../components/Layout/Banner/Banner";
import Footer from "../../components/Layout/Footer";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
const page = async () => {
  const headerdata = await MenuData();
  const user = await getCurrentUser();
  return (
    <>
      <Header headerdata={headerdata} user={user} />
      <Banner title="S'inscrire" />
      <main>
        <RegisterClient />
      </main>
      <Footer />
    </>
  );
};

export default page;
