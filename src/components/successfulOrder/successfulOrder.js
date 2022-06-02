import React from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../../assets";
import Button from "../button/button";
import "./successfulOrder.css";

const SuccessfulOrder = ({ headerText }) => {
  const navigate = useNavigate();

  return (
    <div className="success">
      <img src={Order} alt="order Placed" />
      <h1>{headerText}</h1>
      <Button
        className="orderBtn"
        label="Done"
        btnType="green"
        onClick={() => navigate("/women")}
      />
    </div>
  );
};

export default SuccessfulOrder;
