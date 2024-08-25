import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
const BannerBSet = (props) => {
  const { settings } = props;
  const { handleSubmit } = useForm();
  const [video, setVideo] = useState(null);
  const [check, setCheck] = useState(settings?.bannerb1?.check);

  const onSubmit = async () => {
    const formData = {
      imageid: video === null ? null : video.public_id,
      imageurl: video === null ? null : video.secure_url,
      check: check,
    };
    await axios
      .post("/api/settings/bannerb1", formData)
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
            Videoyu Yükledikten sonra Lütfen Kaydet e Basınız...
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label className="tw-mr-4">
              Video Yükle<span className="text-danger">*</span> (1920x420)
            </label>
            <CldUploadWidget
              signatureEndpoint="/api/sign-cloudinary-params"
              onSuccess={(result) => {
                setVideo(result?.info);
              }}
              uploadPreset="nilrio_bannerb"
              options={{
                maxFiles: 1,
              }}
            >
              {({ open }) => {
                function handleOnClick() {
                  setVideo(null);
                  open();
                }

                return (
                  <button
                    type="button"
                    className="form-control"
                    onClick={handleOnClick}
                  >
                    Video Yükle
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group tw-flex tw-flex-col">
            <label htmlFor="indirim_etkin">
              Video Göster
              <span className="text-danger">*</span>
            </label>
            <select
              id="btncheck"
              value={check}
              onChange={(e) => setCheck(e.target.value)}
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
  );
};

export default BannerBSet;
