import { useEffect, useRef, useState } from "react";
import moment from "moment-jalaali";
import { format } from "date-fns-jalali";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogTitle } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalaliV3";

// components
import DataTable from "../components/DataTable";
import RoleBased from "../components/RoleBased";
import PaymentDetailsModal from "../components/modals/PaymentDetailsModal";

// icons
import arrowIcon from "../assets/arrow-down.svg";

// modules
import Loader from "../components/modules/Loader";

// services
import { getSoldProducts, getUsers } from "../services/admin";

// utils
import { userAttr } from "../utils/userAttr";

/* eslint-disable react/prop-types */
function SoldProductsPage() {
  // GET
  const { data: soldProductsData, isLoading: soldProductsLoading } = useQuery({
    queryKey: ["sold-products"],
    queryFn: getSoldProducts,
  });
  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const [soldProducts, setSoldProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [selSeller, setSelSeller] = useState({ id: "all", name: "همه" });
  const [editSoldProduct, setEditSoldProduct] = useState(null);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [openDatePicker, setOpenDatePicker] = useState({
    for: null,
    status: false,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const ref = useRef(null);

  const selectOptionHandler = (info) => {
    setSelSeller(info);
    setOpenOptions(false);
  };

  function filterByDateRange(products, fromDate, untilDate) {
    // Convert Persian (Jalali) dates to Gregorian
    const fromGregorian = moment(fromDate, "jYYYY/jMM/jDD").format(
      "YYYY-MM-DD"
    );
    const untilGregorian = moment(untilDate, "jYYYY/jMM/jDD").format(
      "YYYY-MM-DD"
    );

    return products.filter((product) => {
      const productGregorian = moment(product.soldAt, "jYYYY/jMM/jDD").format(
        "YYYY-MM-DD"
      );
      return (
        productGregorian >= fromGregorian && productGregorian <= untilGregorian
      );
    });
  }

  const filterClickHandler = () => {
    const filteredProducts = filterByDateRange(
      soldProductsData.data,
      startDate.toISOString(),
      endDate.toISOString()
    );
    setSoldProducts(
      userAttr().role === "ADMIN"
        ? filteredProducts
        : filteredProducts.filter(
            (sp) => sp.seller.user_code === userAttr().user_code
          )
    );
  };

  // update data base on selected seller
  useEffect(() => {
    if (soldProductsData?.data.length > 0) {
      userAttr().role === "ADMIN"
        ? selSeller?.id === "all"
          ? setSoldProducts(soldProductsData.data)
          : setSoldProducts(
              soldProductsData.data.filter(
                (sp) => sp.seller.user_code === selSeller.user_code
              )
            )
        : setSoldProducts(
            soldProductsData.data.filter(
              (sp) => sp.seller.user_code === userAttr().user_code
            )
          );
    }
  }, [selSeller]);

  // set sold products after it ready
  useEffect(() => {
    if (soldProductsData?.data)
      userAttr().role === "ADMIN"
        ? setSoldProducts(soldProductsData.data)
        : setSoldProducts(
            soldProductsData.data.filter(
              (sp) => sp.seller.user_code === userAttr().user_code
            )
          );
  }, [soldProductsData]);

  // set users after it ready
  useEffect(() => {
    if (usersData?.data) setSellers(usersData.data);
  }, [usersData]);

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        openOptions && setOpenOptions(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openOptions]);

  useEffect(() => {
    if (editSoldProduct) {
      setShowPaymentDetails(true);
    }
  }, [editSoldProduct]);

  useEffect(() => {
    const changeScrollBarState = (state) => {
      document.body.style.overflow = state ? "hidden" : "";
    };

    changeScrollBarState(showPaymentDetails);
  }, [showPaymentDetails]);

  return (
    <>
      <div className={`flex flex-col gap-6 p-8 w-full`}>
        {/* title */}
        <h2
          className={`font-bold text-secondary text-2xl transition-transform duration-300 ease-in-out`}
        >
          لیست فروش
        </h2>

        <div className="space-y-2 bg-bg_main rounded-xl p-4">
          {userAttr().role === "ADMIN" && (
            <h3 className="font-bold text-lg text-label_text">فروشندگان</h3>
          )}
          <div className="flex justify-between items-center">
            {/* sellers names */}
            <RoleBased>
              <div className="relative" ref={ref}>
                <div
                  className="flex items-center justify-between w-36 bg-bg_input py-1 px-3 rounded-lg cursor-pointer"
                  onClick={() => setOpenOptions((prev) => !prev)}
                >
                  <span className="text-sm text-primary font-bold">
                    {selSeller.name}
                  </span>
                  <img
                    className={`${openOptions ? "rotate-180" : null}`}
                    src={arrowIcon}
                    alt="arrow"
                  />
                </div>

                {openOptions && (
                  <div className="absolute z-[999] top-8 bg-bg_input rounded-lg w-36 shadow-md">
                    <p
                      className={`p-1 rounded-t-lg cursor-pointer text-sm hover:bg-hover_primary ${
                        selSeller.id === "all"
                          ? "bg-hover_primary text-primary font-bold"
                          : "text-secondary"
                      }`}
                      onClick={() =>
                        selectOptionHandler({ id: "all", name: "همه" })
                      }
                    >
                      همه
                    </p>
                    {sellers
                      .filter((s) => s.user_code !== userAttr().user_code)
                      .map((seller, index) => (
                        <p
                          className={`p-1 cursor-pointer text-sm hover:bg-hover_primary ${
                            index === sellers.length - 2 ? "rounded-b-lg" : null
                          } ${
                            selSeller.user_code === seller.user_code
                              ? "bg-hover_primary font-bold text-primary"
                              : "text-secondary"
                          }`}
                          key={seller.user_code}
                          onClick={() => selectOptionHandler(seller)}
                        >
                          {seller.name}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </RoleBased>

            {/* date */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary">از تاریخ</span>
              {/* from */}
              <button
                className="w-48 bg-bg_input py-1 text-secondary outline-none font-bold rounded-lg text-center"
                onClick={() => setOpenDatePicker({ for: 0, status: true })}
              >
                <p>{new Date(startDate).toLocaleDateString("fa-IR")}</p>
              </button>
              <span className="text-sm text-secondary">تا</span>
              {/* until */}
              <button
                className="w-48 bg-bg_input py-1 text-secondary outline-none font-bold rounded-lg text-center"
                onClick={() => setOpenDatePicker({ for: 1, status: true })}
              >
                <p>{new Date(endDate).toLocaleDateString("fa-IR")}</p>
              </button>
              <Dialog
                open={openDatePicker.status}
                onClose={() => setOpenDatePicker({ for: null, status: false })}
              >
                <DialogTitle>تاریخ مورد نظر را انتخاب کنید:</DialogTitle>
                <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
                  <DateCalendar
                    value={openDatePicker.for === 0 ? startDate : endDate}
                    onChange={(e) =>
                      openDatePicker.for === 0 ? setStartDate(e) : setEndDate(e)
                    }
                  />
                </LocalizationProvider>
              </Dialog>
              <button
                className="bg-bg_input py-1 px-2 text-secondary rounded-lg text-center"
                onClick={filterClickHandler}
              >
                اعمال تاریخ
              </button>
            </div>
          </div>
        </div>

        {/* data list */}
        <div className="bg-bg_main rounded-xl max-h-[25rem] overflow-auto ltr">
          {soldProductsLoading ? (
            <Loader />
          ) : soldProducts.length > 0 ? (
            <DataTable
              data={soldProducts}
              isSellList={true}
              setEditProduct={setEditSoldProduct}
            />
          ) : (
            <h1 className="text-center text-secondary font-bold py-4">
              کالای فروخته شده ای موجود نمی باشد.
            </h1>
          )}
        </div>
      </div>

      {showPaymentDetails && (
        <PaymentDetailsModal
          data={editSoldProduct}
          onClose={() => {
            setEditSoldProduct(null);
            setShowPaymentDetails(false);
          }}
        />
      )}
    </>
  );
}

export default SoldProductsPage;
