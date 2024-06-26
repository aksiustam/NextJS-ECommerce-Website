"use client";
import { useState } from "react";
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
import {
  FaChevronDown,
  FaChevronUp,
  FaRegEdit,
  FaRegTrashAlt,
} from "react-icons/fa";
import "./tablecss.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import delArcProduct from "../../actions/Archive/Products/delArcProduct";
import setArcProduct from "../../actions/Archive/Products/setArcProduct";
const AProductsTable = (props) => {
  const pdata = props.products;
  const router = useRouter();

  const [search, setSearch] = useState("");
  const filteredData =
    search === ""
      ? pdata
      : pdata?.filter(
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
        CLICK: (array) => array.sort((a, b) => b.onclick - a.onclick),
        SELL: (array) => array.sort((a, b) => b.sells - a.sells),
        NAME: (array) => array.sort((a, b) => a?.name?.localeCompare(b?.name)),
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

  const productDelete = async (item) => {
    Swal.fire({
      title: item.name + " Adlı Ürün Silinecek!! ",
      showDenyButton: true,
      confirmButtonText: "Sil",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await delArcProduct(item);
        if (res === true) {
          Swal.fire({
            icon: "success",
            title: "Başarıyla Silindi",
            showConfirmButton: false,
            timer: 700,
          });
          router.refresh();
        } else {
          Swal.fire({
            icon: "error",
            title: JSON.stringify(res.message),
          });
        }
      }
    });
  };

  const onSubmit = async (data) => {
    const res = await setArcProduct(data);
    if (res === true) {
      Swal.fire({
        icon: "success",
        title: "Başarıyla Kaldırıldı",
        showConfirmButton: false,
        timer: 1500,
      });
      router.refresh();
    } else {
      Swal.fire({
        icon: "error",
        title: JSON.stringify(res.message),
      });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="vendor_order_boxed pt-4">
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
                          <span className="tw-text-gray-600 tw-text-center">
                            Resim
                          </span>
                        </HeaderCellSort>
                        <HeaderCellSort sortKey="NAME">
                          <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                            Ad
                          </span>
                        </HeaderCellSort>
                        <HeaderCellSort sortKey="CLICK">
                          <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                            Tıklanma Miktarı
                          </span>
                        </HeaderCellSort>

                        <HeaderCellSort sortKey="SELL">
                          <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                            Satış Miktarı
                          </span>
                        </HeaderCellSort>
                        <HeaderCellSort>
                          <span className="tw-text-sm tw-text-gray-600 tw-text-center">
                            ARŞİVİ KALDIR
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
                                    item?.ProductColorSize[0]?.images[0]
                                      ?.imageurl
                                  }
                                  alt="image"
                                  width={70}
                                  height={70}
                                  loading="eager"
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

                            <Cell>{item?.onclick || 0}</Cell>
                            <Cell>{item?.sells || 0}</Cell>
                            <Cell>
                              <button
                                onClick={() => onSubmit(item)}
                                className="tw-bg-green-600 tw-p-2 tw-rounded-xl tw-text-white"
                              >
                                Arşiv
                              </button>
                            </Cell>
                            <Cell>
                              <button
                                onClick={() => {
                                  router.push(`/admin/product/${item?.id}`);
                                }}
                              >
                                <FaRegEdit size={26} color="green" />
                              </button>

                              <button onClick={() => productDelete(item)}>
                                <FaRegTrashAlt size={26} color="red" />
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
    </>
  );
};

export default AProductsTable;
