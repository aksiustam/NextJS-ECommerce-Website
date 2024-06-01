import MenuData from "./components/Layout/Header/MenuData";
import Banner from "./components/Home/Banner";
import Certificas from "./components/Home/Certificas";
import HotProduct from "./components/Home/HotProduct";
import OfferTime from "./components/Home/OfferTime";
import BannerBottom from "./components/Home/BannerBottom";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { getCurrentUser } from "./actions/getCurrentUser";
import getSettings from "./actions/getSettings";
import getProducts from "./actions/Products/getProducts";

export default async function Home() {
  const headerdata = await MenuData();
  const user = await getCurrentUser();
  const settings = await getSettings();
  const products = await getProducts();

  const checkbox = settings?.discountpage?.checkbox;

  return (
    <>
      <Header headerdata={headerdata} user={user} />
      <main>
        <Banner settings={settings} />
        <BannerBottom settings={settings} />
        <HotProduct products={products} />
        {checkbox === "true" && <OfferTime settings={settings} />}
        <Certificas />
      </main>
      <Footer />
    </>
  );
}
