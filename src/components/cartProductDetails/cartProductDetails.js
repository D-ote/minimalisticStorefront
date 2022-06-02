import React, { useContext } from "react";
import { Add, Minus } from "../../assets";
import { AddToCart, CurrencyContext } from "../../context/context";
import "./cartProductDetails.css";

const CartProductDetails = ({ productDetails }) => {
  const selected = useContext(CurrencyContext);
  const cart = useContext(AddToCart);
  // console.log(productDetails, "checkout");

  const price = productDetails?.prices?.find(
    (item) => item.currency.symbol === selected.currency
  );

  const handleAddCount = () => {
    cart.addItemToCart(productDetails);
  };

  const handleReduceCount = () => {
    cart.reduceItemCountFromCart(productDetails);
  };

  return (
    <div className="cart-page">
      <div className="cart-page-product-description">
        <h2 className="cart-page-product-name">{productDetails?.brand}</h2>
        <p className="product-price">{`${price?.currency?.symbol ?? ""} ${
          price?.amount ?? ""
        }`}</p>
        {productDetails?.attributes
          ? productDetails?.attributes?.map((attribute) => (
              <div className="cart-page-size-chart-div">
                <p>{attribute.name} </p>
                <div className="cart-page-size-chart">
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
      </div>
      <div className="products-section2">
        <div className="cart-page-product-counter">
          <img src={Add} alt="add cart items" onClick={handleAddCount} />
          {productDetails.count}
          <img
            src={Minus}
            alt="reduce cart items"
            onClick={handleReduceCount}
          />
        </div>
        <div className="cart-page-img">
          <img src={productDetails?.gallery[0]} alt="cart" />
        </div>
      </div>
    </div>
  );
};

export default CartProductDetails;
