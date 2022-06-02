import React from "react";
import "./button.css";

const Button = ({
  label,
  type,
  className,
  btnType,
  isDisabled,
  onClick,
  ...rest
}) => {
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
};

export default Button;
