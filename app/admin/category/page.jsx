import getAllCategory from "@/app/actions/Category/getAllCategory";

import Layout from "../comp/Layout";
import CategoryClient from "./comp/CategoryClient";

const page = async () => {
  const AllCategory = await getAllCategory();

  return (
    <>
      <Layout>
        <main>
          <CategoryClient AllCategory={AllCategory} />
        </main>
      </Layout>
    </>
  );
};

export default page;
