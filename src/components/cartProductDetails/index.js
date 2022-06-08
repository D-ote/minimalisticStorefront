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

    this.props = props;

    this.handleAddCount = this.handleAddCount.bind(this);
    this.handleReduceCount = this.handleReduceCount.bind(this);
    this.handleSelectAttribute = this.handleSelectAttribute.bind(this);
    this.updateAttribute = this.props.cart.updateAttribute;
  }

  handleAddCount = () => {
    this.props.cart.addItemToCart(this.props.productDetails);
  };

  handleReduceCount = () => {
    this.props.cart.reduceItemCountFromCart(this.props.productDetails);
  };

  handleSelectAttribute = (name, item) => {
    this.props.cart.updateAttributes(this.props.cartItem.id, name, item.id);
  };

  renderAttributes = (productDetails) =>
    productDetails?.attributes?.map((attribute, index) => (
      <Attributes
        attribute={attribute}
        key={index}
        cartAttr={productDetails?.attr}
        updateAttribute={(item) =>
          this.handleSelectAttribute(attribute.name, item)
        }
      />
    ));

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
          {productDetails?.attributes
            ? this.renderAttributes(productDetails)
            : ""}
        </div>
        <div className="products-section2">
          <div className="cart-page-product-counter">
            <img src={Add} alt="add cart items" onClick={this.handleAddCount} />
            {productDetails.count}
            <img
              src={Minus}
              alt="reduce cart items"
              onClick={this.handleReduceCount}
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