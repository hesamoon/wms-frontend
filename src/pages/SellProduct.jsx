/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// utils
import { sp } from "../utils/numbers.js";

// icons
import arrowIcon from "../assets/arrow-down.svg";

// modules
import Loader from "../components/modules/Loader.jsx";

// services
import { getProducts, sellProduct } from "../services/admin.js";
import { userAttr } from "../utils/userAttr.js";

function SellProduct() {
  const queryClient = useQueryClient();

  // GET
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // POST
  const { mutate: sellProductMutate, isPending: sellProductPending } =
    useMutation({
      mutationFn: sellProduct,
      onSuccess: (data) => {
        queryClient.invalidateQueries("sold-products");
        queryClient.invalidateQueries("products");
        toast.success(
          `${infoToSell.count} عدد از محصول ${currProduct.product_name} فروخته شد.`
        );
        setCurrProduct(null);
        setInfoToSell({
          sellPrice: "",
          count: "",
        });
      },
      onError: (err) => {
        console.log(err);
        if (err.response.data.message === "ID Exist!")
          toast.error("محصول با این کد موجود است!");
      },
    });

  const [currProduct, setCurrProduct] = useState(null);
  const [infoToSell, setInfoToSell] = useState({
    sellPrice: "",
    count: "",
  });
  const [openProductsList, setOpenProductsList] = useState(false);

  const ref = useRef(null);

  const selectProductHandler = (data) => {
    setCurrProduct(data);
    setOpenProductsList(false);
  };

  const sellClickHandler = () => {
    sellProductMutate({
      ...currProduct,
      sell_price: infoToSell.sellPrice,
      seller: {
        name: userAttr().name,
        phone: userAttr().number,
        user_code: userAttr().user_code,
      },
      count: `${infoToSell.count}`,
    });
  };

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        openProductsList && setOpenProductsList(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openProductsList]);

  useEffect(() => {
    setInfoToSell({
      sellPrice: currProduct?.sell_price,
      count: currProduct?.count,
    });
  }, [currProduct]);

  return (
    <div className={`flex flex-col gap-6 p-8 w-full`}>
      {/* title */}
      <h2
        className={`font-bold text-2xl text-secondary transition-transform duration-300 ease-in-out`}
      >
        فروش کالا
      </h2>

      {/* body */}
      <div className="bg-bg_main rounded-xl p-4 space-y-10 ">
        {/* products names */}
        <div className="space-y-2">
          <label className="text-secondary">لیست کالاها</label>
          <div className="relative w-fit" ref={ref}>
            <div
              className="flex items-center justify-between w-72 bg-bg_input py-1 px-3 rounded-lg cursor-pointer"
              onClick={() => setOpenProductsList((prev) => !prev)}
            >
              <span
                className={`text-sm p-1.5 ${
                  currProduct?.product_name
                    ? "text-primary font-bold"
                    : "text-secondary"
                }`}
              >
                {currProduct?.product_name
                  ? currProduct?.product_name
                  : "انتخاب کنید"}
              </span>
              <img
                className={`${openProductsList ? "rotate-180" : null}`}
                src={arrowIcon}
                alt="arrow"
              />
            </div>

            {openProductsList && (
              <div className="absolute top-12 bg-bg_input rounded-lg w-72 max-h-52 overflow-auto ltr no-scrollbar">
                {productsData?.data
                  .filter((product) => product.count > 0)
                  .map((product, index) => (
                    <p
                      className={`p-1.5 cursor-pointer hover:bg-hover_primary text-sm rtl ${
                        index === productsData?.data.length - 1
                          ? "rounded-b-lg"
                          : null
                      } ${
                        currProduct?.product_code === product.product_code
                          ? "bg-hover_primary text-primary font-bold"
                          : "text-secondary"
                      }`}
                      key={product.product_code}
                      onClick={() => selectProductHandler(product)}
                    >
                      {product.product_name}
                    </p>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* product details */}
        <div className="space-y-4">
          {/* product code */}
          <div className="space-y-1 w-72">
            <label className="text-label_text">کد کالا</label>
            <h3
              className={`text-center gap-2 bg-bg_input p-2 rounded-lg ${
                currProduct?.count
                  ? "text-secondary"
                  : "text-label_text_alpha10"
              }`}
            >
              {currProduct?.product_code
                ? currProduct?.product_code
                : "محصول خود را انتخاب نمایید"}
            </h3>
          </div>

          {/* product name */}
          <div className="space-y-1 w-72">
            <label className="text-label_text">نام کالا</label>
            <h3
              className={`gap-2 bg-bg_input p-2 rounded-lg ${
                currProduct?.product_name
                  ? "text-secondary"
                  : "text-label_text_alpha10"
              }`}
            >
              {currProduct?.product_name
                ? currProduct?.product_name
                : "محصول خود را انتخاب نمایید"}
            </h3>
          </div>

          {/* product buy price */}
          <div className="space-y-1 w-72">
            <label className="text-label_text">قیمت خرید</label>
            <h3
              className={`flex items-center gap-2 bg-bg_input p-2 rounded-lg ${
                currProduct?.buy_price
                  ? "text-secondary"
                  : "text-label_text_alpha10"
              }`}
            >
              {currProduct?.buy_price
                ? `${sp(currProduct?.buy_price)} تومان`
                : "محصول خود را انتخاب نمایید"}
            </h3>
          </div>

          {/* product sell price */}
          <div className="space-y-1 w-72">
            <div className="flex items-center justify-between">
              <label className="text-label_text">قیمت فروش</label>
              {infoToSell.sellPrice && (
                <span
                  className={`text-sm font-bold ${
                    +infoToSell.sellPrice - +currProduct?.buy_price >= 0
                      ? "text-confirm"
                      : "text-warning"
                  }`}
                >
                  {/* {((+infoToSell.sellPrice- +currProduct.buyPrice)/+currProduct.buyPrice)*100} */}
                  {+infoToSell.sellPrice - +currProduct?.buy_price >= 0
                    ? "سود"
                    : "ضرر"}{" "}
                  {sp(+infoToSell.sellPrice - +currProduct?.buy_price)} -{" "}
                  {sp(infoToSell.sellPrice)} تومان
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent w-full border-none outline-none text-start remove-arrow"
                type="number"
                disabled={!currProduct?.sell_price}
                value={infoToSell.sellPrice}
                placeholder="مبلغ فروش خود را وارد بفرمایید"
                onChange={(e) =>
                  setInfoToSell({ ...infoToSell, sellPrice: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* sell product */}
        <div className="flex items-center gap-4 justify-end">
          {/* product count */}
          <div className="flex items-center gap-2 w-fit">
            <label className="text-label_text">تعداد</label>
            <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent w-20 border-none outline-none text-center"
                type="number"
                disabled={!currProduct?.count}
                value={infoToSell.count}
                placeholder={1}
                onChange={(e) =>
                  e.target.value >= 1 && e.target.value <= currProduct?.count
                    ? setInfoToSell({ ...infoToSell, count: e.target.value })
                    : null
                }
              />
            </div>
          </div>

          <button
            className={`bg-secondary rounded-lg w-32 h-12 font-bold text-white text-base flex items-center justify-center gap-4 ${
              sellProductPending || !currProduct ? "opacity-75" : null
            }`}
            disabled={sellProductPending || !currProduct}
            onClick={sellClickHandler}
          >
            ثبت
            {sellProductPending && <Loader />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellProduct;
