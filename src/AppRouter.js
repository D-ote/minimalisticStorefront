import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductDescription, Home, PlaceOrder, ViewBag } from "./pages";
import CategoryPageLayout from "./components/categoryPageLayout/categoryPageLayout";

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<CategoryPageLayout />}>
            <Route index element={<Home />} />
            <Route path="/product/:id" element={<ProductDescription />} />
            <Route path="/viewbag" element={<ViewBag />} />
            <Route path="/place-order" element={<PlaceOrder />} />
          </Route>
        </Routes>
      </Router>
    );
  }
}

export default AppRouter;
