import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const Trendler = (props) => {
  const { settings } = props;
  const { handleSubmit } = useForm();

  const [name, setName] = useState(settings?.trend?.name);
  const [checkname, setCheckName] = useState(settings?.trend?.checkname);
  const [check, setCheck] = useState(settings?.trend?.check);
  const onSubmit = async () => {
    const formData = {
      name: name,
      checkname: checkname,
      check: check === "true" ? true : false,
    };

    await axios
      .post("/api/settings/trendler", formData)
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
            Gösterilecek Kategoriler
          </div>
        </div>

        <div className="col-lg-4">
          <div className="fotm-group tw-flex tw-flex-col">
            <label>
              Kategori
              <span className="text-danger">*</span>
            </label>
            <select
              id="btncheck"
              value={checkname}
              onChange={(e) => setCheckName(e.target.value)}
            >
              <option value="Nouveautés">Nouveautés</option>
              <option value="Top Ventes">Top Ventes</option>
              <option value="Promotions">Promotions</option>
              <option value="Bio">Bio</option>
              <option value="Origine France Garantie">
                Origine France Garantie
              </option>
            </select>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group">
            <label htmlFor="product_name">
              Kategori Adı<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Kategori Adı"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="fotm-group tw-flex tw-flex-col">
            <label>
              Trendler Göster
              <span className="text-danger">*</span>
            </label>
            <select
              id="trendcheck"
              value={check}
              onChange={(e) => setCheck(e.target.value)}
            >
              <option value="true">Evet</option>
              <option value="false">Hayır</option>
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

export default Trendler;
