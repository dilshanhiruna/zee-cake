import { createContext, useContext } from "react";

export const CartContext = createContext({
  cart: [],
  addToCart: (cart: string) => {},
  removeFromCart: (cart: string) => {},
});

export function useCart() {
  return useContext(CartContext);
}
