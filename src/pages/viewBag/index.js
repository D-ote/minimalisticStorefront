import React, { Component } from "react";
import { Button, CartProductDetails, Loader } from "../../components";
import {
  AddToCart,
  CurrencyContext,
  withContext,
  withRouter,
} from "../../context/context";
import { priceFormatter } from "../../utils/utils";
import "./viewBag.css";

class ViewBag extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = { cart: [], selected: "$", total: 0 };
  }

  render() {
    const { cartLoad, totalPrice, totalCount } = this.props.cart;
    const loading = this.props.data?.loading;
    const error = this.props.data?.error;

    if (loading) {
      return (
        <div className="loader-div">
          <Loader />
        </div>
      );
    }

    if (error) {
      return <p>An error occured!</p>;
    }

    return (
      <div className="checkout">
        <h1>Cart</h1>
        <section>
          {cartLoad?.map((item, index) => (
            <div key={index}>
              <div className="checkout-products">
                <CartProductDetails productDetails={item} />
              </div>
              <div className="break-line"></div>
            </div>
          ))}
        </section>
        <section>
          <div className="item-costing">
            <p>
              Tax 21%:{" "}
              <span>
                {this.props.selected.currency}&nbsp;
                {priceFormatter(0.21 * totalPrice) ?? ""}
              </span>
            </p>
          </div>
          <div className="item-costing">
            <p>
              Quantity: <span>{totalCount}</span>
            </p>
          </div>
          <div className="item-costing">
            <p>
              Total:{" "}
              <span>
                {this.props.selected.currency}&nbsp;
                {priceFormatter(totalPrice) ?? ""}
              </span>
            </p>
          </div>
          <div className="checkout-btn">
            <Button
              type="submit"
              isDisabled={!this.props.cart.cartLoad.length}
              label="ORDER"
              btnType="green"
              onClick={() => this.props.router.navigate("/place-order")}
            />
          </div>
        </section>
      </div>
    );
  }
}

ViewBag = withRouter(
  withContext(
    "selected",
    CurrencyContext,
    withContext("cart", AddToCart, ViewBag)
  )
);

export { ViewBag };
