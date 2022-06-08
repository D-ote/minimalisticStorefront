import React, { Component } from "react";
import { Order } from "../../assets";
import { withRouter } from "../../context/context";
import { Button } from "..";
import "./successfulOrder.css";

class SuccessfulOrder extends Component {
  render() {
    return (
      <div className="success">
        <img src={Order} alt="order Placed" />
        <h1>{this.props.headerText}</h1>

        <Button
          className="orderBtn"
          label="Done"
          btnType="green"
          onClick={() => this.props.router.navigate("/")}
        />
      </div>
    );
  }
}

SuccessfulOrder = withRouter(SuccessfulOrder);
export { SuccessfulOrder };
