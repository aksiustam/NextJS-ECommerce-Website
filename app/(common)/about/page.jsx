import MenuData from "../../components/Layout/Header/MenuData";
import Header from "../../components/Layout/Header";
import Banner from "../../components/Layout/Banner/Banner";
import Footer from "../../components/Layout/Footer";
import Image from "next/image";
import { getCurrentUser } from "../../actions/getCurrentUser";
const page = async () => {
  const headerdata = await MenuData();
  const user = await getCurrentUser();
  return (
    <>
      <Header headerdata={headerdata} user={user} />
      <Banner title="Notre Histoire" />
      <main>
        <section id="about-top" className="tw-mt-12">
          <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center tw-justify-center tw-py-4  tw-text-center">
            <Image
              src={"/img/nilrio-logo.png"}
              width={1000}
              height={500}
              alt="Nilrio Logo"
              loading="eager"
              className="tw-w-96 tw-h-auto tw-mb-6"
            />

            <p className="tw-font-extrabold tw-mb-4">
              Depuis 1986 à ce jour nous avons travaillé et fabriquer pour les
              grandes <br /> marques de France.
            </p>
            <p className="tw-font-extrabold tw-mb-4">
              Maintenant nous fabriquons pour notre propre marque..
            </p>
            <p className="tw-font-extrabold tw-mb-4">
              NILRIO est une marque française en relation avec notre société
              ISPA
            </p>
            <a
              href="https://www.ispamode.fr"
              class="tw-font-extrabold tw-text-blue-600"
            >
              www.ispamode.fr
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
