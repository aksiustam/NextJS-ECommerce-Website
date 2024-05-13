"use client";

import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { useRouter } from "next/navigation";
import Image from "next/image";
function SuccessClient(props) {
  const { sipdata } = props;
  const router = useRouter();

  const componentRef = useRef();

  const reactToPrintTrigger = () => {
    return (
      <button className="theme-btn-one btn_md tw-text-center tw-h-12 tw-mr-auto tw-mt-[30px] tw-font-bold tw-text-black tw-border-[3px] tw-border-black hover:tw-bg-slate-200">
        İmprimer
      </button>
    );
  };
  const reactToPrintTriggerMobile = () => {
    return (
      <button className="theme-btn-one btn_md tw-text-center tw-h-12 tw-mr-3 tw-mt-[30px] tw-font-bold tw-text-black tw-border-[3px] tw-border-black hover:tw-bg-slate-200">
        İmprimer
      </button>
    );
  };
  return (
    <>
      <div className="tw-flex tw-flex-col lg:tw-flex-row tw-w-full">
        <div className="tw-mb-3 tw-flex tw-justify-between lg:tw-hidden tw-flex-1 tw-flex-wrap">
          <button
            className="theme-btn-one btn_md lg:tw-min-h-6 tw-text-center tw-ml-3 tw-h-12 tw-mt-[30px] tw-font-bold tw-text-black tw-border-[3px] tw-border-black hover:tw-bg-slate-200"
            onClick={() => router.push("/")}
          >
            Retour
          </button>

          <ReactToPrint
            content={() => componentRef.current}
            documentTitle="Invoice"
            removeAfterPrint
            trigger={reactToPrintTriggerMobile}
          />
        </div>
        <button
          className="theme-btn-one btn_md tw-hidden lg:tw-block tw-text-center tw-h-12 tw-ml-auto tw-mr-4 tw-mt-[30px] tw-font-bold tw-text-black tw-border-[3px] tw-border-black hover:tw-bg-slate-200"
          onClick={() => router.push("/")}
        >
          Retour
        </button>
        <div className="tw-pt-8">
          <OrderSuccess sipdata={sipdata} ref={componentRef} />
        </div>
        <div className="tw-hidden lg:tw-block tw-mr-auto tw-ml-4">
          <ReactToPrint
            content={() => componentRef.current}
            documentTitle="Invoice"
            removeAfterPrint
            trigger={reactToPrintTrigger}
          />
        </div>
      </div>
    </>
  );
}
const OrderSuccess = React.forwardRef(function OrderSuccess(props, ref) {
  const { sipdata } = props;

  const price = sipdata?.basket
    .reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0)
    .toFixed(2);
  const TotalHT = sipdata?.basket
    .reduce((acc, item) => {
      return acc + item.quantity * (item.price / 1.2).toFixed(2);
    }, 0)
    .toFixed(2);

  const TotalTVA = sipdata?.basket
    .reduce((acc, item) => {
      const price = (item.price / 1.2).toFixed(2);
      const TVA = (item.price - price).toFixed(2);
      return acc + item.quantity * TVA;
    }, 0)
    .toFixed(2);

  const TOTAL = (parseFloat(TotalHT) + parseFloat(TotalTVA)).toFixed(2);

  let envoiprice = 0;

  if (
    sipdata?.sendadress?.country === "FR" &&
    sipdata?.shipping?.name === "colissimo"
  ) {
    const checkshipping = (price * 100).toFixed(0) < 10000 ? false : true;
    if (checkshipping) envoiprice = 0;
    else envoiprice = sipdata?.shipping?.price;
  } else {
    envoiprice = sipdata?.shipping?.price;
  }

  const TOTALSHIP = (parseFloat(TOTAL) + parseFloat(envoiprice)).toFixed(2);

  function formatNumber(num) {
    // Gelen sayıyı istenen formata dönüştür
    let formattedNumber = String(num);
    while (formattedNumber.length < 10) {
      formattedNumber = "0" + formattedNumber;
    }
    return formattedNumber;
  }

  const getCountryFullName = (countryCode) => {
    const countryData = {
      DE: "Allemagne",
      AT: "Autriche",
      BE: "Belgique",
      BG: "Bulgarie",
      CY: "Chypre",
      HR: "Croatie",
      DK: "Danemark",
      ES: "Espagne",
      EE: "Estonie",
      FI: "Finlande",
      FR: "France",
      GR: "Grèce",
      HU: "Hongrie",
      IE: "Irlande",
      IT: "Italie",
      LV: "Lettonie",
      LT: "Lituanie",
      LU: "Luxembourg",
      MT: "Malte",
      NL: "Pays-Bas",
      PL: "Pologne",
      PT: "Portugal",
      CZ: "République tchèque",
      RO: "Roumanie",
      SK: "Slovaquie",
      SI: "Slovénie",
      SE: "Suède",
      TR: "Turquie",
    };

    return countryData[countryCode] || "Ülke bulunamadı";
  };

  function getDate(data) {
    const mydata = new Date(data);
    const gun = mydata.getDate();
    const ay = mydata.getMonth() + 1;
    const yil = mydata.getFullYear();
    return `${gun}/${ay}/${yil}`;
  }

  return (
    <>
      {sipdata && (
        <div
          ref={ref}
          style={{
            marginTop: "30px",
            minWidth: "650px",
            margin: "auto",
            padding: "30px",
            border: "1px solid #eee",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.15)",
            fontSize: "10px",
            lineHeight: "12px",
            fontFamily:
              '"Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif',
            color: "#555",
          }}
        >
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td colSpan="2">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <Image
                            src={"/assets/img/logo-siyah.png"}
                            alt="nilriologo"
                            width={350}
                            height={350}
                            style={{
                              width: "100%",
                              maxWidth: "120px",
                              objectFit: "contain",
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr style={{ height: "20px" }}></tr>
              <tr>
                <td colSpan="2">
                  <table>
                    <tbody>
                      <tr style={{ verticalAlign: "top" }}>
                        <td>
                          <table
                            style={{
                              width: "220px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <tbody>
                              <tr style={{ verticalAlign: "top" }}>
                                <td>Numéro de la Facture</td>
                                <td>F{formatNumber(sipdata.siparisid)}</td>
                              </tr>
                              <tr>
                                <td>Numéro de la Commande</td>
                                <td>C{formatNumber(sipdata.siparisid)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>

                        <td align="right">
                          <table
                            style={{
                              width: "250px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{ width: "30%", verticalAlign: "top" }}
                                >
                                  Commande expédiée à
                                </td>
                                <td
                                  style={{ width: "70%", verticalAlign: "top" }}
                                >
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <span>
                                            {sipdata.sendadress.address}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {sipdata.sendadress.zipCode}{" "}
                                          {sipdata.sendadress.city}{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {getCountryFullName(
                                            sipdata.sendadress.country
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr style={{ height: "20px" }}></tr>
              <tr>
                <td colSpan="2">
                  <table>
                    <tbody>
                      <tr style={{ verticalAlign: "top" }}>
                        <td>
                          <table
                            style={{
                              width: "220px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td>Date de la Facture</td>
                                <td>{getDate(sipdata.createdAt)}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>

                        <td align="right">
                          <table
                            style={{
                              width: "250px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{ width: "30%", verticalAlign: "top" }}
                                >
                                  Facture adressée à
                                </td>
                                <td
                                  style={{ width: "70%", verticalAlign: "top" }}
                                >
                                  <table>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <span>
                                            {sipdata.billadress.address}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {sipdata.billadress.zipCode}{" "}
                                          {sipdata.billadress.city}{" "}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          {getCountryFullName(
                                            sipdata.billadress.country
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr style={{ height: "20px" }}></tr>
              <tr
                style={{
                  fontSize: "22px",
                  lineHeight: "1",
                  color: "#b90808",
                  fontWeight: "bold",
                }}
              >
                <td>FACTURE</td>
              </tr>
              <tr style={{ height: "20px" }}></tr>
              <tr>
                <td style={{ width: "100%" }}>
                  <table
                    className="order-detail"
                    border="0"
                    cellPadding="0"
                    cellSpacing="0"
                    align="left"
                    style={{
                      width: "100%",
                      border: "1px solid #000",
                      borderCollapse: "collapse",
                    }}
                  >
                    <thead>
                      <tr
                        align="left"
                        style={{
                          height: "40px",
                          paddingBottom: "0px",
                        }}
                      >
                        <th
                          style={{
                            textAlign: "start",
                            verticalAlign: "bottom",
                            width: "23%",
                            border: "1px solid #000",
                            padding: "6px",
                          }}
                        >
                          Réference du produits
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            verticalAlign: "bottom",
                            width: "30%",
                            border: "1px solid #000",
                            padding: "6px",
                          }}
                        >
                          Déscription
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          Quantité
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          Prix unitaire HT
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          TVA %
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          Montant TVA
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          Prix unitaire TTC
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          Prix Total HT
                        </th>
                        <th
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          Prix Total TTC
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sipdata?.basket?.map((item, index) => {
                        const tekHT = (item?.price / 1.2).toFixed(2);
                        const TVAprice = (item?.price - tekHT).toFixed(2);

                        return (
                          <tr key={index}>
                            <td
                              style={{
                                textAlign: "start",
                                verticalAlign: "top",
                                border: "1px solid #000",
                                padding: "6px",
                              }}
                            >
                              {item?.id}
                            </td>
                            <td
                              style={{
                                textAlign: "start",
                                verticalAlign: "top",
                                border: "1px solid #000",
                                padding: "6px",
                              }}
                            >
                              {item?.name} {item?.color}{" "}
                              {item?.size === "null" ? "" : item?.size}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              {item?.quantity}
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              {tekHT}€
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              %20
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              {TVAprice}€
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              {item?.price?.toFixed(2)}€
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              {(tekHT * item?.quantity).toFixed(2)}€
                            </td>
                            <td
                              style={{
                                border: "1px solid #000",
                                textAlign: "center",
                                padding: "6px",
                              }}
                            >
                              {(item?.price * item?.quantity).toFixed(2)}€
                            </td>
                          </tr>
                        );
                      })}

                      <tr>
                        <td colSpan={2}></td>

                        <td
                          colSpan={7}
                          style={{
                            border: "1px solid #000",
                            textAlign: "center",
                            padding: "6px",
                          }}
                        >
                          <table
                            border="0"
                            cellPadding="0"
                            cellSpacing="0"
                            style={{
                              width: "100%",
                              borderCollapse: "collapse",
                            }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  Sous Total HT:
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  {TotalHT}€
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  Pourcentage TVA:
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  20,00%
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  Montant TVA:
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  {TotalTVA}€
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  Sous Total TTC:
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  {TOTAL}€
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  Expedition:
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  {envoiprice}€
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  Total TTC:
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  {TOTALSHIP}€
                                </td>
                              </tr>
                              <tr>
                                <td
                                  style={{
                                    padding: "6px",
                                    textAlign: "left",
                                    border: "none",
                                  }}
                                >
                                  Mode(s) de Paiment
                                </td>
                                <td
                                  style={{
                                    textAlign: "right",
                                    padding: "6px",
                                    border: "none",
                                  }}
                                >
                                  Carte de Crédit
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "20px" }}>
                  İSPA 6 rue de palestro 93500 PANTİN/FRANCE
                </td>
              </tr>
              <tr>
                <td>No TVA :FR21804763704</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
});

export default SuccessClient;
