"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import deleteContact from "@/app/actions/Contact/deleteContact";
import { useRouter } from "next/navigation";
const ContactClient = (props) => {
  const data = props.contact;

  const [message, setMessage] = useState("");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data?.length / itemsPerPage);
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
  const pagiData = data?.slice(startIndex, endIndex);

  const contactDelete = (data) => {
    Swal.fire({
      title: "Bu Konu SİLİNECEKTİR!! ",
      showDenyButton: true,
      confirmButtonText: "Sil",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteContact(data);
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
  pagiData?.reverse();
  return (
    <div className="row">
      <div className="col-lg-12">
        <textarea
          rows="4"
          className="form-control"
          name="message"
          placeholder="Mesaj"
          value={message}
          readOnly
        ></textarea>
      </div>
      <div className="col-lg-12">
        <div className="table-responsive">
          <table className="table pending_table">
            <thead className="thead-light">
              <tr>
                <th scope="col" className="tw-w-44">
                  Ad
                </th>
                <th scope="col" className="tw-w-44">
                  Soyad
                </th>
                <th scope="col" className="tw-w-44">
                  Mail
                </th>
                <th scope="col">Konu</th>
                <th scope="col" className="tw-w-36">
                  Düzenle/Sil
                </th>
              </tr>
            </thead>
            <tbody>
              {pagiData?.map((data) => {
                return (
                  <tr
                    key={data?.id}
                    className="hover:tw-bg-slate-100 tw-cursor-pointer"
                    onClick={() => setMessage(data?.not)}
                  >
                    <td>{data?.name}</td>
                    <td>{data?.lastname}</td>
                    <td>{data?.email}</td>
                    <td>{data?.konu}</td>
                    <td>
                      <button onClick={() => contactDelete(data)}>
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
    </div>
  );
};

export default ContactClient;
