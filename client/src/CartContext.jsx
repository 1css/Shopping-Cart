
import { createContext, useState, useEffect } from "react";

const CartContext = createContext();
import axios from 'axios'

/* eslint-disable react/prop-types */
const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  /* eslint-disable no-unused-vars */
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cartItems.length > 0) {
      const fetchProducts = async () => {
        try {
          const ids = cartItems.map((item) => item._id);
          const promises = ids.map((id) =>
            axios.get(`http://localhost:3001/api/products/${id}`)
          );
          const responses = await Promise.allSettled(promises);
          const fetchedProducts = responses.map((response) => {
            if (response.status === "fulfilled") {
              return response.value.data;
            } else {
              return {
                id: response.reason.config.url.split("/").pop(),
                error: "Failed to fetch product",
              };
            }
          });
          setProducts(fetchedProducts);
          setIsLoaded(true);
        } catch (error) {
          setError(error.message);
        }
      };
      fetchProducts();
    } else {
      setProducts([]);
      setIsLoaded(true);
    }
  }, [cartItems]);

  console.log(cartItems, "cartItems");

  useEffect(() => {
    if (isLoaded) {
      const updatedCartItems = cartItems.map((item) => {
        const fetchedProduct = products.find(
          (product) => product._id === item._id
        );
        if (fetchedProduct) {
          if (fetchedProduct.price !== item.price) {
            return { ...item, price: fetchedProduct.price };
          }
          if (fetchedProduct.quantity === 0) {
            return { ...item, outOfStock: true };
          }
        }
        return item;
      });
      // Only update cartItems if they have actually changed
      if (!areCartItemsEqual(cartItems, updatedCartItems)) {
        setCartItems(updatedCartItems);
      }
    }
  }, [isLoaded, cartItems, products]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const areCartItemsEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (
        arr1[i]._id !== arr2[i]._id ||
        arr1[i].quantity !== arr2[i].quantity ||
        arr1[i].price !== arr2[i].price ||
        arr1[i].outOfStock !== arr2[i].outOfStock
      ) {
        return false;
      }
    }
    return true;
  };

  const addItemToCart = (item) => {
    const existingItem = cartItems.find((i) => i._id === item._id);
    if (existingItem) {
      if (existingItem.outOfStock) {
        return;
      }
      setCartItems(
        cartItems.map((i) =>
          i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeItemFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        increaseQuantity,
        decreaseQuantity,
        setCartItems: setCartItems, // Pass the setCartItems function
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
