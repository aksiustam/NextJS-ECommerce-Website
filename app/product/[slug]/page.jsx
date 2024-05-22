import MenuData from "../../components/Layout/Header/MenuData";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { getCurrentUser } from "../../actions/getCurrentUser";
import getProductSlug from "../../actions/Products/getProductSlug";

import Banner from "../../components/Layout/Banner/Banner";
import ProductClient from "./comp/ProductClient";
import getProducts from "@/app/actions/Products/getProducts";

const page = async ({ params }) => {
  const headerdata = await MenuData();
  const user = await getCurrentUser();
  const { slug } = params;
  const product = await getProductSlug(slug);
  const products = await getProducts();

  return (
    <>
      <Header headerdata={headerdata} user={user} />
      <Banner title="İnformation Produit" />
      <main>
        <ProductClient product={product} user={user} products={products} />
      </main>
      <Footer />
    </>
  );
};

export default page;
