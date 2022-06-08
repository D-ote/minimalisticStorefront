import React, { Component, forwardRef } from "react";
import {
  AddToCart,
  CurrencyContext,
  withContext,
  withRouter,
} from "../../context/context";
import { Button } from "..";
import "./dropdown.css";
import { EmptyState } from "../emptyState";
import { DropdownCartProductDetails } from "../dropdownCartProductDetails";

const Dropdown = forwardRef((props, ref) => {
  class Dropdown extends Component {
    constructor(props) {
      super(props);

      this.props = props;
      this.viewCartPage = this.viewCartPage.bind(this);
      this.viewCheckOutPage = this.viewCheckOutPage.bind(this);
    }

    viewCartPage() {
      this.props.toggleDropdown();
      this.props.router.navigate("/viewbag");
    }

    viewCheckOutPage() {
      this.props.toggleDropdown();
      this.props.router.navigate("/place-order");
    }

    render() {
      const { cartLoad, totalPrice, totalCount } = this.props.cart;

      return (
        <div className="cart-display" ref={ref} id="dropdown-content">
          <h6>
            My Bag:
            <span> {totalCount} items</span>
          </h6>
          {cartLoad.length > 0 ? (
            <div className="dropdown-scroll">
              <section>
                {cartLoad?.map((item, id) => (
                  <DropdownCartProductDetails cartItem={item} key={id} />
                ))}
              </section>
              {cartLoad.length > 0 && (
                <div className="products-total">
                  <h6>Total</h6>
                  <h6>
                    {this.props.selected.currency}&nbsp;
                    {Number(totalPrice.toFixed(2) ?? 0).toLocaleString("en")}
                  </h6>
                </div>
              )}
            </div>
          ) : (
            <div className="dropdown-emptyState">
              <EmptyState />
            </div>
          )}
          <div className="dropdown-btn">
            <div className="btn-div">
              <Button
                type="button"
                isDisabled={!cartLoad.length}
                label="View bag"
                btnType="plain"
                onClick={() => this.viewCartPage()}
              />
            </div>
            <div className="btn-div">
              <Button
                type="button"
                className={cartLoad.length === 0 && "disabled"}
                isDisabled={!cartLoad.length}
                label="check out"
                onClick={() => this.viewCheckOutPage()}
                btnType={cartLoad.length === 0 ? "green disabled" : "green"}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  return <Dropdown {...props} />;
});

export default withRouter(
  withContext(
    "selected",
    CurrencyContext,
    withContext("cart", AddToCart, Dropdown)
  )
);
