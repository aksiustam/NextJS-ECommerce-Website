"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import "./styles.css";
import { saveAs } from "file-saver";
import { FaUser } from "react-icons/fa";
import InvoiceEmail from "@/app/reactemail/invoicemail";
import axios from "axios";
const OrderDetailClient = (props) => {
  const data = props.siparis;

  const [status, setStatus] = useState(data.status);
  const [message, setMessage] = useState(data.error);
  const [kargono, setKargoNo] = useState(data.kargono);

  const getCountryFullName = (countryCode) => {
    const countryData = {
      DE: "Allemagne",
      AT: "Autriche",
      BE: "Belgique",
      BG: "Bulgarie",
      CY: "Chypre",
      HR: "Croatie",
      DK: "Danemark",
      ES: "Espagne",
      EE: "Estonie",
      FI: "Finlande",
      FR: "France",
      GR: "Grèce",
      HU: "Hongrie",
      IE: "Irlande",
      IT: "Italie",
      LV: "Lettonie",
      LT: "Lituanie",
      LU: "Luxembourg",
      MT: "Malte",
      NL: "Pays-Bas",
      PL: "Pologne",
      PT: "Portugal",
      CZ: "République tchèque",
      RO: "Roumanie",
      SK: "Slovaquie",
      SI: "Slovénie",
      SE: "Suède",
      TR: "Turquie",
    };

    return countryData[countryCode] || "Ülke bulunamadı";
  };
  const onSumbit = async () => {
    const formData = {
      id: data.id,
      status: status,
      message: message,
      kargono: kargono || " ",
    };
    await axios
      .post(`/api/order/update-order`, formData)
      .then(async () => {
        await Swal.fire({
          icon: "success",
          title: "Başarıyla Değiştirildi",
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

  const mydate = new Date(data?.createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = mydate.toLocaleDateString("tr-TR", options);
  const formattedTime = mydate.toLocaleTimeString("tr-TR");
  const time = formattedDate + ", Saat " + formattedTime;

  const DownPdf = async () => {
    const { render } = await import("@react-email/render");

    const html = render(<InvoiceEmail sipdata={data} />);

    const blob = new Blob([html], { type: "text/html" });

    saveAs(blob, "invoice.html");
  };

  return (
    <section id="add_product_area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="add_product_wrapper">
              <h4>Sipariş </h4>
              <div className="add_product_form">
                <div className="row">
                  <div className="col-lg-6">
                    <ul>
                      <li>
                        Siparis Id : <span>{data?.id}</span>
                      </li>
                      <li>
                        Kullanıcı Adı : <span>{data?.username}</span>
                      </li>
                      <li>
                        Kullanıcı Id :{" "}
                        <span>
                          {data?.userId !== null ? data?.userId : "Yok"}
                        </span>
                      </li>
                      <li>
                        Adı : <span>{data?.sendadress?.firstName}</span>
                      </li>
                      <li>
                        Soyadı : <span>{data?.sendadress?.lastName}</span>
                      </li>
                      <li>
                        Email : <span>{data?.email}</span>
                      </li>
                      <li>
                        Telefon : <span>{data?.sendadress?.phoneNumber}</span>
                      </li>
                      <li>
                        Toplam Fiyatı : <span>{data?.amount.toFixed(2)}€</span>
                      </li>
                      <li>
                        Satın Alma Tarihi : <span>{time}</span>
                      </li>
                      <li>
                        Kullanıcı Notu :
                        <span className="tw-break-words ">{data?.note}</span>
                      </li>
                      <li>
                        Kargo Tipi : <span>{data?.shipping?.name}</span>
                      </li>
                      <li>
                        Kargo Fiyatı : <span>{data?.shipping?.price}€</span>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <div className="row tw-mb-2">
                      <div
                        className={`tw-border-[3px]  tw-min-h-36 tw-min-w-96 tw-flex tw-flex-col tw-pl-3 tw-pt-4 tw-gap-3 tw-cursor-pointer  tw-text-sm hover:tw-bg-slate-200`}
                      >
                        <div className="tw-flex tw-items-center tw-gap-3">
                          <FaUser />
                          <span>Fatura Adresi</span>
                        </div>
                        <div className="tw-flex tw-flex-col">
                          <p className=" tw-break-words tw-mr-12 tw-text-sm">
                            {data?.billadress?.address}
                          </p>
                          <p className="tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                            <span>{data?.billadress?.city}</span> /
                            <span>
                              {getCountryFullName(data?.billadress?.country)}
                            </span>
                            <span className="tw-ml-2">
                              {data?.billadress?.zipCode}
                            </span>
                          </p>
                          <p className="tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                            Şirket Adı: <span>{data?.billadress?.company}</span>
                          </p>
                          <p className="tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                            Şirket TVA:{" "}
                            <span>{data?.billadress?.companytva}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row tw-mb-2">
                      <div
                        className={`tw-border-[3px]  tw-min-h-36 tw-min-w-96 tw-flex tw-flex-col tw-pl-3 tw-pt-4 tw-gap-3 tw-cursor-pointer  tw-text-sm hover:tw-bg-slate-200`}
                      >
                        <div className="tw-flex tw-items-center tw-gap-3">
                          <FaUser />
                          <span>Gönderme Adresi</span>
                        </div>
                        <div className="tw-flex tw-flex-col">
                          <p className=" tw-break-words tw-mr-12 tw-text-sm">
                            {data?.sendadress?.address}
                          </p>
                          <p className="tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                            <span>{data?.sendadress?.city}</span> /
                            <span>
                              {getCountryFullName(data?.sendadress?.country)}
                            </span>
                            <span className="tw-ml-2">
                              {data?.sendadress?.zipCode}
                            </span>
                          </p>
                          <p className="tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                            Şirket Adı: <span>{data?.sendadress?.company}</span>
                          </p>
                          <p className="tw-break-words tw-my-1 tw-mr-2 tw-text-sm">
                            Şirket TVA:{" "}
                            <span>{data?.sendadress?.companytva}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row tw-mt-6">
                      <button
                        className="theme-btn-one btn_md tw-bg-black tw-text-white"
                        onClick={DownPdf}
                      >
                        Fatura İndir
                      </button>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="table-responsive">
                      <table className="table pending_table">
                        <thead className="thead-light">
                          <tr>
                            <th scope="col">Ad / Kodu</th>
                            <th scope="col">Renk</th>
                            <th scope="col">Boyut</th>
                            <th scope="col">Miktar</th>
                            <th scope="col">Fiyat</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.basket?.map((item, index) => (
                            <tr key={index}>
                              <td>
                                {item?.name} / {item?.pid}
                              </td>
                              <td>{item?.color}</td>
                              <td>
                                {item?.size === "null" ? "Yok" : item?.size}
                              </td>
                              <td>{item?.quantity}</td>
                              <td>{item?.price}€</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="fotm-group">
                      <label htmlFor="product_cat">
                        Durumu<span className="text-danger">*</span>
                      </label>
                      <select
                        name="status"
                        id="siparis_status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="paid">Ödendi</option>
                        <option value="send">Gönderildi</option>
                        <option value="error">Hata var</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="fotm-group">
                      <label htmlFor="product_desc">Hata Mesajı</label>
                      <input
                        type="text"
                        id="product_desc"
                        className="form-control"
                        placeholder="Ürün Açıklaması"
                        value={message === "null" ? "Yok" : message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>
                  {status === "send" && (
                    <div className="col-lg-6">
                      <div className="fotm-group">
                        <label htmlFor="product_desc">
                          Kargo No ({data?.shipping?.name}):
                        </label>
                        <input
                          type="text"
                          id="colno"
                          className="form-control"
                          value={kargono}
                          onChange={(e) => setKargoNo(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  <div className="col-6 tw-flex tw-items-center tw-justify-center">
                    <a
                      href={
                        data?.shipping?.name === "colissimo"
                          ? ``
                          : `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${kargono}&langue=fr`
                      }
                      className="tw-px-4 tw-py-2 tw-bg-white tw-text-black tw-border-black tw-border-2 tw-rounded-full"
                    >
                      KARGO DENEME
                    </a>
                  </div>

                  <div className="col-lg-12">
                    <button
                      onClick={onSumbit}
                      className="theme-btn-one  btn_sm tw-bg-black tw-text-white tw-w-full tw-mt-5 tw-mb-5"
                    >
                      Güncelle
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetailClient;
