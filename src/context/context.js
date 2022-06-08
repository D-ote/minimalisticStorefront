import React, { useContext, createContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const CurrencyContext = createContext();
export const ProductDescription = createContext();
export const AddToCart = createContext();
export const CartItemCount = createContext();
export const GrandTotal = createContext();

// hoc context
export const withContext = (contextName, context, WrappedComponent) => (p) => {
  return (
    <WrappedComponent
      {...{
        [contextName]: useContext(context),
        ...p,
      }}
    />
  );
};

export function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}
