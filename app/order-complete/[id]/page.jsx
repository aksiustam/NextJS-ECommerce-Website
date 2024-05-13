import getSiparisOne from "../../actions/Siparis/getSiparisOne";
import SuccessClient from "./SuccessClient";

const page = async ({ params }) => {
  const { id } = params;
  const sipdata = await getSiparisOne(id);

  return (
    <>
      <SuccessClient sipdata={sipdata} />
    </>
  );
};

export default page;
