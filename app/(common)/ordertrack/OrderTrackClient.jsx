"use client";
import { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import getSiparisMail from "@/app/actions/Siparis/getSiparisMail";
const OrderTrackClient = () => {
  const [email, setEmail] = useState("");
  const [sipdata, setSipData] = useState([]);
  const [error, setError] = useState("");
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    const lastClickedTime = localStorage.getItem("lastClickedTime");
    if (lastClickedTime) {
      const elapsedTime = Date.now() - parseInt(lastClickedTime);
      if (elapsedTime < 100000) {
        // Eğer son tıklama 3 dakika içinde yapıldıysa
        setClicked(true);
        setTimeout(() => {
          setClicked(false); // 3 dakika sonra tekrar tıklamaya izin ver
        }, 100000 - elapsedTime);
      }
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clicked) {
      setClicked(true);
      localStorage.setItem("lastClickedTime", Date.now().toString());

      const res = await getSiparisMail(email);
      console.log(res);
      if (res.message) setError(res.message);
      else setSipData(res);

      setTimeout(() => {
        setClicked(false);
      }, 180000);
    } else {
      setError("Réessayer dans 3 minute");
    }
  };

  return (
    <>
      <section id="order-track" className="tw-my-8">
        <div className="container">
          <div className="account_form  tw-flex tw-flex-col tw-gap-4 tw-justify-center tw-items-center">
            <div className="default-form-box">
              <form onSubmit={handleSubmit} className="tw-text-center">
                <label>
                  Entrez votre adresse e-mail
                  <span className="text-danger">*</span>
                </label>
                <label>
                  <span className="text-danger">{error}</span>
                </label>
                <InputGroup>
                  <Form.Control
                    className="!tw-min-h-4"
                    type="email"
                    placeholder="Votre Adresse E-Mail"
                    aria-label="Email Gir"
                    aria-describedby="basic-addon2"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Button
                    type="submit"
                    variant="outline-secondary"
                    id="button-addon2"
                    className="tw-text-black tw-bg-slate-100"
                  >
                    OK
                  </Button>
                </InputGroup>
              </form>
            </div>
            <div className="table_page table-responsive">
              <table>
                <thead>
                  <tr>
                    <th className="!tw-text-xs md:!tw-text-base">
                      No commande
                    </th>
                    <th className="!tw-text-xs md:!tw-text-base">Date</th>
                    <th className="!tw-text-xs md:!tw-text-base">Statut</th>
                    <th className="!tw-text-xs md:!tw-text-base">
                      Nombre D’article
                    </th>
                    <th className="!tw-text-xs md:!tw-text-base">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {sipdata
                    ?.sort((a, b) => b?.id - a?.id)
                    .map((item, index) => {
                      const createdAt = item.createdAt;
                      const date = new Date(createdAt);
                      const options = {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      };
                      const formattedDate = date.toLocaleDateString(
                        "fr-FR",
                        options
                      );
                      const total = item.basket.reduce((acc, item) => {
                        return acc + item.quantity;
                      }, 0);

                      return (
                        <tr key={item?.id}>
                          <td className="!tw-text-xs md:!tw-text-base">
                            #{item?.id}
                          </td>
                          <td className="!tw-text-xs md:!tw-text-base">
                            {formattedDate}
                          </td>
                          <td className="!tw-text-xs md:!tw-text-base">
                            {item?.status === "paid" && (
                              <span className="badge badge-info">
                                En cours de traitement
                              </span>
                            )}
                            {item?.status === "send" && (
                              <div className="tw-flex tw-gap-2 tw-items-center tw-justify-center">
                                <span className="badge badge-success">
                                  Envoyée
                                </span>
                                <a
                                  href={
                                    sipdata?.shipping?.name === "colissimo"
                                      ? ``
                                      : `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${
                                          sipdata?.kargono || ""
                                        }&langue=fr`
                                  }
                                  className="badge badge-success"
                                >
                                  Suivre mon colis
                                </a>
                              </div>
                            )}
                            {item?.status === "error" && (
                              <span className="badge badge-danger">
                                Erreur Consultez votre mail
                              </span>
                            )}
                          </td>
                          <td className="!tw-text-xs md:!tw-text-base">
                            {total}
                          </td>
                          <td className="!tw-text-xs md:!tw-text-base">
                            {item?.status === "error"
                              ? item?.error
                              : `${item?.amount?.toFixed(2)}€ `}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderTrackClient;
