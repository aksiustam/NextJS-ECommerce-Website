"use client";
import React, { useEffect, useState } from "react";
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
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./tablecss.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
const SiparisClient = (props) => {
  const siparis = props.siparis.sort((item1, item2) => {
    if (item1.status === "paid" && item2.status !== "paid") {
      return -1; // item1'i item2'den önce sırala
    } else if (item1.status !== "paid" && item2.status === "paid") {
      return 1; // item2'yi item1'den önce sırala
    } else {
      return 0; // Değişiklik yapma, sıralama düzenini değiştirme
    }
  });

  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const firstCreatedAt =
      siparis?.length > 0
        ? new Date(siparis[siparis?.length - 1].createdAt)
            .toISOString()
            .split("T")[0]
        : "";
    setStartDate(firstCreatedAt);
  }, [siparis]);

  const [startDate, setStartDate] = useState("");
  const enddDate = new Date();

  enddDate.setDate(enddDate.getDate() + 1);

  const updatedEndDate = enddDate.toISOString().split("T")[0];
  const [endDate, setEndDate] = useState(updatedEndDate);
  useEffect(() => {
    const filt = siparis.filter((item) => {
      const sipDate = new Date(item?.createdAt);
      return sipDate >= new Date(startDate) && sipDate <= new Date(endDate);
    });
    setFilterSiparis(filt);
  }, [siparis, startDate, endDate]);

  const [filtersiparis, setFilterSiparis] = useState([]);

  const filteredData =
    search === ""
      ? filtersiparis
      : filtersiparis?.filter((item) => item?.siparisid === parseInt(search));

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
        ID: (array) => array.sort((a, b) => a - b),
        URUN: (array) =>
          array.sort((a, b) =>
            a?.basket[0]?.name?.localeCompare(b?.basket[0]?.name)
          ),
        DURUM: (array) =>
          array.sort((a, b) => a?.status?.localeCompare(b?.status)),
        MAIL: (array) =>
          array.sort((a, b) => a?.sendmail?.localeCompare(b?.sendmail)),
        DATE: (array) => array.sort((a, b) => a - b),
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

  return (
    <>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="vendor_order_boxed">
            <h4>All Order</h4>
            <div className="tw-flex tw-gap-12 tw-mb-3">
              <input
                type="date"
                id="date_new"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                id="date_old"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
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
                        <HeaderCellSort sortKey="ID">
                          <span className="tw-text-lg tw-text-gray-600">
                            Sipariş ID
                          </span>
                        </HeaderCellSort>
                        <HeaderCellSort sortKey="URUN">
                          <span className="tw-text-lg tw-text-gray-600">
                            Ürünler
                          </span>
                        </HeaderCellSort>
                        <HeaderCellSort sortKey="DURUM">
                          <span className="tw-text-lg tw-text-gray-600">
                            Durum
                          </span>
                        </HeaderCellSort>
                        <HeaderCellSort sortKey="MAIL">
                          <span className="tw-text-lg tw-text-gray-600">
                            Mail
                          </span>
                        </HeaderCellSort>
                        <HeaderCellSort sortKey="DATE">
                          <span className="tw-text-lg tw-text-gray-600">
                            Tarih
                          </span>
                        </HeaderCellSort>
                      </HeaderRow>
                    </Header>

                    <Body>
                      {tableList?.map((item) => {
                        const mydate = new Date(item?.createdAt);
                        const options = {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        };
                        const formattedDate = mydate?.toLocaleDateString(
                          "tr-TR",
                          options
                        );
                        const formattedTime =
                          mydate.toLocaleTimeString("tr-TR");
                        const time = formattedDate + ", Saat " + formattedTime;

                        return (
                          <Row
                            className="hover:!tw-bg-gray-200 tw-cursor-pointer"
                            onClick={() =>
                              router.push(`/admin/order/${item?.id}`)
                            }
                            key={item?.id}
                          >
                            <Cell className="!tw-text-blue-600">
                              <Link
                                href={`/admin/order/${item?.id}`}
                                className="text-primary"
                              >
                                #{item?.id}
                              </Link>
                            </Cell>
                            <Cell>
                              <Link href={`/admin/order/${item?.id}`}>
                                {item?.basket[0]?.name}
                              </Link>{" "}
                            </Cell>
                            <Cell>
                              {item?.status === "paid" && (
                                <span className="badge badge-info tw-text-sm">
                                  Ödendi
                                </span>
                              )}
                              {item?.status === "send" && (
                                <span className="badge badge-success tw-text-sm">
                                  Gönderildi
                                </span>
                              )}
                              {item?.status === "error" && (
                                <span className="badge badge-danger tw-text-sm">
                                  Hata Oluştu
                                </span>
                              )}

                              {/* <span className="badge badge-warning">
                                İşlemde
                              </span>
                              <span className="badge badge-danger">
                                İptal Edildi
                              </span> */}
                            </Cell>
                            <Cell>{item?.sendmail}</Cell>
                            <Cell>{time}</Cell>
                          </Row>
                        );
                      })}
                    </Body>
                  </>
                )}
              </Table>
            </div>
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
    </>
  );
};

export default SiparisClient;
