import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { useState } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import {
  AddToCart,
  CartList,
  CurrencyContext,
  GrandTotal,
  ProductDescription,
  ProductId,
} from "./context/context";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/",
  });

  const [currency, setCurrency] = useState("$");
  const [productDescription, setProductDescription] = useState({});
  const [cartLoad, setCartLoad] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (item) => {
    const productIndex = cartLoad.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (productIndex >= 0) {
      setCartLoad((prevCart) => {
        let newCart = [...prevCart];
        newCart[productIndex] = {
          ...newCart[productIndex],
          count: newCart[productIndex].count + 1,
        };

        return newCart;
      });
    } else {
      setCartLoad((prevCart) => [...prevCart, { ...item, count: 1 }]);
    }
  };

  const reduceItemCountFromCart = (item) => {
    const productIndex = cartLoad.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (productIndex >= 0) {
      setCartLoad((prevCart) => {
        let newCart = [...prevCart];

        if (newCart[productIndex].count === 1) {
          newCart.splice(productIndex, 1);
        } else {
          newCart[productIndex] = {
            ...newCart[productIndex],
            count: newCart[productIndex].count - 1,
          };
        }

        return newCart;
      });
    }
  };

  return (
    <ApolloProvider client={client}>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
        <ProductDescription.Provider
          value={{ productDescription, setProductDescription }}
        >
          <AddToCart.Provider
            value={{
              cartLoad,
              setCartLoad,
              addItemToCart,
              reduceItemCountFromCart,
            }}
          >
            <GrandTotal.Provider value={{ totalPrice, setTotalPrice }}>
              <AppRouter />
            </GrandTotal.Provider>
          </AddToCart.Provider>
        </ProductDescription.Provider>
      </CurrencyContext.Provider>
    </ApolloProvider>
  );
}

export default App;
