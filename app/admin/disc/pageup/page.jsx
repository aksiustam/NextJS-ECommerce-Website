import getSettings from "../../../actions/getSettings";
import Layout from "../../comp/Layout";
import IndirimYeriClient from "./comp/IndirimYeriClient";

const page = async () => {
  const settings = await getSettings();

  return (
    <>
      <Layout>
        <main>
          <IndirimYeriClient settings={settings} />
        </main>
      </Layout>
    </>
  );
};

export default page;
