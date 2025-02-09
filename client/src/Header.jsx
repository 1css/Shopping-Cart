
import { Link } from "react-router-dom";
import "./styles.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { CartContext } from "./CartContext";
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";


function Header() {
    const {
      cartItems,
   
    } = useContext(CartContext);
  return (
    <header className="header">
      <div className="logo">MyStore</div>
      <input type="text" placeholder="Search..." className="search" />
      <div className="icons">
        <Link to="/cart" style={{textDecoration:'none',color:'white'}}>
          <div className="cart">
            <FaShoppingCart />
            <span className="cart-count">{cartItems.length}</span>
          </div>
        </Link>
        <FaUser className="login" />
      </div>
    </header>
  );
}

export default Header;
