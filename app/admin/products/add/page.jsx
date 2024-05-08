import Layout from "../../comp/Layout";
import AddProductClient from "./comp/AddProductClient";
import getAllCategory from "@/app/actions/category/getAllCategory";
const page = async () => {
  const allcategory = await getAllCategory();

  return (
    <>
      <Layout>
        <main>
          <AddProductClient allcategory={allcategory} />
        </main>
      </Layout>
    </>
  );
};

export default page;
