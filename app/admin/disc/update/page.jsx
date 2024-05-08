import getSettings from "../../../actions/getSettings";
import Layout from "../../comp/Layout";
import IndirimUpdateClient from "./comp/IndirimUpdateClient";

const page = async () => {
  const settings = await getSettings();

  return (
    <>
      <Layout>
        <main>
          <IndirimUpdateClient settings={settings} />
        </main>
      </Layout>
    </>
  );
};

export default page;
