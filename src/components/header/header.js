import { useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bars, CurrencyOff, CurrencyOn, EmptyCart, Logo } from "../../assets";
import { AddToCart, CurrencyContext } from "../../context/context";
import { useClickOutside } from "../../customHooks";
import { GET_CURRENCIES } from "../../graphQl/queries";
import Dropdown from "../dropdown/dropdown";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [getCurrency, { data }] = useLazyQuery(GET_CURRENCIES);

  const select = useContext(CurrencyContext);
  const cart = useContext(AddToCart);
  const [dropdown, setDropdown] = useState(false);
  const [cartDisplay, setCartDisplay] = useState(false);
  const { pathname } = useLocation();

  const cartLoad = cart.cartLoad;

  const setActive = (path) => {
    return pathname.includes(path);
  };

  useEffect(() => {
    getCurrency();
  }, [getCurrency]);

  let closeCurrencyDropdown = useClickOutside(() => {
    setDropdown(!dropdown);
  });

  let closeCartDropdown = useClickOutside(() => {
    setCartDisplay(!cartDisplay);
  });

  if (data) {
    // console.log(select.currency);
  }

  return (
    <div className="header">
      <ul className="header-link">
        <li>
          <Link to="/women" className={`${setActive("/women") && "active"}`}>
            all
          </Link>
        </li>
        <li>
          <Link
            to="/clothes"
            className={`${setActive("/clothes") && "active"}`}
          >
            clothes
          </Link>
        </li>
        <li>
          <Link to="/tech" className={`${setActive("/tech") && "active"}`}>
            tech
          </Link>
        </li>
      </ul>
      <div onClick={() => navigate("/women")}>
        <img src={Logo} alt="company logo" />
      </div>
      <ul className="header-link">
        <li>
          <img
            src={dropdown ? CurrencyOn : CurrencyOff}
            alt="currency selector"
            onClick={() => setDropdown(!dropdown)}
          />
          {dropdown && (
            <div id="overlay">
              <ul className="currency-dropdown" ref={closeCurrencyDropdown}>
                {data?.currencies?.map((currency, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      select.setCurrency(currency.symbol);
                      setDropdown(!dropdown);
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
            onClick={() => setCartDisplay(!cartDisplay)}
          />
          <div className="cart-count">
            {cart.cartLoad?.reduce((acc, item) => acc + item.count, 0)}
          </div>
          {cartDisplay && (
            <div id="overlay">
              <Dropdown ref={closeCartDropdown} />
            </div>
          )}
        </li>
      </ul>
      <div className="icon-bars">
        <img src={Bars} alt="icon bars" />
      </div>
    </div>
  );
};

export default Header;
