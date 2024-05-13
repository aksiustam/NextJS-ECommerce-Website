"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const StockMail = (props) => {
  const mailData = props.stockmail;

  const [search, setSearch] = useState("");
  const [checkdata, setCheckData] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(mailData?.length / itemsPerPage);

  // Generate an array of page numbers
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  const generatePageGroups = () => {
    const pageGroups = [];
    for (let i = 0; i < totalPages; i += 5) {
      pageGroups.push(pageNumbers.slice(i, i + 5));
    }
    return pageGroups;
  };

  const pageGroups = generatePageGroups();
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const currentGroup = pageGroups[currentGroupIndex];

  const goToPreviousGroup = () => {
    setCurrentGroupIndex(Math.max(currentGroupIndex - 1, 0));
  };

  const goToNextGroup = () => {
    setCurrentGroupIndex(
      Math.min(currentGroupIndex + 1, pageGroups.length - 1)
    );
  };

  const calculateIndexRange = () => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const { startIndex, endIndex } = calculateIndexRange();
  const pagiMails = mailData?.slice(startIndex, endIndex);

  const filteredData =
    search === ""
      ? pagiMails
      : pagiMails?.filter((data) =>
          data?.mail?.toLowerCase().includes(search?.toLowerCase())
        );

  const DeleteMail = async (id) => {
    Swal.fire({
      title: " Bu Mail SİLİNECEKTİR!! ",
      showDenyButton: true,
      confirmButtonText: "Sil",
      denyButtonText: "Hayır",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(`${API_URL}/mail/delmail/${id}`)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Başarıyla Silindi",
              showConfirmButton: false,
              timer: 1100,
            });
            window.location.reload();
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
  filteredData?.reverse();

  const TableRow = ({ data }) => {
    return (
      <>
        <tr>
          <td
            className="hover:tw-bg-slate-100 tw-cursor-pointer"
            onClick={() => setCheckData(data)}
          >
            {data.id}
          </td>
          <td
            className="hover:tw-bg-slate-100 tw-cursor-pointer"
            onClick={() => setCheckData(data)}
          >
            {data.product[0]?.name}
          </td>
          <td
            className="hover:tw-bg-slate-100 tw-cursor-pointer"
            onClick={() => setCheckData(data)}
          >
            {data.mail}
          </td>
          <td>
            <button
              className="tw-text-red-700"
              onClick={() => DeleteMail(data._id)}
            >
              <i className="fa fa-trash fa-lg"></i>
            </button>
          </td>
        </tr>
        {checkdata?._id === data._id &&
          checkdata.product.map((item, index) => (
            <tr key={index} className="tw-py-0 tw-my-0 tw-text-xs">
              <td></td>
              <td>{item.name}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
      </>
    );
  };

  return (
    <>
      <div>Stocklardan Kaydolan Mailler</div>
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
        <table className="table pending_table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Ad</th>
              <th scope="col">Email</th>
              <th scope="col">Sil</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((data) => (
              <TableRow key={data._id} data={data} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-lg-12">
        <ul className="pagination">
          {pageNumbers?.length > 1 && (
            <>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#!"
                  onClick={goToPreviousGroup}
                  disabled={currentGroupIndex === 0}
                >
                  &laquo;
                </a>
              </li>
            </>
          )}
          {currentGroup?.map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${page === pageNumber ? "active" : ""}`}
            >
              <a
                className="page-link"
                href="#!"
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </a>
            </li>
          ))}
          {pageNumbers?.length > 1 && (
            <>
              <li className="page-item">
                <a
                  className="page-link"
                  href="#!"
                  onClick={goToNextGroup}
                  disabled={currentGroupIndex === pageGroups.length - 1}
                >
                  &raquo;
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default StockMail;
