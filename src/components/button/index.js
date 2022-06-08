import React, { Component } from "react";
import "./button.css";

export class Button extends Component {
  render() {
    const { label, type, className, btnType, isDisabled, onClick, ...rest } =
      this.props;
    return (
      <div>
        <button
          type={type}
          disabled={isDisabled}
          className={`${className} ${[btnType]} btn-class`}
          onClick={onClick}
          {...rest}
        >
          {label}
        </button>
      </div>
    );
  }
}
