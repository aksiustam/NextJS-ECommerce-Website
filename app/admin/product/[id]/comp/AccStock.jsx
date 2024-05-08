"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { MdClose } from "react-icons/md";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const AccStock = (params) => {
  const { data, slug, color, size, register, setValue } = params;

  const deleteColor = async () => {
    const formData = { role: "DELETE" };

    Swal.fire({
      title: data?.color?.name + " Adlı Renk SİLİNECEKTİR!! ",
      showDenyButton: true,
      confirmButtonText: "Sil",
      denyButtonText: "Hayır",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .post(`/admin/product/delcolor/${data.id}`, formData)
          .then(async () => {
            Swal.fire({
              icon: "success",
              title: "Başarıyla Silindi",
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: JSON.stringify(error?.response?.data),
            });
          });
      }
    });
  };

  const [cimage, setCImage] = useState([]);
  useEffect(() => {
    const data = cimage.map((item) => {
      return { imageid: item.public_id, imageurl: item.secure_url };
    });
    setValue(`Image_${color}`, data);
  }, [color, setValue, cimage]);

  return (
    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-gap-3 tw-border-2 tw-border-black tw-relative">
      <div
        className="tw-absolute tw-top-3 tw-right-3 tw-cursor-pointer"
        onClick={deleteColor}
      >
        <MdClose size={32} color="red" />
      </div>
      <div className="tw-flex tw-gap-3 tw-items-center tw-justify-center tw-p-6">
        {data?.images?.map((item, index) => {
          return (
            <Image
              key={index}
              src={item?.imageurl}
              alt="Resim"
              width={500}
              height={500}
              className="tw-w-full tw-h-[120px] tw-object-contain"
            />
          );
        })}
      </div>
      <input hidden {...register(`Image_${color}`)} />
      <div className="row ">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <label className="tw-mr-4">
            Resim<span className="text-danger">*</span> (620x650)
          </label>
          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={(result) => {
              setCImage((prev) => {
                const data = prev || [];
                return [...data, { ...result?.info }];
              });
            }}
            uploadPreset="nilrio_product"
            options={{
              folder: `/nilrio/product/${slug}/${color}`,
            }}
          >
            {({ open }) => {
              function handleOnClick() {
                open();
              }

              return (
                <button
                  type="button"
                  className="form-control"
                  onClick={handleOnClick}
                >
                  {color} Resim Yükle
                </button>
              );
            }}
          </CldUploadWidget>
        </div>
      </div>
      <div className="tw-w-full tw-px-4">
        <div className="row">
          <div className="col-lg-4 ">
            <div className="fotm-group">
              <label>{color}_Aksesuar</label>
              <input
                type="number"
                className="form-control !tw-border-2 !tw-border-black"
                min={0}
                defaultValue={data?.SizeStock[0]?.stock}
                onBlur={(e) => {
                  register(`${color}_null`, {
                    shouldUnregister: true,
                    value: e.target.value,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccStock;
