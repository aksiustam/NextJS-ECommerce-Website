"use client";
import React, { useState } from "react";

const MyUser = (props) => {
  const userData = props.users;

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(userData.length / itemsPerPage);

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
  const pagiUsers = userData.slice(startIndex, endIndex);

  const filteredData =
    search === ""
      ? pagiUsers
      : pagiUsers?.filter(
          (data) =>
            data?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            data?.email?.toLowerCase().includes(search?.toLowerCase())
        );

  filteredData?.reverse();
  return (
    <>
      <div className="tw-my-2">
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
              <th scope="col">Ad</th>
              <th scope="col">Email</th>
              <th scope="col">Haber Abone</th>
              <th scope="col">Tüm Siparişleri</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.newscheck ? "Evet" : "Hayır"}</td>
                  <td>{data.Siparis.length || 0}</td>
                </tr>
              );
            })}
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

export default MyUser;
