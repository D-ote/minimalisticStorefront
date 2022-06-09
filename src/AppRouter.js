import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ProductDescription, Home, PlaceOrder, ViewBag } from "./pages";
import { StoreLayout } from "./components";

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<StoreLayout />}>
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
