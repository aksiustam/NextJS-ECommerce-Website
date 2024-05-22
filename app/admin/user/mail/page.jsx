import Layout from "../../comp/Layout";
import MailClient from "./MailClient";

const page = async () => {
  return (
    <>
      <Layout>
        <main>
          <MailClient />
        </main>
      </Layout>
    </>
  );
};

export default page;
