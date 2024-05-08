import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const HeaderFive = (props) => {
  const { cat } = props;
  const [myHeader, setMyHeader] = useState([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  const addHeader = (data) => {
    const isNameExists = myHeader.some((item) => item.name === data.name);
    if (isNameExists) {
      setMyHeader((prev) => prev.filter((c) => c.name !== data.name));
    } else {
      setMyHeader((prev) => [...prev, data]);
    }
  };

  const sumbitHeader = async () => {
    const formData = {
      headername: 6,
      name: name,
      url: url,
      header: myHeader,
    };
    await axios
      .post("/api/settings/header", formData)
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Başarıyla Kaydedildi",
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

  return (
    <div className="tw-flex tw-items-center tw-gap-3 tw-border-2 tw-border-black tw-p-4">
      <div className="tw-flex tw-gap-2 tw-flex-col ">
        <div>--Başlık 6--</div>
        <input
          type="text"
          className="form-control tw-w-32"
          placeholder="Başlık "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="form-control tw-w-32"
          placeholder="Başlık Url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          type="button"
          className="theme-btn-one tw-px-5 tw-py-3 tw-border-solid  tw-border-[1px] tw-border-black tw-m-2"
          onClick={() => sumbitHeader()}
        >
          Kaydet
        </button>
      </div>
      <div className="tw-flex tw-flex-col tw-gap-3 tw-h-56 tw-overflow-y-auto">
        {cat.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                addHeader({
                  name: item.name,
                  url: item.slug,
                  type: item.cattype,
                })
              }
              className="tw-p-2 tw-bg-slate-200 tw-rounded-full tw-cursor-pointer"
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div>=&gt;</div>
      <div>
        {myHeader.map((item, index) => {
          return <div key={index}>{item.name}</div>;
        })}
      </div>
    </div>
  );
};

export default HeaderFive;
