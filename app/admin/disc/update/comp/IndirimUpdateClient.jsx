"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const IndirimUpdateClient = (props) => {
  const { settings } = props;
  const data = settings?.discountset;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      indirim1: data.indirim1,
      indirim2: data.indirim2,
      indirim3: data.indirim3,
    },
  });

  const onSubmit = async (data) => {
    await axios
      .post(`/api/settings/discountupdate`, data)
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
    <div className="container">
      <form className="add_product_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-4 tw-mt-4">
            <div className="fotm-group">
              <label htmlFor="indirim1">
                İndirim-1 yüzdesi<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="indirim1"
                className="form-control"
                placeholder="indirim1 yüzde"
                {...register("indirim1")}
                required
              />
            </div>
          </div>
          <div className="col-lg-4 tw-mt-4">
            <div className="fotm-group">
              <label htmlFor="indirim2">
                İndirim-2 yüzdesi<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="indirim2"
                className="form-control"
                placeholder="indirim2 yüzde"
                {...register("indirim2")}
                required
              />
            </div>
          </div>
          <div className="col-lg-4 tw-mt-4">
            <div className="fotm-group">
              <label htmlFor="indirim3">
                İndirim-3 yüzdesi<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="indirim3"
                className="form-control"
                placeholder="indirim3 yüzde"
                {...register("indirim3")}
                required
              />
            </div>
          </div>
          <div className="col-lg-12 tw-mt-4">
            <div className="btn_right_table">
              <button
                type="submit"
                className="theme-btn-one  btn_sm tw-bg-black tw-text-white tw-w-full"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IndirimUpdateClient;
