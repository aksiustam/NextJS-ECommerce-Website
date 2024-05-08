import getProductOne from "../../../actions/Products/getProductOne";
import Layout from "../../comp/Layout";
import ProductClient from "./comp/ProductClient";
import getAllCategory from "../../../actions/category/getAllCategory";
const page = async ({ params }) => {
  const { id } = params;
  const product = await getProductOne(id);
  const allcategory = await getAllCategory();
  return (
    <>
      <Layout>
        <main>
          <ProductClient product={product} allcategory={allcategory} />
        </main>
      </Layout>
    </>
  );
};

export default page;
