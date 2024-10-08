"use client";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import { CldUploadWidget } from "next-cloudinary";
const IndirimYeriClient = (props) => {
  const { settings } = props;
  const data = settings?.discountpage;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      bannerAlt: data?.bannerAlt,
      bannerUst: data?.bannerUst,
      buttonUrl: data?.buttonUrl,
      buttonName: data?.buttonName,
      checkbox: data?.checkbox,
      date: data?.date,
    },
  });
  const [image, setImage] = useState(null);
  const onSubmit = async (data) => {
    let formData = { ...data, discres: null };
    if (image !== null) {
      formData = {
        ...formData,
        discres: { imageid: image.public_id, imageurl: image.secure_url },
      };
    }
    await axios
      .post("/api/settings/discountpage", formData)
      .then(async () => {
        await Swal.fire({
          icon: "success",
          title: "Başarıyla Güncellendi",
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
    <form
      className="add_product_form tw-mt-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="tw-text-red-600 tw-underline tw-mb-2">
            Resmi Yükledikten sonra Lütfen Kaydet e Basınız...{" "}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <Form.Label htmlFor="exampleColorInput">Banner Rengi</Form.Label>
            <Form.Control
              type="color"
              id="colorid"
              defaultValue={data?.bannerColor}
              {...register("bannerColor")}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label className="tw-mr-4">
              Arka Plan Resmi<span className="text-danger">*</span> (1920x900)
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
                    Resim Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label htmlFor="product_name">
              Banner Üst<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Banner İsmi Ust"
              {...register("bannerUst")}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label htmlFor="product_name">
              Banner Alt<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Banner İsmi Alt"
              {...register("bannerAlt")}
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
              {...register("buttonName")}
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
              {...register("buttonUrl")}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group tw-flex tw-flex-col">
            <label htmlFor="indirim_etkin">
              Anasayfa İndirimi Etkinleştir
              <span className="text-danger">*</span>
            </label>
            <select
              name="checkbox"
              id="indirim_etkin"
              {...register("checkbox")}
              required
            >
              <option value="false">Hayır</option>
              <option value="true">Evet</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label htmlFor="product_available">
              İndirim Zamanı<span className="text-danger">*</span>
            </label>
            <input
              type="date"
              id="product_available"
              className="form-control"
              {...register("date")}
              required
            />
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
  );
};

export default IndirimYeriClient;
