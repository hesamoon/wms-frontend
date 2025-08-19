/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// icons
import arrowIcon from "../assets/arrow-down.svg";

// services
import { createProduct } from "../services/admin.js";

// modules
import Loader from "../components/modules/Loader.jsx";

// utils
import { sp } from "../utils/numbers.js";
import { userAttr } from "../utils/userAttr.js";

// hooks
import { useCategories } from "../hooks/useCategories.js";

// components
import SelectOption from "../components/SelectOption.jsx";
import SelectionList from "../components/SelectionList.jsx";
import AddCategoryModal from "../components/modals/AddCategoryModal.jsx";

// validation
import { addSchema } from "../validationSchemas/productSchema.js";

function AddProduct() {
  const queryClient = useQueryClient();

  // Categories hook
  const {
    categories,
    categoriesLoading,
    createCategoryMutate,
    createCategoryPending,
  } = useCategories();

  // Modal state
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  // Validation errors state
  const [errors, setErrors] = useState({});

  // POST
  const { mutate: createProductMutate, isPending: createProductPending } =
    useMutation({
      mutationFn: createProduct,
      onSuccess: (data) => {
        queryClient.invalidateQueries("products");
        toast.success(`محصول با کد ${data.data.product_code} ایجاد گردید.`);
        setProduct({
          pCode: "",
          pName: "",
          pCategory: null,
          pAvailableDate: "",
          pBuyPrice: "",
          pSellPrice: "",
          pUnit: "",
          pMinCount: 0,
          pCount: 0,
          priceUnit: null,
        });
        setErrors({});
      },
      onError: (err) => {
        console.log(err);
        if (err.response.data.message === "ID Exist!")
          toast.error("محصول با این کد موجود است!");
      },
    });

  const [product, setProduct] = useState({
    pCode: "",
    pName: "",
    pCategory: null,
    pAvailableDate: "",
    pBuyPrice: "",
    pSellPrice: "",
    pUnit: "",
    pMinCount: 0,
    pCount: 0,
    priceUnit: null,
  });

  const [openUnitsList, setOpenUnitsList] = useState(false);

  const ref1 = useRef(null);

  function genRandonCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }

    return result;
  }

  const validateForm = () => {
    try {
      addSchema.parse(product);
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      if (error.errors && Array.isArray(error.errors)) {
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
      } else if (error.issues && Array.isArray(error.issues)) {
        error.issues.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
      }
      setErrors(newErrors);
      return false;
    }
  };

  const addProductClickHandler = () => {
    if (!validateForm()) {
      toast.error("لطفاً خطاهای فرم را برطرف کنید");
      return;
    }

    const productCode = genRandonCode();
    const newProduct = {
      warehouseCode: "IR2025",
      productCode: productCode,
      productName: product.pName,
      productCategory: {
        code: product.pCategory.code,
        name: product.pCategory.name,
      },
      productUnit: product.pUnit,
      priceUnit: product.priceUnit.name,
      minQty: product.pMinCount,
      qty: product.pCount,
      buyPrice: product.pBuyPrice,
      sellPrice: product.pSellPrice,
      seller: {
        name: userAttr().name,
        phone: userAttr().number,
        user_code: userAttr().user_code,
      },
    };
    createProductMutate(newProduct);
  };

  const handleAddCategory = (categoryData) => {
    createCategoryMutate(categoryData, {
      onSuccess: (newCategory) => {
        // Auto-select the newly added category
        setProduct({ ...product, pCategory: newCategory.data });
        setShowAddCategoryModal(false);
      },
    });
  };

  // handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref1.current && !ref1.current.contains(event.target)) {
        openUnitsList && setOpenUnitsList(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [openUnitsList]);

  return (
    <div className={`flex flex-col gap-6 p-8 w-full`}>
      {/* title */}
      <h2
        className={`font-bold text-secondary text-2xl transition-transform duration-300 ease-in-out`}
      >
        افزودن کالا
      </h2>

      {/* body */}
      <div className="bg-bg_main rounded-xl p-4 space-y-20">
        {/* product details */}
        <div className="space-y-4">
          {/* product code */}
          {/* <div className="space-y-1 w-72">
            <label className="text-label_text">کد کالا</label>
            <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent min-w-20 border-none outline-none text-secondary text-center"
                type="text"
                value={product.pCode}
                onChange={(e) =>
                  e.target.value.length <= 8
                    ? setProduct({ ...product, pCode: e.target.value })
                    : null
                }
              />
              <div className="w-[0.09rem] h-4 bg-[#5F5F5F]" />
              <button
                className="text-secondary text-sm whitespace-nowrap"
                onClick={() =>
                  setProduct({ ...product, pCode: genRandonCode() })
                }
              >
                تولید خودکار
              </button>
            </div>
          </div> */}

          {/* categories */}
          <div className="space-y-2">
            <SelectionList
              title="انتخاب دسته"
              addNewItemTitle="افزودن دسته جدید"
              isLoadingList={categoriesLoading}
              list={categories?.data}
              selectedItem={product.pCategory}
              setAddNewItem={setShowAddCategoryModal}
              setSelectedItem={(item) =>
                setProduct({ ...product, pCategory: item })
              }
            />
            {errors.pCategory && (
              <p className="text-red-500 text-sm">{errors.pCategory}</p>
            )}
          </div>

          {/* product name */}
          <div className="space-y-1 w-72">
            <label className="text-label_text">نام کالا</label>
            <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent w-full border-none outline-none text-secondary text-start"
                type="text"
                value={product.pName}
                placeholder="نام محصول"
                onChange={(e) =>
                  setProduct({ ...product, pName: e.target.value })
                }
              />
            </div>
            {errors.pName && (
              <p className="text-red-500 text-sm">{errors.pName}</p>
            )}
          </div>

          {/* available date
          <div className="space-y-1 w-72">
            <label className="text-label_text">تاریخ شارژ</label>
            <div className="flex items-center justify-between gap-2 bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent min-w-24 border-none outline-none text-center"
                type="text"
                value={product.pAvailableDate}
                onChange={(e) =>
                  setProduct({ ...product, pAvailableDate: e.target.value })
                }
              />
              <div className="w-[0.09rem] h-4 bg-[#5F5F5F]" />
              <button
                className="text-[#5F5F5F] text-sm ml-4"
                onClick={() =>
                  setProduct({
                    ...product,
                    pAvailableDate: p2e(new Date().toLocaleDateString("fa-IR")),
                  })
                }
              >
                الان
              </button>
            </div>
          </div> */}

          {/* price unit */}
          <div className="space-y-2">
            <SelectOption
              title="واحد پول"
              options={[
                { id: 1, name: "تومان" },
                { id: 2, name: "درهم" },
                { id: 3, name: "دلار" },
              ]}
              selectedOption={product.priceUnit}
              setSelectedOption={(option) =>
                setProduct({ ...product, priceUnit: option })
              }
              removeUnSelectedOption={true}
            />
            {errors.priceUnit && (
              <p className="text-red-500 text-sm">{errors.priceUnit}</p>
            )}
          </div>

          {/* product buy price */}
          <div className="space-y-1 w-72">
            <div className="flex items-center justify-between">
              <label className="text-label_text">قیمت خرید</label>
              {product.pBuyPrice && (
                <span className="text-sm font-bold text-secondary">
                  {sp(product.pBuyPrice)} {product.priceUnit.name}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent border-none outline-none text-secondary text-start remove-arrow"
                type="number"
                value={product.pBuyPrice}
                placeholder={5000}
                onChange={(e) =>
                  setProduct({ ...product, pBuyPrice: e.target.value })
                }
              />
            </div>
            {errors.pBuyPrice && (
              <p className="text-red-500 text-sm">{errors.pBuyPrice}</p>
            )}
          </div>

          {/* product sell price */}
          <div className="space-y-1 w-72">
            <div className="flex items-center justify-between">
              <label className="text-label_text">قیمت فروش</label>
              {product.pSellPrice && (
                <span
                  className={`text-sm font-bold ${
                    +product.pSellPrice - +product.pBuyPrice >= 0
                      ? "text-confirm"
                      : "text-warning"
                  }`}
                >
                  {sp(product.pSellPrice)} {product.priceUnit.name}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
              <input
                className="bg-transparent border-none text-secondary outline-none text-start remove-arrow"
                type="number"
                value={product.pSellPrice}
                placeholder={5500}
                onChange={(e) =>
                  setProduct({ ...product, pSellPrice: e.target.value })
                }
              />
            </div>
            {errors.pSellPrice && (
              <p className="text-red-500 text-sm">{errors.pSellPrice}</p>
            )}
          </div>

          {/* unit */}
          <div className="space-y-2">
            <label className="text-secondary">واحد شمارش</label>
            <div className="relative w-fit" ref={ref1}>
              <div
                className="flex items-center justify-between w-72 bg-bg_input py-1 px-3 rounded-lg cursor-pointer"
                onClick={() => setOpenUnitsList((prev) => !prev)}
              >
                <span
                  className={`text-sm p-1.5 ${
                    product.pUnit ? "text-primary font-bold" : "text-secondary"
                  }`}
                >
                  {product.pUnit ? product.pUnit : "انتخاب کنید"}
                </span>
                <img
                  className={`${openUnitsList ? "rotate-180" : null}`}
                  src={arrowIcon}
                  alt="arrow"
                />
              </div>

              {openUnitsList && (
                <div className="absolute top-12 bg-bg_input rounded-lg w-72 max-h-52 overflow-auto ltr no-scrollbar">
                  {["عدد", "متر"].map((unit, index) => (
                    <p
                      className={`p-1.5 cursor-pointer hover:bg-hover_primary text-sm rtl ${
                        index === 1 ? "rounded-b-lg" : null
                      } ${
                        product.pUnit === unit
                          ? "bg-hover_primary text-primary font-bold"
                          : "text-secondary"
                      }`}
                      key={index}
                      onClick={() => {
                        setProduct({ ...product, pUnit: unit });
                        setOpenUnitsList(false);
                      }}
                    >
                      {unit}
                    </p>
                  ))}
                </div>
              )}
            </div>
            {errors.pUnit && (
              <p className="text-red-500 text-sm">{errors.pUnit}</p>
            )}
          </div>

          {/* count */}
          <div className="flex items-center gap-8 w-72">
            {/* product count */}
            <div className="space-y-1 w-fit">
              <label className="text-label_text">
                {product.pUnit === "متر" ? "متراژ" : "تعداد"}
              </label>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent w-20 border-none outline-none text-center text-secondary"
                  type="number"
                  value={product.pCount}
                  placeholder={0}
                  onChange={(e) =>
                    e.target.value >= 0
                      ? setProduct({ ...product, pCount: e.target.value })
                      : null
                  }
                />
              </div>
              {errors.pCount && (
                <p className="text-red-500 text-sm">{errors.pCount}</p>
              )}
            </div>

            {/* product minimum count */}
            <div className="space-y-1 w-fit">
              <label className="text-label_text">
                {product.pUnit === "متر" ? "حداقل متراژ" : "حداقل تعداد"}
              </label>
              <div className="flex items-center gap-2 bg-bg_input p-2 rounded-lg">
                <input
                  className="bg-transparent w-20 border-none outline-none text-center text-secondary"
                  type="number"
                  value={product.pMinCount}
                  placeholder={0}
                  onChange={(e) =>
                    e.target.value >= 0
                      ? setProduct({ ...product, pMinCount: e.target.value })
                      : null
                  }
                />
              </div>
              {errors.pMinCount && (
                <p className="text-red-500 text-sm">{errors.pMinCount}</p>
              )}
            </div>
          </div>
        </div>

        {/* add product */}
        <div className="flex items-center justify-end">
          <button
            className={`bg-secondary rounded-lg w-32 h-12 font-bold text-white text-base flex items-center justify-center gap-4 `}
            // disabled={createProductPending || +product.pCount === 0}
            onClick={addProductClickHandler}
          >
            افزودن
            {createProductPending && <Loader />}
          </button>
        </div>
      </div>

      {showAddCategoryModal && (
        <AddCategoryModal
          isOpen={showAddCategoryModal}
          onClose={() => setShowAddCategoryModal(false)}
          onAddCategory={handleAddCategory}
          isLoading={createCategoryPending}
        />
      )}
    </div>
  );
}

export default AddProduct;
