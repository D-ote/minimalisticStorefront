import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CheckOutPage from "./pages/checkOutPage/checkOutPage";
import ProductDescriptionPage from "./pages/productDescriptionPage/productDescriptionPage";
import WomenCategoryPage from "./pages/womenCategoryPage/womenCategoryPage";
import ClothesCategoryPage from "./pages/clothesCategoryPage/clothesCategoryPage";
import TechCategoryPage from "./pages/techCategoryPage/techCategoryPage";
import OrderPage from "./pages/orderPage/orderPage";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/women" element={<WomenCategoryPage />} />
        <Route path="/clothes" element={<ClothesCategoryPage />} />
        <Route path="/tech" element={<TechCategoryPage />} />
        <Route
          path="/product-description-page/:id"
          element={<ProductDescriptionPage />}
        />
        <Route path="/women/checkout" element={<CheckOutPage />} />
        <Route path="/order-page" element={<OrderPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
