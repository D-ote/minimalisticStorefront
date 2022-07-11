import { Component } from "react";
import { Add, Cancel, Minus } from "../../assets";
import { AddToCart, withContext, withRouter } from "../../context/context";
import { AttributeCount } from "../atttributeCount/attributeCount";
import { Button } from "../button";
import "./attributesModal.css";

class AttributesModal extends Component {
  constructor(props) {
    super(props);
  }

  handleAddCount = (attr) => {
    const cart = this.props.cart;
    cart.addItemToCart(cart.modalAttributes, attr);
  };

  handleReduceCount = (attr) => {
    const cart = this.props.cart;
    cart.reduceItemCountFromCart(cart.modalAttributes, attr);
  };

  renderCurrentCount = (attr) => {
    const cartLoad = this.props.cart.cartLoad;
    const isAdded = cartLoad.findIndex((item) => {
      return item.attr.attrVal === attr;
    });

    if (isAdded >= 0) {
      return cartLoad[isAdded].count;
    } else {
      return 0;
    }
  };

  render() {
    const attributes = this.props.cart.modalAttributes.attributes;
    const { cart, router } = this.props;

    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h6>Please select a variation</h6>
            <div
              className="close-modal"
              onClick={() => cart.updateState("modalState", false)}
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
                      <img
                        src={Minus}
                        alt="minus"
                        className="cursor"
                        onClick={() =>
                          this.handleReduceCount({
                            attrName: attribute.name,
                            attrVal: attr.value,
                          })
                        }
                      />
                      {this.renderCurrentCount(attr.id)}
                      <img
                        src={Add}
                        alt="add"
                        className="cursor"
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
                      {this.renderCurrentCount(attr.id)}
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
                onClick={() => cart.updateState("modalState", false)}
              />
            </div>
            <div className="btn-div">
              <Button
                label="View Bag"
                btnType="green"
                onClick={() => {
                  cart.updateState("modalState", false);
                  router.navigate("/viewbag");
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
