import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// components
import RoleBased from "../components/RoleBased.jsx";
import Loader from "../components/modules/Loader.jsx";
import SelectOption from "../components/SelectOption.jsx";

// services
import {
  getProducts,
  updateProduct,
  removeProduct,
} from "../services/admin.js";

// utilities
import { sp } from "../utils/numbers";
import { userAttr } from "../utils/userAttr.js";

/* eslint-disable react/prop-types */
function UpdateProduct() {
  const queryClient = useQueryClient();

  // GET
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // POST
  const { mutate: updateProductMutate, isPending: updateProductPending } =
    useMutation({
      mutationFn: updateProduct,
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("products");
        toast.success(
          `محصول با شناسه ${data.data.product_code} بروزرسانی گردید.`
        );
      },
      onError: (err) => {
        console.log(err);
      },
    });
  const { mutate: removeProductMutate, isPending: removeProductPending } =
    useMutation({
      mutationFn: removeProduct,
      onSuccess: (data) => {
        console.log(data);
        setCurrProduct(null);
        queryClient.invalidateQueries("products");
        toast.success(`محصول با شناسه ${data.data.product_code} حذف گردید.`);
      },
      onError: (err) => {
        console.log(err);
      },
    });

  const [currProduct, setCurrProduct] = useState(null);
  const [openProductsList, setOpenProductsList] = useState(false);

  const ref = useRef(null);

  const updateProductClickHandler = () => {
    console.log(currProduct);
    updateProductMutate({
      ...currProduct,
      seller: {
        name: userAttr().name,
        phone: userAttr().number,
        user_code: userAttr().user_code,
      },
    });
  };

  const removeProductClickHandler = () => {
    removeProductMutate({
      ...currProduct,
    });
  };

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

  return (
    <div className={`flex flex-col gap-6 p-8 w-full`}>
      {/* title */}
      <h2
        className={`font-bold text-secondary text-2xl transition-transform duration-300 ease-in-out`}
      >
        بروزرسانی کالا
      </h2>

      {/* body */}
      <div className="relative">
        {productsLoading && (
          <div className="absolute top-[50%] left-[50%] -translate-y-[50%]">
            <Loader />
          </div>
        )}

        <div className={`bg-bg_main rounded-xl p-4 space-y-10`}>
          {/* products names */}
          <SelectOption
            title="لیست کالاها"
            options={productsData?.data}
            selectedOption={currProduct}
            setSelectedOption={setCurrProduct}
          />

          {/* product details */}
          <div className="space-y-4">
            {/* product code */}
            <div className="space-y-1 w-72">
              <label className="text-label_text">کد کالا</label>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <p className="text-center text-secondary w-full h-5">
                  {currProduct?.product_code}
                </p>
              </div>
            </div>

            {/* product name */}
            <div className="space-y-1 w-72">
              <label className="text-label_text">نام کالا</label>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent w-full text-secondary border-none outline-none text-start"
                  type="text"
                  disabled={!currProduct}
                  value={currProduct ? currProduct?.product_name : ""}
                  placeholder="نام محصول"
                  onChange={(e) =>
                    setCurrProduct({
                      ...currProduct,
                      product_name: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* available date */}
            <div className="space-y-1 w-72">
              <label className="text-label_text">تاریخ شارژ</label>
              <div className="flex items-center justify-between gap-2 bg-bg_input p-2 rounded-lg">
                {/* <input
                  className="bg-transparent min-w-24 border-none outline-none text-center"
                  type="text"
                  value={currProduct?.updateAt}
                  onChange={(e) =>
                    setCurrProduct({ ...currProduct, updateAt: e.target.value })
                  }
                /> */}
                <p className="w-full text-center text-secondary">
                  {currProduct?.updateAt
                    ? new Date(currProduct?.updateAt).toLocaleDateString("fa")
                    : null}
                </p>
                <div className="flex items-center justify-center gap-4 px-2">
                  <div className="w-[0.09rem] h-4 bg-[#5F5F5F]" />
                  <button
                    className="text-secondary text-sm"
                    disabled={!currProduct}
                    onClick={() =>
                      setCurrProduct({
                        ...currProduct,
                        updateAt: new Date().toISOString(),
                      })
                    }
                  >
                    امروز
                  </button>
                </div>
              </div>
            </div>

            {/* product buy price */}
            <RoleBased>
              <div className="space-y-1 w-72">
                <div className="flex items-center justify-between">
                  <label className="text-label_text">قیمت خرید</label>
                  {currProduct?.buy_price && (
                    <span className="text-sm font-bold text-secondary">
                      {`${sp(currProduct?.buy_price)} ${
                        currProduct.price_unit
                      }`}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                  <input
                    className="bg-transparent border-none text-secondary outline-none text-start remove-arrow"
                    type="number"
                    disabled={!currProduct}
                    value={currProduct ? currProduct?.buy_price : ""}
                    placeholder={5000}
                    onChange={(e) =>
                      setCurrProduct({
                        ...currProduct,
                        buy_price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </RoleBased>

            {/* product sell price */}
            <div className="space-y-1 w-72">
              <div className="flex items-center justify-between">
                <label className="text-label_text">قیمت فروش</label>
                {currProduct?.sell_price && (
                  <span
                    className={`text-sm font-bold ${
                      +currProduct?.sell_price - +currProduct?.buy_price >= 0
                        ? "text-confirm"
                        : "text-warning"
                    }`}
                  >
                    {`${sp(currProduct?.sell_price)} ${currProduct.price_unit}`}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent border-none text-secondary outline-none text-start remove-arrow"
                  type="number"
                  disabled={!currProduct}
                  value={currProduct ? currProduct?.sell_price : ""}
                  placeholder={5500}
                  onChange={(e) =>
                    setCurrProduct({
                      ...currProduct,
                      sell_price: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* product count */}
            <div className="space-y-1 w-fit">
              <label className="text-label_text">تعداد</label>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent w-20 text-secondary border-none outline-none text-center"
                  type="number"
                  disabled={!currProduct}
                  value={currProduct ? currProduct?.count : ""}
                  placeholder={0}
                  onChange={(e) =>
                    e.target.value >= 0
                      ? setCurrProduct({
                          ...currProduct,
                          count: e.target.value,
                        })
                      : null
                  }
                />
              </div>
            </div>
          </div>

          {/* update & remove product */}
          <div className="flex items-center justify-end gap-2">
            <button
              className={`bg-warning rounded-lg w-32 h-12 font-bold text-white text-base flex items-center justify-center gap-4 ${
                removeProductPending || !currProduct ? "opacity-50" : null
              }`}
              disabled={removeProductPending || !currProduct}
              onClick={removeProductClickHandler}
            >
              حذف
              {removeProductPending && <Loader />}
            </button>

            <button
              className={`bg-secondary rounded-lg w-32 h-12 font-bold text-white text-base flex items-center justify-center gap-4 ${
                updateProductPending || !currProduct ? "opacity-75" : null
              }`}
              disabled={updateProductPending || !currProduct}
              onClick={updateProductClickHandler}
            >
              بروزرسانی
              {updateProductPending && <Loader />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
