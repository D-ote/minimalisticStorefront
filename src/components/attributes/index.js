import React, { Component } from "react";
import { AddToCart, withContext } from "../../context/context";

class Attributes extends Component {
  checkAttribute = (attN, attID) => {
    if (this.props?.cartAttr) return this.props?.cartAttr[attN] === attID;
  };

  render() {
    const { attribute, cartAttr, title, addAttribute, updateAttribute } =
      this.props;

    return (
      <>
        {attribute ? (
          <div className="product-size-chart">
            <p>{attribute} </p>
            <div className="chart">
              {attribute === "Color" ? (
                <div
                  className="chart-item"
                  style={{ backgroundColor: cartAttr }}
                />
              ) : (
                <span className="chart-item">{cartAttr}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="product-size-chart">
            <p>{title.name} </p>
            <div className="chart">
              {title?.items?.map((item) =>
                title.name === "Color" ? (
                  <div
                    className={
                      this.checkAttribute(title.name, item.id)
                        ? "color-attr chart-item"
                        : "chart-item"
                    }
                    key={item.id}
                    style={{ backgroundColor: item.value }}
                    onClick={() => {
                      addAttribute
                        ? addAttribute(item.id)
                        : updateAttribute(item);
                    }}
                  />
                ) : (
                  <span
                    key={item.id}
                    className={
                      this.checkAttribute(title.name, item.id)
                        ? "selected-attr chart-item"
                        : "chart-item"
                    }
                    onClick={() =>
                      addAttribute
                        ? addAttribute(item.id)
                        : updateAttribute(item)
                    }
                  >
                    {item.value}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

Attributes = withContext("cart", AddToCart, Attributes);

export { Attributes };
