import React, { Component } from "react";
import { CartIcon } from "../../assets";
import {
  AddToCart,
  CurrencyContext,
  withContext,
  withRouter,
} from "../../context/context";
import { roundToTwo } from "../../utils/utils";

class SingleProductCard extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    // this.handleRedirectToProductPage =
    //   this.handleRedirectToProductPage.bind(this);
  }

  handleRedirectToProductPage = () => {
    this.props.router.navigate(`/product/${this.props.productDetails.id}`);
  };

  handleAddToCart = () => {
    const { productDetails, cart } = this.props;
    if (!productDetails?.inStock) return;

    if (productDetails?.attributes?.length) {
      cart.updateState("modalState", true);
      cart.updateState("modalAttributes", productDetails);
    } else {
      cart.addItemToCart(productDetails);
    }
  };

  render() {
    const price = this.props.productDetails?.prices?.find(
      (item) => item.currency.symbol === this.props.selected.currency
    );
    const productDetails = this.props.productDetails;

    return (
      <div className="product-div">
        <figure
          className={
            productDetails.inStock ? "product-card" : "product-card outofstock"
          }
          onClick={() => this.handleRedirectToProductPage()}
        >
          <img
            src={productDetails?.gallery[0]}
            alt="category product"
            className="product-img"
          />
          <div
            className={productDetails?.inStock ? "display" : "stock-text-div"}
          >
            <p className="stock-text">OUT OF STOCK</p>
          </div>
          <figcaption className="product-info">
            <p>{productDetails?.name}</p>
            <h6>
              {`${price?.currency?.symbol ?? ""} ${
                roundToTwo(price?.amount.toFixed(2)).toLocaleString("en") ?? ""
              }`}
            </h6>
          </figcaption>
        </figure>
        <div
          className={
            productDetails?.inStock ? "add-to-cart" : "add-to-cart nomouse"
          }
          onClick={this.handleAddToCart}
        >
          <img src={CartIcon} alt="add to cart icon" className="cart-icon" />
        </div>
      </div>
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
