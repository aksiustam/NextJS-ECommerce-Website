import getAllUser from "../../actions/User/getAllUser";
import getStockMail from "../../actions/Mail/getStockMail";
import getNewsMail from "../../actions/Mail/getNewsMail";
import Layout from "../comp/Layout";
import UserClient from "./comp/UserClient";

const page = async () => {
  const users = await getAllUser();
  const stockmail = await getStockMail();
  const newsmail = await getNewsMail();

  return (
    <>
      <Layout>
        <main>
          <UserClient users={users} stockmail={stockmail} newsmail={newsmail} />
        </main>
      </Layout>
    </>
  );
};

export default page;
