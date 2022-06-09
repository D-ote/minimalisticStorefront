import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import { Link } from "react-router-dom";
import {
  Bars,
  CurrencyOff,
  CurrencyOn,
  EmptyCart,
  Logo,
  Vector,
} from "../../assets";
import {
  AddToCart,
  CurrencyContext,
  withContext,
  withRouter,
} from "../../context/context";
import { GET_CATEGORIES_AND_CURRENCIES } from "../../graphQl/queries";
import Dropdown from "../dropdown/dropdown";
import "./header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.state = {
      dropdown: false,
      cartDisplay: false,
      mobileNav: false,
    };
    this.location = this.props.router.location;
    this.navigate = this.props.router.navigate;

    this.cart = this.props.cart;
    this.select = this.props.currency;

    this.setActive = this.setActive.bind(this);
    this.setActiveCurrency = this.setActiveCurrency.bind(this);
    this.closeDropdown = this.closeDropdown.bind(this);
    this.toggleCartVisibility = this.toggleCartVisibility.bind(this);
    this.toggleNavVisibility = this.toggleNavVisibility.bind(this);
    this.mobileCartView = this.mobileCartView.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.closeDropdown);
  }

  closeDropdown = (e) => {
    if (e.target.id === "overlay" || e.target.id === "overlay1") {
      this.setState({ cartDisplay: false, dropdown: false });
    }
    return;
  };

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.closeDropdown);
  }

  setActive(path) {
    return this.props.router.location.hash === path;
  }

  setActiveCurrency(curr) {
    return this.props.currency.currency === curr;
  }

  toggleCartVisibility() {
    this.setState((prevState) => ({
      cartDisplay: !prevState.cartDisplay,
    }));
  }

  toggleNavVisibility() {
    this.setState((prevState) => ({
      mobileNav: !prevState.mobileNav,
    }));
  }

  mobileCartView() {
    this.props.router.navigate("/viewbag");
    this.toggleNavVisibility();
  }

  render() {
    const categories = this.props.data?.categories;
    const currencies = this.props.data?.currencies;

    console.log(this.state?.dropdown, this.props.data?.currencies, "sss");

    return (
      <>
        <div className="header">
          <ul className="header-link">
            {categories?.map((category, index) => (
              <li key={index}>
                <Link
                  to={category.name === "all" ? "/" : `/#${category.name}`}
                  className={`${
                    this.setActive(
                      `${category.name}` === "all" ? "" : `#${category.name}`
                    ) && "active"
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>

          <Link to={"/"}>
            <img src={Logo} alt="company logo" />
          </Link>

          <ul className="header-link">
            <li>
              <span
                onClick={() =>
                  this.setState({
                    ...this.state,
                    dropdown: !this.state.dropdown,
                  })
                }
                className="currency"
              >
                {this.props.currency.currency}{" "}
                <img
                  src={Vector}
                  className={this.state.dropdown ? "up" : "down"}
                  alt="currency selector"
                />
              </span>

              {this.state.dropdown && (
                <div id="overlay">
                  <ul
                    className="currency-dropdown"
                    ref={this.closeCurrencyDropdown}
                  >
                    {currencies?.map((currency, index) => (
                      <li
                        key={index}
                        className={
                          this.setActiveCurrency(currency.symbol) &&
                          "activeCurrency"
                        }
                        onClick={() => {
                          this.select.setCurrency(currency.symbol);
                          this.setState({
                            ...this.state,
                            dropdown: !this.state.dropdown,
                          });
                        }}
                      >{`${currency.symbol} ${currency.label}`}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
            <li className="cart-div">
              <img
                src={EmptyCart}
                alt="currencies"
                onClick={this.toggleCartVisibility}
                className="cursor"
              />
              <div className="cart-count">{this.props.cart.totalCount}</div>
              {this.state.cartDisplay && (
                <div id="overlay1">
                  <Dropdown
                    ref={this.dropdownRef}
                    toggleDropdown={this.toggleCartVisibility}
                  />
                </div>
              )}
            </li>
          </ul>
          <div className="icon-bars">
            <img
              src={Bars}
              alt="icon bars"
              onClick={this.toggleNavVisibility}
            />

            {this.state.mobileNav && (
              <div className="responsive-nav">
                <ul className="mobile-nav-list">
                  {categories?.map((category, index) => (
                    <li key={index} onClick={this.toggleNavVisibility}>
                      <Link
                        to={
                          category.name === "all" ? "/" : `/#${category.name}`
                        }
                        className={`${
                          this.setActive(
                            `${category.name}` === "all"
                              ? ""
                              : `#${category.name}`
                          ) && "active"
                        }`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <ul className="mobile-nav-list">
                  <li>
                    <span
                      onClick={() =>
                        this.setState({
                          ...this.state,
                          dropdown: !this.state.dropdown,
                        })
                      }
                      className="currency"
                    >
                      {this.props.currency.currency}{" "}
                      <img
                        src={Vector}
                        className={this.state?.dropdown ? "up" : "down"}
                        alt="currency selector"
                      />
                    </span>
                    {this.state?.dropdown && (
                      <div id="overlay">
                        <ul className="currency-dropdown">
                          {currencies?.map((currency, index) => (
                            <li
                              key={index}
                              onClick={() => {
                                this.select.setCurrency(currency.symbol);
                                this.setState({
                                  dropdown: !this.state.dropdown,
                                  mobileNav: false,
                                });
                              }}
                            >{`${currency.symbol} ${currency.label}`}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                  <li>
                    <img
                      src={EmptyCart}
                      alt="currencies"
                      onClick={this.mobileCartView}
                      className="cart-icon"
                    />
                    <div className="cart-count">
                      {this.props.cart.totalCount}
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

Header = graphql(GET_CATEGORIES_AND_CURRENCIES)(
  withRouter(
    withContext(
      "currency",
      CurrencyContext,
      withContext("cart", AddToCart, Header)
    )
  )
);

export { Header };
