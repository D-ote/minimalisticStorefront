import React from "react";
import SuccessfulOrder from "../../components/successfulOrder/successfulOrder";
import "./orderPage.css";

const OrderPage = () => {
  return (
    <div className="order-page">
      <SuccessfulOrder headerText="Thank you for shopping with us!!" />
    </div>
  );
};

export default OrderPage;
