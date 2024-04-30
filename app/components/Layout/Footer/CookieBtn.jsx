"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { TiTimes } from "react-icons/ti";
import Modal from "react-bootstrap/Modal";
import setCookies from "@/app/actions/setCookies";

const CookieBtn = (props) => {
  const { getCookie } = props;
  const cookie = JSON.parse(getCookie.value);

  const [cookiemodal, setCookieModal] = useState(false);
  const { register, handleSubmit } = useForm();

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
                  <img
                    src={"/assets/img/logo-siyah.png"}
                    alt="logo"
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
                    base telles que la navigation de page et l'accès aux zones
                    sécurisées du site web, sont essentiels pour rendre un site
                    web utilisable. Sans ces cookies, le site web ne peut pas
                    fonctionner correctement. De plus, ces cookies sont utilisés
                    pour vous offrir une expérience plus personnalisée sur notre
                    site Web et pour mémoriser les choix que vous faites lors de
                    son utilisation.
                  </p>
                </div>
                <div className="col-12 tw-mb-2">
                  <label className="checkbox-default checkbox-default-more-text">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="tw-w-4 tw-h-4"
                      defaultChecked={cookie.gacheck}
                      {...register("gacheck")}
                    />
                    <span className="pl-2 tw-font-bold">Analytique</span>
                  </label>

                  <p className="tw-text-xs">
                    &emsp;Ces cookies d’analyse nous permettent d’améliorer
                    l’ergonomie du site en analysant anonymement l’utilisation
                    des visiteurs. Ils identifient aussi des produits que nous
                    pouvons recommander.
                  </p>
                </div>

                <div className="col-12 tw-mb-2">
                  <label className="checkbox-default checkbox-default-more-text">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="tw-w-4 tw-h-4"
                      defaultChecked={cookie.advertcheck}
                      {...register("advertcheck")}
                    />
                    <span className="pl-2 tw-font-bold">Marketing</span>
                  </label>

                  <p className="tw-text-xs">
                    &emsp;Ces cookies récupèrent des informations pour mieux
                    cibler les publicités en fonction de vos centres d'intérêt.
                    Les données sont récupérées de manière anonyme et ne
                    contiennent pas d'informations personnelles que vous auriez
                    pu nous communiquer.
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
      <div className="tw-relative">
        <div
          className="tw-fixed tw-z-50 tw-bottom-3 tw-left-3 tw-w-[36px] tw-h-[36px] md:tw-w-[50px] md:tw-h-[50px] tw-bg-gray-700 tw-flex tw-items-center tw-justify-center tw-cursor-pointer tw-rounded-lg"
          onClick={() => setCookieModal(true)}
        >
          <IoShieldCheckmarkSharp
            size={
              typeof window !== "undefined"
                ? window.innerWidth >= 768
                  ? 36
                  : 25
                : 25
            }
            color="white"
          />
        </div>
      </div>
    </>
  );
};

export default CookieBtn;
