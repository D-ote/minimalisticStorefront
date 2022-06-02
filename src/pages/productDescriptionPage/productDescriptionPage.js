import { useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/button/button";
import CategoryPageLayout from "../../components/categoryPageLayout/categoryPageLayout";
import { AddToCart, CurrencyContext } from "../../context/context";
import { GET_SINGLE_PRODUCT } from "../../graphQl/queries";
import "./productDescriptionPage.css";

const ProductDescriptionPage = CategoryPageLayout(() => {
  const { id } = useParams();
  const selected = useContext(CurrencyContext);
  const cart = useContext(AddToCart);
  const [details, setDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const [getProduct, { data }] = useLazyQuery(GET_SINGLE_PRODUCT, {
    variables: {
      id: id,
    },
  });

  const handleAddProductToCart = (productDetails) => {
    cart.addItemToCart(productDetails);
  };

  const price = details?.prices?.find(
    (item) => item.currency.symbol === selected.currency
  );

  useEffect(() => {
    getProduct(id);
  }, [getProduct, id]);

  useEffect(() => {
    if (data) {
      setDetails(data.product);
      setSelectedImage(data.product.gallery[0]);
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cart.cartLoad));
  }, [cart]);

  return (
    <div className="product-description-page">
      <div className="product-desc-small-img">
        {details?.gallery &&
          details?.gallery?.map((item, index) => (
            <div
              className="product-desc-img-wrapper"
              key={index}
              onClick={() => setSelectedImage(item)}
            >
              <img src={item} alt="small img" />
            </div>
          ))}
      </div>
      <div className="product-desc-main-img">
        <img src={selectedImage} alt="big img" />
      </div>
      <div className="product-desc-details">
        <h1>{details.brand}</h1>
        <span>{details.name}</span>
        {details?.attributes
          ? details?.attributes?.map((attribute, index) => (
              <div className="product-size-chart" key={index}>
                <p>{attribute.name} </p>
                <div className="chart">
                  {attribute?.items?.map((item) =>
                    attribute.name === "Color" ? (
                      <div
                        className="chart-item"
                        key={item.id}
                        style={{ backgroundColor: item.value }}
                      />
                    ) : (
                      <span key={item.id} className={"chart-item"}>
                        {item.value}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))
          : ""}
        <div className="product-price">
          <p>Price:</p>
          <h6>{`${price?.currency?.symbol ?? ""} ${price?.amount ?? ""}`}</h6>
        </div>
        <div className="product-desc-btn">
          <Button
            isDisabled={!details.inStock}
            type="button"
            label="ADD TO CART"
            btnType="green"
            className="desc-btn"
            onClick={() => handleAddProductToCart(details)}
          />
        </div>
        <div
          className="summary"
          dangerouslySetInnerHTML={{ __html: details.description }}
        ></div>
      </div>
    </div>
  );
});

export default ProductDescriptionPage;
