"use client";
const Switch = ({ id, value, handleCheckChange }) => {
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
            className={`tw-block  tw-w-8 tw-h-6 tw-rounded-full  tw-border-2 ${
              value ? "tw-bg-green-600" : "tw-bg-gray-600"
            }`}
          ></div>
          <div
            className={`tw-dot tw-absolute tw-left-[4px] tw-top-[4px] tw-bg-white tw-w-4 tw-h-4 tw-rounded-full tw-transition-transform ${
              value ? "tw-transform tw-translate-x-full" : ""
            }`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default Switch;
