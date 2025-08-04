/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// utils
import { sp } from "../utils/numbers.js";
import { userAttr } from "../utils/userAttr.js";

// components
import RoleBased from "../components/RoleBased.jsx";
import SelectOption from "../components/SelectOption.jsx";
// modules
import Loader from "../components/modules/Loader.jsx";

// services
import {
  addBuyer,
  getBuyers,
  getProducts,
  sellProduct,
} from "../services/admin.js";

function SellProduct() {
  const queryClient = useQueryClient();

  // GET
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const { data: buyersData, isLoading: buyersLoading } = useQuery({
    queryKey: ["buyers"],
    queryFn: getBuyers,
  });

  // POST
  const { mutate: sellProductMutate, isPending: sellProductPending } =
    useMutation({
      mutationFn: sellProduct,
      onSuccess: (data) => {
        console.log(data);
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
        setPayMethod(null);
        setConfirmerCode(null);
        setDesc("");
        setDiscountPrice("");
        setSettlement("خیر");
        setNewUser(null);
        setSelectedCustomer(null);
      },
      onError: (err) => {
        toast.error("مشکلی در ثبت فروش کالا وجود دارد، دوباره امتحان کنید!");
      },
    });
  const { mutate: addBuyerMutate, isPending: addBuyerPending } = useMutation({
    mutationFn: addBuyer,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currProduct, setCurrProduct] = useState(null);
  const [payMethod, setPayMethod] = useState(null);
  const [confirmerCode, setConfirmerCode] = useState(null);
  const [desc, setDesc] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [settlement, setSettlement] = useState("خیر");
  const [infoToSell, setInfoToSell] = useState({
    sellPrice: "",
    count: "",
  });
  const [newUser, setNewUser] = useState(null);

  const sellClickHandler = () => {
    sellProductMutate({
      ...currProduct,
      seller: {
        name: userAttr().name,
        phone: userAttr().number,
        user_code: userAttr().user_code,
      },
      buyer: {
        name: selectedCustomer ? selectedCustomer.name : newUser?.name,
        number: selectedCustomer ? selectedCustomer.number : newUser?.number,
        address: selectedCustomer ? selectedCustomer.address : newUser?.address,
        type: selectedCustomer ? selectedCustomer.type : newUser?.type,
      },
      count: `${infoToSell.count}`,
      soldPrice: `${infoToSell.sellPrice}`,
      paymentDetails: {
        payMethod: payMethod ? payMethod.name : "",
        confirmerCode: confirmerCode ? confirmerCode : "",
        settlement: settlement,
        desc: desc,
        discountPrice: discountPrice,
      },
    });
  };

  useEffect(() => {
    setInfoToSell({
      sellPrice: currProduct?.sell_price,
      count: 1,
    });
  }, [currProduct]);

  useEffect(() => {
    setDiscountPrice(0);
  }, [infoToSell.count]);

  return (
    <div className={`flex flex-col gap-6 p-8 w-full`}>
      {/* title */}
      <h2
        className={`font-bold text-2xl text-secondary transition-transform duration-300 ease-in-out`}
      >
        فروش کالا
      </h2>

      {/* body */}
      <div className="bg-bg_main rounded-xl p-4 px-8 space-y-10 ">
        <div className="flex gap-4 justify-between">
          {/* product info */}
          <div className="space-y-10">
            {/* products names */}
            {productsLoading ? (
              <Loader />
            ) : (
              <SelectOption
                title="لیست کالاها"
                options={productsData?.data.filter(
                  (product) => product.count > 0
                )}
                selectedOption={currProduct}
                setSelectedOption={(option) => {
                  setCurrProduct(option);
                  setInfoToSell({
                    sellPrice: "",
                    count: "",
                    buyerInfo: null,
                  });
                }}
              />
            )}

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
              <RoleBased>
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
                      ? `${sp(currProduct?.buy_price)} ${
                          currProduct.price_unit
                        }`
                      : "محصول خود را انتخاب نمایید"}
                  </h3>
                </div>
              </RoleBased>

              {/* product sell price */}
              <div className="space-y-1 w-72">
                <label className="text-label_text">قیمت فروش</label>
                <h3
                  className={`flex items-center gap-2 bg-bg_input p-2 rounded-lg ${
                    currProduct?.sell_price
                      ? "text-secondary"
                      : "text-label_text_alpha10"
                  }`}
                >
                  {currProduct?.sell_price
                    ? `${sp(currProduct?.sell_price)} ${currProduct.price_unit}`
                    : "محصول خود را انتخاب نمایید"}
                </h3>
              </div>
            </div>
          </div>

          {/* buyer info */}
          <div className="space-y-4">
            <label className="text-secondary">مشخصات خریدار</label>

            {/* custumers */}
            {buyersLoading ? (
              <Loader />
            ) : (
              <SelectOption
                title="مشتریان"
                options={buyersData?.data}
                selectedOption={selectedCustomer}
                setSelectedOption={(option) => {
                  setSelectedCustomer(option);
                  setNewUser(null);
                }}
              />
            )}

            {/* customer type */}
            <div className="space-y-1 w-72">
              <label className="text-label_text">نوع مشتری</label>
              <div className="flex items-center justify-between bg-bg_input py-2 px-4 rounded-lg">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="type"
                    value="شخص حقیقی"
                    onClick={() =>
                      setNewUser({ ...newUser, type: "شخص حقیقی" })
                    }
                    checked={
                      selectedCustomer
                        ? selectedCustomer?.type === "شخص حقیقی"
                        : null
                    }
                  />
                  <label>شخص حقیقی</label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="type"
                    value="شخص حقوقی"
                    onClick={() =>
                      setNewUser({ ...newUser, type: "شخص حقوقی" })
                    }
                    checked={
                      selectedCustomer
                        ? selectedCustomer?.type === "شخص حقوقی"
                        : null
                    }
                  />
                  <label>شخص حقوقی</label>
                </div>
              </div>
            </div>

            {/* name */}
            <div className="space-y-1 w-72">
              <label className="text-label_text">نام</label>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent w-full border-none outline-none text-start remove-arrow"
                  type="text"
                  value={
                    selectedCustomer
                      ? selectedCustomer.name
                      : newUser
                      ? newUser.name
                      : ""
                  }
                  placeholder="نام"
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                />
              </div>
            </div>

            {/* number */}
            <div className="space-y-1 w-72">
              <label className="text-label_text">تلفن</label>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent w-full border-none outline-none text-start remove-arrow"
                  type="text"
                  value={
                    selectedCustomer
                      ? selectedCustomer.number
                      : newUser
                      ? newUser.number
                      : ""
                  }
                  placeholder="تلفن"
                  onChange={(e) =>
                    setNewUser({ ...newUser, number: e.target.value })
                  }
                />
              </div>
            </div>

            {/* address */}
            <div className="space-y-1 w-72">
              <label className="text-label_text">آدرس</label>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent w-full border-none outline-none text-start remove-arrow"
                  type="text"
                  value={
                    selectedCustomer
                      ? selectedCustomer.address
                      : newUser
                      ? newUser.address
                      : ""
                  }
                  placeholder="آدرس"
                  onChange={(e) =>
                    setNewUser({ ...newUser, address: e.target.value })
                  }
                />
              </div>
            </div>

            {/* add new buyer */}
            {newUser ? (
              <button
                className={`bg-secondary rounded-lg font-bold gap-4 py-2 px-4 text-white text-base flex items-center justify-center ${
                  addBuyerPending ? "opacity-75" : null
                }`}
                disabled={addBuyerPending}
                onClick={() =>
                  addBuyerMutate({
                    name: newUser.name,
                    number: newUser.number,
                    address: newUser.address,
                    type: newUser.type,
                  })
                }
              >
                ثبت مشخصات خریدار
                {addBuyerPending && <Loader />}
              </button>
            ) : null}
          </div>

          {/* payments details */}
          <div className="space-y-4">
            <label className="text-secondary">اطلاعات پرداخت</label>

            {/* payment method */}
            <SelectOption
              title="نوع پرداخت"
              options={[
                { id: 1, name: "انتقال به کارت" },
                { id: 2, name: "پوز" },
                { id: 3, name: "نقد" },
              ]}
              selectedOption={payMethod}
              setSelectedOption={(option) => {
                setPayMethod(option);
                setConfirmerCode(null);
              }}
            />

            {/* payment confirmer */}
            {payMethod && payMethod?.name !== "نقد" ? (
              <div className="space-y-1 w-72">
                <label className="text-label_text">
                  {payMethod.name === "انتقال به کارت"
                    ? "شماره پیگیری"
                    : "4 رقم آخر کارت"}
                </label>
                <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                  <input
                    className="bg-transparent w-full border-none outline-none text-start remove-arrow"
                    type="number"
                    value={confirmerCode ? confirmerCode : ""}
                    placeholder={
                      payMethod.name === "انتقال به کارت"
                        ? "123456789123"
                        : "1234"
                    }
                    onChange={(e) =>
                      payMethod.name === "انتقال به کارت"
                        ? e.target.value.length <= 12
                          ? setConfirmerCode(e.target.value)
                          : null
                        : e.target.value.length <= 4
                        ? setConfirmerCode(e.target.value)
                        : null
                    }
                  />
                </div>
              </div>
            ) : null}

            {/* has full payment been made? */}
            <div className="space-y-1 w-72">
              <label className="text-label_text">
                خریدار تسویه حساب کرده است؟
              </label>
              <div className="flex items-center justify-evenly bg-bg_input py-2 px-4 rounded-lg">
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="settlement"
                    value="بلی"
                    onClick={() => setSettlement("بلی")}
                    checked={settlement === "بلی"}
                  />
                  <label>بلی</label>
                </div>

                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="settlement"
                    value="خیر"
                    onClick={() => setSettlement("خیر")}
                    checked={settlement === "خیر"}
                  />
                  <label>خیر</label>
                </div>
              </div>
            </div>

            {/* description */}
            {settlement === "خیر" && (
              <div className="space-y-1 w-72">
                <label className="text-label_text">توضیحات روند پرداخت</label>
                <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                  <textarea
                    className="bg-transparent w-full border-none outline-none text-start text-sm remove-arrow"
                    value={desc}
                    placeholder="پرداخت 1..."
                    onChange={(e) => setDesc(e.target.value)}
                  ></textarea>
                </div>
              </div>
            )}

            {/* discount */}
            <div className="space-y-1 w-72">
              <div className="flex items-center justify-between">
                <label className="text-label_text">مبلغ تخفیف</label>
                {discountPrice > 0 && (
                  <span className="text-sm font-bold text-confirm">
                    {sp(discountPrice)} {currProduct.price_unit}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent border-none text-secondary outline-none text-start remove-arrow"
                  type="number"
                  value={discountPrice}
                  placeholder={100000}
                  onChange={(e) => {
                    const newDiscount = +e.target.value;
                    const calculatedTotal =
                      currProduct?.sell_price * infoToSell.count;

                    if (newDiscount <= calculatedTotal) {
                      setDiscountPrice(newDiscount);

                      // Update total price based on new discount
                      const newTotalPrice = calculatedTotal - newDiscount;
                      setInfoToSell({
                        ...infoToSell,
                        sellPrice: newTotalPrice,
                      });
                    } else {
                      setDiscountPrice(calculatedTotal);
                      setInfoToSell({
                        ...infoToSell,
                        sellPrice: 0,
                      });
                    }
                  }}
                />
              </div>
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
                    ? setInfoToSell({
                        sellPrice: e.target.value * currProduct?.sell_price,
                        count: e.target.value,
                      })
                    : null
                }
              />
            </div>
          </div>

          {/* total price */}
          <div className="flex items-center gap-2 w-fit">
            <label className="text-label_text">مبلغ قابل پرداخت</label>
            <div className="min-w-20 bg-bg_input p-2 rounded-lg flex items-center gap-2">
              <input
                className="text-center border-none outline-none bg-transparent"
                type="text"
                disabled={!currProduct?.count}
                value={
                  currProduct?.count
                    ? infoToSell.sellPrice
                        .toString()
                        .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g)
                        ?.join(",")
                        .toString()
                        .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d])
                    : ""
                }
                placeholder="0"
                onChange={(e) => {
                  const numericValue = e.target.value
                    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
                    .replace(/[^\d]/g, "");

                  const newTotalPrice = +numericValue;
                  const calculatedTotal =
                    currProduct?.sell_price * infoToSell.count;

                  setInfoToSell({
                    ...infoToSell,
                    sellPrice: newTotalPrice,
                  });

                  // Update discount based on new total price
                  if (newTotalPrice < calculatedTotal) {
                    const newDiscount = calculatedTotal - newTotalPrice;
                    setDiscountPrice(newDiscount);
                  } else {
                    setDiscountPrice(0);
                  }
                }}
              />

              <span className="text-sm">{currProduct?.price_unit}</span>
            </div>
          </div>

          <button
            className={`bg-secondary rounded-lg w-32 h-12 font-bold text-white text-base flex items-center justify-center gap-4 ${
              sellProductPending ||
              !currProduct ||
              (!newUser && !selectedCustomer) ||
              !payMethod
                ? "opacity-75"
                : null
            }`}
            disabled={
              sellProductPending ||
              !currProduct ||
              (!newUser && !selectedCustomer) ||
              !payMethod
            }
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
