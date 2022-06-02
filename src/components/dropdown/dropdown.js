import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AddToCart,
  CartList,
  CurrencyContext,
  GrandTotal,
} from "../../context/context";
import Button from "../button/button";
import DropdownCartProductDetails from "../dropdownCartProductDetails/dropdownCartProductDetails";
import EmptyState from "../emptyState/emptyState";
import "./dropdown.css";

const Dropdown = ({ ref }) => {
  const navigate = useNavigate();
  const cart = useContext(AddToCart);
  const selected = useContext(CurrencyContext);
  const total = useContext(GrandTotal);

  const cartLoad = cart.cartLoad;
  const totalPrice = total.totalPrice;

  let countArray = cartLoad.map((item) => item.count);

  useEffect(() => {
    //go through all the products
    const productTotalPrice = cartLoad?.reduce((acc, curr) => {
      const productPrice = curr?.prices?.find(
        (item) => item.currency.symbol === selected.currency
      ).amount;

      return acc + curr.count * productPrice;
    }, 0);

    total.setTotalPrice(productTotalPrice);
  }, [cart]);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("cartItem") || []);
    cart.setCartLoad(products);
  }, []);

  // console.log(list.cartList, "list");

  return (
    <div className="cart-display" ref={ref}>
      <h6>
        My Bag:
        <span> {countArray.reduce((acc, prev) => acc + prev, 0)} items</span>
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
                {selected.currency}&nbsp;
                {totalPrice.toFixed(2)}
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
            onClick={() => {
              navigate("/women/checkout");
            }}
          />
        </div>
        <div className="btn-div">
          <Button
            type="button"
            className={cartLoad.length === 0 && "disabled"}
            isDisabled={!cartLoad.length}
            label="check out"
            btnType={cartLoad.length === 0 ? "green disabled" : "green"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
