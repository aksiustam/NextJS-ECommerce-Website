import { Body, Head, Html, Img } from "@react-email/components";
import React from "react";

const InvoiceEmail = ({ sipdata }) => {
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
  function formatPNumber(num) {
    // Gelen sayıyı istenen formata dönüştür
    let formattedNumber = String(num);
    while (formattedNumber.length < 6) {
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
    <Html lang="fr">
      <Head />
      <Body>
        <div
          style={{
            maxWidth: "650px",
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
          <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
            <tr>
              <td colSpan="2">
                <table>
                  <tr>
                    <td>
                      <Img
                        src="https://testtest.nilrio.com/assets/img/logo-siyah.png"
                        width={120}
                        height={100}
                        alt="logo"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr style={{ height: "20px" }}></tr>
            <tr>
              <td colSpan="2">
                <table style={{ width: "100%" }}>
                  <tr style={{ verticalAlign: "top" }}>
                    <td>
                      <table
                        style={{
                          width: "220px",
                          borderCollapse: "collapse",
                        }}
                      >
                        <tr style={{ verticalAlign: "top" }}>
                          <td>Numéro de la Facture</td>
                          <td>F{formatNumber(sipdata.id)}</td>
                        </tr>
                        <tr>
                          <td>Numéro de la Commande</td>
                          <td>C{formatNumber(sipdata.id)}</td>
                        </tr>
                      </table>
                    </td>

                    <td
                      style={{
                        textAlign: "left",
                        float: "right",
                      }}
                    >
                      <table
                        style={{
                          width: "250px",
                          borderCollapse: "collapse",
                        }}
                      >
                        <tr>
                          <td style={{ width: "30%", verticalAlign: "top" }}>
                            Commande expédiée à
                          </td>
                          <td style={{ width: "70%", verticalAlign: "top" }}>
                            <table>
                              <tr>
                                <td>
                                  <span>{sipdata.sendadress.address}</span>
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
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr style={{ height: "20px" }}></tr>
            <tr>
              <td colSpan="2">
                <table style={{ width: "100%" }}>
                  <tr style={{ verticalAlign: "top" }}>
                    <td>
                      <table
                        style={{
                          width: "220px",
                          borderCollapse: "collapse",
                        }}
                      >
                        <tr>
                          <td>Date de la Facture</td>
                          <td>{getDate(sipdata.createdAt)}</td>
                        </tr>
                      </table>
                    </td>

                    <td
                      style={{
                        textAlign: "left",
                        float: "right",
                      }}
                    >
                      <table
                        style={{
                          width: "250px",
                          borderCollapse: "collapse",
                        }}
                      >
                        <tr>
                          <td style={{ width: "30%", verticalAlign: "top" }}>
                            Facture adressée à
                          </td>
                          <td style={{ width: "70%", verticalAlign: "top" }}>
                            <table>
                              <tr>
                                <td>
                                  <span>{sipdata.billadress.address}</span>
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
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr style={{ height: "20px" }}></tr>
            <th
              style={{
                textAlign: "start",
                fontSize: "22px",
                lineHeight: "1",
                color: "#b90808",
                fontWeight: "bold",
                paddingBottom: "20px",
                textTransform: "uppercase",
              }}
            >
              Facture
            </th>
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
                            {formatPNumber(item?.id)}
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
                          style={{ width: "100%", borderCollapse: "collapse" }}
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
          </table>
        </div>
      </Body>
    </Html>
  );
};

export default InvoiceEmail;
