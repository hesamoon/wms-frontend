/* eslint-disable react/prop-types */
// utils
import { sp } from "../utils/numbers";

// components
import RoleBased from "./RoleBased";

function DataTable({ data, isSellList = false, setEditProduct }) {
  return (
    <table className="w-full relative rtl">
      <thead className="shadow-md shadow-hover_primary sticky top-0 bg-bg_main">
        <tr>
          <th className="w-[0px] text-secondary py-2 px-6 text-start">ردیف</th>
          <RoleBased>
            <th className="text-secondary py-2 px-6 text-start">کد انبار</th>
          </RoleBased>
          <th className="text-secondary py-2 px-6 text-start">دسته کالا</th>
          <th className="text-secondary py-2 px-6 text-start">کد کالا</th>
          <th className="text-secondary py-2 px-6 text-start">نام کالا</th>
          <th className="text-secondary py-2 px-6 text-start">تعداد</th>
          <th className="text-secondary py-2 px-6 text-start">
            {isSellList ? "تاریخ فروش" : "تاریخ شارژ"}
          </th>
          {isSellList && (
            <th className="text-secondary py-2 px-6 text-start">فروشنده</th>
          )}
          {isSellList ? (
            <th className="text-secondary py-2 px-6 text-start">مبلغ کل</th>
          ) : (
            <>
              <RoleBased>
                <th className="text-secondary py-2 px-6 text-start">
                  قیمت خرید
                </th>
              </RoleBased>
              <th className="text-secondary py-2 px-6 text-start">قیمت فروش</th>
            </>
          )}
          {isSellList && (
            <th className="text-secondary py-2 px-6 text-start">
              وضعیت پرداخت
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {data
          .sort((a, b) => {
            return (
              (b.paymentDetails?.settlement === "خیر") -
              (a.paymentDetails?.settlement === "خیر")
            );
          })
          .map((p, index) => (
            <tr key={p.object_id}>
              <td
                className={`text-secondary font-semibold text-center py-2 px-6`}
              >
                {index + 1}
              </td>
              <RoleBased>
                <td className={`text-secondary font-semibold py-2 px-6`}>
                  {p.warehouse_code}
                </td>
              </RoleBased>
              <td className={`text-secondary font-semibold py-2 px-6`}>
                {p.product_category?.name}
              </td>
              <td
                className={`${
                  p.count === 0 ? "text-warning_hover" : "text-secondary"
                } font-semibold py-2 px-6`}
              >
                {p.product_code}
              </td>
              <td
                className={`${
                  p.count === 0 ? "text-warning_hover" : "text-secondary"
                } font-semibold py-2 px-6`}
              >
                {p.product_name}
              </td>
              <td
                className={`font-semibold py-2 px-6 ${
                  p.count === 0 ? "text-warning_hover" : "text-secondary"
                }`}
              >
                {p.count}
              </td>
              <td
                className={`${
                  p.count === 0 ? "text-warning_hover" : "text-secondary"
                } font-semibold py-2 px-6`}
              >
                {isSellList
                  ? new Date(p.soldAt).toLocaleDateString("fa-IR")
                  : new Date(p.updateAt).toLocaleDateString("fa-IR")}
              </td>
              {isSellList && (
                <td className={`text-secondary font-semibold py-2 px-6`}>
                  {p.seller.name}
                </td>
              )}
              {isSellList ? (
                <td className={`text-secondary font-semibold py-2 px-6`}>
                  {sp(p.count * p.sell_price - p.paymentDetails?.discountPrice)}
                  <span className="text-xs pr-1">{p.price_unit}</span>
                </td>
              ) : (
                <>
                  <RoleBased>
                    <td className={`text-secondary font-semibold py-2 px-6`}>
                      {sp(p.buy_price)}
                      <span className="text-xs pr-1">{p.price_unit}</span>
                    </td>
                  </RoleBased>

                  <td className={`text-secondary font-semibold py-2 px-6`}>
                    {sp(p.sell_price)}
                    <span className="text-xs pr-1">{p.price_unit}</span>
                  </td>
                </>
              )}
              {isSellList && (
                <td className={`font-semibold py-2 px-6`}>
                  {/* update btn */}
                  <button onClick={() => setEditProduct(p)}>
                    {p.paymentDetails?.settlement === "خیر" ? (
                      <div className="flex items-center gap-1">
                        <span className="text-warning">تسویه نشده</span>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.92971 19.283L5.92972 19.283L5.95149 19.2775L5.95151 19.2775L8.58384 18.6194C8.59896 18.6156 8.61396 18.6119 8.62885 18.6082C8.85159 18.5528 9.04877 18.5037 9.2278 18.4023C9.40683 18.301 9.55035 18.1571 9.71248 17.9947C9.72332 17.9838 9.73425 17.9729 9.74527 17.9618L16.9393 10.7678L16.9393 10.7678L16.9626 10.7445C17.2761 10.4311 17.5461 10.1611 17.7333 9.91573C17.9339 9.65281 18.0858 9.36038 18.0858 9C18.0858 8.63961 17.9339 8.34719 17.7333 8.08427C17.5461 7.83894 17.276 7.5689 16.9626 7.2555L16.9393 7.23223L16.5858 7.58579L16.9393 7.23223L16.7678 7.06066L16.7445 7.03738C16.4311 6.72395 16.1611 6.45388 15.9157 6.2667C15.6528 6.0661 15.3604 5.91421 15 5.91421C14.6396 5.91421 14.3472 6.0661 14.0843 6.2667C13.8389 6.45388 13.5689 6.72395 13.2555 7.03739L13.2322 7.06066L6.03816 14.2547C6.02714 14.2658 6.01619 14.2767 6.00533 14.2875C5.84286 14.4496 5.69903 14.5932 5.59766 14.7722C5.4963 14.9512 5.44723 15.1484 5.39179 15.3711C5.38809 15.386 5.38435 15.401 5.38057 15.4162L4.71704 18.0703C4.71483 18.0791 4.7126 18.088 4.71036 18.097C4.67112 18.2537 4.62921 18.421 4.61546 18.5615C4.60032 18.7163 4.60385 18.9773 4.81326 19.1867C5.02267 19.3961 5.28373 19.3997 5.43846 19.3845C5.57899 19.3708 5.74633 19.3289 5.90301 19.2896C5.91195 19.2874 5.92085 19.2852 5.92971 19.283Z"
                            stroke="#222222"
                          />
                          <path
                            d="M12.5 7.5L15.5 5.5L18.5 8.5L16.5 11.5L12.5 7.5Z"
                            fill="#222222"
                          />
                        </svg>
                      </div>
                    ) : (
                      <div className="text-confirm">تسویه شده</div>
                    )}
                  </button>
                </td>
              )}
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default DataTable;
