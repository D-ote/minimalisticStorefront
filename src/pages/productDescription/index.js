import { graphql } from "@apollo/client/react/hoc";
import { Parser } from "html-to-react";
import React, { Component } from "react";
import { Attributes, Button, ImgThumbnail, Loader } from "../../components";
import Alert from "../../components/alert";
import { AttributesModal } from "../../components/attributesModal";
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
      isSuccess: false,
    };

    this.cart = this.props.cart;
    this.select = this.props.currency;

    this.handleAddProductToCart = this.handleAddProductToCart.bind(this);
  }

  handleAddProductToCart(productDetails) {
    this.props.cart.updateState("modalState", true);
    this.props.cart.updateState("modalAttributes", productDetails);
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

  renderImgThumbnail = (gallery, stockState) =>
    gallery?.map((item, index) => (
      <ImgThumbnail
        item={item}
        key={index}
        stockState={stockState}
        onClick={() => this.setState({ selectedImage: item })}
      />
    ));

  renderAttributes = (details) => {
    return details?.attributes?.map((attribute, index) => (
      <Attributes
        title={attribute}
        key={index}
        cartAttr={this.state.attr}
        addAttribute={(val) =>
          this.setState((prevState) => ({
            attr: { ...prevState.attr, [attribute.name]: val },
          }))
        }
      />
    ));
  };

  render() {
    const details = this.props.data.product;
    const selectedImage =
      this.state?.selectedImage ?? this.props.data?.product?.gallery[0];

    const loading = this.props.data.loading;
    const error = this.props.data?.error;
    const alert = this.state?.isSuccess;
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

    setTimeout(() => {
      this.setState({ isSuccess: false });
    }, 2000);

    return (
      <div className="product-description-page">
        <>
          {this.props.cart.modalState && <AttributesModal />}
          <div
            className={
              this.props?.data?.product?.inStock
                ? "product-desc-small-img"
                : "product-desc-small-img outofstock"
            }
          >
            {details?.gallery &&
              this.renderImgThumbnail(details?.gallery, details?.inStock)}
          </div>

          <div
            className={
              this.props?.data?.product?.inStock
                ? "product-desc-main-img"
                : "product-desc-main-img outofstock"
            }
          >
            <img src={selectedImage} alt="big img" />
            <div
              className={
                this.props?.data?.product?.inStock ? "display" : "pdp-stock"
              }
            >
              <p className="stock-text">OUT OF STOCK</p>
            </div>
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
                className={details?.inStock ? "desc-btn" : "desc-btn disabled"}
                onClick={() => this.handleAddProductToCart(details)}
              />
            </div>

            <div
              className="summary"
              // dangerouslySetInnerHTML={{ __html: details?.description }}
            >
              {Parser().parse(details?.description)}
            </div>
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
