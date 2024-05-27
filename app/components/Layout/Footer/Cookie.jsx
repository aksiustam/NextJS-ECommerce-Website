"use client";

import { TbCookie } from "react-icons/tb";
import Modal from "react-bootstrap/Modal";
import { TiTimes } from "react-icons/ti";
import { useState } from "react";
import { useForm } from "react-hook-form";
import setCookies from "@/app/actions/setCookies";
import Image from "next/image";

const CookiePage = () => {
  const [cookiemodal, setCookieModal] = useState(false);
  const { register, handleSubmit } = useForm();

  const DeclineCookie = () => {
    setCookies({ gacheck: false, advertcheck: false });
  };
  const AcceptCookie = async () => {
    setCookies({ gacheck: true, advertcheck: true });
  };
  const onSubmit = async (data) => {
    setCookies({ gacheck: data.gacheck, advertcheck: data.advertcheck });
    setCookieModal(false);
  };
  return (
    <>
      <Modal
        show={cookiemodal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setCookieModal(false)}
      >
        <Modal.Body className="tw-bg-slate-200">
          <div className="container tw-relative">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row tw-border-b-2 tw-border-slate-500">
                <div className="col-12 tw-flex tw-justify-center">
                  <Image
                    src={"/assets/img/logo-siyah.png"}
                    alt="Nilrio Logo"
                    width={100}
                    height={100}
                    loading="eager"
                    className="tw-w-[50px] tw-h-[50px] lg:tw-w-[90px] lg:tw-h-[90px] tw-object-contain"
                  />
                </div>
              </div>
              <div className="row tw-mt-1">
                <div
                  className="tw-absolute tw-right-0 -tw-top-2 tw-z-30 tw-cursor-pointer"
                  onClick={() => {
                    setCookieModal(false);
                  }}
                >
                  <TiTimes size={32} />
                </div>

                <div className="col-12 tw-mb-2">
                  <h3 className="tw-font-bold tw-text-xl tw-mb-4 tw-text-center">
                    Gérer Les Préférences
                  </h3>
                  <label className="checkbox-default checkbox-default-more-text">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="tw-w-4 tw-h-4"
                      checked={true}
                      {...register("checked")}
                    />
                    <span className="pl-2 tw-font-bold">
                      Cookies Obligatoires
                    </span>
                  </label>

                  <p className="tw-text-xs">
                    &emsp;Les cookies nécessaires, qui activent des fonctions de
                    base telles que la navigation de page et l&apos;accès aux
                    zones sécurisées du site web, sont essentiels pour rendre un
                    site web utilisable. Sans ces cookies, le site web ne peut
                    pas fonctionner correctement. De plus, ces cookies sont
                    utilisés pour vous offrir une expérience plus personnalisée
                    sur notre site Web et pour mémoriser les choix que vous
                    faites lors de son utilisation.
                  </p>
                </div>
                <div className="col-12 tw-mb-2">
                  <label className="checkbox-default checkbox-default-more-text">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="tw-w-4 tw-h-4"
                      {...register("gacheck")}
                    />
                    <span className="pl-2 tw-font-bold">Analytique</span>
                  </label>

                  <p className="tw-text-xs">
                    &emsp;Ces cookies d&apos;analyse nous permettent
                    d&apos;améliorer l&apos;ergonomie du site en analysant
                    anonymement l&apos;utilisation des visiteurs. Ils
                    identifient aussi des produits que nous pouvons recommander.
                  </p>
                </div>

                <div className="col-12 tw-mb-2">
                  <label className="checkbox-default checkbox-default-more-text">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="tw-w-4 tw-h-4"
                      {...register("advertcheck")}
                    />
                    <span className="pl-2 tw-font-bold">Marketing</span>
                  </label>

                  <p className="tw-text-xs">
                    &emsp;Ces cookies récupèrent des informations pour mieux
                    cibler les publicités en fonction de vos centres
                    d&apos;intérêt. Les données sont récupérées de manière
                    anonyme et ne contiennent pas d&apos;informations
                    personnelles que vous auriez pu nous communiquer.
                  </p>
                </div>
                <div className="col-12 tw-mt-6 tw-flex tw-flex-row tw-justify-center">
                  <button
                    type="submit"
                    className="btn theme-btn-one btn_sm mr-2  tw-font-bold tw-text-slate-700  tw-border-[3px] tw-border-slate-900 tw-rounded-xl hover:tw-text-slate-600 hover:tw-bg-slate-400 tw-whitespace-nowrap"
                  >
                    Confirmez Mes Choix
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <div className="cookie-bar tw-bottom-0">
        <div className="tw-flex tw-flex-col tw-mr-8">
          <div className="tw-flex tw-gap-3">
            <TbCookie size={25} color="white" />
            <h5 className="tw-text-lg tw-font-bold tw-text-white tw-mb-2">
              Ce Site Web Utilise Des Cookies
            </h5>
          </div>
          <p className="tw-text-sm tw-my-2">
            Pour améliorer votre expérience sur notre site et vous proposer des
            services adaptés, nous utilisons des cookies. Si vous donnez votre
            accord, nous utiliserons également des cookies publicitaires et
            analytiques ainsi que des cookies pour les utilisateurs.{" "}
            <span
              className="tw-text-blue-300 tw-underline tw-cursor-pointer"
              onClick={() => setCookieModal(true)}
            >
              Gérer vos cookies
            </span>
          </p>
        </div>

        <button
          onClick={DeclineCookie}
          type="button"
          className=" tw-py-3 tw-px-2 ml-2 tw-text-[12px] tw-font-bold tw-capitalize tw-underline tw-underline-offset-2 tw-text-white tw-whitespace-nowrap hover:tw-text-slate-400 "
        >
          Continuer sans accepter
        </button>
        <button
          onClick={AcceptCookie}
          type="button"
          className="btn theme-btn-one btn_sm mr-2 ml-4 tw-text-xs tw-font-bold tw-text-white  tw-border-[2px] tw-border-slate-200 tw-rounded-xl hover:tw-text-slate-400 hover:tw-bg-slate-950"
        >
          Accepter
        </button>
      </div>
    </>
  );
};

export default CookiePage;
