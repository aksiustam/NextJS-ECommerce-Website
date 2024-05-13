"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ReactGA from "react-ga4";
import setUserPass from "@/app/actions/User/setUserPass";

const PassClient = (props) => {
  const { user } = props;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    ReactGA.event({
      category: "event",
      action: "Şifre Değiştirdi",
      label: "Şifresini Değiştirdi",
    });
    const formData = {
      id: user.id,
      pastpass: data.pastpass,
      pass: data.pass,
      repass: data.repass,
    };
    const res = await setUserPass(formData);
    if (res === true) {
      await Swal.fire(
        "Succès",
        "Vos informations ont été mise a jour.",
        "success"
      );
      location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: res.message,
      });
    }
  };
  return (
    <>
      <div className="myaccount-content">
        <div className="save_button mt-3 d-flex align-items-center justify-content-between">
          <h4 className="title">Mon mot de passe</h4>
        </div>
        <div>
          {Object.keys(errors).map((fieldName, index) => (
            <div key={index} className="tw-text-red-900  tw-text-sm">
              {errors[fieldName].message}
            </div>
          ))}
        </div>
        <div className="login_form_container">
          <div className="account_details_form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="default-form-box mb-20">
                <label>Ancien mot de passe *</label>
                <input
                  type="password"
                  className="form-control tw-max-w-96"
                  id="current_password"
                  required
                  {...register("pastpass", {
                    required: "Remplissez le mot de passe",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                      message:
                        "Le mot de passe doit contenir au moins 6 caractère contenant au moins 1 majuscule, 1 minuscule et 1 chiffre.",
                    },
                  })}
                />
              </div>
              <div className="default-form-box mb-20">
                <label>Nouveau mot de passe *</label>
                <input
                  type="password"
                  className="form-control tw-max-w-96"
                  id="new_password"
                  required
                  {...register("pass", {
                    required: "Remplissez le mot de passe",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                      message:
                        "Le mot de passe doit contenir au moins 6 caractère contenant au moins 1 majuscule, 1 minuscule et 1 chiffre.",
                    },
                  })}
                />
              </div>
              <div className="default-form-box mb-20">
                <label>Confirmation du nouveau mot de passe *</label>
                <input
                  type="password"
                  className="form-control tw-max-w-96"
                  id="re_password"
                  required
                  {...register("repass", {
                    required: "Remplissez le mot de passe",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                      message:
                        "Le mot de passe doit contenir au moins 6 caractère contenant au moins 1 majuscule, 1 minuscule et 1 chiffre.",
                    },
                  })}
                />
              </div>

              <button
                type="submit"
                className="theme-btn-one btn_sm tw-bg-black tw-text-white"
              >
                Mise à jour
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PassClient;
