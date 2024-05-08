import getProducts from "../actions/Products/getProducts";
import getAdminSiparis from "../actions/Siparis/getAdminSiparis";

import AdminHome from "./comp/AdminHome";
import Layout from "./comp/Layout";

const page = async () => {
  const Products = await getProducts();
  const Siparis = await getAdminSiparis();

  return (
    <>
      <Layout>
        <main>
          <AdminHome Products={Products} Siparis={Siparis} />
        </main>
      </Layout>
    </>
  );
};

export default page;
