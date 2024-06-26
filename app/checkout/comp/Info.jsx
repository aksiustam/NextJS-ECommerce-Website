"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "react-phone-number-input/style.css";
import dynamic from "next/dynamic";

// PhoneInput bileşenini dinamik olarak yükle
const PhoneInput = dynamic(() => import("react-phone-number-input"), {
  ssr: false,
});

import { FaPlus } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import { TiTimes } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import ReactGA from "react-ga4";
import UseCart from "@/hooks/useCart";
import getParcelGram from "../../actions/Parcel/getParcelGram";
const Info = (props) => {
  const { setUserInfo, setSteps, shipping, setShipping, user } = props;

  const { basket } = UseCart();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstname: user?.name || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
    },
  });
  const [tel, setTel] = useState(user?.tel || null);

  const [valueadress, setValueAdress] = useState({
    id: "",
    name: "",
    adress: "",
    country: "FR",
    state: "",
    zipcode: "",
    category: "PRIVATE",
    company: "",
    companytva: "",
  });
  const [sendadress, setSendAdress] = useState({
    id: "",
    name: "",
    adress: "",
    country: "FR",
    state: "",
    zipcode: "",
    category: "PRIVATE",
    company: "",
    companytva: "",
  });
  const [billadress, setBillAdress] = useState({
    id: "",
    name: "",
    adress: "",
    country: "FR",
    state: "",
    zipcode: "",
    category: "PRIVATE",
    company: "",
    companytva: "",
  });

  useEffect(() => {
    if (user !== null && user?.Address?.length > 0) {
      const adress = user.Address[0];
      delete adress.userId;

      setSendAdress({ ...adress });
      setBillAdress({ ...adress });
    }
  }, [user]);

  const [modalerror, setModalError] = useState({ name: "", msg: "" });
  const [formerror, setFormError] = useState({ name: "", msg: "" });

  const [adressmodal, setAdressModal] = useState({ check: false, bill: false });
  const [modalmsg, setModalMsg] = useState({ msg: "", btncheck: false });
  const [checkbill, setCheckBill] = useState(true);

  const onSubmit = async (data) => {
    setFormError({ name: "", msg: "" });

    if (data.firstname.length < 2) {
      setFormError({ name: "firstname", msg: "Veuillez saisir votre prénom" });
      return;
    }
    if (data.lastname.length < 2) {
      setFormError({ name: "lastname", msg: "Veuillez saisir votre nom" });
      return;
    }
    if (tel === "") {
      setFormError({ name: "tel", msg: "Saisissez un numero de telephone" });
      return;
    }
    data.tel = tel;
    if (sendadress.name === "" || sendadress.adress === "") {
      setFormError({
        name: "address",
        msg: "Veuillez saisir une adresse de livraison",
      });
      return;
    }
    if (billadress.name === "" || billadress.adress === "") {
      setFormError({
        name: "address",
        msg: "Veuillez saisir une adresse de facturation",
      });
      return;
    }

    const formData = {
      data: { ...data },
      bill: { ...billadress },
      send: { ...sendadress },
    };

    if (basket.length > 0) {
      setUserInfo(formData);
      setSteps(1);
    } else {
      await Swal.fire({
        icon: "error",
        title: "Votre panier est vide",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const updateAdressModal = async () => {
    setModalError({ name: "", msg: "" });
    if (valueadress.name.length < 2) {
      setModalError({
        name: "name",
        msg: "Veuillez saisir un titre pour votre adresse",
      });
      return;
    }
    if (valueadress.category === "COMPANY" && valueadress.company.length < 3) {
      setModalError({
        name: "company",
        msg: "Veuillez saisir le nom de l'entreprise",
      });
      return;
    }
    if (
      valueadress.category === "COMPANY" &&
      valueadress.companytva.length < 3
    ) {
      setModalError({
        name: "companytva",
        msg: "Veuillez saisir le numero de TVA intracommunautaire",
      });
      return;
    }
    if (valueadress.adress.length < 10) {
      setModalError({
        name: "adress",
        msg: "Veuillez saisir votre adresse",
      });
      return;
    }
    if (valueadress.state.length < 3) {
      setModalError({
        name: "state",
        msg: "Veuillez saisir la ville",
      });
      return;
    }
    if (valueadress.zipcode.length < 5) {
      setModalError({
        name: "zipcode",
        msg: "Veuillez saisir le code postal",
      });
      return;
    }

    if (user) {
      let formData = { userid: user.id, ...valueadress };

      await axios.post("/api/user/addaddress", formData).catch((error) => {
        Swal.fire({
          icon: "error",
          title: JSON.stringify(error.response.data),
        });
      });
      setModalMsg({
        msg: "Vos informations ont été mise a jour avec succes.",
        btncheck: true,
      });
      setTimeout(() => {
        window.location.reload();
        setAdressModal({ check: false, bill: false });
        setModalMsg({
          msg: "Vos informations ont été mise a jour avec succes.",
          btncheck: false,
        });
      }, 2000);
    } else {
      if (checkbill) {
        setSendAdress({ ...valueadress });
        setBillAdress({ ...valueadress });
      } else {
        adressmodal.bill === false
          ? setSendAdress({ ...valueadress })
          : setBillAdress({ ...valueadress });
      }
      setModalMsg({
        msg: "Vos informations ont été mise a jour avec succes.",
        btncheck: true,
      });
      setTimeout(() => {
        setAdressModal({ check: false, bill: false });
        setModalMsg({
          msg: "Vos informations ont été mise a jour avec succes.",
          btncheck: false,
        });
      }, 2000);
    }
    setValueAdress({
      id: "",
      name: "",
      adress: "",
      country: "FR",
      state: "",
      zipcode: "",
      category: "PRIVATE",
      company: "",
      companytva: "",
    });
  };

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

    return countryData[countryCode] || "Not Found Country";
  };

  const [senddata, setSendData] = useState({ colissimo: 0, chronopost: 0 });
  const totalgram =
    basket.reduce((acc, item) => {
      return acc + item.quantity * item.parcelgram;
    }, 0) || 400;

  useEffect(() => {
    const fetchData = async () => {
      let ct = sendadress?.country;
      if (sendadress.name === "" && sendadress.adress === "") ct = "FR";

      const data = await getParcelGram(ct, totalgram);
      setSendData(data);
      setShipping({
        name: "colissimo",
        price: data?.colissimo,
        country: ct,
      });
    };
    fetchData();
  }, [sendadress, totalgram, setShipping]);
  const total = (
    basket.reduce((acc, item) => {
      if (item.indirim === true) {
        return acc + item.quantity * item.inprice;
      } else {
        return acc + item.quantity * item.price;
      }
    }, 0) * 100
  ).toFixed(0);

  const checkshipping =
    shipping.country === "FR" ? (total < 10000 ? false : true) : false;

  return (
    <>
      <div className="check-heading">
        <h3>Informations Personnelles</h3>
      </div>

      <div className="check-out-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal
            show={adressmodal.check}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Body>
              <div className="container">
                <div className="row tw-relative tw-mt-3">
                  <div
                    className="tw-absolute tw-right-0  -tw-top-5 tw-z-30 tw-cursor-pointer"
                    onClick={() => {
                      setValueAdress({
                        id: "",
                        name: "",
                        adress: "",
                        country: "FR",
                        state: "",
                        zipcode: "",
                        category: "PRIVATE",
                        company: "",
                        companytva: "",
                      });
                      setAdressModal({ check: false, bill: false });
                    }}
                  >
                    <TiTimes size={32} />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                      <label htmlFor="faddress" className="tw-font-bold">
                        Titre de l&apos;adresse
                        <span className="text-danger">*</span>
                        <span className="tw-text-red-600 tw-text-sm">
                          {modalerror.name === "name" ? modalerror.msg : ""}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="adressname"
                        placeholder="Entrez le titre de votre adresse"
                        maxLength={15}
                        value={valueadress.name}
                        onChange={(e) => {
                          setValueAdress((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }));
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="tw-flex tw-items-center tw-h-full tw-gap-3  tw-pb-3 ">
                      <div>
                        <label className="custom_boxed tw-font-bold">
                          Particulier
                          <input
                            type="radio"
                            name="radio1"
                            checked={
                              valueadress.category === "PRIVATE" ? true : false
                            }
                            onChange={(e) =>
                              setValueAdress((prev) => ({
                                ...prev,
                                category: "PRIVATE",
                              }))
                            }
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div>
                        <label className="custom_boxed tw-font-bold">
                          Entreprise
                          <input
                            type="radio"
                            name="radio1"
                            checked={
                              valueadress.category === "COMPANY" ? true : false
                            }
                            onChange={(e) =>
                              setValueAdress((prev) => ({
                                ...prev,
                                category: "COMPANY",
                              }))
                            }
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {valueadress.category === "COMPANY" && (
                    <>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                          <label htmlFor="phone">
                            Nom de l’entreprise (facultatif){" "}
                            <span className="tw-text-red-600">
                              {modalerror.name === "company"
                                ? modalerror.msg
                                : ""}
                            </span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="company"
                            placeholder="Nom de l’entreprise"
                            maxLength={40}
                            value={valueadress.company}
                            onChange={(e) => {
                              setValueAdress((prev) => ({
                                ...prev,
                                company: e.target.value,
                              }));
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="form-group">
                          <label htmlFor="phone">
                            Numéro de TVA (facultatif){" "}
                            <span className="tw-text-red-600">
                              {modalerror.name === "companytva"
                                ? modalerror.msg
                                : ""}
                            </span>
                          </label>
                          <input
                            type="text"
                            required
                            className="form-control"
                            id="companytva"
                            placeholder="Saisissez votre numéro de TVA"
                            maxLength={40}
                            value={valueadress.companytva}
                            onChange={(e) => {
                              setValueAdress((prev) => ({
                                ...prev,
                                companytva: e.target.value,
                              }));
                            }}
                          />
                        </div>
                        <div className="tw-text-sm tw-mb-2">
                          Les entreprises européennes disposant d&apos;un numéro
                          de TVA européen valide seront exonérées de la TVA
                        </div>
                      </div>
                    </>
                  )}
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                      <label htmlFor="faddress" className="tw-font-bold">
                        Adresse<span className="text-danger">*</span>
                        <span className="tw-text-red-600 tw-text-sm">
                          {modalerror.name === "adress" ? modalerror.msg : ""}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Entrez votre adresse"
                        maxLength={70}
                        value={valueadress.adress}
                        required
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          if (/^[^<>]*$/.test(inputValue)) {
                            // Giriş geçerli, işlemlerinizi burada gerçekleştirin
                            setValueAdress((prev) => ({
                              ...prev,
                              adress: inputValue,
                            }));
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                      <label htmlFor="country" className="tw-font-bold">
                        Pays<span className="text-danger">*</span>
                      </label>
                      <select
                        className="form-control"
                        id="country"
                        value={valueadress.country}
                        onChange={(e) =>
                          setValueAdress((prev) => ({
                            ...prev,
                            country: e.target.value,
                          }))
                        }
                      >
                        <option value="FR">France</option>
                        <option value="DE">Allemagne</option>
                        <option value="AT">Autriche</option>
                        <option value="BE">Belgique</option>
                        <option value="BG">Bulgarie</option>
                        <option value="CY">Chypre</option>
                        <option value="HR">Croatie</option>
                        <option value="DK">Danemark</option>
                        <option value="ES">Espagne</option>
                        <option value="EE">Estonie</option>
                        <option value="FI">Finlande</option>
                        <option value="GR">Grèce</option>
                        <option value="HU">Hongrie</option>
                        <option value="IE">Irlande</option>
                        <option value="IT">Italie</option>
                        <option value="LV">Lettonie</option>
                        <option value="LT">Lituanie</option>
                        <option value="LU">Luxembourg</option>
                        <option value="MT">Malte</option>
                        <option value="NL">Pays-Bas</option>
                        <option value="PL">Pologne</option>
                        <option value="PT">Portugal</option>
                        <option value="CZ">République tchèque</option>
                        <option value="RO">Roumanie</option>
                        <option value="SK">Slovaquie</option>
                        <option value="SI">Slovénie</option>
                        <option value="SE">Suède</option>
                        <option value="TR">Turquie</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                      <label htmlFor="ville" className="tw-font-bold">
                        Ville<span className="text-danger">*</span>
                        <span className="tw-text-red-600 tw-text-sm">
                          {modalerror.name === "state" ? modalerror.msg : ""}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="state"
                        placeholder="Exemple : Paris"
                        maxLength={20}
                        required
                        value={valueadress.state}
                        onChange={(e) => {
                          setValueAdress((prev) => ({
                            ...prev,
                            state: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <div className="form-group">
                      <label htmlFor="zip" className="tw-font-bold">
                        Code postal<span className="text-danger">*</span>
                        <span className="tw-text-red-600 tw-text-sm">
                          {modalerror.name === "zipcode" ? modalerror.msg : ""}
                        </span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Code postal"
                        value={valueadress.zipcode}
                        maxLength={7}
                        required
                        onChange={(e) => {
                          const enteredValue = e.target.value;
                          // Girilen değer sadece rakamlardan oluşuyor mu ve 6 haneli mi kontrol ediyoruz
                          if (/^\d{0,7}$/.test(enteredValue)) {
                            // Girilen değeri state'e atıyoruz
                            setValueAdress((prev) => ({
                              ...prev,
                              zipcode: enteredValue,
                            }));
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-flex tw-items-center tw-justify-between">
                    <div className="tw-text-black tw-italic tw-text-sm">
                      {modalmsg.btncheck === false
                        ? "En tant que membre, vous pouvez modifier votre adresse depuis votre profil"
                        : modalmsg.msg}
                    </div>
                    <button
                      className="theme-btn-one tw-bg-black tw-text-white btn_md hover:tw-bg-slate-800 tw-cursor-pointer "
                      onClick={() => {
                        updateAdressModal();
                      }}
                      type="button"
                      disabled={modalmsg.btncheck}
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div
                className="tw-flex tw-flex-col tw-gap-3 tw-mb-4 tw-border-[3px] tw-p-5 tw-cursor-pointer"
                style={{
                  borderColor:
                    shipping?.name === "colissimo" ? "#000000" : "#F1F1F1",
                }}
                onClick={() =>
                  setShipping({
                    name: "colissimo",
                    price: senddata?.colissimo,
                    country: sendadress?.country,
                  })
                }
              >
                <div className="tw-font-extrabold tw-flex tw-items-center tw-justify-between">
                  <h4>
                    {shipping?.country === "FR" ||
                    sendadress?.adress === "" ||
                    sendadress?.name === ""
                      ? "Colissimo"
                      : "Colissimo International"}
                  </h4>
                  <span className="tw-font-bold">
                    {checkshipping ? "GRATUITS" : senddata?.colissimo + "€"}
                  </span>
                </div>
                <span className="tw-text-sm tw-font-light tw-text-opacity-50">
                  {shipping?.country === "FR" ||
                  sendadress?.adress === "" ||
                  sendadress?.name === ""
                    ? "dans un délai de 3 à 5 jours ouvrables"
                    : ""}
                </span>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div
                className="tw-flex tw-flex-col tw-gap-3 tw-mb-4 tw-border-[3px] tw-p-5 tw-cursor-pointer"
                style={{
                  borderColor:
                    shipping?.name === "chronopost" ? "#000000" : "#F1F1F1",
                }}
                onClick={() =>
                  setShipping({
                    name: "chronopost",
                    price: senddata?.chronopost,
                    country: sendadress?.country,
                  })
                }
              >
                <div className="tw-font-extrabold tw-flex tw-items-center tw-justify-between">
                  <h4>
                    {shipping?.country === "FR" ||
                    sendadress?.adress === "" ||
                    sendadress?.name === ""
                      ? "Chronopost"
                      : "Chronopost Classic"}
                  </h4>
                  <span className="tw-font-bold">{senddata?.chronopost}€</span>
                </div>
                <span className="tw-text-sm tw-font-light tw-text-opacity-50">
                  {shipping?.country === "FR" ||
                  sendadress?.adress === "" ||
                  sendadress?.name === ""
                    ? "dans un délai de 1 à 2 jours ouvrables"
                    : ""}
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="lname">
                  Nom<span className="text-danger">*</span>
                  <span className="text-danger tw-text-sm">
                    {formerror.name === "lastname" ? formerror.msg : ""}
                  </span>
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="lastname"
                  placeholder="Nom"
                  maxLength={40}
                  {...register("lastname")}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="fname">
                  Prénom<span className="text-danger">*</span>
                  <span className="text-danger tw-text-sm">
                    {formerror.name === "firstname" ? formerror.msg : ""}
                  </span>
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  name="firstname"
                  id="firstname"
                  placeholder="Prénom"
                  maxLength={40}
                  {...register("firstname")}
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="email">
                  E-mail <span className="text-danger">*</span>{" "}
                  <span className="text-danger tw-text-sm">
                    {errors?.email?.message}
                  </span>
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  maxLength={100}
                  {...register("email", {
                    pattern: {
                      value:
                        /^[A-Z0-9._%+-]{3,}@(hotmail|gmail|yahoo|outlook|aol|icloud|zoho|protonmail|gmx|yandex|mail|tutanota|fastmail|hushmail|lycos|rackspace|zimbra|squirrelmail|roundcube|163|qq)\.(com|net|org|edu)$/i,
                      message: "E-mail incorrect",
                    },
                  })}
                  required
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <label htmlFor="phone">
                  Télephone<span className="text-danger">*</span>
                  <span className="text-danger tw-text-sm">
                    {formerror.name === "tel" ? formerror.msg : ""}
                  </span>
                </label>
                <PhoneInput
                  international
                  placeholder="Télephone"
                  id="phone"
                  defaultCountry="FR"
                  className="form-control tw-min-h-[45px]"
                  value={tel}
                  maxLength={18}
                  onChange={setTel}
                />
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12  tw-mb-6">
              <div className="check-heading">
                <h5 className="tw-mb-2 tw-font-bold">
                  Votre adresse de livraison
                </h5>
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
              <div className="tw-flex tw-w-full tw-justify-between tw-mr-3 tw-items-center tw-mb-4">
                <span className="text-danger">
                  {formerror.name === "address" ? formerror.msg : ""}
                </span>
                <div>
                  <input
                    type="checkbox"
                    name="checkbox2"
                    className="tw-w-4 tw-h-4"
                    checked={checkbill}
                    onChange={(e) => {
                      if (e.target.checked === true) {
                        setBillAdress({ ...sendadress });
                      }
                      setCheckBill(e.target.checked);
                    }}
                  />
                  <span className="tw-font-bold tw-ml-2 tw-text-blue-700">
                    Envoyer la facture a la même adresse
                  </span>
                </div>
              </div>
            </div>

            {checkbill === true && (
              <>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-bg-slate-100 tw-pb-4">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-py-4 tw-font-bold">
                      Adresse de livraison
                    </div>
                    {user && user !== null && user?.Address?.length < 4 && (
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
                        <div
                          className="tw-border-[3px] tw-h-32 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-cursor-pointer hover:tw-bg-slate-300"
                          onClick={() =>
                            setAdressModal({ check: true, bill: false })
                          }
                        >
                          <FaPlus size={26} />
                          <span className="tw-font-bold tw-text-center">
                            Ajouter/Modifier <br /> une adresse de livraison
                          </span>
                        </div>
                      </div>
                    )}
                    {user === null && (
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
                        <div
                          className="tw-border-[3px] tw-h-32 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-cursor-pointer hover:tw-bg-slate-300"
                          onClick={() =>
                            setAdressModal({ check: true, bill: false })
                          }
                        >
                          <FaPlus size={26} />
                          <span className="tw-font-bold tw-text-center">
                            Ajouter/Modifier <br /> une adresse de livraison
                          </span>
                        </div>
                      </div>
                    )}

                    {user === null && sendadress?.name !== "" && (
                      <div className="col-lg-6 col-md-12 col-sm-12 col-12 ">
                        <div className=" tw-border-[3px] tw-border-black tw-min-h-32 tw-flex tw-flex-col tw-pl-3 tw-pt-4 tw-gap-3 tw-cursor-pointer tw-bg-slate-200 tw-text-sm">
                          <div className="tw-flex tw-items-center tw-gap-3">
                            <FaUser />
                            <span>{sendadress?.name}</span>
                          </div>

                          <div className="tw-flex tw-flex-col">
                            <p className="tw-break-words tw-mr-12 tw-text-sm">
                              {sendadress?.adress}
                            </p>

                            <p className="tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                              <span>{sendadress?.state}</span> /
                              <span>
                                {getCountryFullName(sendadress?.country)}
                              </span>
                              <span className="tw-ml-2">
                                {sendadress?.zipcode}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {user &&
                      user !== null &&
                      user.Address?.length > 0 &&
                      user.Address?.map((item) => {
                        return (
                          <div
                            className="col-lg-6 col-md-12 col-sm-12 col-12 tw-mb-3"
                            key={item?.id}
                          >
                            <div
                              className={`tw-border-[3px]  tw-min-h-32 tw-flex tw-flex-col tw-pl-3 tw-pt-4 tw-gap-3 tw-cursor-pointer  tw-text-sm ${
                                sendadress?.id === item?.id
                                  ? "tw-border-black tw-bg-slate-200"
                                  : ""
                              }`}
                              onClick={() => {
                                setSendAdress(item);
                                setBillAdress(item);
                              }}
                            >
                              <div className="tw-flex tw-items-center tw-gap-3">
                                <FaUser />
                                <span>{item?.name}</span>
                              </div>
                              <div className="tw-flex tw-flex-col">
                                <p className=" tw-break-words tw-mr-12 tw-text-sm">
                                  {item?.adress}
                                </p>
                                <p className=" tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                                  <span>{item?.state}</span> /
                                  <span>
                                    {getCountryFullName(item?.country)}
                                  </span>
                                  <span className="tw-ml-2">
                                    {item?.zipcode}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            )}

            {checkbill === false && (
              <>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-bg-slate-100 tw-py-4">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 tw-font-bold tw-pb-4">
                      Adresse de livraison
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 tw-font-bold tw-pb-4 tw-hidden lg:tw-block">
                      Adresse de facturation
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 tw-border-b-[2.5px] tw-border-blue-600 tw-mb-2 lg:tw-mb-0 lg:tw-border-b-0    ">
                      <div className="row no-gutters">
                        {user && user !== null && user?.Address?.length < 4 && (
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div
                              className="tw-border-[3px] tw-h-32 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-cursor-pointer hover:tw-bg-slate-300"
                              onClick={() =>
                                setAdressModal({ check: true, bill: false })
                              }
                            >
                              <FaPlus size={26} />
                              <span className="tw-font-bold">
                                Ajouter une nouvelle adresse
                              </span>
                            </div>
                          </div>
                        )}
                        {!user && user === null && (
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div
                              className="tw-border-[3px] tw-h-32 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-cursor-pointer hover:tw-bg-slate-300"
                              onClick={() =>
                                setAdressModal({ check: true, bill: false })
                              }
                            >
                              <FaPlus size={26} />
                              <span className="tw-font-bold tw-text-center">
                                Ajouter/Modifier <br /> une adresse de livraison
                              </span>
                            </div>
                          </div>
                        )}

                        {user === null && sendadress?.name !== "" && (
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div className="tw-border-[3px] tw-border-black tw-min-h-32 tw-flex tw-flex-col tw-pl-3 tw-pt-4 tw-gap-3 tw-cursor-pointer tw-bg-slate-200 tw-text-sm">
                              <div className="tw-flex tw-items-center tw-gap-3">
                                <FaUser />
                                <span>{sendadress?.name}</span>
                              </div>

                              <div className="tw-flex tw-flex-col">
                                <p className=" tw-break-words tw-mr-12 tw-text-sm">
                                  {sendadress?.adress}
                                </p>

                                <p className=" tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                                  <span>{sendadress?.state}</span> /
                                  <span>
                                    {getCountryFullName(sendadress?.country)}
                                  </span>
                                  <span className="tw-ml-2">
                                    {sendadress?.zipcode}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {user &&
                          user !== null &&
                          user?.Address?.length > 0 &&
                          user?.Address?.map((item) => {
                            return (
                              <div
                                className="col-lg-12 col-md-12 col-sm-12 col-12 tw-mb-2"
                                key={item?.id}
                              >
                                <div
                                  className={`tw-border-[3px]  tw-min-h-32 tw-flex tw-flex-col tw-pl-3 tw-pt-4 tw-gap-3 tw-cursor-pointer  tw-text-sm ${
                                    sendadress.id === item?.id
                                      ? "tw-border-black tw-bg-slate-200"
                                      : ""
                                  }`}
                                  onClick={() => setSendAdress(item)}
                                >
                                  <div className="tw-flex tw-items-center tw-gap-3">
                                    <FaUser />
                                    <span>{item?.name}</span>
                                  </div>

                                  <div className="tw-flex tw-flex-col">
                                    <p className="tw-break-words tw-mr-12 tw-text-sm">
                                      {item?.adress}
                                    </p>

                                    <p className="tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                                      <span>{item?.state}</span> /
                                      <span>
                                        {getCountryFullName(item?.country)}
                                      </span>
                                      <span className="tw-ml-2">
                                        {item?.zipcode}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                      <div className="row tw-block lg:tw-hidden tw-font-bold tw-pb-4">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                          Adresse de facturation
                        </div>
                      </div>
                      <div className="row">
                        {user && user !== null && user?.Address?.length < 4 && (
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div
                              className="tw-border-[3px] tw-h-32 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-cursor-pointer hover:tw-bg-slate-300"
                              onClick={() =>
                                setAdressModal({ check: true, bill: false })
                              }
                            >
                              <FaPlus size={26} />
                              <span className="tw-font-bold">
                                Ajouter une nouvelle adresse
                              </span>
                            </div>
                          </div>
                        )}
                        {user === null && (
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div
                              className="tw-border-[3px] tw-h-32 tw-flex tw-flex-col tw-items-center tw-justify-center tw-gap-3 tw-cursor-pointer hover:tw-bg-slate-300"
                              onClick={() =>
                                setAdressModal({ check: true, bill: true })
                              }
                            >
                              <FaPlus size={26} />
                              <span className="tw-font-bold tw-text-center">
                                Ajouter/Modifier <br /> une adresse de
                                facturation
                              </span>
                            </div>
                          </div>
                        )}

                        {user === null && billadress?.name !== "" && (
                          <div className="col-lg-12 col-md-12 col-sm-12 col-12 ">
                            <div className="tw-border-[3px]  tw-min-h-32 tw-flex tw-flex-col tw-pl-3 tw-pt-4 tw-gap-3  tw-border-blue-600 tw-cursor-pointer tw-bg-slate-300 tw-text-sm">
                              <div className="tw-flex tw-items-center tw-gap-3">
                                <FaUser />
                                <span>{billadress?.name}</span>
                              </div>

                              <div className="tw-flex tw-flex-col">
                                <p className="tw-break-words tw-mr-12 tw-text-sm">
                                  {billadress?.adress}
                                </p>
                                <p className="tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                                  <span>{billadress?.state}</span> /
                                  <span>
                                    {getCountryFullName(billadress?.country)}
                                  </span>
                                  <span className="tw-ml-2">
                                    {billadress?.zipcode}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {user !== null &&
                          user?.Address?.length > 0 &&
                          user?.Address?.map((item) => {
                            return (
                              <div
                                className="col-lg-12 col-md-12 col-sm-12 col-12 tw-mb-2"
                                key={item?.id}
                              >
                                <div
                                  className={`tw-border-[3px]  tw-min-h-32 tw-flex tw-flex-col tw-pl-3 tw-pt-4 tw-gap-3 tw-cursor-pointer  tw-text-sm ${
                                    billadress?.id === item?.id
                                      ? "tw-border-blue-700 tw-bg-slate-200"
                                      : ""
                                  }`}
                                  onClick={() => setBillAdress(item)}
                                >
                                  <div className="tw-flex tw-items-center tw-gap-3">
                                    <FaUser />
                                    <span>{item?.name}</span>
                                  </div>

                                  <div className="tw-flex tw-flex-col">
                                    <p className="tw-break-words tw-mr-12 tw-text-sm">
                                      {item?.adress}
                                    </p>

                                    <p className="tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                                      <span>{item?.state}</span> /
                                      <span>
                                        {getCountryFullName(item?.country)}
                                      </span>
                                      <span className="tw-ml-2">
                                        {item?.zipcode}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-mt-3">
              <div className="form-group">
                <label htmlFor="messages">Note Supplémentaire</label>
                <textarea
                  rows="5"
                  className="form-control"
                  id="messages"
                  placeholder="Saisissez votre note"
                  {...register("note")}
                ></textarea>
              </div>
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-flex tw-justify-end">
              <button
                className="theme-btn-one btn-black-overlay btn_md tw-bg-black "
                type="submit"
                onClick={() => {
                  ReactGA.event({
                    category: "event",
                    action: "SatınAlGitti",
                    label: "Kullanıcı Bilgilerini Girdi Satın Almaya gitti",
                  });
                }}
              >
                Continuer
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Info;
