"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { TiTimes } from "react-icons/ti";
import ReactGA from "react-ga4";
import { useRouter } from "next/navigation";
import Link from "next/link";
const RegisterClient = () => {
  const router = useRouter();

  const [verify, setVerify] = useState(false);
  const [formData, setFormData] = useState(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [formerror, setFormError] = useState("");
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
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    ReactGA.event({
      category: "event",
      action: "KayıtOlTıkla",
      label: "Kullanıcı Kayıt Oldu",
    });

    setFormData(data);
    if (data.password !== data.repassword) {
      setError("Le deuxième mot de passe est incorrect");
      return;
    }
    await axios.post("/api/auth/register", data).then(() => {
      setVerify(true);
    });
    // toast.success("Kullanıcı Olusturuldu...");
    // signIn("credentials", {
    //   email: data.email,
    //   password: data.password,
    //   redirect: false,
    // }).then((callback) => {
    //   if (callback?.ok) {
    //     router.push("/cart");
    //     router.refresh();
    //     toast.success("Login İşlemi Basarılı...");
    //   }

    //   if (callback?.error) {
    //     toast.error(callback.error);
    //   }
    // });
  };
  const VerifyCode = async () => {
    if (code === 0) {
      setFormError("Entrez le code");
    } else {
      try {
        await axios.post("/api/auth/register", data).then(() => {
          setVerify(true);
        });
        const myform = { data: { ...formData }, code: code };
        const response = await axios.post(
          API_URL + "/auth/register/verify",
          myform
        );
        if (response.data) {
          setFormError("connexion réussie.");
          const cookies = new Cookies();
          if (usercheck) {
            const userAgent = navigator.userAgent;
            if (
              userAgent.includes("AppleWebKit") &&
              !userAgent.includes("Chrome")
            ) {
              cookies.set("jwt_auth", response.data.token.toString(), {
                path: "/",
              });
            } else {
              cookies.set("jwt_auth", response.data.token.toString(), {
                path: "/",
                secure: true,
                SameSite: "Strict",
              });
            }
          }
          setVerify(false);

          navigate("/");
          window.location.reload();
        }
      } catch (error) {
        setFormError(JSON.stringify(error.response.data.message));
      }
    }
  };
  const resendMail = async () => {
    if (!clicked) {
      setClicked(true);
      localStorage.setItem("lastClickedTime", Date.now().toString());

      const data = { email: formData.email };
      const response = await axios.post(
        API_URL + "/auth/register/resendmail",
        data
      );
      if (response.data) {
        setVerify(true);
        setFormError(
          "Votre code a était renvoyer de nouveau sur votre boîte mail."
        );
      }
      setTimeout(() => {
        setClicked(false); // 3 dakika sonra tekrar tıklamaya izin ver
      }, 120000);
    }
  };
  return (
    <>
      <Modal
        show={verify}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="tw-flex">
            <form className="add_product_form tw-w-full tw-relative">
              <div
                className="tw-absolute tw-right-0 tw-top-1 tw-z-30 tw-cursor-pointer"
                onClick={() => {
                  setVerify(false);
                }}
              >
                <TiTimes size={32} />
              </div>
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-center">
                <div className="tw-mb-2">
                  <p>Entrez le code envoyer sur votre boite mail.</p>
                  {!clicked && (
                    <span
                      className="tw-text-blue-500 tw-cursor-pointer"
                      onClick={() => resendMail()}
                    >
                      Renvoyez de nouveau
                    </span>
                  )}
                </div>
                <div className="tw-mb-2 tw-text-red-600">
                  <p>{formerror}</p>
                </div>
                <div className="fotm-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Entrez le code"
                    value={code}
                    onChange={(e) => {
                      const enteredValue = e.target.value;
                      // Girilen değer sadece rakamlardan oluşuyor mu ve 6 haneli mi kontrol ediyoruz
                      if (/^\d{0,6}$/.test(enteredValue)) {
                        // Girilen değeri state'e atıyoruz
                        setCode(enteredValue);
                      }
                    }}
                  />
                </div>
                <button
                  className="theme-btn-one bg-black btn_md tw-bg-black tw-text-white mt-3 "
                  type="button"
                  onClick={() => VerifyCode()}
                >
                  OK
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <section id="login_area" className="ptb-100">
        <div className="container">
          {(error ||
            errors?.email?.message ||
            errors?.password?.message ||
            errors?.repassword?.message) && (
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
                    {errors?.repassword?.message && (
                      <span>{errors?.repassword?.message}</span>
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
                <h3 className="tw-mb-2 tw-font-bold tw-text-xl">S'inscrire</h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="default-form-box">
                    <label>
                      Prénom
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("lastname", {
                        required: "Prénom",
                      })}
                      required
                    />
                  </div>
                  <div className="default-form-box">
                    <label>
                      Nom
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("name", {
                        required: "Nom",
                      })}
                      required
                    />
                  </div>
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
                  <div className="default-form-box">
                    <label>
                      Mot de passe
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      minLength="6"
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
                  <div className="default-form-box">
                    <label>
                      Confirmation du mot de passe
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      minLength="6"
                      {...register("repassword", {
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

                  <label
                    className="checkbox-default checkbox-default-more-text"
                    htmlFor="newsletter"
                  >
                    <input
                      type="checkbox"
                      id="newsletter"
                      {...register("checked")}
                    />
                    <span className="ml-2 tw-font-bold">
                      ABONNEMENT À LA NEWSLETTER
                    </span>
                  </label>

                  <div className="login_submit">
                    <button
                      className="theme-btn-one btn-black-overlay btn_md tw-bg-black"
                      type="submit"
                    >
                      İnscrivez vous
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4  col-md-12 col-sm-12 col-12 ">
              <div className="account_form tw-flex tw-flex-grow tw-h-full tw-flex-col tw-gap-4 tw-justify-start tw-items-center">
                <h3 className="tw-font-bold tw-text-xl">Déjà inscrit ?</h3>
                <Link href="/login">
                  <button
                    className="theme-btn-one btn-black-overlay btn_md tw-bg-black"
                    type="submit"
                  >
                    Connexion
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

export default RegisterClient;
