"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import setAllCategory from "@/app/actions/Category/setAllCategory";
import putAllCategory from "@/app/actions/Category/putAllCategory";
import delAllCategory from "@/app/actions/Category/delAllCategory";
const ColorTable = (props) => {
  const data = props.color;

  const [index, setIndex] = useState("");
  const [name, setName] = useState("");
  const [hex, setHex] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalcolor, setModalColor] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const onDelete = async (data) => {
    Swal.fire({
      title: data.name + " Adlı Renk Arşivlenecek!! ",
      showDenyButton: true,
      confirmButtonText: "Arşiv",
      denyButtonText: "Hayır",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = { ...data, archive: true };
        const res = await delAllCategory("color", formData);
        if (res === true)
          Swal.fire({
            icon: "success",
            title: "Başarıyla Arşivlendi",
            showConfirmButton: false,
            timer: 1500,
          });
        else {
          Swal.fire({
            icon: "error",
            title: JSON.stringify(res.message),
          });
        }
        router.refresh();
      }
    });
  };
  const addColor = async () => {
    if (index === "" || name === "" || hex === "") {
      Swal.fire({
        icon: "error",
        title: "Color ve Hex Boş Olamaz",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const formData = { name: name, hex: hex, index: index };
      const res = await setAllCategory("color", formData);
      if (res === true)
        Swal.fire({
          icon: "success",
          title: "Başarıyla Eklendi",
          showConfirmButton: false,
          timer: 1500,
        });
      else {
        Swal.fire({
          icon: "error",
          title: JSON.stringify(res.message),
        });
      }
      router.refresh();
    }
  };

  const updateColor = async () => {
    const res = await putAllCategory("color", modalcolor);
    if (res === true) setMessage("Başarıyla değiştirildi");
    else {
      setMessage(res.message);
    }
    router.refresh();
  };

  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="tw-flex tw-flex-1">
            <div className="fotm-group tw-w-full">
              <label htmlFor="product_name">
                Color-Hex Düzenle<span className="text-danger">*</span>
              </label>
              <div className="tw-flex tw-gap-3">
                <input
                  type="number"
                  id="product_colorindex"
                  className="form-control"
                  placeholder="Sıra No"
                  value={modalcolor?.index}
                  onChange={(e) =>
                    setModalColor((prev) => ({
                      ...prev,
                      index: e.target.value,
                    }))
                  }
                />

                <input
                  type="text"
                  id="product_color"
                  className="form-control"
                  placeholder="Renk Ekle"
                  value={modalcolor?.name}
                  onChange={(e) =>
                    setModalColor((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />

                <Form.Control
                  type="color"
                  id="product_hex"
                  className="form-control tw-h-[45px]"
                  defaultValue={modalcolor?.hex}
                  onChange={(e) => {
                    setModalColor((prev) => ({
                      ...prev,
                      hex: e.target.value,
                    }));
                  }}
                />

                <button
                  className="theme-btn-one bg-black btn_sm"
                  onClick={() => updateColor()}
                >
                  Değiştir
                </button>
                <div className="tw-font-bold tw-text-xl tw-text-red-600">
                  {message}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="vendor_order_boxed pt-4">
            <div className="mb-2">
              <div className="fotm-group">
                <label htmlFor="product_name">
                  Color-Hex Ekle<span className="text-danger">*</span>
                </label>
                <div className="tw-flex tw-max-w-[400px] tw-gap-3">
                  <input
                    type="number"
                    id="product_colorindex"
                    className="form-control"
                    placeholder="Sıra No"
                    onChange={(e) => setIndex(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    id="product_color"
                    className="form-control"
                    placeholder="Renk Ekle"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Form.Control
                    type="color"
                    id="product_hex"
                    className="form-control tw-h-[45px]"
                    defaultValue={"#000000"}
                    onChange={(e) => setHex(e.target.value)}
                    required
                  />

                  <button
                    className="theme-btn-one bg-black btn_sm"
                    onClick={() => addColor()}
                  >
                    Ekle
                  </button>
                </div>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table pending_table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sıra</th>
                    <th scope="col">Ad</th>
                    <th scope="col">Hex</th>
                    <th scope="col">Düzenle/Arşiv</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((data) => {
                    return (
                      <tr key={data?.id}>
                        <td
                          className="hover:tw-text-blue-600 tw-cursor-pointer"
                          onClick={() => {
                            setModalShow(true);
                            setModalColor(data);
                          }}
                        >
                          #{data?.index}
                        </td>
                        <td
                          className="hover:tw-text-blue-600 tw-cursor-pointer"
                          onClick={() => {
                            setModalShow(true);
                            setModalColor(data);
                          }}
                        >
                          {data?.name}
                        </td>
                        <td>{data?.hex}</td>
                        <td>
                          <button
                            onClick={() => {
                              setModalShow(true);
                              setModalColor(data);
                            }}
                          >
                            <FaRegEdit size={26} color="green" />
                          </button>

                          <button onClick={() => onDelete(data)}>
                            <FaRegTrashAlt size={26} color="red" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorTable;
