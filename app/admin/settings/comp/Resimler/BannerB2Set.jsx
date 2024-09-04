import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
const BannerB2Set = (props) => {
  const { settings } = props;
  const { handleSubmit } = useForm();
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [check1, setCheck1] = useState(settings?.bannerb3?.image1?.check);
  const [check2, setCheck2] = useState(settings?.bannerb3?.image2?.check);
  const [check3, setCheck3] = useState(settings?.bannerb3?.image3?.check);
  const [check4, setCheck4] = useState(settings?.bannerb3?.image4?.check);
  const [image1url, setImage1Url] = useState(settings?.bannerb3?.image1?.url);
  const [image2url, setImage2Url] = useState(settings?.bannerb3?.image2?.url);
  const [image3url, setImage3Url] = useState(settings?.bannerb3?.image3?.url);
  const [image4url, setImage4Url] = useState(settings?.bannerb3?.image4?.url);
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
      image3: {
        imageid: image3 === null ? null : image3.public_id,
        imageurl: image3 === null ? null : image3.secure_url,
        check: check3,
        url: image3url,
      },
      image4: {
        imageid: image4 === null ? null : image4.public_id,
        imageurl: image4 === null ? null : image4.secure_url,
        check: check4,
        url: image4url,
      },
    };

    await axios
      .post("/api/settings/bannerb3", formData)
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
              Resim-1 Yükle<span className="text-danger">*</span>
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
                    Resim1 Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group tw-flex tw-flex-col">
            <label htmlFor="indirim_etkin">
              Resim-1 Göster
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
              Resim-2 Yükle<span className="text-danger">*</span>
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
                    Resim2 Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group tw-flex tw-flex-col">
            <label htmlFor="indirim_etkin">
              Resim-2 Göster
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
        <div className="col-lg-4">
          <div className="fotm-group">
            <label className="tw-mr-4">
              Resim-3 Yükle<span className="text-danger">*</span>
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result) => {
                setImage3(result?.info);
              }}
              uploadPreset="nilrio_banner"
              options={{
                maxFiles: 1,
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  setImage3(null);
                  open();
                }

                return (
                  <button
                    type="button"
                    className="form-control"
                    onClick={handleOnClick}
                  >
                    Resim3 Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group tw-flex tw-flex-col">
            <label htmlFor="indirim_etkin">
              Resim-3 Göster
              <span className="text-danger">*</span>
            </label>
            <select
              id="btncheck"
              value={check3}
              onChange={(e) => setCheck3(e.target.value)}
            >
              <option value="false">Hayır</option>
              <option value="true">Evet</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label htmlFor="product_name">
              Resim-3 Url<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Resim-3 Url"
              value={image3url}
              onChange={(e) => setImage3Url(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label className="tw-mr-4">
              Resim-4 Yükle<span className="text-danger">*</span>
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result) => {
                setImage4(result?.info);
              }}
              uploadPreset="nilrio_banner"
              options={{
                maxFiles: 1,
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  setImage4(null);
                  open();
                }

                return (
                  <button
                    type="button"
                    className="form-control"
                    onClick={handleOnClick}
                  >
                    Resim4 Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group tw-flex tw-flex-col">
            <label htmlFor="indirim_etkin">
              Resim-4 Göster
              <span className="text-danger">*</span>
            </label>
            <select
              id="btncheck"
              value={check4}
              onChange={(e) => setCheck4(e.target.value)}
            >
              <option value="false">Hayır</option>
              <option value="true">Evet</option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label htmlFor="product_name">
              Resim-4 Url<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Resim-4 Url"
              value={image4url}
              onChange={(e) => setImage4Url(e.target.value)}
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

export default BannerB2Set;
