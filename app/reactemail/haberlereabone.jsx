import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const HaberlereAbone = () => {
  return (
    <Html>
      <Head />
      <Preview>
        Nous vous remercions d&apos;avoir souscrit à la newsletter de NILRIO.
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img
              src={"https://testtest.nilrio.com/assets/img/nilrio-logo.png"}
              width="285"
              height="50"
              alt="logo"
              style={logo}
            />
          </Section>

          <Section style={content}>
            <Text style={bold}>
              Nous vous remercions d&apos;avoir souscrit à la newsletter de
              NILRIO.
            </Text>
            <Text style={paragraph}>
              Désormais, vous serez un des premiers à être informé de nos
              nouveauté ainsi que de nos offres spéciales.
            </Text>
            <Text style={paragraph}>Merci d’avoir choisi NILRIO</Text>
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

export default HaberlereAbone;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
  textAlign: "center",
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

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: 15,
};
