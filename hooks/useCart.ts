import { ICartItem } from "@/models/types";
import { useEffect, useState } from "react";

export const useCartTracks = () => {
  // Load cart from sessionStorage on hook initialization
  const [cart, setCart] = useState<ICartItem[]>([]);
  useEffect(() => {
    if (sessionStorage.getItem("cart")) {
      setCart(JSON.parse(sessionStorage.getItem("cart") as string));
    }
  }, []);

  // Save cart to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add an item to the cart
  const addToCart = (item: ICartItem) => {
    // Check if the item is already in the cart
    const itemExists = cart.find((cartItem) => cartItem.id === item.id);
    if (itemExists) {
      return;
    }
    setCart([...cart, item]);
  };

  // Function to clear the entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Function to remove a specific item from the cart
  const removeFromCart = (itemId) => {
    const updatedCart = JSON.parse(sessionStorage.getItem("cart") as string).filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  // Calculate cart count
  const cartCount = cart?.length;

  return {
    cart,
    cartCount,
    addToCart,
    clearCart,
    removeFromCart,
  };
};
