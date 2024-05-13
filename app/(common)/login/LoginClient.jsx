"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TiTimes } from "react-icons/ti";
import Modal from "react-bootstrap/Modal";
import ReactGA from "react-ga4";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
const LoginClient = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [modalerror, setModalError] = useState("");
  const [modalcheck, setModalCheck] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { ok, error } = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (ok) {
        ReactGA.event({
          category: "event",
          action: "GirişTıkla",
          label: "Kullanıcı Giriş Yaptı",
        });
        await Swal.fire({
          icon: "success",
          title: "Connexion Réussie",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/");
        router.refresh();
      }

      if (error) {
        setError(error);
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const lastClickedTime = localStorage.getItem("lastClickedTime");
    if (lastClickedTime) {
      const elapsedTime = Date.now() - parseInt(lastClickedTime);
      if (elapsedTime < 100000) {
        // Eğer son tıklama 2 dakika içinde yapıldıysa
        setClicked(true);
        setTimeout(() => {
          setClicked(false); // 2 dakika sonra tekrar tıklamaya izin ver
        }, 100000 - elapsedTime);
      }
    }
  }, []);

  const onModalSumbit = async () => {
    const emailRegex =
      /^[A-Z0-9._%+-]{3,}@(hotmail|gmail|yahoo|outlook|aol|icloud|zoho|protonmail|gmx|yandex|mail|tutanota|fastmail|hushmail|lycos|rackspace|zimbra|squirrelmail|roundcube|163|qq)\.(com|net|org|edu)$/i;
    if (emailRegex.test(email)) {
      if (!clicked) {
        setClicked(true);
        localStorage.setItem("lastClickedTime", Date.now().toString());
        const formData = { email: email };

        await axios
          .post("/api/user/forgotpass", formData)
          .then((response) => {
            setModalError(
              "Votre mot de passe provisoire est disponible sur votre boite mail. Vous pouvez le changer a tout moment sur votre profil"
            );
          })
          .catch((error) => {
            setModalError(error.response.data.message);
          });

        setTimeout(() => {
          setModalCheck(false);
        }, 3000);
        setTimeout(() => {
          setClicked(false); // 3 dakika sonra tekrar tıklamaya izin ver
        }, 180000);
      }
    } else {
      setModalError("E-mail incorrect");
    }
  };

  return (
    <>
      <Modal
        show={modalcheck}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setModalCheck(false)}
      >
        <Modal.Body>
          <div className="container">
            <div className="row tw-relative tw-mt-3">
              <div
                className="tw-absolute tw-flex tw-justify-end -tw-top-5 tw-right-0 tw-z-30 tw-cursor-pointer"
                onClick={() => {
                  setModalCheck(false);
                }}
              >
                <TiTimes size={32} />
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-text-center tw-mb-2">
                <h3 className="tw-font-bold tw-text-xl">Mot de passe oublié</h3>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-text-center ">
                <h4 className="tw-text-sm">
                  Nous pouvons vous envoyer un nouveau mot de passe par e-mail.
                </h4>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-text-center tw-mt-2">
                <h4 className="tw-text-sm tw-text-red-600">{modalerror}</h4>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-flex tw-items-center tw-justify-center tw-my-8">
                <div className="default-form-box tw-w-96">
                  <label>Adresse e-mail</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-flex tw-items-center tw-justify-center">
                <button
                  className="theme-btn-one tw-bg-black tw-text-white btn_md hover:tw-bg-slate-800 tw-cursor-pointer "
                  type="button"
                  onClick={onModalSumbit}
                  disabled={clicked}
                >
                  ENVOYER
                </button>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-flex tw-items-center tw-justify-center tw-mt-1">
                <h6
                  className="tw-text-xs tw-font-bold tw-underline tw-cursor-pointer"
                  onClick={() => {
                    setModalCheck(false);
                  }}
                >
                  Annuler
                </h6>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <section id="login_area" className="ptb-100">
        <div className="container">
          {(error || errors?.email?.message || errors?.password?.message) && (
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-md-12 col-sm-12 col-12 tw-mb-2">
                <div className="account_form tw-py-5 tw-bg-red-800 tw-bg-opacity-80">
                  <div className="tw-text-white tw-font-bold tw-text-center tw-text-sm tw-flex tw-flex-col tw-gap-3">
                    {error && <span>{error}</span>}
                    {errors?.email?.message && (
                      <span>{errors?.email?.message}</span>
                    )}
                    {errors?.password?.message && (
                      <span>{errors?.password?.message}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="row">
            <div className="col-lg-2 col-md-12 col-sm-12 col-12"></div>
            <div className="col-lg-4 col-md-12 col-sm-12 col-12">
              <div className="account_form">
                <h3 className="tw-mb-2 tw-font-bold tw-text-xl">
                  Se Connecter
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="default-form-box">
                    <label>
                      E-mail
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      {...register("email", {
                        required: "Remplissez l'e-mail",
                        pattern: {
                          value:
                            /^[A-Z0-9._%+-]{3,}@(hotmail|gmail|yahoo|outlook|aol|icloud|zoho|protonmail|gmx|yandex|mail|tutanota|fastmail|hushmail|lycos|rackspace|zimbra|squirrelmail|roundcube|163|qq)\.(com|net|org|edu)$/i,
                          message: "E-mail incorrect",
                        },
                      })}
                      required
                    />
                  </div>
                  <div className="default-form-box !tw-mb-0">
                    <label>
                      Mot de passe
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      minLength="4"
                      {...register("password", {
                        required: "Remplissez le mot de passe",
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                          message:
                            "Le mot de passe doit contenir au moins 6 caractère contenant au moins 1 majuscule, 1 minuscule et 1 chiffre.",
                        },
                      })}
                      required
                    />
                  </div>
                  <div className="tw-my-3">
                    <span
                      className="tw-text-blue-500 tw-text-sm tw-cursor-pointer"
                      onClick={() => setModalCheck(true)}
                    >
                      Mot de passe oublié ?
                    </span>
                  </div>
                  <div className="login_submit">
                    <button
                      className="theme-btn-one btn-black-overlay btn_md tw-bg-black"
                      type="submit"
                    >
                      Connexion
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4  col-md-12 col-sm-12 col-12 ">
              <div className="account_form tw-flex tw-flex-grow tw-h-full tw-flex-col tw-gap-4 tw-justify-start tw-items-center">
                <h3 className="tw-font-bold tw-text-xl">S&apos;inscrire</h3>
                <Link href="/register">
                  <button
                    className="theme-btn-one btn-black-overlay btn_md tw-bg-black"
                    type="submit"
                  >
                    İnscrivez vous
                  </button>
                </Link>
              </div>
            </div>
            <div className="col-lg-2 col-md-12 col-sm-12 col-12"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginClient;
