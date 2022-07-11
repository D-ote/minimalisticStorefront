import React, { Component } from "react";
import { Add, Minus } from "../../assets";
import {
  AddToCart,
  CurrencyContext,
  withContext,
  withRouter,
} from "../../context/context";
import { Attributes } from "../attributes";
import "./cartProductDetails.css";

class CartProductDetails extends Component {
  constructor(props) {
    super(props);

    this.updateAttribute = this.props.cart.updateAttribute;
  }

  handleAddCount = (attr) => {
    const { cart, productDetails } = this.props;
    cart.addItemToCart(productDetails, attr);
  };

  handleReduceCount = (attr) => {
    const { cart, productDetails } = this.props;
    cart.reduceItemCountFromCart(productDetails, attr);
  };

  handleSelectAttribute = (name, item) => {
    const { cart, cartItem } = this.props;
    cart.updateAttributes(cartItem.id, name, item.id);
  };

  renderAttributes = (productDetails) => {
    return (
      <Attributes
        attribute={productDetails?.attr?.attrName}
        cartAttr={productDetails?.attr?.attrVal}
      />
    );
  };

  render() {
    const price = this.props.productDetails?.prices?.find(
      (item) => item.currency.symbol === this.props.selected.currency
    );

    const productDetails = this.props.productDetails;
    return (
      <div className="cart-page">
        <div className="cart-page-product-description">
          <h2 className="cart-page-product-name">{productDetails?.brand}</h2>
          <p className="product-price">{`${price?.currency?.symbol ?? ""} ${
            Number(price?.amount.toFixed(2)).toLocaleString("en") ?? ""
          }`}</p>
          {productDetails?.attributes?.attrVal
            ? this.renderAttributes(productDetails)
            : ""}
        </div>
        <div className="products-section2">
          <div className="cart-page-product-counter">
            <img
              src={Add}
              alt="add cart items"
              onClick={() =>
                this.handleAddCount({
                  attrName: productDetails.attr.attrName,
                  attrVal: productDetails.attr.attrVal,
                })
              }
            />
            {productDetails.count}
            <img
              src={Minus}
              alt="reduce cart items"
              onClick={() =>
                this.handleReduceCount({
                  attrName: productDetails.attr.attrName,
                  attrVal: productDetails.attr.attrVal,
                })
              }
            />
          </div>
          <div className="cart-page-img">
            <img src={productDetails?.gallery[0]} alt="cart" />
          </div>
        </div>
      </div>
    );
  }
}

CartProductDetails = withRouter(
  withContext(
    "selected",
    CurrencyContext,
    withContext("cart", AddToCart, CartProductDetails)
  )
);

export { CartProductDetails };
