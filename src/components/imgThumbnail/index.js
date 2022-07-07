import React, { Component } from "react";

class ImgThumbnail extends Component {
  render() {
    const { item, stockState } = this.props;
    return (
      <div className="product-desc-img-wrapper" onClick={this.props.onClick}>
        <img src={item} alt="small img" />
        <div className={stockState ? "display" : "small-out-of-stock-text-div"}>
          <p className="small-stock-text">OUT OF STOCK</p>
        </div>
      </div>
    );
  }
}

export { ImgThumbnail };
