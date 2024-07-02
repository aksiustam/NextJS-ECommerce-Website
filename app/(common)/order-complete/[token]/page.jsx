import getSiparisToken from "../../../actions/Siparis/getSiparisToken";
import SuccessClient from "./SuccessClient";

const page = async ({ params }) => {
  const { token } = params;
  const sipdata = await getSiparisToken(token);

  return (
    <>
      <SuccessClient sipdata={sipdata} />
    </>
  );
};

export default page;
