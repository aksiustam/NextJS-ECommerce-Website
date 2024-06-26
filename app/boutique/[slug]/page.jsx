import MenuData from "../../components/Layout/Header/MenuData";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { getCurrentUser } from "../../actions/getCurrentUser";
import getProducts from "../../actions/Products/getProducts";
import Banner from "../../components/Layout/Banner/Banner";
import ShopPage from "./Shop";
import getAllCategory from "../../actions/Category/getAllCategory";
import getSlugCategory from "../../actions/Category/getSlugCategory";
const page = async ({ params }) => {
  const headerdata = await MenuData();
  const user = await getCurrentUser();
  const products = await getProducts();
  const allcategory = await getAllCategory();
  const { slug } = params;
  const slugcategory = await getSlugCategory(slug);

  return (
    <>
      <Header headerdata={headerdata} user={user} />
      <Banner title="Boutique" subtitle={slugcategory.name} />
      <main>
        <ShopPage
          products={products}
          allcategory={allcategory}
          slugcategory={slugcategory}
        />
      </main>
      <Footer />
    </>
  );
};

export default page;
