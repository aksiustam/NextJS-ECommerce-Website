import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
const BannerB1Set = (props) => {
  const { settings } = props;
  const { handleSubmit } = useForm();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const [check1, setCheck1] = useState(settings?.bannerb2?.image1?.check);
  const [check2, setCheck2] = useState(settings?.bannerb2?.image2?.check);
  const [image1url, setImage1Url] = useState(settings?.bannerb2?.image1?.url);
  const [image2url, setImage2Url] = useState(settings?.bannerb2?.image2?.url);
  const onSubmit = async () => {
    const formData = {
      image1: {
        imageid: image1 === null ? null : image1.public_id,
        imageurl: image1 === null ? null : image1.secure_url,
        check: check1,
        url: image1url,
      },
      image2: {
        imageid: image2 === null ? null : image2.public_id,
        imageurl: image2 === null ? null : image2.secure_url,
        check: check2,
        url: image2url,
      },
    };
    console.log(formData);
    await axios
      .post("/api/settings/bannerb2", formData)
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
            Resmi Yükledikten sonra Lütfen Kaydet e Basınız...
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label className="tw-mr-4">
              Resim SOL Yükle<span className="text-danger">*</span>
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result) => {
                setImage1(result?.info);
              }}
              uploadPreset="nilrio_banner"
              options={{
                maxFiles: 1,
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  setImage1(null);
                  open();
                }

                return (
                  <button
                    type="button"
                    className="form-control"
                    onClick={handleOnClick}
                  >
                    Resim Sol Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group tw-flex tw-flex-col">
            <label htmlFor="indirim_etkin">
              Resim SOL Göster
              <span className="text-danger">*</span>
            </label>
            <select
              id="btncheck"
              value={check1}
              onChange={(e) => setCheck1(e.target.value)}
            >
              <option value="false">Hayır</option>
              <option value="true">Evet</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label htmlFor="product_name">
              Resim-1 Url<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Resim-1 Url"
              value={image1url}
              onChange={(e) => setImage1Url(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label className="tw-mr-4">
              Resim SAĞ Yükle<span className="text-danger">*</span>
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result) => {
                setImage2(result?.info);
              }}
              uploadPreset="nilrio_banner"
              options={{
                maxFiles: 1,
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  setImage2(null);
                  open();
                }

                return (
                  <button
                    type="button"
                    className="form-control"
                    onClick={handleOnClick}
                  >
                    Resim Sağ Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group tw-flex tw-flex-col">
            <label htmlFor="indirim_etkin">
              Resim SAĞ Göster
              <span className="text-danger">*</span>
            </label>
            <select
              id="btncheck"
              value={check2}
              onChange={(e) => setCheck2(e.target.value)}
            >
              <option value="false">Hayır</option>
              <option value="true">Evet</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label htmlFor="product_name">
              Resim-2 Url<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Resim-2 Url"
              value={image2url}
              onChange={(e) => setImage2Url(e.target.value)}
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

export default BannerB1Set;
