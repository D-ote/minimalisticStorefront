import React, { Component } from "react";
import { Cancel, Success } from "../../assets";
import "./alert.css";

class Alert extends Component {
  render() {
    const { alert } = this.props;

    return (
      <div className={alert ? "alert showAlert" : "alert hide"}>
        <span>
          <img src={Success} alt="success tick" />{" "}
        </span>
        <span className="msg">Successfully added product!</span>
        <div className="close-btn">
          <img src={Cancel} alt="close alert" />
        </div>
      </div>
    );
  }
}

export default Alert;
