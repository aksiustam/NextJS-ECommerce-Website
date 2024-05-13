"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { TiTimes } from "react-icons/ti";
import ReactGA from "react-ga4";
import setUserData from "@/app/actions/User/setUserData";
import setUserEmail from "@/app/actions/User/setUserEmail";
import setUserCodeVerify from "@/app/actions/User/setUserCodeVerify";
import setUserResendCode from "@/app/actions/User/setUserResendCode";
import { useRouter } from "next/navigation";
const InfoClient = (props) => {
  const { user } = props;
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      checked: user?.newscheck || false,
    },
  });

  const [verify, setVerify] = useState(false);
  const [formdata, setFormData] = useState(null);
  const [tel, setTel] = useState(user?.tel || null);
  const [code, setCode] = useState("");
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

  const onSubmit = async (data) => {
    ReactGA.event({
      category: "event",
      action: "Profil Düzenledi",
      label: "Profilini Düzenledi",
    });
    if (user.email !== data.email) {
      const formData = {
        name: data.name,
        lastname: data.lastname,
        tel: tel,
        email: data.email,
        newscheck: data.checked,
      };
      setFormData(formData);
      await setUserEmail(user.id, formData);
      setVerify(true);
    } else {
      const formData = {
        name: data.name,
        tel: tel,
        lastname: data.lastname,
        newscheck: data.checked,
      };
      await setUserData(user.id, formData);
      await Swal.fire(
        "succès",
        "Vos informations ont été mise a jour.",
        "success"
      );
    }
  };
  const VerifyCode = async () => {
    if (code === 0) {
      setFormError("Entrez le code");
    } else {
      const formData = { email: formdata.email, code: code };
      const res = await setUserCodeVerify(user.id, formData);
      if (res === true) {
        setFormError("connexion réussie.");
        setVerify(false);
        router.push("/");
        router.refresh();
      } else {
        setFormError(res.message);
      }
    }
  };
  const resendMail = async () => {
    if (!clicked) {
      setClicked(true);
      localStorage.setItem("lastClickedTime", Date.now().toString());

      const formData = { email: formdata.email };
      const res = await setUserResendCode(user.id, formData);
      if (res === true) {
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
          <div className="tw-flex ">
            <form className="add_product_form tw-w-full">
              <div
                className="tw-absolute tw-right-0 tw-top-1 tw-z-30 tw-cursor-pointer"
                onClick={() => {
                  setVerify(false);
                }}
              >
                <TiTimes size={32} />
              </div>
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-text-center">
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
                    placeholder="Enter Number"
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
      <div className="myaccount-content">
        <div className="save_button mt-3 d-flex align-items-center justify-content-between">
          <h4 className="title">Mes informations</h4>
        </div>
        <div className="tw-text-red-600 tw-my-2">{errors?.email?.message}</div>
        <div className="login_form_container">
          <div className="account_details_form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="default-form-box mb-20">
                <label>Prénom*</label>
                <input
                  type="text"
                  name="name"
                  id="lastname"
                  required
                  maxLength={40}
                  className="form-control tw-max-w-96"
                  {...register("lastname")}
                />
              </div>
              <div className="default-form-box mb-20">
                <label>Nom*</label>
                <input
                  type="text"
                  name="name"
                  className="form-control tw-max-w-96"
                  maxLength={40}
                  required
                  {...register("name")}
                />
              </div>
              <div className="default-form-box mb-20">
                <label htmlFor="faddress">Télephone*</label>
                <PhoneInput
                  international
                  placeholder="Télephone"
                  defaultCountry="FR"
                  className="form-control min-h-[45px] tw-max-w-96"
                  value={tel}
                  maxLength={18}
                  onChange={setTel}
                />
              </div>

              <div className="default-form-box mb-20">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  maxLength={70}
                  required
                  className="form-control tw-max-w-96"
                  {...register("email", {
                    pattern: {
                      value:
                        /^[A-Z0-9._%+-]{3,}@(hotmail|gmail|yahoo|outlook|aol|icloud|zoho|protonmail|gmx|yandex|mail|tutanota|fastmail|hushmail|lycos|rackspace|zimbra|squirrelmail|roundcube|163|qq)\.(com|net|org|edu)$/i,
                      message: "E-mail incorrect",
                    },
                  })}
                />
              </div>

              <div className="tw-flex tw-justify-between">
                <label
                  className="checkbox-default checkbox-default-more-text"
                  htmlFor="newsletter"
                >
                  <input
                    type="checkbox"
                    id="newsletter"
                    {...register("checked")}
                  />
                  <span className="ml-2">ABONNEMENT À LA NEWSLETTER</span>
                </label>
                <button
                  type="submit"
                  className="theme-btn-one btn_sm tw-bg-black tw-text-white"
                >
                  Mise à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoClient;
