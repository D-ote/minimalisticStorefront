import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "../../components/button/button";
import CartProductDetails from "../../components/cartProductDetails/cartProductDetails";
import CategoryPageLayout from "../../components/categoryPageLayout/categoryPageLayout";
import { AddToCart, CurrencyContext, GrandTotal } from "../../context/context";
import "./checkOutPage.css";

const CheckOutPage = CategoryPageLayout(() => {
  const cart = useContext(AddToCart);
  const total = useContext(GrandTotal);
  const selected = useContext(CurrencyContext);
  const navigate = useNavigate();

  const totalPrice = total.totalPrice;
  const cartItem = cart.cartLoad;

  let countArray = cartItem?.map((item) => item.count);
  useEffect(() => {
    //go through all the products
    const productTotalPrice = cartItem?.reduce((acc, curr) => {
      const productPrice = curr?.prices?.find(
        (item) => item.currency.symbol === selected.currency
      ).amount;

      return acc + curr.count * productPrice;
    }, 0);

    total.setTotalPrice(productTotalPrice);
  }, [cart]);

  return (
    <div className="checkout">
      <h1>Cart</h1>
      <section>
        {cartItem?.map((item) => (
          <>
            <div className="checkout-products">
              <CartProductDetails productDetails={item} />
            </div>
            <div className="break-line"></div>
          </>
        ))}
      </section>
      <section>
        <div className="item-costing">
          <p>
            Tax 21%: <span> $42.00</span>
          </p>
        </div>
        <div className="item-costing">
          <p>
            Quantity:{" "}
            <span>{countArray.reduce((acc, prev) => acc + prev, 0)}</span>
          </p>
        </div>
        <div className="item-costing">
          <p>
            Total:{" "}
            <span>
              {selected.currency}&nbsp;
              {totalPrice.toFixed(2)}
            </span>
          </p>
        </div>
        <div className="checkout-btn">
          <Button
            type="submit"
            isDisabled={!cartItem.length}
            label="ORDER"
            btnType="green"
            onClick={() => navigate("/order-page")}
          />
        </div>
      </section>
    </div>
  );
});

export default CheckOutPage;
