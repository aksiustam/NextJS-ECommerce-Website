"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import setSettings from "../../../actions/Settings/setSettings";
import { CldUploadWidget } from "next-cloudinary";

const SettingsClient = (props) => {
  const { settings } = props;
  const [mail, setMail] = useState(settings?.settings?.mailto);
  const [cimage, setCImage] = useState([]);
  const onSubmit = async () => {
    const data = cimage.map((item) => {
      return { imageid: item.public_id, imageurl: item.secure_url };
    });
    const formData = { tailimage: data, mailto: mail };
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
      <div className="col-lg-12 tw-mt-4">
        <div className="tw-flex tw-flex-row tw-space-x-4 mb-4">
          <div className="fotm-group">
            <label className="tw-mr-4">
              Boyutlar Resimlerini Yükle<span className="text-danger">*</span>
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result) => {
                setCImage((prev) => {
                  const data = prev || [];
                  return [...data, { ...result?.info }];
                });
              }}
              uploadPreset="nilrio_banner"
            >
              {({ open }) => {
                function handleOnClick() {
                  setCImage([]);
                  open();
                }

                return (
                  <button
                    type="button"
                    className="form-control"
                    onClick={handleOnClick}
                  >
                    Boyutlar Resimleri Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
      </div>
      <div className="col-lg-4 ">
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
