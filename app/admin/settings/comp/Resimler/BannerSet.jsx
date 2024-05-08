"use client";
import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
const BannerSet = (props) => {
  const { settings } = props;

  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState(null);
  const [bimage, setBImage] = useState([]);
  const onSubmit = async (data) => {
    let formData = { ...data };
    if (image !== null) {
      formData = {
        ...formData,
        banner: { imageid: image.public_id, imageurl: image.secure_url },
      };
    }
    if (bimage.length > 0) {
      const banneryan = bimage.map((item) => {
        return { imageid: item.public_id, imageurl: item.secure_url };
      });
      formData = {
        ...formData,
        banneryan: banneryan,
      };
    }

    await axios
      .post("/api/settings/banner", formData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Başarıyla Kaydedildi",
          showConfirmButton: false,
          timer: 1500,
        });
        location.reload();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: JSON.stringify(error.response.data),
        });
      });
  };

  return (
    <>
      <form
        className="add_product_form tw-mt-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="row">
          <div className="col-lg-4">
            <div className="fotm-group">
              <Form.Label htmlFor="exampleColorInput">Banner Rengi</Form.Label>
              <Form.Control
                type="color"
                id="colorid"
                defaultValue={settings?.banner?.bannercolor}
                {...register("bannercolor")}
              />
            </div>
          </div>
          <div className="col-lg-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
            <label className="tw-mr-4">
              Banner Resim<span className="text-danger">*</span> (1920x850)
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result) => {
                setImage(result?.info);
              }}
              uploadPreset="nilrio_banner"
              options={{
                maxFiles: 1,
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  setImage(null);
                  open();
                }

                return (
                  <button
                    type="button"
                    className="form-control"
                    onClick={handleOnClick}
                  >
                    Banner Resim Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
          <div className="col-lg-4 tw-flex tw-flex-col tw-items-center tw-justify-center">
            <label className="tw-mr-4">
              Banner Yan Resmi<span className="text-danger">*</span> (1920x850)
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result) => {
                setBImage((prev) => {
                  const data = prev || [];
                  return [...data, { ...result?.info }];
                });
              }}
              uploadPreset="nilrio_banner"
              options={{
                maxFiles: 3,
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  setBImage(null);
                  open();
                }

                return (
                  <button
                    type="button"
                    className="form-control"
                    onClick={handleOnClick}
                  >
                    BannerYan Resmi Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
          <div className="col-lg-4">
            <div className="fotm-group">
              <label htmlFor="product_name">
                Banner İsmi Üst<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Banner İsmi Ust"
                onBlur={(e) => {
                  register(`bannerUst`, {
                    shouldUnregister: true,
                    value: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="fotm-group">
              <label htmlFor="product_name">
                Banner İsmi Alt<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Banner İsmi Alt"
                onBlur={(e) => {
                  register(`bannerAlt`, {
                    shouldUnregister: true,
                    value: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="fotm-group">
              <label htmlFor="product_name">
                Button Adı<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Button Adı"
                onBlur={(e) => {
                  register(`buttonName`, {
                    shouldUnregister: true,
                    value: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="fotm-group">
              <label htmlFor="product_name">
                Button Url<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Button Url"
                onBlur={(e) => {
                  register(`buttonUrl`, {
                    shouldUnregister: true,
                    value: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="fotm-group tw-flex tw-flex-col">
              <label htmlFor="indirim_etkin">
                Button Göster
                <span className="text-danger">*</span>
              </label>
              <select
                id="btncheck"
                defaultValue={settings?.banner?.btncheck}
                {...register("btncheck")}
              >
                <option value="false">Hayır</option>
                <option value="true">Evet</option>
              </select>
            </div>
          </div>
          <div className="col-lg-12 tw-flex tw-items-center">
            <button
              type="submit"
              className="theme-btn-one  btn_sm tw-bg-black tw-text-white tw-w-full"
            >
              Kaydet
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default BannerSet;
