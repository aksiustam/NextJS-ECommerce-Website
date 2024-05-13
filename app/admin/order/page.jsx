import getAdminSiparis from "../../actions/Siparis/getAdminSiparis";
import Layout from "../comp/Layout";
import SiparisClient from "./comp/SiparisClient";

const page = async () => {
  const siparis = await getAdminSiparis();

  return (
    <>
      <Layout>
        <main>
          <SiparisClient siparis={siparis} />
        </main>
      </Layout>
    </>
  );
};

export default page;
