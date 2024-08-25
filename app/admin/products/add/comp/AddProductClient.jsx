"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";
import { MultiSelect } from "react-multi-select-component";
import setProduct from "@/app/actions/Products/setProduct";

const AddProductClient = (props) => {
  const { allcategory } = props;
  const { category, brand } = allcategory;
  const bvalue = brand?.map((item) => {
    return { label: item?.name, value: item?.id };
  });

  const [mybrand, setMyBrand] = useState([]);
  const [quillValue, setQuillValue] = useState("");

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (mybrand.length === 0) {
      await Swal.fire({
        icon: "error",
        title: "Çeşit Giriniz",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const formData = { ...data, brand: mybrand, quill: quillValue };
    const res = await setProduct(formData);
    if (res === true) {
      Swal.fire({
        icon: "success",
        title: "Başarıyla Eklendi",
        showConfirmButton: false,
        timer: 1500,
      });
      location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: JSON.stringify(res.message),
      });
    }
  };

  return (
    <section id="add_product_area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="add_product_wrapper">
              <h4>Add Product</h4>
              <form
                className="add_product_form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row">
                  <div className="col-lg-4">
                    <div className="fotm-group">
                      <label htmlFor="product_name">
                        Ürün Adı<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="product_name"
                        className="form-control"
                        placeholder="Ürün Adı"
                        {...register("name", {
                          required: "Ürün Adı Giriniz",
                        })}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="fotm-group">
                      <label htmlFor="product_name">
                        Ürün Kodu<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="product_name"
                        className="form-control"
                        placeholder="Ürün Kodu"
                        {...register("pid", {
                          required: "Ürün Kodu Giriniz",
                        })}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="fotm-group">
                      <label htmlFor="product_desc">Ürün Açıklaması</label>
                      <input
                        type="text"
                        id="product_desc"
                        className="form-control"
                        placeholder="Ürün Açıklaması"
                        {...register("desc")}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="fotm-group">
                      <label htmlFor="product_cat">
                        Kategori<span className="text-danger">*</span>
                      </label>
                      <select
                        name="category"
                        id="product_cat"
                        {...register("category", { required: true })}
                        required
                      >
                        {category?.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-8">
                    <div className="fotm-group">
                      <label htmlFor="product_cat">
                        Çeşit<span className="text-danger">*</span>
                      </label>
                      <MultiSelect
                        options={bvalue}
                        value={mybrand}
                        onChange={setMyBrand}
                        labelledBy="Select"
                        className="tw-w-full"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="fotm-group">
                      <label htmlFor="product_cat">
                        Cinsiyet<span className="text-danger">*</span>
                      </label>
                      <select
                        name="category"
                        id="p_gender"
                        {...register("gender", { required: true })}
                        required
                      >
                        <option value="uni">Unisex</option>
                        <option value="man">Erkek</option>
                        <option value="woman">Bayan</option>
                        <option value="manchild">Erkek Çocuk</option>
                        <option value="womanchild">Kız Çocuk</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="fotm-group">
                      <label htmlFor="product_price">
                        Fiyat
                        <span className="text-danger">*</span>(Fiyat Küsüratı
                        Nokta ile)
                      </label>
                      <input
                        type="text"
                        id="product_price"
                        className="form-control"
                        {...register("price", { required: true })}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="fotm-group">
                      <label htmlFor="product_inprice">
                        İndirimli Fiyat<span className="text-danger">*</span>
                        (Fiyat Küsüratı Nokta ile)
                      </label>
                      <input
                        type="text"
                        id="product_inprice"
                        className="form-control"
                        {...register("inprice")}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <ReactQuill
                      theme="snow"
                      value={quillValue}
                      onChange={setQuillValue}
                      modules={{
                        toolbar: [
                          [{ font: [] }],
                          [{ size: [] }],
                          [{ color: [] }, { background: [] }],
                          [
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                          ],
                          [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                          ],

                          ["link", "image", "video"],
                          ["clean"],
                        ],
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <div className="btn_right_table">
                      <button
                        type="submit"
                        className="theme-btn-one  btn_sm tw-bg-black tw-text-white"
                      >
                        Ürün Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProductClient;
