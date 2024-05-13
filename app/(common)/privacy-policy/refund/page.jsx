import MenuData from "../../../components/Layout/Header/MenuData";

import Header from "../../../components/Layout/Header";
import Banner from "../../../components/Layout/Banner/Banner";
import Footer from "../../../components/Layout/Footer";
import Image from "next/image";

const page = async () => {
  const headerdata = await MenuData();

  return (
    <>
      <Header headerdata={headerdata} />
      <Banner title="Politique De Remboursement" />
      <main>
        <section id="privacy-policy_area" className="ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-12 tw-flex tw-justify-start tw-mb-12">
                <Image
                  src={"/img/nilrio-logo.png"}
                  width={1000}
                  height={500}
                  alt="Nilrio Logo"
                  className="tw-w-64 tw-h-auto"
                />
              </div>
              <div className="col-12">
                <h1 className="tw-text-2xl tw-font-bold tw-mb-4">
                  POLITIQUE DE REMBOURSEMENT
                </h1>
                <p className="tw-text-sm tw-mb-4">
                  Chez NILRIO, nous sommes fiers de vous proposer des produits
                  de qualité supérieure. Si vous n&apos;êtes pas entièrement
                  satisfait de votre achat, nous vous offrons la possibilité de
                  nous retourner le produit pour un remboursement ou un échange.
                </p>
                <span className="tw-font-bold tw-mb-2">
                  Conditions de remboursement :
                </span>
                <ul className="tw-text-sm tw-my-4">
                  <li>
                    • Les produits doivent être retournés dans leur emballage
                    d&apos;origine et en bon état
                  </li>
                  <li>
                    • Les produits personnalisés ne sont pas éligibles au
                    remboursement
                  </li>
                  <li>
                    • Les produits personnalisés ne sont pas éligibles au
                    remboursement
                  </li>
                  <li>
                    • Le remboursement sera effectué dans un délai de 14 jours
                    suivant la réception du produit retourné
                  </li>
                </ul>
                <span className="tw-font-bold tw-mb-2">
                  Procédure de remboursement :
                </span>
                <ul className="tw-text-sm tw-my-4">
                  <li>
                    • Veuillez nous contacter à l&apos;adresse suivante :
                    <span className="tw-font-bold">nilrio.info@gmail.com</span>{" "}
                    pour demander un remboursement
                  </li>
                  <li>
                    • Une fois votre demande approuvée, veuillez nous envoyer le
                    produit retourné à l&apos;adresse que nous allons vous
                    communiquer par mail.
                  </li>
                  <li>
                    • Le remboursement sera effectué en utilisant le même moyen
                    de paiement que celui utilisé pour l&apos;achat original
                  </li>
                </ul>
                <p className="tw-text-sm ">
                  Si vous avez des questions ou des préoccupations concernant
                  votre achat, n&apos;hésitez pas à nous contacter.
                </p>
                <p className="tw-text-sm ">
                  Nous sommes là pour vous aider et nous ferons de notre mieux
                  pour résoudre tout problème rapidement et efficacement.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default page;
