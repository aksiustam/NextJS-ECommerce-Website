import getSettings from "@/app/actions/getSettings";
import Layout from "../comp/Layout";
import SetClient from "./comp/SetClient";
import getAllCategory from "@/app/actions/Category/getAllCategory";

const page = async () => {
  const AllCategory = await getAllCategory();
  const ayarlar = await getSettings();

  return (
    <>
      <Layout>
        <main>
          <SetClient category={AllCategory.category} ayarlar={ayarlar} />
        </main>
      </Layout>
    </>
  );
};

export default page;
