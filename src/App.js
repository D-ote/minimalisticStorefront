import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Component } from "react";
import AppRouter from "./AppRouter";
import { AddToCart, CurrencyContext } from "./context/context";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      uri: "http://localhost:4000/",
    });

    this.state = {
      currency: "$",
      productDescription: {},
      cartLoad: [],
      totalPrice: 0,
      totalCount: 0,
      modalState: false,
      modalAttributes: {},
    };

    this.addItemToCart = this.addItemToCart.bind(this);
    this.reduceItemCountFromCart = this.reduceItemCountFromCart.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateTotalPrice = this.updateTotalPrice.bind(this);
    this.updateLocalStorage = this.updateLocalStorage.bind(this);
    this.updateAttributes = this.updateAttributes.bind(this);
  }

  componentDidMount() {
    this.getItemsFromLocalStorage();
    this.updateTotalPrice();
  }

  updateLocalStorage() {
    if (this.state.cartLoad) {
      localStorage.setItem("cartItems", JSON.stringify(this.state.cartLoad));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const currentCount = this.state.cartLoad.reduce(
      (acc, item) => acc + item.count,
      0
    );
    const prevCount = prevState.cartLoad.reduce(
      (acc, item) => acc + item.count,
      0
    );
    this.updateLocalStorage();

    if (
      currentCount !== prevCount ||
      prevState.currency !== this.state.currency
    ) {
      this.updateTotalPrice();
      this.updateState("totalCount", currentCount);
    }
  }

  updateTotalPrice() {
    const productTotalPrice = this.state.cartLoad?.reduce((acc, curr) => {
      const productPrice = curr?.prices?.find(
        (item) => item.currency.symbol === this.state.currency
      ).amount;

      return acc + curr.count * productPrice;
    }, 0);
    this.updateState("totalPrice", productTotalPrice);
  }

  getItemsFromLocalStorage() {
    const allProducts = JSON.parse(localStorage.getItem("cartItems")) || [];
    this.setState({ cartLoad: allProducts });
  }

  addItemToCart(item, attr) {
    const productIndex = this.state.cartLoad.findIndex((cartItem) => {
      return cartItem.id === item.id && cartItem.attr.attrVal === attr.attrVal;
    });

    if (productIndex >= 0) {
      this.setState((prevState) => {
        let newCart = [...prevState.cartLoad];
        newCart[productIndex] = {
          ...newCart[productIndex],
          count: newCart[productIndex].count + 1,
        };

        this.updateLocalStorage("cartItem", newCart);
        return { cartLoad: newCart };
      });
    } else {
      this.setState((prevState) => {
        return {
          cartLoad: [...prevState.cartLoad, { ...item, count: 1, attr: attr }],
        };
      });
      this.updateLocalStorage();
    }
  }

  reduceItemCountFromCart(item, attr) {
    const { cartLoad } = this.state;

    if (attr) {
      const productIndex = cartLoad.findIndex(
        (cartItem) =>
          cartItem.id === item.id && cartItem.attr.attrVal === attr.attrVal
      );

      if (productIndex >= 0) {
        this.setState((prevState) => {
          let newCart = [...prevState.cartLoad];

          if (newCart[productIndex].count === 1) {
            newCart.splice(productIndex, 1);
          } else {
            newCart[productIndex] = {
              ...newCart[productIndex],
              count: newCart[productIndex].count - 1,
              attr,
            };
          }

          this.updateLocalStorage("cartItem", this.newCart);
          return { cartLoad: newCart };
        });
      }
    } else {
      const productIndex = cartLoad.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (productIndex >= 0) {
        this.setState((prevState) => {
          let newCart = [...prevState.cartLoad];

          if (newCart[productIndex].count === 1) {
            newCart.splice(productIndex, 1);
          } else {
            newCart[productIndex] = {
              ...newCart[productIndex],
              count: newCart[productIndex].count - 1,
            };
          }

          this.updateLocalStorage("cartItem", this.newCart);
          return { cartLoad: newCart };
        });
      }
    }
  }

  updateState(key, val) {
    this.setState({ [key]: val });
  }

  updateAttributes(itemID, attrName, attrVal) {
    const productIndex = this.state.cartLoad.findIndex(
      (cartItem) => cartItem.id === itemID
    );
    if (productIndex >= 0) {
      this.setState((prevState) => {
        let newCart = [...prevState.cartLoad];
        newCart[productIndex] = {
          ...newCart[productIndex],
          attr: { ...newCart[productIndex].attr, [attrName]: attrVal },
        };
        this.updateLocalStorage("cartItem", newCart);
        return { cartLoad: newCart };
      });
    }
  }

  render() {
    const {
      currency,
      cartLoad,
      totalPrice,
      totalCount,
      modalState,
      modalAttributes,
    } = this.state;

    return (
      <ApolloProvider client={this.client}>
        <CurrencyContext.Provider
          value={{
            currency,
            setCurrency: (val) => this.updateState("currency", val),
          }}
        >
          <AddToCart.Provider
            value={{
              cartLoad,
              totalCount,
              totalPrice,
              modalState,
              modalAttributes,
              updateState: this.updateState,
              setCartLoad: (val) => this.updateState("cartLoad", val),
              addItemToCart: this.addItemToCart,
              updateAttributes: this.updateAttributes,
              reduceItemCountFromCart: this.reduceItemCountFromCart,
            }}
          >
            <AppRouter />
          </AddToCart.Provider>
        </CurrencyContext.Provider>
      </ApolloProvider>
    );
  }
}

export default App;
