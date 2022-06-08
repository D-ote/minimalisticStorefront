import React, { Component } from "react";

class ImgThumbnail extends Component {
  render() {
    const { item } = this.props;
    return (
      <div className="product-desc-img-wrapper" onClick={this.props.onClick}>
        <img src={item} alt="small img" />
      </div>
    );
  }
}

export { ImgThumbnail };
