"use client";
import React, { useState } from "react";
import Switch from "../../comp/AdminSwitch";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  Cell,
} from "@table-library/react-table-library/table";
import {
  useSort,
  HeaderCellSort,
  SortToggleType,
} from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  DEFAULT_OPTIONS,
  getTheme,
} from "@table-library/react-table-library/material-ui";
import { FaChevronDown, FaChevronUp, FaRegEdit } from "react-icons/fa";
import "./tablecss.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
const IndirimClient = (props) => {
  const { products, settings } = props;
  const [productData, setProductData] = useState(products);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const disc = settings?.discountset;
  const [sendData, setSendData] = useState([]);

  const filteredData =
    search === ""
      ? productData
      : productData?.filter(
          (data) =>
            data?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            data?.id?.toString().includes(search?.toLowerCase())
        );
  const data = { nodes: filteredData };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const sort = useSort(
    data,
    {
      onChange: onSortChange,
    },
    {
      sortIcon: {
        iconDefault: null,
        iconUp: <FaChevronUp />,
        iconDown: <FaChevronDown />,
      },
      sortToggleType: SortToggleType.AlternateWithReset,
      sortFns: {
        ID: (array) => array.sort((a, b) => b.sells - a.sells),
        NAME: (array) => array.sort((a, b) => a?.name?.localeCompare(b?.name)),
        IND: (array) =>
          array.sort(
            (a, b) =>
              (a.indirim === true ? -1 : 1) - (b.indirim === true ? -1 : 1)
          ),
        IND1: (array) =>
          array.sort(
            (a, b) =>
              (String(disc?.indirim1) === String(a.indirimsize) ? -1 : 1) -
              (String(disc?.indirim1) === String(b.indirimsize) ? -1 : 1)
          ),
        IND2: (array) =>
          array.sort(
            (a, b) =>
              (String(disc?.indirim2) === String(a.indirimsize) ? -1 : 1) -
              (String(disc?.indirim2) === String(b.indirimsize) ? -1 : 1)
          ),
        IND3: (array) =>
          array.sort(
            (a, b) =>
              (String(disc?.indirim3) === String(a.indirimsize) ? -1 : 1) -
              (String(disc?.indirim3) === String(b.indirimsize) ? -1 : 1)
          ),
        PRICE: (array) =>
          array.sort(
            (a, b) =>
              (b.indirim === true ? b.inprice : b.price) -
              (a.indirim === true ? a.inprice : a.price)
          ),
      },
    }
  );

  function onSortChange(action, state) {
    //console.log(action, state);
  }
  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 10,
    },
    onChange: onPaginationChange,
  });
  function onPaginationChange(action, state) {}

  const totalPage = pagination?.state?.getTotalPages(data.nodes);

  const changeIndirim = (id) => {
    setProductData((prevProductData) => {
      let upindex = null;
      // Product data üzerinde map işlemi yaparak güncelleme veya ekleme yapılacak
      const updatedProductData = prevProductData.map((item, index) => {
        if (item.id === id) {
          upindex = index;
          // Eğer id eşleşirse, indirim durumu güncellenir
          return { ...item, indirim: !item.indirim };
        } else {
          return item;
        }
      });

      const updatedItem = updatedProductData[upindex];

      setSendData((prevSendData) => {
        const index = prevSendData.findIndex((item) => item.id === id);

        if (index !== -1) {
          // Eğer id eşleşen bir öğe varsa, sendData dizisinde güncelle
          const updatedSendData = [...prevSendData];
          updatedSendData[index] = updatedItem;
          return updatedSendData;
        } else {
          // Eğer eşleşen bir öğe yoksa, sendData dizisine yeni öğe ekle
          return [...prevSendData, updatedItem];
        }
      });

      return updatedProductData;
    });
  };

  const changeDisc1 = (id) => {
    setProductData((prevProductData) => {
      let upindex = null;
      // Product data üzerinde map işlemi yaparak güncelleme veya ekleme yapılacak
      const updatedProductData = prevProductData.map((item, index) => {
        if (item.id === id) {
          upindex = index;
          // Eğer id eşleşirse, indirim durumu güncellenir
          return {
            ...item,
            inprice: item.price - item.price * (disc.indirim1 / 100),
            indirimsize: disc?.indirim1?.toString(),
          };
        } else {
          return item;
        }
      });

      const updatedItem = updatedProductData[upindex];

      setSendData((prevSendData) => {
        const index = prevSendData.findIndex((item) => item.id === id);

        if (index !== -1) {
          // Eğer id eşleşen bir öğe varsa, sendData dizisinde güncelle
          const updatedSendData = [...prevSendData];
          updatedSendData[index] = updatedItem;
          return updatedSendData;
        } else {
          // Eğer eşleşen bir öğe yoksa, sendData dizisine yeni öğe ekle
          return [...prevSendData, updatedItem];
        }
      });
      return updatedProductData;
    });
  };
  const changeDisc2 = (id) => {
    setProductData((prevProductData) => {
      let upindex = null;
      // Product data üzerinde map işlemi yaparak güncelleme veya ekleme yapılacak
      const updatedProductData = prevProductData.map((item, index) => {
        if (item.id === id) {
          upindex = index;
          // Eğer id eşleşirse, indirim durumu güncellenir
          return {
            ...item,
            inprice: item.price - item.price * (disc.indirim2 / 100),
            indirimsize: disc.indirim2,
          };
        } else {
          return item;
        }
      });

      const updatedItem = updatedProductData[upindex];

      setSendData((prevSendData) => {
        const index = prevSendData.findIndex((item) => item.id === id);

        if (index !== -1) {
          // Eğer id eşleşen bir öğe varsa, sendData dizisinde güncelle
          const updatedSendData = [...prevSendData];
          updatedSendData[index] = updatedItem;
          return updatedSendData;
        } else {
          // Eğer eşleşen bir öğe yoksa, sendData dizisine yeni öğe ekle
          return [...prevSendData, updatedItem];
        }
      });

      return updatedProductData;
    });
  };

  const changeDisc3 = (id) => {
    setProductData((prevProductData) => {
      let upindex = null;
      // Product data üzerinde map işlemi yaparak güncelleme veya ekleme yapılacak
      const updatedProductData = prevProductData.map((item, index) => {
        if (item.id === id) {
          upindex = index;
          // Eğer id eşleşirse, indirim durumu güncellenir
          return {
            ...item,
            inprice: item.price - item.price * (disc.indirim3 / 100),
            indirimsize: disc.indirim3,
          };
        } else {
          return item;
        }
      });

      const updatedItem = updatedProductData[upindex];

      setSendData((prevSendData) => {
        const index = prevSendData.findIndex((item) => item.id === id);

        if (index !== -1) {
          // Eğer id eşleşen bir öğe varsa, sendData dizisinde güncelle
          const updatedSendData = [...prevSendData];
          updatedSendData[index] = updatedItem;
          return updatedSendData;
        } else {
          // Eğer eşleşen bir öğe yoksa, sendData dizisine yeni öğe ekle
          return [...prevSendData, updatedItem];
        }
      });

      return updatedProductData;
    });
  };

  const productSave = async () => {
    if (sendData.length === 0)
      await Swal.fire({
        icon: "error",
        title: "Bir Yeri Değiştirin",
        showConfirmButton: false,
        timer: 1500,
      });
    else {
      const filterdata = sendData.filter((item) => item !== undefined);
      await axios
        .post(`/api/product`, filterdata)
        .then(async () => {
          await Swal.fire({
            icon: "success",
            title: "Başarıyla Kaydedildi",
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
    }
  };

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <div className="vendor_order_boxed pt-4">
          <div className="mb-2">
            <button
              className="theme-btn-one bg-black btn_sm"
              onClick={() => productSave()}
            >
              Kaydet
            </button>
            <Link
              href="/admin/disc/pageup"
              data-toggle="tab"
              className="theme-btn-one bg-black btn_sm add_prod_button tw-mr-60"
            >
              İndirim Yeri düzenle
            </Link>
            <Link
              href="/admin/disc/update"
              data-toggle="tab"
              className="theme-btn-one bg-black btn_sm add_prod_button tw-mr-5"
            >
              İndirim Değiştir
            </Link>
          </div>
          <div>
            <input
              type="text"
              id="product_name"
              className="form-control"
              placeholder="Ara"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="table-responsive">
            <Table
              data={data}
              sort={sort}
              theme={theme}
              pagination={pagination}
            >
              {(tableList) => (
                <>
                  <Header>
                    <HeaderRow>
                      <HeaderCellSort>
                        <span className=" tw-text-gray-600 tw-text-center">
                          Resim
                        </span>
                      </HeaderCellSort>
                      <HeaderCellSort sortKey="NAME">
                        <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                          Ad
                        </span>
                      </HeaderCellSort>
                      <HeaderCellSort sortKey="PRICE">
                        <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                          Fiyatı
                        </span>
                      </HeaderCellSort>
                      <HeaderCellSort sortKey="IND">
                        <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                          İndirim Aç/Kapa
                        </span>
                      </HeaderCellSort>
                      <HeaderCellSort sortKey="IND1">
                        <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                          İndirim-1 (%{disc?.indirim1})
                        </span>
                      </HeaderCellSort>
                      <HeaderCellSort sortKey="IND2">
                        <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                          İndirim-2 (%{disc?.indirim2})
                        </span>
                      </HeaderCellSort>
                      <HeaderCellSort sortKey="IND3">
                        <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                          İndirim-3 (%{disc?.indirim3})
                        </span>
                      </HeaderCellSort>
                      <HeaderCellSort sortKey="ID">
                        <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                          Satış Miktarı
                        </span>
                      </HeaderCellSort>
                      <HeaderCellSort>
                        <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                          Düzenle/Sil
                        </span>
                      </HeaderCellSort>
                    </HeaderRow>
                  </Header>

                  <Body>
                    {tableList?.map((item) => {
                      return (
                        <Row key={item?.id}>
                          <Cell
                            className="hover:tw-bg-slate-100 tw-cursor-pointer"
                            onClick={() =>
                              router.push(`/admin/product/${item?.id}`)
                            }
                          >
                            <Link href={`/admin/product/${item.id}`}>
                              <Image
                                src={
                                  item?.ProductColorSize[0]?.images[0]?.imageurl
                                }
                                alt="image"
                                width={70}
                                height={70}
                                className="tw-object-contain"
                              />
                            </Link>
                          </Cell>
                          <Cell
                            className="hover:tw-bg-slate-100 tw-cursor-pointer"
                            onClick={() =>
                              router.push(`/admin/product/${item?.id}`)
                            }
                          >
                            <Link href={`/admin/product/${item.id}`}>
                              {item?.name}
                            </Link>
                          </Cell>
                          <Cell
                            className="hover:tw-bg-slate-100 tw-cursor-pointer"
                            onClick={() =>
                              router.push(`/admin/product/${item?.id}`)
                            }
                          >
                            {item?.indirim === true
                              ? item?.inprice.toFixed(2)
                              : item?.price.toFixed(2)}
                            €
                          </Cell>
                          <Cell>
                            <Switch
                              value={item.indirim}
                              handleCheckChange={() => changeIndirim(item.id)}
                            />
                          </Cell>
                          <Cell>
                            <Switch
                              value={
                                String(disc?.indirim1) ===
                                String(item.indirimsize)
                              }
                              handleCheckChange={() => changeDisc1(item.id)}
                            />
                          </Cell>
                          <Cell>
                            <Switch
                              value={
                                String(disc?.indirim2) ===
                                String(item.indirimsize)
                              }
                              handleCheckChange={() => changeDisc2(item.id)}
                            />
                          </Cell>
                          <Cell>
                            <Switch
                              value={
                                String(disc?.indirim3) ===
                                String(item.indirimsize)
                              }
                              handleCheckChange={() => changeDisc3(item.id)}
                            />
                          </Cell>
                          <Cell>{item?.sells || 0}</Cell>
                          <Cell>
                            <button
                              onClick={() => {
                                router.push(`/admin/product/${item?.id}`);
                              }}
                            >
                              <FaRegEdit size={26} color="green" />
                            </button>
                          </Cell>
                        </Row>
                      );
                    })}
                  </Body>
                </>
              )}
            </Table>
          </div>
          <div className="col-lg-12">
            <div className="tw-flex tw-items-center tw-justify-between tw-gap-4 tw-mb-12">
              <span className="tw-font-bold">Toplam Sayfa: {totalPage}</span>
              <div className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-mr-12">
                <span className="tw-font-bold">
                  Sayfa : {pagination?.state?.page + 1}
                </span>

                <button
                  type="button"
                  className="theme-btn-one tw-p-1 tw-text-xl tw-bg-stone-200 "
                  disabled={pagination?.state?.page === 0}
                  onClick={() => pagination.fns.onSetPage(0)}
                >
                  {"|<"}
                </button>
                <button
                  type="button"
                  className="theme-btn-one tw-p-1 tw-text-xl tw-bg-stone-200 "
                  disabled={pagination?.state?.page === 0}
                  onClick={() =>
                    pagination.fns.onSetPage(pagination.state.page - 1)
                  }
                >
                  {"<"}
                </button>
                <button
                  type="button"
                  className="theme-btn-one tw-p-1 tw-text-xl tw-bg-stone-200 "
                  disabled={pagination?.state?.page + 1 === totalPage}
                  onClick={() =>
                    pagination.fns.onSetPage(pagination.state.page + 1)
                  }
                >
                  {">"}
                </button>
                <button
                  type="button"
                  className="theme-btn-one tw-p-1 tw-text-xl tw-bg-stone-200 "
                  disabled={pagination?.state?.page + 1 === totalPage}
                  onClick={() => pagination.fns.onSetPage(totalPage - 1)}
                >
                  {">|"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndirimClient;
