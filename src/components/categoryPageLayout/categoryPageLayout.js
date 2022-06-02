import React from "react";
import Header from "../header/header";
import "./categoryPageLayout.css";

const Layout = ({ children }) => {
  return (
    <div className="category-page-layout">
      <section>
        <Header />
      </section>
      <section> {children} </section>
    </div>
  );
};

const CategoryPageLayout = (Component) => {
  return (props) => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};

export default CategoryPageLayout;
