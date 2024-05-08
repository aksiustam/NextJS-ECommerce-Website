"use client";
const AdminSwitch = ({ id, value, handleCheckChange }) => {
  return (
    <div className="tw-flex tw-items-center tw-justify-center" key={id}>
      <label className="tw-flex tw-items-center tw-cursor-pointer">
        <div className="tw-relative ">
          <input
            type="checkbox"
            className="tw-sr-only"
            checked={value}
            onChange={handleCheckChange}
          />
          <div
            className={`tw-block  tw-w-12 tw-h-8 tw-rounded-full  tw-border-2 ${
              value ? "tw-bg-green-600" : "tw-bg-gray-600"
            }`}
          ></div>
          <div
            className={`tw-dot tw-absolute tw-left-[6px] tw-top-[6px] tw-bg-white tw-w-5 tw-h-5 tw-rounded-full tw-transition-transform ${
              value ? "tw-transform tw-translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default AdminSwitch;
