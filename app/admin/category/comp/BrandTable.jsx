import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import setAllCategory from "@/app/actions/Category/setAllCategory";
import putAllCategory from "@/app/actions/Category/putAllCategory";
import delAllCategory from "@/app/actions/Category/delAllCategory";
const BrandTable = (props) => {
  const data = props.brand;

  const [index, setIndex] = useState("");
  const [name, setName] = useState("");
  const [modalbrand, setModalBrand] = useState({});
  const router = useRouter();
  const [modalShow, setModalShow] = useState(false);
  const [message, setMessage] = useState("");

  const onDelete = async (data) => {
    Swal.fire({
      title: name + " Adlı Çeşit Arşivlenecek! ",
      showDenyButton: true,
      confirmButtonText: "Arşiv",
      denyButtonText: "Hayır",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = { ...data, archive: true };
        const res = await delAllCategory("brand", formData);
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
  const addBrand = async () => {
    if (name === "" && index === "") {
      Swal.fire({
        icon: "error",
        title: "Çeşit ve Sıra Boş Olamaz",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const formData = { name: name, index: index };
      const res = await setAllCategory("brand", formData);
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

  const updateBrand = async () => {
    const res = await putAllCategory("brand", modalbrand);
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
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="tw-flex tw-flex-1">
            <div className="fotm-group">
              <label htmlFor="brand_index">
                İndex Değiştir<span className="text-danger">*</span>
              </label>
              <div className="tw-flex tw-w-full">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Çeşit Ekle"
                  value={modalbrand?.index}
                  min={0}
                  onChange={(e) =>
                    setModalBrand((prev) => ({
                      ...prev,
                      index: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="fotm-group">
              <label htmlFor="brand_name">
                Çeşit Değiştir<span className="text-danger">*</span>
              </label>
              <div className="tw-flex tw-w-full">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Çeşit Ekle"
                  value={modalbrand?.name}
                  onChange={(e) =>
                    setModalBrand((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />

                <button
                  className="theme-btn-one bg-black btn_sm"
                  onClick={() => updateBrand()}
                >
                  Ekle
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
            <div className="mb-2 tw-flex tw-gap-3 tw-items-center">
              <div className="fotm-group">
                <label htmlFor="product_name">
                  Sıra Ekle<span className="text-danger">*</span>
                </label>
                <div className="tw-flex tw-max-w-96">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Sıra Ekle"
                    min={0}
                    onChange={(e) => setIndex(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="fotm-group">
                <label htmlFor="product_name">
                  Çeşit Ekle<span className="text-danger">*</span>
                </label>
                <div className="tw-flex tw-max-w-96">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Çeşit Ekle"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <button
                    className="theme-btn-one bg-black btn_sm"
                    onClick={() => addBrand()}
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
                    <th scope="col">Id</th>
                    <th scope="col">Ad</th>
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
                            setModalBrand(data);
                          }}
                        >
                          #{data?.index}
                        </td>
                        <td
                          className="hover:tw-text-blue-600 tw-cursor-pointer"
                          onClick={() => {
                            setModalShow(true);
                            setModalBrand(data);
                          }}
                        >
                          {data?.name}
                        </td>
                        <td>
                          <button
                            onClick={() => {
                              setModalShow(true);
                              setModalBrand(data);
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

export default BrandTable;
