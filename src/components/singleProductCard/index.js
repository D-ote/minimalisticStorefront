import React, { Component } from "react";
import { CartIcon } from "../../assets";
import {
  AddToCart,
  CurrencyContext,
  withContext,
  withRouter,
} from "../../context/context";

class SingleProductCard extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.handleRedirectToProductPage =
      this.handleRedirectToProductPage.bind(this);
  }

  handleRedirectToProductPage = () => {
    this.props.router.navigate(`/product/${this.props.productDetails.id}`);
  };

  render() {
    const price = this.props.productDetails?.prices?.find(
      (item) => item.currency.symbol === this.props.selected.currency
    );
    const productDetails = this.props.productDetails;

    return (
      <figure
        className={
          productDetails.inStock ? "product-card" : "product-card outofstock"
        }
        onClick={() => this.handleRedirectToProductPage()}
      >
        <img src={productDetails?.gallery[0]} alt="category product" />
        <p className={productDetails?.inStock ? "display" : "stock-text"}>
          OUT OF STOCK
        </p>
        <div
          className={
            productDetails?.inStock ? "add-to-cart" : "add-to-cart nomouse"
          }
          onClick={() =>
            productDetails?.inStock &&
            this.props.cart.addItemToCart(productDetails)
          }
        >
          <img src={CartIcon} alt="add to cart icon" />
        </div>
        <figcaption className="product-info">
          <p>{productDetails?.name}</p>
          <h6>
            {`${price?.currency?.symbol ?? ""} ${
              Number(price?.amount.toFixed(2)).toLocaleString("en") ?? ""
            }`}
          </h6>
        </figcaption>
      </figure>
    );
  }
}

SingleProductCard = withRouter(
  withContext(
    "selected",
    CurrencyContext,
    withContext("cart", AddToCart, SingleProductCard)
  )
);

export { SingleProductCard };
