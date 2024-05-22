import getContact from "../../actions/Contact/getContact";
import Layout from "../comp/Layout";
import ContactClient from "./ContactClient";

const page = async () => {
  const contact = await getContact();
  return (
    <>
      <Layout>
        <main>
          <ContactClient contact={contact} />
        </main>
      </Layout>
    </>
  );
};

export default page;
