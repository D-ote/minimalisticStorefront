import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import CategoryPageLayout from "../../components/categoryPageLayout/categoryPageLayout";
import SingleProduct from "../../components/singleProduct/singleProduct";
import { GET_CATEGORIES_QUERY } from "../../graphQl/queries";

const TechCategoryPage = CategoryPageLayout(() => {
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
  }

  return (
    <div className="women-category">
      <h2>{data?.categories[2]?.name}</h2>
      <section className="products-layout">
        {data &&
          data?.categories[2]?.products?.map((product, index) => (
            <SingleProduct productDetails={product} key={index} />
          ))}
      </section>
    </div>
  );
});

export default TechCategoryPage;
