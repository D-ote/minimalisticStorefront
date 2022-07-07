import { graphql } from "@apollo/client/react/hoc";
import React, { Component } from "react";
import { SingleProductCard, Loader } from "../../components";
import { AttributesModal } from "../../components/attributesModal";
import { AddToCart, withContext, withRouter } from "../../context/context";
import { GET_PRODUCTS_BY_CATEGORY } from "../../graphQl/queries";
import "./home.css";

class Home extends Component {
  render() {
    const category = this.props.data?.category;
    const loading = this.props.data.loading;
    const error = this.props.data?.error;

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
      <div className="women-category">
        {this.props.cart.modalState && <AttributesModal />}
        <h2>{category.name}</h2>
        <section className="products-layout">
          {category.products.length &&
            category.products.map((product, id) => (
              <SingleProductCard productDetails={product} key={id} />
            ))}
        </section>
      </div>
    );
  }
}

Home = withRouter(
  withContext(
    "cart",
    AddToCart,
    graphql(GET_PRODUCTS_BY_CATEGORY, {
      options: (props) => {
        let title = props.router.location?.hash
          ? props.router.location?.hash.split("#")[1]
          : "all";
        return {
          variables: {
            input: { title },
          },
        };
      },
    })(Home)
  )
);

export { Home };
