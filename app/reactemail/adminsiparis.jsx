import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const AdminSiparis = ({ sipdata }) => {
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

  const mydate = new Date(sipdata?.createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = mydate.toLocaleDateString("tr-TR", options);
  const formattedTime = mydate.toLocaleTimeString("tr-TR");
  const time = formattedDate + ", Saat " + formattedTime;
  return (
    <Html>
      <Head />
      <Preview>Nilrio Siparişi</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Text style={bold}>Nilrio Sipariş No : {sipdata?.siparisid}</Text>
            <table>
              <tr>
                <td>Ad Soyad : </td>
                <td>
                  {sipdata?.sendadress?.firstName}{" "}
                  {sipdata?.sendadress?.lastName}
                </td>
              </tr>
              <tr>
                <td>Telefon : </td>
                <td>{sipdata?.sendadress?.phoneNumber}</td>
              </tr>
              <tr>
                <td>Email : </td>
                <td>{sipdata?.email}</td>
              </tr>
              <tr>
                <td>Gönderim Adresi : </td>
                <td>{sipdata?.sendadress?.address}</td>
              </tr>
              <tr>
                <td>Gönderim Şehri : </td>
                <td>{sipdata?.sendadress?.city}</td>
              </tr>
              <tr>
                <td>Gönderim Yeri : </td>
                <td>{getCountryFullName(sipdata?.sendadress?.country)}</td>
              </tr>
              <tr>
                <td>Gönderim Zipcode : </td>
                <td>{sipdata?.sendadress?.zipCode}</td>
              </tr>
              <tr>
                <td>Kargo Türü : </td>
                <td>{sipdata?.shipping?.name}</td>
              </tr>
              <tr>
                <td>Kargo Parası : </td>
                <td>{sipdata?.shipping?.price}€</td>
              </tr>
              <tr>
                <td>Gönderim Notu : </td>
                <td>{sipdata?.note}</td>
              </tr>
              <tr>
                <td>Satın Alma Tarihi : </td>
                <td>{time}</td>
              </tr>
              <tr>
                <td>Toplam Fiyat : </td>
                <td>{sipdata?.amount}€</td>
              </tr>
            </table>
            <table>
              <thead>
                <tr>
                  <th scope="col">Ad</th>
                  <th scope="col">Renk</th>
                  <th scope="col">Boyut</th>
                  <th scope="col">Miktar</th>
                  <th scope="col">Fiyat</th>
                </tr>
              </thead>
              <tbody>
                {sipdata?.basket?.map((item) => (
                  <tr key={item?.id}>
                    <td>{item?.id}</td>
                    <td>{item?.name}</td>
                    <td>{item?.color}</td>
                    <td>{item?.size === "null" ? "Yok" : item?.size}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.price}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © CopyRight Nilrio, All Rights Reserved <br />6 Rue de Palestro
              Pantin, France
            </Text>
          </Row>
        </Section>
      </Body>
    </Html>
  );
};

export default AdminSiparis;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const bold = {
  fontSize: "14px",
  lineHeight: "26px",
  textAlign: "center",
  fontWeight: "bold",
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const footer = {
  maxWidth: "580px",
  margin: "0 auto",
};

const content = {
  padding: "5px 20px 10px 20px",
};
