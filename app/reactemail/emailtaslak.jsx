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

export const EmailTaslak = (props) => {
  const { text } = props;

  return (
    <Html>
      <Head />
      <Preview>Avis de NILRIO</Preview>
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
            <Text style={paragraph}>Bonjour,</Text>
            <div dangerouslySetInnerHTML={{ __html: text }} />

            <Text style={paragraph}>
              Merci
              <br />
              L&apos;équipe NILRIO
            </Text>
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

export default EmailTaslak;

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
