import React, { Component } from "react";
import { SuccessfulOrder } from "../../components";
import "./placeOrder.css";

class PlaceOrder extends Component {
  render() {
    return (
      <div className="order-page">
        <SuccessfulOrder headerText="Thank you for shopping with us!!" />
      </div>
    );
  }
}

export { PlaceOrder };
