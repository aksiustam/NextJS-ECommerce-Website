import getProducts from "../../actions/Products/getProducts";
import getSettings from "../../actions/getSettings";
import Layout from "../comp/Layout";
import IndirimClient from "./comp/IndirimClient";

const page = async () => {
  const products = await getProducts();
  const settings = await getSettings();

  return (
    <>
      <Layout>
        <main>
          <IndirimClient products={products} settings={settings} />
        </main>
      </Layout>
    </>
  );
};

export default page;
