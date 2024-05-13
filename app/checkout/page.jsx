import MenuData from "../components/Layout/Header/MenuData";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { getCurrentUser } from "../actions/getCurrentUser";
import Banner from "../components/Layout/Banner/Banner";
import CheckoutClient from "./comp/CheckoutClient";
import Head from "next/head";
import Script from "next/script";
import "./bankcss.css";
const page = async () => {
  const headerdata = await MenuData();
  const user = await getCurrentUser();

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://static-sogecommerce.societegenerale.eu/static/js/krypton-client/V4.0/ext/neon-reset.css"
        />
      </Head>
      <Script src="https://static-sogecommerce.societegenerale.eu/static/js/krypton-client/V4.0/ext/neon.js"></Script>
      <Header headerdata={headerdata} user={user} />
      <Banner title="Paiement" />
      <main>
        <section id="checkout_one" className="ptb-100">
          <div className="container">
            <div className="row">
              <CheckoutClient user={user} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
