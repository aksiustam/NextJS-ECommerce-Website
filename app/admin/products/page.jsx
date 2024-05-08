import Layout from "../comp/Layout";
import ProductsTable from "./comp/ProductsTable";
import getProducts from "../../actions/Products/getProducts";
const page = async () => {
  const products = await getProducts();
  return (
    <>
      <Layout>
        <main>
          <ProductsTable products={products} />
        </main>
      </Layout>
    </>
  );
};

export default page;
