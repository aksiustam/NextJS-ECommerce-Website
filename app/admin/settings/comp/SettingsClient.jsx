"use client";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import setSettings from "../../../actions/Settings/setSettings";

const SettingsClient = (props) => {
  const { settings } = props;
  const [mail, setMail] = useState(settings?.settings?.mailto);
  const onSubmit = async () => {
    const formData = { mailto: mail };
    await setSettings(formData);
    await Swal.fire({
      icon: "success",
      title: "Başarıyla Güncellendi",
      showConfirmButton: false,
      timer: 1500,
    });
    location.reload();
  };

  return (
    <div className="row">
      <div className="col-lg-4 tw-mt-4">
        <div className="fotm-group">
          <label htmlFor="product_name">
            Siparişlere Gidecek Mail<span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control"
            placeholder="Mail"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
      </div>
      <div className="col-lg-12 tw-flex tw-items-center tw-mt-8">
        <button
          type="button"
          className="theme-btn-one  btn_sm tw-bg-black tw-text-white tw-w-full"
          onClick={onSubmit}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default SettingsClient;
