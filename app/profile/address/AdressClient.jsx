"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { TiTimes } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import ReactGA from "react-ga4";
import setUserAddress from "@/app/actions/User/setUserAddress";

const AdressClient = (props) => {
  const { user } = props;
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  const [checkcategory, setCheckCategory] = useState(false);
  const [adressmodal, setAdressModal] = useState(false);
  const [modalmsg, setModalMsg] = useState({ msg: "", btncheck: false });

  const openModal = (data) => {
    if (data.category === "PRIVATE") {
      setCheckCategory(false);
    } else {
      setCheckCategory(true);
    }
    reset({
      name: data?.name || "",
      adress: data?.adress || "",
      state: data?.state || "",
      country: data?.country || "",
      zipcode: data?.zipcode || "",
      company: data?.company || "",
      companytva: data?.companytva || "",
      id: data?.id || "",
    });
    setAdressModal(true);
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

    return countryData[countryCode] || "Ülke bulunamadı";
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      category: checkcategory ? "COMPANY" : "PRIVATE",
    };
    ReactGA.event({
      category: "event",
      action: "Adresini Değiştirdi",
      label: "Adresini Değiştirdi",
    });
    await setUserAddress(formData);

    setModalMsg({
      msg: "Vos informations ont été mise a jour avec succes.",
      btncheck: true,
    });
    setTimeout(() => {
      location.reload();
      setAdressModal(false);
      setModalMsg({
        msg: "Vos informations ont été mise a jour avec succes.",
        btncheck: false,
      });
    }, 1200);
  };

  return (
    <>
      <Modal
        show={adressmodal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setAdressModal(false)}
      >
        <Modal.Body>
          <div className="container">
            <form id="account_info_form" onSubmit={handleSubmit(onSubmit)}>
              <div className="row tw-relative tw-mt-3">
                <div
                  className="tw-absolute tw-right-0  -tw-top-5 tw-z-30 tw-cursor-pointer"
                  onClick={() => {
                    setAdressModal(false);
                  }}
                >
                  <TiTimes size={32} />
                </div>

                <input type="text" name="adressid" {...register("id")} hidden />
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label htmlFor="fadress" className="tw-font-bold">
                      Adresse Name
                      <span className="text-danger">*</span>{" "}
                      {errors.name && errors.name.type === "minLength" && (
                        <span className="tw-text-red-600">
                          Veuillez saisir un titre pour votre adresse
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="adressname"
                      placeholder="Entrez votre adresse name"
                      maxLength={15}
                      {...register("name", { minLength: 2 })}
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
                          defaultChecked={!checkcategory}
                          onChange={(e) => {
                            setCheckCategory(false);
                          }}
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
                          defaultChecked={checkcategory}
                          onChange={(e) => {
                            setCheckCategory(true);
                          }}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>

                {checkcategory && (
                  <>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form-group">
                        <label htmlFor="phone">
                          Nom de l’entreprise (facultatif)
                          {errors.company &&
                            errors.company.type === "minLength" && (
                              <span className="tw-text-red-600">
                                Veuillez saisir le nom de l&apos;entreprise.
                              </span>
                            )}
                        </label>

                        <input
                          type="text"
                          className="form-control"
                          id="company"
                          placeholder="Nom de l’entreprise"
                          maxLength={40}
                          {...register("company", { minLength: 3 })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                      <div className="form-group">
                        <label htmlFor="phone">
                          Numéro de TVA (facultatif)
                          {errors.companytva &&
                            errors.companytva.type === "minLength" && (
                              <span className="tw-text-red-600">
                                Veuillez saisir le numero de TVA
                                intracommunautaire
                              </span>
                            )}
                        </label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          id="companytva"
                          placeholder="Saisissez votre numéro de TVA"
                          maxLength={40}
                          {...register("companytva", { minLength: 3 })}
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
                    <label htmlFor="fadress" className="tw-font-bold">
                      Adresse<span className="text-danger">*</span>
                      {errors.adress && errors.adress.type === "minLength" && (
                        <span className="tw-text-red-600">
                          Veuillez saisir votre adresse
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="adress"
                      placeholder="Entrez votre adresse"
                      maxLength={70}
                      {...register("adress", {
                        minLength: 10,
                        pattern: {
                          value: /^[^<>]*$/,
                          message:
                            "L'adresse ne peut pas contenir les caractères '<' ou '>'.",
                        },
                      })}
                      required
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
                      {...register("country")}
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
                      {errors.state && errors.state.type === "minLength" && (
                        <span className="tw-text-red-600">
                          Veuillez saisir la ville
                        </span>
                      )}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="Exemple : Paris"
                      maxLength={20}
                      {...register("state", { minLength: 3 })}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label htmlFor="zip" className="tw-font-bold">
                      Code postal<span className="text-danger">*</span>
                      {errors.zipcode &&
                        errors.zipcode.type === "minLength" && (
                          <span className="tw-text-red-600">
                            Veuillez saisir le code postal
                          </span>
                        )}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Code postal"
                      maxLength={7}
                      {...register("zipcode", { minLength: 5 })}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 tw-flex tw-items-center tw-justify-between">
                  <div className="tw-text-blue-800">{modalmsg.msg}</div>
                  <button
                    className="theme-btn-one tw-bg-black tw-text-white btn_md hover:tw-bg-slate-800 tw-cursor-pointer "
                    type="sumbit"
                    disabled={modalmsg.btncheck}
                  >
                    Changement
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <div className="row">
        <div className="col-lg-12">
          <div className="myaccount-content">
            <h4 className="title">Mes adresses</h4>

            <div className="billing_address row">
              {user &&
                user !== null &&
                user?.Address?.length > 0 &&
                user?.Address?.map((item) => {
                  return (
                    <div
                      className="col-lg-6 col-md-12 col-sm-12 col-12"
                      key={item?.id}
                      onClick={() => {
                        openModal(item);
                      }}
                    >
                      <div
                        className={`tw-border-[3px]  tw-min-h-36 tw-flex tw-flex-col tw-pl-3 tw-pt-4 tw-gap-3 tw-cursor-pointer  tw-text-sm hover:tw-bg-slate-200`}
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
                            <span>{getCountryFullName(item?.country)}</span>
                            <span className="tw-ml-2">{item?.zipcode}</span>
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
  );
};

export default AdressClient;
