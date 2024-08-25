import MenuData from "./components/Layout/Header/MenuData";
import Banner from "./components/Home/Banner";
import Certificas from "./components/Home/Certificas";
import HotProduct from "./components/Home/HotProduct";
import OfferTime from "./components/Home/OfferTime";
import BannerBottom from "./components/Home/BannerBottom";
import BannerImageOne from "./components/Home/BannerImageOne";
import BannerImageTwo from "./components/Home/BannerImageTwo";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { getCurrentUser } from "./actions/getCurrentUser";
import getSettings from "./actions/getSettings";
import getProducts from "./actions/Products/getProducts";
import HotProductTwo from "./components/Home/HotProductTwo";

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
        <BannerImageOne settings={settings} />
        <HotProduct products={products} settings={settings} />
        <BannerImageTwo settings={settings} />
        <HotProductTwo products={products} settings={settings} />
        {checkbox === "true" && <OfferTime settings={settings} />}
        <Certificas />
      </main>
      <Footer />
    </>
  );
}
