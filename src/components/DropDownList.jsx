/* eslint-disable react/prop-types */
// icons
import arrowIcon from "../assets/arrow-down.svg";

function DropDownList({
  ref,
  openList,
  setOpenList,
  selected,
  data,
  clickHandler,
}) {
  return (
    <div className="space-y-2">
      <label className="text-label_text">لیست کالاها</label>
      <div className="relative w-fit" ref={ref}>
        <div
          className="flex items-center justify-between w-72 bg-bg_input py-1 px-3 rounded-lg cursor-pointer"
          onClick={() =>
            data?.length > 0 ? setOpenList((prev) => !prev) : null
          }
        >
          <span
            className={`text-sm p-1.5 ${
              selected?.product_name
                ? `${
                    selected?.count > 0 ? "text-primary" : "text-warning"
                  } font-bold`
                : "text-label_text_alpha10"
            }`}
          >
            {data?.length > 0
              ? selected?.product_name
                ? selected?.product_name
                : "انتخاب کنید"
              : "کالایی وجود ندارد!"}
          </span>
          <img
            className={`${openList ? "rotate-180" : null}`}
            src={arrowIcon}
            alt="arrow"
          />
        </div>

        {openList && (
          <div className="shadow-md absolute top-12 bg-bg_input rounded-lg w-72 max-h-52 overflow-auto ltr no-scrollbar">
            {data?.map((product, index) => (
              <p
                className={`p-1.5 cursor-pointer flex gap-2 items-center hover:bg-hover_primary text-sm rtl ${
                  index === data?.length - 1 ? "rounded-b-lg" : null
                } ${
                  selected?.product_code === product.product_code
                    ? "bg-hover_primary text-primary font-bold"
                    : "text-secondary"
                } ${
                  product.count <= product.min_count ? "text-warning" : null
                }`}
                key={product.product_code}
                onClick={() => clickHandler(product)}
              >
                {product.product_name}
                {product.count <= product.min_count && (
                  <span className="font-thin text-xs">
                    (موجودی {product.count})
                  </span>
                )}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DropDownList;
