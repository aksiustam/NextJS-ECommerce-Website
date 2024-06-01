"use client";
import React, { useCallback, useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from "axios";
import SizeStock from "./SizeStock";
import AccStock from "./AccStock";
import "react-quill/dist/quill.snow.css";
import { MultiSelect } from "react-multi-select-component";
import dynamic from "next/dynamic";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./tabstyle.css";
const ProductClient = (props) => {
  const { product, allcategory } = props;
  const { brand, color, category } = allcategory;
  const size = allcategory.size.filter(
    (item) => item.SizeType.type === product.Category.SizeType.type
  );

  const bvalue = brand?.map((item) => {
    return { label: item?.name, value: item?.id };
  });
  const mybvalue = product.Brand?.map((item) => {
    return { label: item?.name, value: item?.id };
  });
  const [mybrand, setMyBrand] = useState(mybvalue);
  const [quillValue, setQuillValue] = useState(product.quill);
  const [guideimage, setGuideImage] = useState(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: product.name,
      desc: product.desc,
      category: product.categoryId,
      price: product.price,
      gender: product.gender,
      inprice: product.inprice,
    },
    shouldUnregister: true,
  });

  const [mycolor, setMyColor] = useState(
    product.ProductColorSize.map((item) => item.Color.name) || []
  );

  const sumbitColor = useCallback(
    (color) => {
      if (mycolor.includes(color)) {
        setMyColor((prevColors) => prevColors?.filter((c) => c !== color));
      } else {
        setMyColor((prevColors) => [...prevColors, color]);
      }
    },
    [mycolor]
  );

  const onSubmit = async (data) => {
    let formData = {
      ...data,
      id: product.id,
      brand: mybrand,
      quill: quillValue,
    };
    if (guideimage !== null) {
      formData = {
        ...formData,
        guideurl: {
          imageid: guideimage.public_id,
          imageurl: guideimage.secure_url,
        },
      };
    }

    await axios
      .put(`/api/product/${product.id}`, formData)
      .then(async (response) => {
        let messages = "Başarıyla Güncellendi";
        await Swal.fire({
          icon: "success",
          title: "Başarıyla Güncellendi",
          html: messages,
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
    <section id="add_product_area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="add_product_wrapper">
              <h4>ÜRÜN GÜNCELLE</h4>
              <form
                className="add_product_form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row">
                  <div className="col-lg-6">
                    <div className="fotm-group">
                      <label htmlFor="product_name">
                        Ürün Adı<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        id="product_name"
                        className="form-control"
                        placeholder="Ürün Adı"
                        {...register("name")}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="fotm-group">
                      <label htmlFor="product_desc">Ürün Açıklaması</label>
                      <input
                        type="text"
                        id="product_desc"
                        className="form-control"
                        placeholder="Ürün Açıklaması"
                        {...register("desc")}
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
                        {...register("gender")}
                      >
                        <option value="uni">Unisex</option>
                        <option value="man">Erkek</option>
                        <option value="woman">Bayan</option>
                        <option value="manchild">Erkek Çocuk</option>
                        <option value="womanchild">Kız Çocuk</option>
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
                      <label htmlFor="product_cat">Kategori</label>
                      <select
                        name="category"
                        id="p_category"
                        {...register("category")}
                        disabled
                      >
                        {category?.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
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
                        {...register("price")}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="fotm-group">
                      <label htmlFor="product_inprice">İndirimli Fiyat</label>
                      (Fiyat Küsüratı Nokta ile)
                      <input
                        type="text"
                        id="product_inprice"
                        className="form-control"
                        {...register("inprice")}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="tw-flex tw-gap-12 tw-items-center tw-justify-center">
                      <label htmlFor="product_inprice">Beden Tablosu:</label>
                      <Image
                        src={product?.guideurl?.imageurl}
                        alt="Guide"
                        width={200}
                        height={200}
                        loading="eager"
                        className="tw-w-[170px] tw-h-[120px] tw-object-contain"
                      />
                      <CldUploadWidget
                        signatureEndpoint="/api/sign-cloudinary-params"
                        onSuccess={(result) => {
                          setGuideImage(result?.info);
                        }}
                        uploadPreset="nilrio_product"
                        options={{
                          folder: `/nilrio/product/${product.slug}`,
                          maxFiles: 1,
                        }}
                      >
                        {({ open }) => {
                          function handleOnClick() {
                            setGuideImage(null);
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

                  <div className="col-lg-12">
                    {color?.map((item) => {
                      return (
                        <button
                          key={item?.id}
                          type="button"
                          className="theme-btn-one tw-px-4 tw-py-2 tw-border-solid  tw-border-[1px] tw-border-black tw-m-2"
                          style={{ backgroundColor: item?.hex }}
                          onClick={() => sumbitColor(item?.name)}
                        >
                          {item?.name}
                        </button>
                      );
                    })}
                  </div>
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="product_details_tabs tw-pt-4 tw-mx-4">
                        <Tabs
                          defaultActiveKey="gram"
                          id="uncontrolled-tab-example"
                        >
                          <Tab
                            eventKey="gram"
                            title="Gramaj"
                            className="tw-mr-4"
                          >
                            <div>
                              {product?.Category?.SizeType?.type ===
                                "dress" && (
                                <>
                                  <div className="row tw-mt-6">
                                    {size
                                      ?.filter(
                                        (item) =>
                                          item.SizeType.type ===
                                          product?.Category?.SizeType?.type
                                      )
                                      .map((item) => {
                                        const defvalue =
                                          product?.ParcelGram?.find(
                                            (data) => item.id === data.sizeId
                                          );

                                        return (
                                          <div
                                            key={item?.id}
                                            className="col-lg-2"
                                          >
                                            <div className="fotm-group">
                                              <label htmlFor="product_price">
                                                Gram {item?.name}
                                                <span className="text-danger">
                                                  *
                                                </span>
                                              </label>
                                              <input
                                                type="number"
                                                className="form-control"
                                                min={0}
                                                defaultValue={defvalue?.gram}
                                                onBlur={(e) => {
                                                  register(
                                                    `gram_dress_${item?.name}`,
                                                    {
                                                      shouldUnregister: true,
                                                      value: e.target.value,
                                                    }
                                                  );
                                                }}
                                              />
                                            </div>
                                          </div>
                                        );
                                      })}
                                  </div>
                                </>
                              )}
                              {product?.Category?.SizeType?.type === "acc" && (
                                <>
                                  <div className="row tw-mt-6">
                                    <div className="col-lg-12">
                                      <div className="fotm-group">
                                        <label htmlFor="product_price">
                                          Aksesuar Gramaj
                                          <span className="text-danger">*</span>
                                        </label>
                                        <input
                                          type="number"
                                          className="form-control"
                                          min={0}
                                          defaultValue={
                                            product?.ParcelGram[0]?.gram
                                          }
                                          onBlur={(e) => {
                                            register(`gram_acc`, {
                                              shouldUnregister: true,
                                              value: e.target.value,
                                            });
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </Tab>
                          {mycolor?.map((item, index) => {
                            const stocksizedata =
                              product?.ProductColorSize?.find(
                                (items) => items?.Color?.name === item
                              );

                            if (product?.Category?.SizeType.type === "acc") {
                              return (
                                <Tab
                                  key={index}
                                  eventKey={item}
                                  title={item}
                                  style={{
                                    ".nav-link.active": {
                                      color: stocksizedata ? "blue" : "",
                                    },
                                  }}
                                >
                                  <AccStock
                                    slug={product.slug}
                                    color={item}
                                    data={stocksizedata}
                                    size={size}
                                    setValue={setValue}
                                    register={register}
                                  />
                                </Tab>
                              );
                            } else if (
                              product?.Category?.SizeType.type !== "acc"
                            ) {
                              return (
                                <Tab
                                  key={index}
                                  eventKey={item}
                                  title={item}
                                  style={{
                                    ".nav-link.active": {
                                      color: stocksizedata ? "blue" : "",
                                    },
                                  }}
                                >
                                  <SizeStock
                                    slug={product.slug}
                                    color={item}
                                    data={stocksizedata}
                                    size={size}
                                    setValue={setValue}
                                    register={register}
                                  />
                                </Tab>
                              );
                            }
                          })}
                        </Tabs>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 tw-mt-10">
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
                    <button
                      type="submit"
                      className="theme-btn-one  btn_sm tw-bg-black tw-text-white tw-w-full tw-mt-5"
                    >
                      Ürün Güncelle
                    </button>
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

export default ProductClient;
