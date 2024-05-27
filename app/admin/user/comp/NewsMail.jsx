"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import deleteMail from "@/app/actions/Mail/deleteMail";
import { useRouter } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";

const NewsMail = (props) => {
  const mailData = props.newsmail;

  const [search, setSearch] = useState("");
  const router = useRouter();
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
        const res = await deleteMail("news", id);
        if (res === true) {
          Swal.fire({
            icon: "success",
            title: "Başarıyla Silindi",
            showConfirmButton: false,
            timer: 1100,
          });
          router.refresh();
        }
      }
    });
  };
  filteredData.reverse();

  return (
    <>
      <div>Haberlerden Kaydolan Mailler</div>
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
              <th scope="col">Email</th>
              <th scope="col">Sil</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((data) => {
              return (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.email}</td>
                  <td>
                    <button onClick={() => DeleteMail(data)}>
                      <FaRegTrashAlt size={26} color="red" />
                    </button>
                  </td>
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

export default NewsMail;
