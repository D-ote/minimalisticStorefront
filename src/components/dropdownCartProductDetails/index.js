import React, { Component } from "react";
import { Add, Minus } from "../../assets";
import { AddToCart, CurrencyContext, withContext } from "../../context/context";
import { Attributes } from "../attributes";
import "./dropdownCartProductDetails.css";

class DropdownCartProductDetails extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = { cart: [], selected: "$", selectedAttribute: false };

    this.handleAddCount = this.handleAddCount.bind(this);
    this.handleReduceCount = this.handleReduceCount.bind(this);
    this.handleSelectAttribute = this.handleSelectAttribute.bind(this);
    this.updateAttribute = this.props.cart.updateAttribute;
  }

  handleAddCount = () => {
    this.props.cart.addItemToCart(this.props.cartItem);
  };

  handleReduceCount = () => {
    this.props.cart.reduceItemCountFromCart(this.props.cartItem);
  };

  handleSelectAttribute = (name, item) => {
    this.props.cart.updateAttributes(this.props.cartItem.id, name, item.id);
  };

  renderAttributes = (cartItem) =>
    cartItem?.attributes?.map((attribute, index) => (
      <Attributes
        attribute={attribute}
        key={index}
        cartAttr={cartItem?.attr}
        updateAttribute={(item) =>
          this.handleSelectAttribute(attribute.name, item)
        }
      />
    ));

  render() {
    const cartItem = this.props.cartItem;
    const price = cartItem?.prices.find(
      (item) => item?.currency?.symbol === this.props.selected.currency
    );

    return (
      <div className="cart-product">
        <div className="product-description">
          <p className="product-name">{cartItem?.brand}</p>
          <p className="product-name">{cartItem?.name}</p>
          <h6>{`${price?.currency?.symbol ?? ""} ${
            Number(price?.amount.toFixed(2)).toLocaleString("en") ?? ""
          }`}</h6>
          {cartItem?.attributes ? this.renderAttributes(cartItem) : ""}
        </div>
        <div className="products-section2">
          <div className="product-counter">
            <img src={Add} alt="add cart items" onClick={this.handleAddCount} />
            {cartItem.count}
            <img
              src={Minus}
              alt="reduce cart items"
              onClick={this.handleReduceCount}
            />
          </div>
          <div className="cart-img">
            <img src={cartItem?.gallery[0]} alt="cart" />
          </div>
        </div>
      </div>
    );
  }
}

DropdownCartProductDetails = withContext(
  "selected",
  CurrencyContext,
  withContext("cart", AddToCart, DropdownCartProductDetails)
);

export { DropdownCartProductDetails };
