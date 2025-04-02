/* eslint-disable react/prop-types */
// utils
import { sp } from "../utils/numbers";

function DataTable({ data, isSellList = false }) {
  return (
    <table className="w-full relative">
      <thead className="shadow-md shadow-hover_primary sticky top-0 bg-bg_main">
        <tr>
          <th className="w-[0px] text-secondary py-2 px-6 text-start">ردیف</th>
          <th className="text-secondary py-2 px-6 text-start">کد کالا</th>
          <th className="text-secondary py-2 px-6 text-start">نام کالا</th>
          <th className="text-secondary py-2 px-6 text-start">تعداد</th>
          <th className="text-secondary py-2 px-6 text-start">
            {isSellList ? "تاریخ فروش" : "تاریخ شارژ"}
          </th>
          {isSellList && (
            <th className="text-secondary py-2 px-6 text-start">فروشنده</th>
          )}
          <th className="text-secondary py-2 px-6 text-start">قیمت خرید</th>
          <th className="text-secondary py-2 px-6 text-start">قیمت فروش</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p, index) => (
          <tr key={p.object_id}>
            <td
              className={`text-secondary font-semibold text-center py-2 px-6`}
            >
              {index + 1}
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
            <td className={`text-secondary font-semibold py-2 px-6`}>
              {sp(p.buy_price)}
            </td>
            <td className={`text-secondary font-semibold py-2 px-6`}>
              {sp(p.sell_price)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
