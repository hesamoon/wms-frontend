/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

// icons
import arrowIcon from "../assets/arrow-down.svg";

function SelectOption({
  title,
  options,
  selectedOption,
  setSelectedOption,
  removeUnSelectedOption = false,
}) {
  const [openOption, setOpenOption] = useState(false);
  const ref = useRef();

  const optionClickHandler = (option) => {
    setSelectedOption(option);
    setOpenOption(false);
  };

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        openOption && setOpenOption(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openOption]);

  return (
    <div className="space-y-2">
      <label className="text-secondary">{title}</label>
      <div className="relative w-fit" ref={ref}>
        <div
          className="flex items-center justify-between w-72 bg-bg_input py-1 px-3 rounded-lg cursor-pointer"
          onClick={() => setOpenOption((prev) => !prev)}
        >
          <span
            className={`text-sm p-1.5 ${
              title === "لیست کالاها"
                ? selectedOption
                  ? selectedOption.count <= selectedOption.min_count
                    ? "text-warning font-bold"
                    : "text-primary font-bold"
                  : "text-secondary"
                : selectedOption
                ? "text-primary font-bold"
                : "text-secondary"
            }`}
          >
            {selectedOption
              ? title === "مشتریان" ||
                title === "نوع پرداخت" ||
                title === "واحد پول"
                ? selectedOption.name
                : selectedOption.product_name
              : "انتخاب کنید"}

            {selectedOption ? (
              title === "لیست کالاها" ? (
                selectedOption.count <= selectedOption.min_count ? (
                  <span className="text-xs">{` (${
                    selectedOption.product_unit === "عدد" ? "تعداد" : "متراژ"
                  } محدود)`}</span>
                ) : null
              ) : null
            ) : null}
          </span>
          <img
            className={`${openOption ? "rotate-180" : null}`}
            src={arrowIcon}
            alt="arrow"
          />
        </div>

        {openOption && (
          <div className="absolute top-12 bg-bg_input rounded-lg w-72 max-h-52 overflow-auto ltr no-scrollbar shadow-lg z-[999]">
            {!removeUnSelectedOption && (
              <p
                className={`p-1.5 cursor-pointer hover:bg-hover_primary text-sm rtl rounded-t-lg text-secondary opacity-75`}
                onClick={() => optionClickHandler(null)}
              >
                انتخاب کنید
              </p>
            )}
            {options.map((option, index) => (
              <p
                className={`p-1.5 cursor-pointer ${
                  title === "لیست کالاها" && option.count <= option.min_count
                    ? "hover:bg-red-100"
                    : "hover:bg-hover_primary"
                } text-sm rtl ${
                  index === options.length - 1 ? "rounded-b-lg" : null
                } ${
                  title === "مشتریان" ||
                  title === "نوع پرداخت" ||
                  title === "واحد پول"
                    ? selectedOption?.id === option?.id
                      ? "bg-hover_primary text-primary font-bold"
                      : "text-secondary"
                    : selectedOption?.object_id === option?.object_id
                    ? selectedOption.count <= selectedOption.min_count
                      ? "bg-red-100 text-warning font-bold"
                      : "bg-hover_primary text-primary font-bold"
                    : option.count <= option.min_count
                    ? "text-warning"
                    : "text-secondary"
                }`}
                key={
                  title === "مشتریان" ||
                  title === "نوع پرداخت" ||
                  title === "واحد پول"
                    ? option?.id
                    : option?.object_id
                }
                onClick={() => optionClickHandler(option)}
              >
                {title === "مشتریان" ||
                title === "نوع پرداخت" ||
                title === "واحد پول"
                  ? option?.name
                  : option?.product_name}

                {title === "لیست کالاها" && option.count <= option.min_count ? (
                  <span className="text-xs">{` (${
                    option.product_unit === "عدد" ? "تعداد" : "متراژ"
                  } محدود)`}</span>
                ) : null}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectOption;
