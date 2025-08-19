/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";

// icons
import arrowIcon from "../assets/arrow-down.svg";

// modules
import Loader from "./modules/Loader";

function SelectionList({
  title,
  addNewItemTitle = "افزودن آیتم جدید",
  isLoadingList,
  list,
  selectedItem,
  setSelectedItem,
  setAddNewItem = () => {},
  addNewItemOption = true,
}) {
  const [openList, setOpenList] = useState(false);
  const ref = useRef(null);

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        openList && setOpenList(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openList]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between w-72">
        <label className="text-secondary">{title}</label>

        {addNewItemOption && setAddNewItem && (
          <button
            onClick={() => setAddNewItem(true)}
            className="text-secondary text-sm hover:text-primary transition-colors"
          >
            {addNewItemTitle} +
          </button>
        )}
      </div>

      <div className="relative w-fit" ref={ref}>
        <div
          className="flex items-center justify-between w-72 bg-bg_input py-1 px-3 rounded-lg cursor-pointer"
          onClick={() => setOpenList((prev) => !prev)}
        >
          <span
            className={`text-sm p-1.5 ${
              selectedItem ? "text-primary font-bold" : "text-secondary"
            }`}
          >
            {selectedItem ? selectedItem.name : "انتخاب کنید"}
          </span>
          <img
            className={`${openList ? "rotate-180" : null}`}
            src={arrowIcon}
            alt="arrow"
          />
        </div>

        {openList && (
          <div className="z-[999] absolute top-12 bg-bg_input rounded-lg w-72 max-h-52 overflow-auto ltr no-scrollbar shadow-md">
            {isLoadingList ? (
              <div className="p-4 text-center text-secondary">
                <Loader />
                <p className="mt-2">در حال بارگذاری...</p>
              </div>
            ) : list.length === 0 ? (
              <div className="p-4 text-center text-secondary">
                <p>دسته بندی‌ای موجود نیست</p>
              </div>
            ) : (
              <>
                <p
                  className={`p-1.5 cursor-pointer hover:bg-hover_primary text-sm rtl rounded-t-lg text-secondary opacity-75`}
                  onClick={() => {
                    setSelectedItem(null);
                    setOpenList(false);
                  }}
                >
                  انتخاب کنید
                </p>
                {list.map((item, index) => (
                  <p
                    className={`p-1.5 cursor-pointer hover:bg-hover_primary text-sm rtl ${
                      index === list.length - 1 ? "rounded-b-lg" : null
                    } ${
                      selectedItem?.id === item.id
                        ? "bg-hover_primary text-primary font-bold"
                        : "text-secondary"
                    }`}
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setOpenList(false);
                    }}
                  >
                    {item.name}
                  </p>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectionList;
