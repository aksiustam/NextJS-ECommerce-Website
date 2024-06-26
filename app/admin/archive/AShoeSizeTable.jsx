"use client";

import Swal from "sweetalert2";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import delArchiveCategory from "../../actions/Archive/Category/delArchiveCategory";
import setArchiveCategory from "../../actions/Archive/Category/setArchiveCategory";
const AShoeSizeTable = (props) => {
  const data = props.size.filter((item) => item?.SizeType?.type === "shoe");

  const router = useRouter();

  const onDelete = async (data) => {
    Swal.fire({
      title: data.name + " Adlı Boyut Silinecek!! ",
      showDenyButton: true,
      confirmButtonText: "Sil",
      denyButtonText: "Hayır",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await delArchiveCategory("size", data);
        if (res === true) {
          Swal.fire({
            icon: "success",
            title: "Başarıyla Silindi",
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
      }
    });
  };
  const onSubmit = async (data) => {
    const res = await setArchiveCategory("size", data);
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
            <div className="table-responsive">
              <table className="table pending_table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sıra</th>
                    <th scope="col">Ad</th>
                    <th scope="col">Arşivi Kaldır</th>
                    <th scope="col">Düzenle/Arşiv</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((item) => {
                    return (
                      <tr key={item?.id}>
                        <td className="hover:tw-text-blue-600 tw-cursor-pointer">
                          #{item?.index}
                        </td>
                        <td className="hover:tw-text-blue-600 tw-cursor-pointer">
                          {item?.name}
                        </td>
                        <td>
                          <button
                            onClick={() => onSubmit(item)}
                            className="tw-bg-green-600 tw-p-2 tw-rounded-xl tw-text-white"
                          >
                            Arşiv
                          </button>
                        </td>
                        <td>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AShoeSizeTable;
