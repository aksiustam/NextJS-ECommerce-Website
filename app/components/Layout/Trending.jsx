"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Form, InputGroup, Button } from "react-bootstrap";
import setNewsMail from "../../actions/Mail/setNewsMail";

const Trending = () => {
  const [email, setEmail] = useState("");
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
      const formData = { email: email };

      const res = await setNewsMail(formData);
      if (res === true) {
        Swal.fire(
          "Succès",
          "Merci,Nous avons bien pris en compte votre inscription à la newsletter.",
          "success"
        );
      } else {
        Swal.fire({
          icon: "error",
          title: JSON.stringify(res),
        });
      }

      setTimeout(() => {
        setClicked(false); // 3 dakika sonra tekrar tıklamaya izin ver
      }, 120000);
    }
  };

  return (
    <>
      <section id="special_offer_one">
        <div className="container tw-py-4">
          <div className="row">
            <div className="col-lg-4 offset-lg-4 col-md-12 col-sm-12 col-12">
              <div className="offer_banner_one text-center">
                <h4 className="tw-text-white tw-mb-4 tw-font-bold">
                  INSCRIVEZ-VOUS À LA NEWSLETTER
                </h4>
                <form onSubmit={handleSubmit}>
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
                      className="tw-text-white"
                    >
                      OK
                    </Button>
                  </InputGroup>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Trending;
