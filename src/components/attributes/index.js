import React, { Component } from "react";
import { AddToCart, withContext } from "../../context/context";

class Attributes extends Component {
  checkAttribute = (attN, attID) => {
    if (this.props?.cartAttr) return this.props?.cartAttr[attN] === attID;
  };

  render() {
    const { attribute, addAttribute, updateAttribute } = this.props;

    return (
      <div className="product-size-chart">
        <p>{attribute.name} </p>
        <div className="chart">
          {attribute?.items?.map((item) =>
            attribute.name === "Color" ? (
              <div
                className={
                  this.checkAttribute(attribute.name, item.id)
                    ? "selected-attr chart-item"
                    : "chart-item"
                }
                key={item.id}
                style={{ backgroundColor: item.value }}
                onClick={() => {
                  addAttribute ? addAttribute(item.id) : updateAttribute(item);
                }}
              />
            ) : (
              <span
                key={item.id}
                className={
                  this.checkAttribute(attribute.name, item.id)
                    ? "selected-attr chart-item"
                    : "chart-item"
                }
                onClick={() =>
                  addAttribute ? addAttribute(item.id) : updateAttribute(item)
                }
              >
                {item.value}
              </span>
            )
          )}
        </div>
      </div>
    );
  }
}

Attributes = withContext("cart", AddToCart, Attributes);

export { Attributes };
