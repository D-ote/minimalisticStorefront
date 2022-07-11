import { Component } from "react";
import { Add, Minus } from "../../assets";
import { AddToCart, withContext } from "../../context/context";

class AttributeCount extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    // this.handleAddCount = this.handleAddCount.bind(this);
    // this.handleReduceCount = this.handleReduceCount.bind(this);
  }
  render() {
    const attribute = this.props.attribute;
    console.log(this.props.count, "this");
    return (
      <div className="modal-content" key={attribute?.id}>
        <h2>{attribute?.name}</h2>
        {attribute?.items?.map((attr) =>
          attribute?.name === "Color" ? (
            <div className="modal-attribute" key={attr?.id}>
              <div
                className="chart-item"
                key={attr?.id}
                style={{ backgroundColor: attr.value }}
              />
              <div className="modal-counter">
                <img
                  src={Minus}
                  alt="minus"
                  onClick={() =>
                    this.handleReduceCount({
                      attrName: attribute.name,
                      attrVal: attr.value,
                    })
                  }
                />{" "}
                <img
                  src={Add}
                  alt="add"
                  onClick={() => {
                    this.handleAddCount({
                      attrName: attribute.name,
                      attrVal: attr.value,
                    });
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="modal-attribute" key={attr?.id}>
              <div className="attribute-name">
                <p>{attr?.value}</p>
              </div>
              <div className="modal-counter">
                <img
                  src={Minus}
                  alt="minus"
                  onClick={() =>
                    this.handleReduceCount({
                      attrName: attribute.name,
                      attrVal: attr.value,
                    })
                  }
                  className="cursor"
                />
                {this.props.count(attr)}
                <img
                  src={Add}
                  alt="add"
                  onClick={() => {
                    this.handleAddCount({
                      attrName: attribute.name,
                      attrVal: attr.value,
                    });
                  }}
                  className="cursor"
                />
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

AttributeCount = withContext("cart", AddToCart, AttributeCount);

export { AttributeCount };
