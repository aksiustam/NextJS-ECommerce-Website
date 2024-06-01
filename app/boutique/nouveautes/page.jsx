import MenuData from "../../components/Layout/Header/MenuData";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { getCurrentUser } from "../../actions/getCurrentUser";
import getProducts from "../../actions/Products/getProducts";
import Banner from "../../components/Layout/Banner/Banner";
import ShopPage from "./Shop";
import getAllCategory from "../../actions/Category/getAllCategory";
const page = async () => {
  const headerdata = await MenuData();
  const user = await getCurrentUser();
  const products = await getProducts();
  const allcategory = await getAllCategory();
  return (
    <>
      <Header headerdata={headerdata} user={user} />
      <Banner title="Boutique" subtitle="Nouveautes" />
      <main>
        <ShopPage products={products} allcategory={allcategory} />
      </main>
      <Footer />
    </>
  );
};

export default page;
