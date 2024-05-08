"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { MdClose } from "react-icons/md";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const SizeStock = (params) => {
  const { data, slug, color, size, register, setValue } = params;

  const [mysize, setMySize] = useState(
    data?.SizeStock?.map((item) => ({
      stock: item.stock,
      sizename: item?.Size?.name,
    })) || []
  );
  const sumbitSize = (size) => {
    if (mysize?.some((obj) => obj.sizename === size)) {
      setMySize((prevSize) => prevSize.filter((obj) => obj.sizename !== size));
    } else {
      setMySize((prevSize) => [...prevSize, { stock: null, sizename: size }]);
    }
  };

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
    <div className="tw-flex tw-flex-col  tw-justify-center tw-items-center tw-gap-3 tw-border-2 tw-border-black tw-relative">
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
        <div className="tw-flex tw-gap-1">
          {size?.map((item) => {
            return (
              <button
                type="button"
                className="theme-btn-one tw-px-5 tw-py-3 tw-border-solid  tw-border-[1px] tw-border-black tw-m-2"
                onClick={() => sumbitSize(item.name)}
                key={item.id}
              >
                {item?.name}
              </button>
            );
          })}
        </div>
        <div className="row">
          {mysize?.map((item, index) => {
            return (
              <div key={index} className="col-lg-2 col-md-4 col-sm-12 col-12">
                <div className="fotm-group">
                  <label>
                    {color}_{item?.sizename}
                  </label>
                  <input
                    type="number"
                    className="form-control !tw-border-2 !tw-border-black"
                    min={0}
                    defaultValue={item?.stock}
                    onBlur={(e) => {
                      register(`${color}_${item.sizename}`, {
                        shouldUnregister: true,
                        value: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SizeStock;
