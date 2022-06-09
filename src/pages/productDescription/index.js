import { graphql } from "@apollo/client/react/hoc";
import React, { Component } from "react";
import { Attributes, Button, ImgThumbnail, Loader } from "../../components";
import {
  AddToCart,
  CurrencyContext,
  withContext,
  withRouter,
} from "../../context/context";
import { GET_SINGLE_PRODUCT } from "../../graphQl/queries";
import "./productDescription.css";

class ProductDescription extends Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = {
      selectedImage: null,
      details: {},
      attr: null,
      hasSelectedAttribute: false,
    };

    this.cart = this.props.cart;
    this.select = this.props.currency;

    this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
  }

  handleAddProductToCart(productDetails) {
    this.cart.addItemToCart(productDetails, this.state.attr);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !prevState.attr &&
      this.props.data?.loading !== prevProps.data.loading
    ) {
      const generateAtt = this?.props?.data?.product?.attributes?.reduce(
        (acc, curr) => ({ ...acc, [curr.name]: curr.items[0].id }),
        {}
      );
      this.setState({
        attr: generateAtt,
      });
    }
  }

  componentWillUnmount() {
    this.setState({ attr: null });
  }

  renderImgThumbnail = (gallery) =>
    gallery?.map((item, index) => (
      <ImgThumbnail
        item={item}
        key={index}
        onClick={() => this.setState({ selectedImage: item })}
      />
    ));

  renderAttributes = (details) =>
    details?.attributes?.map((attribute, index) => (
      <Attributes
        attribute={attribute}
        key={index}
        cartAttr={this.state.attr}
        addAttribute={(val) =>
          this.setState((prevState) => ({
            attr: { ...prevState.attr, [attribute.name]: val },
          }))
        }
      />
    ));

  render() {
    const details = this.props.data.product;
    const selectedImage = this.props.data?.product?.gallery[0] ?? "";

    const loading = this.props.data.loading;
    const error = this.props.data?.error;
    this.price = this.props?.data?.product?.prices?.find(
      (item) => item.currency.symbol === this.props.selected.currency
    );

    if (loading) {
      return (
        <div className="loader-div">
          <Loader />
        </div>
      );
    }

    if (error) {
      return <p>An error occured!</p>;
    }

    return (
      <div className="product-description-page">
        <>
          <div className="product-desc-small-img">
            {details?.gallery && this.renderImgThumbnail(details?.gallery)}
          </div>

          <div className="product-desc-main-img">
            <img src={selectedImage} alt="big img" />
          </div>

          <div className="product-desc-details">
            <h1>{details?.brand}</h1>
            <span>{details?.name}</span>
            {details?.attributes ? this.renderAttributes(details) : ""}

            <div className="product-price">
              <p>Price:</p>
              <h6>{`${this.price?.currency?.symbol ?? ""} ${
                this.price?.amount ?? ""
              }`}</h6>
            </div>

            <div className="product-desc-btn">
              <Button
                isDisabled={!details?.inStock}
                type="button"
                label="ADD TO CART"
                btnType="green"
                className="desc-btn"
                onClick={() => this.handleAddProductToCart(details)}
              />
            </div>

            <div
              className="summary"
              dangerouslySetInnerHTML={{ __html: details?.description }}
            ></div>
          </div>
        </>
      </div>
    );
  }
}

ProductDescription = withRouter(
  graphql(GET_SINGLE_PRODUCT, {
    options: (props) => ({
      variables: {
        id: props.router.params.id,
      },
    }),
  })(
    withContext(
      "selected",
      CurrencyContext,
      withContext("cart", AddToCart, ProductDescription)
    )
  )
);

export { ProductDescription };
