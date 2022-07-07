import { Component } from "react";
import { Add, Cancel, Minus } from "../../assets";
import { AddToCart, withContext, withRouter } from "../../context/context";
import { Button } from "../button";
import "./attributesModal.css";

class AttributesModal extends Component {
  constructor(props) {
    super(props);

    this.props = props;

    this.handleAddCount = this.handleAddCount.bind(this);
    this.handleReduceCount = this.handleReduceCount.bind(this);
  }

  handleAddCount = (attr) => {
    this.props.cart.addItemToCart(this.props.cart.modalAttributes, attr);
  };

  handleReduceCount = (attr) => {
    this.props.cart.reduceItemCountFromCart(
      this.props.cart.modalAttributes,
      attr
    );
  };

  renderCurrentCount = (attr) => {
    const count = this.props.cart.cartLoad.findIndex((item) => {
      return item.attr.attrVal === attr?.value;
    });

    if (count >= 0) {
      return this.props.cart.cartLoad.map((item) => item.count)[0];
    } else {
      return 0;
    }
  };

  render() {
    const attributes = this.props.cart.modalAttributes.attributes;

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h6>Please select a variation</h6>
            <div
              className="close-modal"
              onClick={() => this.props.cart.updateState("modalState", false)}
            >
              <img src={Cancel} alt="close" />
            </div>
          </div>
          {attributes?.map((attribute) => (
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
                      <img src={Minus} alt="minus" />{" "}
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
                      {this.renderCurrentCount(attr)}
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
          ))}
          <div className="dropdown-btn">
            <div className="btn-div">
              <Button
                label="Continue Shopping"
                btnType="plain"
                onClick={() => this.props.cart.updateState("modalState", false)}
              />
            </div>
            <div className="btn-div">
              <Button
                label="View Bag"
                btnType="green"
                onClick={() => {
                  this.props.cart.updateState("modalState", false);
                  this.props.router.navigate("/viewbag");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AttributesModal = withRouter(withContext("cart", AddToCart, AttributesModal));

export { AttributesModal };
