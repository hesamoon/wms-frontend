/* eslint-disable react/prop-types */
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// components
import RoleBased from "../RoleBased";
// modules
import Spinner from "../modules/Spinner";

// services
import { updatePaymentDetails } from "../../services/admin";

// utils
import { sp } from "../../utils/numbers";

function PaymentDetailsModal({ data, onClose }) {
  const queryClient = useQueryClient();

  // POST
  const {
    mutate: updatePaymentDetailsMutate,
    isPending: updatePaymentDetailsPending,
  } = useMutation({
    mutationFn: updatePaymentDetails,
    onSuccess: (dataSuccess) => {
      queryClient.invalidateQueries("sold-products");

      if (dataSuccess.data.success) {
        if (btnState === 1) {
          toast.success("وضعیت پرداخت مشتری به تسویه شده تغییر کرد");
        } else {
          toast.success(dataSuccess.data.message);
        }
      } else {
        toast.error(dataSuccess.data.message);
      }

      if (btnState === 1) onClose();
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.message);
    },
  });

  const [desc, setDesc] = useState(data.paymentDetails.desc);
  const [btnState, setBtnState] = useState(-1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start overflow-auto no-scrollbar scroll-smooth z-[999] py-10">
      <div className="flex flex-col bg-white rounded-lg divide-y-2 overflow-scroll no-scrollbar">
        {/* Header */}
        <div className="flex items-center gap-2 py-4 px-6">
          {/* title */}
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClose}
            className="cursor-pointer"
          >
            <path
              d="M1.96533 1.26271L15.158 14.4554M1.96533 14.4554L15.158 1.26271"
              stroke="#292929"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* close button */}
          <h3 className="text-bsae text-black">صورت حساب</h3>
        </div>

        {/* body */}
        <div className="divide-y-2">
          {/* customer details */}
          <div>
            <h3 className="py-4 px-5 font-semibold text-base text-secondary">
              اطلاعات مشتری
            </h3>

            <table className="w-full">
              <thead className="shadow-md shadow-hover_primary text-sm">
                <tr>
                  <th className="text-secondary py-2 px-6 text-start">نام</th>
                  <th className="text-secondary py-2 px-6 text-start">
                    شماره تماس
                  </th>
                  <th className="text-secondary py-2 px-6 text-start">آدرس</th>
                  <th className="text-secondary py-2 px-6 text-start">
                    نوع مشتری
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className={`text-secondary font-semibold py-2 px-6`}>
                    {data.buyer.name}
                  </td>
                  <td className={`font-semibold py-2 px-6 text-secondary`}>
                    {data.buyer.number}
                  </td>
                  <td className={`font-semibold py-2 px-6 text-secondary`}>
                    {data.buyer.address}
                  </td>
                  <td className={`font-semibold py-2 px-6 text-secondary`}>
                    {data.buyer.type}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* product details */}
          <div>
            <h3 className="py-4 px-5 font-semibold text-base text-secondary">
              اطلاعات کالا
            </h3>

            <table className="w-full">
              <thead className="shadow-md shadow-hover_primary text-sm">
                <tr>
                  <th className="text-secondary py-2 px-6 text-start">دسته</th>
                  <th className="text-secondary py-2 px-6 text-start">
                    کد کالا
                  </th>
                  <th className="text-secondary py-2 px-6 text-start">
                    نام کالا
                  </th>
                  <RoleBased>
                    <th className="text-secondary py-2 px-6 text-start">
                      قیمت خرید
                    </th>
                  </RoleBased>
                  <th className="text-secondary py-2 px-6 text-start">
                    قیمت فروش
                  </th>
                  <th className="text-secondary py-2 px-6 text-center">
                    تعداد
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className={`text-secondary font-semibold py-2 px-6`}>
                    {data.product_category?.name}
                  </td>
                  <td className={`text-secondary font-semibold py-2 px-6`}>
                    {data.product_code}
                  </td>
                  <td className={`font-semibold py-2 px-6 text-secondary`}>
                    {data.product_name}
                  </td>
                  <RoleBased>
                    <td className={`text-secondary font-semibold py-2 px-6`}>
                      {sp(data.buy_price)}
                      <span className="text-xs pr-1">{data.price_unit}</span>
                    </td>
                  </RoleBased>
                  <td className={`text-secondary font-semibold py-2 px-6`}>
                    {sp(data.sell_price)}
                    <span className="text-xs pr-1">{data.price_unit}</span>
                  </td>
                  <td
                    className={`font-semibold py-2 px-6 text-secondary text-center`}
                  >
                    {data.count}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* payment details */}
          <div>
            <h3 className="py-4 px-5 font-semibold text-base text-secondary">
              اطلاعات پرداخت
            </h3>

            <table className="w-full">
              <thead className="shadow-md shadow-hover_primary text-sm">
                <tr>
                  <th className="text-secondary py-2 px-6 text-start">
                    نوع پرداخت
                  </th>
                  <th className="text-secondary py-2 px-6 text-start">
                    کد رهگیری
                  </th>
                  <th className="text-secondary py-2 px-6 text-start">
                    مقدار تخفیف
                  </th>
                  <th className="text-secondary py-2 px-6 text-start">
                    مبلغ قابل پرداخت
                  </th>
                  <th className="text-secondary py-2 px-6 text-start">
                    توضیحات روند پرداخت{" "}
                    {data.paymentDetails.settlement === "خیر" ? (
                      <span className="text-[10px] text-warning">
                        (قابل ویرایش)
                      </span>
                    ) : null}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className={`text-secondary font-semibold py-2 px-6`}>
                    {data.paymentDetails.payMethod}
                  </td>
                  <td className={`font-semibold py-2 px-6 text-secondary`}>
                    {data.paymentDetails.confirmerCode}
                  </td>
                  <td className={`font-semibold py-2 px-6 text-secondary`}>
                    {sp(data.paymentDetails.discountPrice)}
                    <span className="text-xs pr-1">{data.price_unit}</span>
                  </td>
                  <td className={`text-secondary font-semibold py-2 px-6`}>
                    {sp(
                      data.count * data.sell_price -
                        data.paymentDetails.discountPrice
                    )}
                    <span className="text-xs pr-1">{data.price_unit}</span>
                  </td>
                  <td className={`font-semibold py-2 px-6 text-secondary`}>
                    {data.paymentDetails.settlement === "بلی" ? (
                      <textarea
                        className="bg-transparent w-full resize-none border-none outline-none text-start text-sm remove-arrow"
                        rows={5}
                        value={data.paymentDetails.desc}
                      ></textarea>
                    ) : (
                      <textarea
                        className="bg-transparent w-full border-none outline-none text-start text-sm remove-arrow"
                        rows={5}
                        value={desc}
                        placeholder="پرداخت 1..."
                        onChange={(e) => setDesc(e.target.value)}
                      ></textarea>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* footer */}
        {data.paymentDetails.settlement === "خیر" ? (
          <footer className="flex items-center justify-end gap-4 p-3">
            <button
              className={`text-secondary rounded-lg py-2 px-4 font-bold hover:bg-hover_primary transition-all ease-linear duration-300 text-sm flex items-center justify-center gap-4 ${
                updatePaymentDetailsPending ? "opacity-75" : null
              }`}
              disabled={updatePaymentDetailsPending}
              onClick={() => {
                setBtnState(0);
                updatePaymentDetailsMutate({
                  desc: desc,
                  settlement: data.paymentDetails.settlement,
                  id: data.object_id,
                });
              }}
            >
              بروزرسانی
              {updatePaymentDetailsPending && <Spinner size={20} />}
            </button>

            <button
              className={`text-white bg-secondary rounded-lg py-2 px-4 font-bold hover:bg-[#55768b9a] transition-all ease-linear duration-300 text-sm flex items-center justify-center gap-4 ${
                updatePaymentDetailsPending ? "opacity-75" : null
              }`}
              disabled={updatePaymentDetailsPending}
              onClick={() => {
                setBtnState(1);
                updatePaymentDetailsMutate({
                  desc: desc,
                  settlement: "بلی",
                  id: data.object_id,
                });
              }}
            >
              تسویه حساب
              {updatePaymentDetailsPending && <Spinner size={20} />}
            </button>
          </footer>
        ) : null}
      </div>
    </div>
  );
}

export default PaymentDetailsModal;
