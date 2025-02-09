
// import React from "react";
import { useState } from "react";
import Header from "./Header";
import "./styles.css";
import Home from "./Home";
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Cart from "./Cart";
import Footer from "./Footer";
import { CartProvider } from "./CartContext";

const App = () => {
  /* eslint-disable no-unused-vars */
  const [cartItems, setCartItems] = useState(3);

  
  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Header cartItems={cartItems} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
   
    </>
  );
};



export default App;
