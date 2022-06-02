import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartIcon, Jacket } from "../../assets";
import {
  AddToCart,
  CurrencyContext,
  ProductDescription,
} from "../../context/context";

const SingleProduct = ({ productDetails }) => {
  const navigate = useNavigate();
  const selected = useContext(CurrencyContext);
  const product = useContext(ProductDescription);
  const { cartLoad, addItemToCart } = useContext(AddToCart);

  const price = productDetails?.prices?.find(
    (item) => item.currency.symbol === selected.currency
  );

  const handleRedirectToProductPage = () => {
    product.setProductDescription(productDetails);
    navigate(`/product-description-page/${productDetails.id}`);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartLoad));
  }, [cartLoad]);

  console.log(cartLoad, "cartLoad");

  return (
    <figure
      className={
        productDetails.inStock ? "product-card" : "product-card outofstock"
      }
      onClick={handleRedirectToProductPage}
    >
      <img src={productDetails?.gallery[0] ?? Jacket} alt="cat-top" />
      <p className={productDetails?.inStock ? "display" : "stock-text"}>
        OUT OF STOCK
      </p>
      <div
        className={
          productDetails?.inStock ? "add-to-cart" : "add-to-cart nomouse"
        }
        onClick={() => productDetails?.inStock && addItemToCart(productDetails)}
      >
        <img src={CartIcon} alt="add to cart icon" />
      </div>
      <figcaption className="product-info">
        <p>{productDetails?.name}</p>
        <h6>{`${price?.currency?.symbol ?? ""} ${price?.amount ?? ""}`}</h6>
      </figcaption>
    </figure>
  );
};

export default SingleProduct;
