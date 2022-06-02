import React, { useContext } from "react";
import { Add, Minus } from "../../assets";
import { AddToCart, CurrencyContext } from "../../context/context";
import "./dropdownCartProductDetails.css";

const DropdownCartProductDetails = ({ cartItem }) => {
  const selected = useContext(CurrencyContext);
  const cart = useContext(AddToCart);

  const price = cartItem?.prices.find(
    (item) => item?.currency?.symbol === selected.currency
  );

  const handleAddCount = () => {
    cart.addItemToCart(cartItem);
  };

  const handleReduceCount = () => {
    cart.reduceItemCountFromCart(cartItem);
  };

  return (
    <div className="cart-product">
      <div className="product-description">
        <p className="product-name">{cartItem?.brand}</p>
        <p className="product-name">{cartItem?.name}</p>
        <h6>{`${price?.currency?.symbol ?? ""} ${price?.amount ?? ""}`}</h6>
        {cartItem?.attributes
          ? cartItem?.attributes?.map((attribute) => (
              <div className="product-size-chart">
                <p>{attribute?.name} </p>
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
      </div>
      <div className="products-section2">
        <div className="product-counter">
          <img src={Add} alt="add cart items" onClick={handleAddCount} />
          {cartItem.count}
          <img
            src={Minus}
            alt="reduce cart items"
            // className={cartItem.count == 1 && "disable-counter"}
            onClick={handleReduceCount}
          />
        </div>
        <div className="cart-img">
          <img src={cartItem?.gallery[0]} alt="cart" />
        </div>
      </div>
    </div>
  );
};

export default DropdownCartProductDetails;
