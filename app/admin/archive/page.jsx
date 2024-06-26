import Layout from "../comp/Layout";
import ArchiveClient from "./ArchiveClient";
import getArchiveCategory from "../../actions/Archive/Category/getArchiveCategory";
import getArcProducts from "../../actions/Archive/Products/getArcProducts";

const page = async () => {
  const AllCategory = await getArchiveCategory();
  const products = await getArcProducts();

  return (
    <>
      <Layout>
        <main>
          <ArchiveClient AllCategory={AllCategory} products={products} />
        </main>
      </Layout>
    </>
  );
};

export default page;
