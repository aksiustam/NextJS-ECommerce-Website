"use client";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import { MultiSelect } from "react-multi-select-component";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";

const CategoryTable = (props) => {
  const data = props.category;
  const brand = props.brand;
  const sizetype = props.sizetype;
  const cattype = props.cattype;
  const value =
    brand?.map((item) => {
      return { label: item?.name, value: item?.id };
    }) || [];

  const [mybrand, setMyBrand] = useState([]);

  const [modalShow, setModalShow] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalbrand, setModalBrand] = useState([]);
  const [message, setMessage] = useState("");

  const { register: registerCat, handleSubmit: handleCatSubmit } = useForm();
  const { register: registermodal, handleSubmit: handleModalSubmit } =
    useForm();

  const onDelete = async (data) => {
    Swal.fire({
      title: data.name + " Adlı Kategori Arşivlenecek!! ",
      showDenyButton: true,
      confirmButtonText: "Arşiv",
      denyButtonText: "Hayır",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const formData = { ...data, archive: true };
        await axios
          .put(`/api/catbrand/category`, formData)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Başarıyla Arşivlendi",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: JSON.stringify(error.response.data),
            });
          });
      }
    });
  };
  const onSubmit = async (data) => {
    const formData = { ...data, brand: mybrand };

    await axios
      .post("/api/catbrand/category", formData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Başarıyla Eklendi",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: JSON.stringify(error.response.data),
        });
      });
  };

  const onModalSubmit = async (data) => {
    const formData = {
      id: modalData.id,
      ...data,
      brand: modalbrand,
    };

    await axios
      .put(`/api/catbrand/category`, formData)
      .then(() => {
        setMessage("Başarıyla değiştirildi");
      })
      .catch((error) => {
        setMessage(JSON.stringify(error.response.data));
      });
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
            <form
              className="add_product_form tw-w-full"
              onSubmit={handleModalSubmit(onModalSubmit)}
            >
              <div className="fotm-group">
                <div className="tw-flex tw-flex-col">
                  <div className="row tw-pb-4">
                    <div className="col-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Sıra No"
                        min={1}
                        defaultValue={modalData?.index}
                        onBlur={(e) => {
                          registermodal(`index`, {
                            shouldUnregister: true,
                            value: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="col-6 tw-pl-0">
                      <div className="tw-flex tw-w-full">
                        <MultiSelect
                          options={value}
                          value={modalbrand}
                          onChange={setModalBrand}
                          labelledBy="Select"
                          className="tw-w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="tw-flex tw-flex-col tw-w-full tw-gap-3 tw-pr-4 ">
                    <div className="tw-flex tw-gap-3 ">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Kategori Adı"
                        defaultValue={modalData?.name}
                        onBlur={(e) => {
                          registermodal(`name`, {
                            shouldUnregister: true,
                            value: e.target.value,
                          });
                        }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Kategori Url"
                        defaultValue={modalData?.slug}
                        onBlur={(e) => {
                          registermodal(`slug`, {
                            shouldUnregister: true,
                            value: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="tw-flex tw-gap-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Kategori Açıklama"
                        defaultValue={modalData?.desc}
                        onBlur={(e) => {
                          registermodal(`metadesc`, {
                            shouldUnregister: true,
                            value: e.target.value,
                          });
                        }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Kategori Keyword"
                        defaultValue={modalData?.keywords}
                        onBlur={(e) => {
                          registermodal(`metakey`, {
                            shouldUnregister: true,
                            value: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="tw-flex tw-gap-5 tw-mt-2 tw-w-full">
                  <div className="fotm-group tw-flex tw-flex-col tw-w-full">
                    <label htmlFor="product_type">
                      Cinsiyet<span className="text-danger">*</span>
                    </label>
                    <select
                      name="type"
                      id="product_type"
                      defaultValue={modalData?.gender}
                      onBlur={(e) => {
                        registermodal(`gender`, {
                          shouldUnregister: true,
                          value: e.target.value,
                        });
                      }}
                    >
                      <option value="uni">Unisex</option>
                      <option value="man">Erkek</option>
                      <option value="woman">Bayan</option>
                      <option value="manchild">Erkek Çocuk</option>
                      <option value="womanchild">Kız Çocuk</option>
                    </select>
                  </div>
                  <div className="fotm-group tw-flex tw-flex-col tw-w-full">
                    <label htmlFor="product_type">
                      Kategori<span className="text-danger">*</span>
                    </label>
                    <select
                      name="type"
                      id="product_type"
                      defaultValue={modalData?.CategoryType?.type}
                      onBlur={(e) => {
                        registermodal(`cattype`, {
                          shouldUnregister: true,
                          value: e.target.value,
                        });
                      }}
                    >
                      {cattype?.map((item) => (
                        <option key={item.id} value={item.type}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="fotm-group tw-flex tw-flex-col tw-w-full">
                    <label htmlFor="product_type">
                      Boyutlar<span className="text-danger">*</span>
                    </label>
                    <select
                      name="type"
                      id="product_type"
                      defaultValue={modalData?.sizetype?.id}
                      onBlur={(e) => {
                        registermodal(`sizetype`, {
                          shouldUnregister: true,
                          value: e.target.value,
                        });
                      }}
                    >
                      {sizetype.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="fotm-group tw-flex tw-flex-col tw-w-full">
                    <label htmlFor="product_season">
                      Mevsim<span className="text-danger">*</span>
                    </label>
                    <select
                      name="season"
                      id="product_season"
                      defaultValue={modalData?.season}
                      onBlur={(e) => {
                        registermodal(`season`, {
                          shouldUnregister: true,
                          value: e.target.value,
                        });
                      }}
                    >
                      <option value="all">Hepsi</option>
                      <option value="summer">Yaz</option>
                      <option value="winter">Kış</option>
                    </select>
                  </div>
                </div>

                <button
                  className="theme-btn-one bg-black btn_sm tw-bg-black tw-text-white mt-3 "
                  type="submit"
                >
                  Değiştir
                </button>
                <div className="tw-font-bold tw-text-xl tw-text-red-600">
                  {message}
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="vendor_order_boxed pt-4">
            <div className="table-responsive">
              <table className="table pending_table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sıra</th>
                    <th scope="col">Ad</th>
                    <th scope="col">Cinsiyet</th>
                    <th scope="col">Kategori Kodu</th>
                    <th scope="col">Düzenle/Arşiv</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item) => {
                    return (
                      <tr key={item?.id}>
                        <td
                          className="hover:tw-text-blue-600 tw-cursor-pointer"
                          onClick={() => {
                            setModalShow(true);
                            setModalData(item);
                            const value = item?.Brand?.map((item) => {
                              return { label: item?.name, value: item?.id };
                            });

                            setModalBrand(value);
                          }}
                        >
                          #{item?.index}
                        </td>
                        <td
                          className="hover:tw-text-blue-600 tw-cursor-pointer"
                          onClick={() => {
                            setModalShow(true);
                            setModalData(item);
                            const value = item?.Brand?.map((item) => {
                              return { label: item?.name, value: item?.id };
                            });
                            setModalBrand(value);
                          }}
                        >
                          {item?.name}
                        </td>
                        <td>{item?.gender}</td>
                        <td>{item?.CategoryType?.name}</td>
                        <td>
                          <button
                            onClick={() => {
                              setModalShow(true);
                              const value = item?.Brand?.map((item) => {
                                return { label: item?.name, value: item?.id };
                              });
                              setModalBrand(value);
                              setModalSize(item);
                            }}
                          >
                            <FaRegEdit size={26} color="green" />
                          </button>

                          <button onClick={() => onDelete(item)}>
                            <FaRegTrashAlt size={26} color="red" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-2">
              <form
                className="add_product_form"
                onSubmit={handleCatSubmit(onSubmit)}
              >
                <div className="fotm-group">
                  <label htmlFor="product_name">
                    Kategori Ekle<span className="text-danger">*</span> Url
                    olarak sadece kategorinin kısa ismini yaz. Örn:
                    &quot;T-Shirt&quot; = &quot;tshirt&quot;
                  </label>
                  <br />
                  <label htmlFor="product_name">
                    Kategori Urlsini değiştirirsen Sitenin Başlıklarıda
                    Değiştircen!!!.
                  </label>
                  <div className="tw-flex tw-flex-col">
                    <div className="row tw-pb-4">
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Sıra No"
                          min={1}
                          {...registerCat("index")}
                          required
                        />
                      </div>

                      <div className="col-6 tw-pl-0">
                        <div className="tw-flex tw-w-full">
                          <MultiSelect
                            options={value}
                            value={mybrand}
                            onChange={setMyBrand}
                            labelledBy="Select"
                            className="tw-w-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="tw-flex tw-flex-col tw-w-full tw-gap-3 tw-pr-4 ">
                      <div className="tw-flex tw-gap-3 ">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kategori Adı"
                          {...registerCat("name")}
                          required
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kategori Url"
                          {...registerCat("slug")}
                          required
                        />
                      </div>
                      <div className="tw-flex tw-gap-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kategori Açıklama"
                          {...registerCat("metadesc")}
                          required
                        />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Kategori Keyword"
                          {...registerCat("metakey")}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tw-flex tw-gap-5 tw-mt-2 tw-w-full">
                    <div className="fotm-group tw-flex tw-flex-col tw-w-full">
                      <label htmlFor="product_type">
                        Cinsiyet<span className="text-danger">*</span>
                      </label>
                      <select
                        name="type"
                        id="product_type"
                        {...registerCat("gender")}
                        required
                      >
                        <option value="uni">Unisex</option>
                        <option value="man">Erkek</option>
                        <option value="woman">Bayan</option>
                        <option value="manchild">Erkek Çocuk</option>
                        <option value="womanchild">Kız Çocuk</option>
                      </select>
                    </div>
                    <div className="fotm-group tw-flex tw-flex-col tw-w-full">
                      <label htmlFor="product_type">
                        Kategori<span className="text-danger">*</span>
                      </label>
                      <select
                        name="type"
                        id="product_type"
                        {...registerCat("cattype")}
                        required
                      >
                        {cattype?.map((item) => (
                          <option key={item.id} value={item.type}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="fotm-group tw-flex tw-flex-col tw-w-full">
                      <label htmlFor="product_type">
                        Boyutlar<span className="text-danger">*</span>
                      </label>
                      <select
                        name="type"
                        id="product_type"
                        {...registerCat("sizetype")}
                        required
                      >
                        {sizetype.map((item) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="fotm-group tw-flex tw-flex-col tw-w-full">
                      <label htmlFor="product_season">
                        Mevsim<span className="text-danger">*</span>
                      </label>
                      <select
                        name="season"
                        id="product_season"
                        {...registerCat("season")}
                        required
                      >
                        <option value="all">Hepsi</option>
                        <option value="summer">Yaz</option>
                        <option value="winter">Kış</option>
                      </select>
                    </div>
                  </div>

                  <button
                    className="theme-btn-one bg-black btn_sm tw-bg-black tw-text-white mt-3 "
                    type="submit"
                  >
                    Ekle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryTable;
