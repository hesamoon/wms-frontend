/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";

// components
import DataTable from "../components/DataTable.jsx";
import Loader from "../components/modules/Loader.jsx";

// services
import { getProducts } from "../services/admin.js";

function ProductsPage() {
  // GET
  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <div className={`flex flex-col gap-6 p-8 w-full`}>
      {/* title */}
      <h2
        className={`font-bold text-2xl transition-transform duration-300 ease-in-out text-secondary`}
      >
        لیست کالاها
      </h2>

      {/* data list */}
      <div className="bg-bg_main rounded-xl max-h-[33rem] overflow-auto">
        {productsLoading ? (
          <Loader />
        ) : productsData?.data.length > 0 ? (
          <DataTable data={productsData.data} />
        ) : (
          <h1 className="text-center font-bold text-secondary py-4">کالایی موجود نمی باشد.</h1>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
