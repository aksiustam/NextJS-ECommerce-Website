import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
const BannerBSet = () => {
  const { handleSubmit } = useForm();
  const [video, setVideo] = useState(null);

  const onSubmit = async () => {
    const formData = { imageid: video.public_id, imageurl: video.secure_url };
    await axios
      .post("/api/settings/bannerb", formData)
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
