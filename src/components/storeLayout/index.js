import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../header";
import "./storeLayout.css";

export class StoreLayout extends Component {
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
