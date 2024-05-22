"use client";

import ser1 from "@/public/assets/img/common/sert1.png";
import ser2 from "@/public/assets/img/common/sert2.png";
import ser3 from "@/public/assets/img/common/sert4.png";
import ser4 from "@/public/assets/img/common/sert5.png";
import ser5 from "@/public/assets/img/common/sert3.png";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Image from "next/image";
const CertificateClient = () => {
  return (
    <div className="container tw-mt-12 tw-mb-12 AkayaTelivigala">
      <div className="row">
        <div className="col-lg-12 col-md-12">
          <Tab.Container defaultActiveKey="ser1">
            <div className="tabs_center_button ">
              <ul className="nav nav-tabs">
                <li>
                  <Nav.Link eventKey="ser1" className="!tw-font-bold">
                    <Image
                      src={ser1}
                      width={500}
                      height={500}
                      alt="sertifika1"
                      className="tw-w-[240px] tw-h-[240px] tw-object-contain"
                    />

                    <div className="tw-text-center tw-mt-4 ">
                      Origine France Garantie
                    </div>
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link eventKey="ser4" className="!tw-font-bold">
                    <Image
                      src={ser4}
                      width={500}
                      height={500}
                      alt="sertifika4"
                      className="tw-w-[240px] tw-h-[240px] tw-object-contain"
                    />

                    <div className="tw-text-center tw-mt-4">
                      Oeko-Tex STANDARD 100
                    </div>
                  </Nav.Link>
                </li>

                <li>
                  <Nav.Link eventKey="ser3" className="!tw-font-bold">
                    <Image
                      src={ser3}
                      width={500}
                      height={500}
                      alt="sertifika3"
                      className="tw-w-[240px] tw-h-[240px] tw-object-contain"
                    />
                    <div className="tw-text-center tw-mt-4 ">
                      Hohenstein Textile
                    </div>
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link eventKey="ser2" className="!tw-font-bold ">
                    <Image
                      src={ser2}
                      width={500}
                      height={500}
                      alt="sertifika2"
                      className="tw-w-[240px] tw-h-[240px] tw-object-contain"
                    />

                    <div className="tw-text-center tw-mt-4 ">ISO 9001</div>
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link eventKey="ser5" className="!tw-font-bold ">
                    <Image
                      src={ser5}
                      width={500}
                      height={500}
                      alt="sertifika5"
                      className="tw-w-[240px] tw-h-[240px] tw-object-contain"
                    />

                    <div className="tw-text-center tw-mt-4">ISO 14001</div>
                  </Nav.Link>
                </li>
              </ul>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="tab-content tw-mt-4">
                    <Tab.Content>
                      <Tab.Pane eventKey="ser1">
                        <div className="tw-text-xl tw-text-center">
                          Le label Origine France Garantie certifie qu&apos;au
                          moins 50% du prix de revient unitaire d&apos;un bien
                          de consommation est français et que le lieu où le
                          produit prend ses caractéristiques essentielles est
                          situé en France.
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="ser4">
                        <div className="tw-text-xl tw-text-center">
                          Créée en 1987, la certification ISO 9001 définit les
                          critères de mise en œuvre d&apos;un produit ou
                          d&apos;un service conforme aux exigences des clients
                          dans une pratique d&apos;amélioration continue.
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="ser3">
                        <div className="tw-text-xl tw-text-center">
                          Ce certificat prouve que le textile est totalement
                          dépourvu de substances nocives. Les instituts
                          indépendants Hohenstein testent tous les articles à
                          chaque phase de production. Seuls les articles
                          répondant aux normes de qualité les plus élevées se
                          retrouvent dans votre armoire.
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="ser2">
                        <div className="tw-text-xl tw-text-center">
                          Oeko-Tex est un label de qualité comprenant plusieurs
                          normes techniques, visant à certifier les qualités
                          sanitaires et écologiques des textiles et cuirs, en
                          garantissant l&apos;absence de produits toxiques pour
                          le corps et pour l&apos;environnement.
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="ser5">
                        <div className="tw-text-xl tw-text-center">
                          Certifie des textiles sans produits toxiques pour la
                          santé et l&apos;environnement.
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </div>
                </div>
              </div>
            </div>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

export default CertificateClient;
