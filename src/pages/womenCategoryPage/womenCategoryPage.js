import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import CategoryPageLayout from "../../components/categoryPageLayout/categoryPageLayout";
import SingleProduct from "../../components/singleProduct/singleProduct";
import { GET_CATEGORIES_QUERY } from "../../graphQl/queries";
import "./womenCategoryPage.css";

const WomenCategoryPage = CategoryPageLayout(() => {
  const [getCategory, { data, error }] = useLazyQuery(GET_CATEGORIES_QUERY, {});

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  if (error) {
    // console.log(error);
  }

  if (data) {
    // console.log(data, "data");
  }

  return (
    <div className="women-category">
      <h2>{data?.categories[0]?.name}</h2>
      <section className="products-layout">
        {data &&
          data?.categories[0]?.products?.map((product, id) => (
            <SingleProduct productDetails={product} key={id} />
          ))}
      </section>
    </div>
  );
});

export default WomenCategoryPage;
