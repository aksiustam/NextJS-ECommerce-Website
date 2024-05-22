"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import sendAllMail from "@/app/actions/Mail/sendAllMail";
const AllMailClient = () => {
  const { register, handleSubmit } = useForm();
  const [sendto, setSendTo] = useState("user");
  const [quillValue, setQuillValue] = useState("");
  const onSubmit = async (data) => {
    const formData = {
      mailto: sendto,
      mailBaslik: data.mailBaslik,
      text: quillValue,
    };
    const res = await sendAllMail(formData);
    if (res === true)
      Swal.fire({
        icon: "success",
        title: "Başarıyla Gönderildi",
        showConfirmButton: false,
        timer: 1500,
      });
  };

  return (
    <div className="container">
      <form className="add_product_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-lg-6">
            <div className="fotm-group">
              <label htmlFor="product_cat">
                Kimlere Gitcek<span className="text-danger">*</span>
              </label>
              <select
                name="status"
                id="siparis_status"
                value={sendto}
                onChange={(e) => setSendTo(e.target.value)}
              >
                <option value="user">Kullanıcılara</option>
                <option value="news">Habere Kaydolanlara</option>
                <option value="stock">Stock Haberi İsteyenlere</option>
              </select>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="fotm-group">
              <label htmlFor="product_name">
                Mail Başlık<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="product_name_Fr"
                className="form-control"
                placeholder="Mail Başlık"
                {...register("mailBaslik")}
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
                  ["bold", "italic", "underline", "strike", "blockquote"],
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
              Gönder
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AllMailClient;
