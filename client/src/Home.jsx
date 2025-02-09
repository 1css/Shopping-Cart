/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import "./Home.css";
import { CartContext } from "./CartContext";

function Home() {
  const { data, error, isLoading } = useQuery("products", async () => {
    const response = await axios.get("http://localhost:3001/api/products/all");
    return response.data;
  });
  const { addItemToCart } = useContext(CartContext);

  if (isLoading) {
    return (
      <div>
        <section className="banner">
          <h1>Welcome to Our Store</h1>
          <p>Discover the best products at unbeatable prices!</p>
        </section>
        <section className="products">
          <p>Loading...</p>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <section className="banner">
          <h1>Welcome to Our Store</h1>
          <p>Discover the best products at unbeatable prices!</p>
        </section>
        <section className="products">
          <p>Error: {error.message}</p>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="banner">
        <h1>Welcome to Our Store</h1>
        <p>Discover the best products at unbeatable prices!</p>
      </section>
      <section className="products">
        {data.map((product) => (
          <div className="product" key={product._id}>
            <div className="image-backgr">Product image</div>
            <h3>{product.name}</h3>
            <p>&#8377;{product.price}</p>
            <button
              className="add-to-cart"
              onClick={() => addItemToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Home;
