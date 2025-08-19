import { Navigate, Route, Routes } from "react-router-dom";

// pages
import Profit from "../pages/Profit";
import Users from "../pages/Users.jsx";
import PageNotFound from "../pages/404";
import LoginPage from "../pages/LoginPage";
import AddProduct from "../pages/AddProduct";
import SellProduct from "../pages/SellProduct";
import TowerPage from "../pages/TowerPage.jsx";
import ProductsPage from "../pages/ProductsPage";
import UpdateProduct from "../pages/UpdateProduct";
import SoldProductsPage from "../pages/SoldProductsPage";

// utils
import { userAttr } from "../utils/userAttr.js";

function Router() {
  return (
    <Routes>
      <Route
        index
        element={
          userAttr().role !== "UNSIGNED" ? (
            <Navigate to="/products" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={
          userAttr().role !== "UNSIGNED" ? <Navigate to="/" /> : <LoginPage />
        }
      />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/sold-products" element={<SoldProductsPage />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/sell-product" element={<SellProduct />} />
      <Route path="/update-product" element={<UpdateProduct />} />
      <Route path="/profit" element={<Profit />} />
      <Route
        path="/users"
        element={
          userAttr().role !== "SUPER ADMIN" ? <Navigate to="/" /> : <Users />
        }
      />
      <Route
        path="/tower"
        element={
          userAttr().role !== "SUPER ADMIN" ? (
            <Navigate to="/" />
          ) : (
            <TowerPage />
          )
        }
      />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;
