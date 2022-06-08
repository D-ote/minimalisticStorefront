import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import "./categoryPageLayout.css";

class CategoryPageLayout extends Component {
  render() {
    return (
      <div className="category-page-layout">
        <section>
          <Header />
        </section>
        <section>
          <Outlet />
        </section>
      </div>
    );
  }
}

export default CategoryPageLayout;
