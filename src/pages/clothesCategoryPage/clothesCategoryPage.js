import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import CategoryPageLayout from "../../components/categoryPageLayout/categoryPageLayout";
import SingleProduct from "../../components/singleProduct/singleProduct";
import { GET_CATEGORIES_QUERY } from "../../graphQl/queries";
// import "./clothesCategoryPage.css";

const ClothesCategoryPage = CategoryPageLayout(() => {
  const [getProductList, { data, error }] = useLazyQuery(
    GET_CATEGORIES_QUERY,
    {}
  );

  useEffect(() => {
    getProductList();
  }, [getProductList]);

  if (error) {
    // console.log(error);
  }

  if (data) {
    // console.log(data, "clothes");
  }

  return (
    <div className="women-category">
      <h2>{data?.categories[1]?.name}</h2>
      <section className="products-layout">
        {data &&
          data?.categories[1]?.products?.map((product, id) => (
            <SingleProduct productDetails={product} />
          ))}
      </section>
    </div>
  );
});

export default ClothesCategoryPage;
