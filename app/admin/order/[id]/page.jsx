import getSiparisOne from "../../../actions/Siparis/getSiparisOne";
import Layout from "../../comp/Layout";

import OrderDetailClient from "./OrderDetailClient";
const page = async ({ params }) => {
  const { id } = params;
  const siparis = await getSiparisOne(id);

  return (
    <>
      <Layout>
        <main>
          <OrderDetailClient siparis={siparis} />
        </main>
      </Layout>
    </>
  );
};

export default page;
