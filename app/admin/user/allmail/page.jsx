import Layout from "../../comp/Layout";
import AllMailClient from "./AllMailClient";

const page = async () => {
  return (
    <>
      <Layout>
        <main>
          <AllMailClient />
        </main>
      </Layout>
    </>
  );
};

export default page;
