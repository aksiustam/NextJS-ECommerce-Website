import MenuData from "./components/Layout/Header/MenuData";
import Banner from "./components/Home/Banner";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
export default async function Home() {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <main>
        <Banner />
        HEYYY
      </main>
      <Footer />
    </>
  );
}
