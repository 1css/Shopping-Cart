import { CartContext } from "./CartContext";
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeItemFromCart, updateQuantity } =
    useContext(CartContext);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  if (cartItems.length === 0) {
    return (
      <div className="text-center my-4">
        Your cart is empty. <Link to="/">Go Back</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <h3>{item.name}</h3>
            {item.outOfStock ? null : <p>Price: &#8377;{item.price}</p>}

            <div className="quantity-control">
              {item.outOfStock ? (
                <p>Cannot update quantity, out of stock</p>
              ) : (
                <>
                  <label htmlFor={`qty-${item._id}`}>Quantity: </label>
                  <select
                    id={`qty-${item._id}`}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id, Number(e.target.value))
                    }
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1} value={num + 1}>
                        {num + 1}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
            <button
              className="remove-item"
              onClick={() => removeItemFromCart(item._id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p>Subtotal: &#8377;{subtotal.toFixed(2)}</p>
        <p>Tax: &#8377;{tax.toFixed(2)}</p>
        <h2>Total Payable: &#8377;{total.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
