import { createContext, useContext } from "react";

export const CartContext = createContext({
  cakeCart: [],
  hamperCart: [],
  addToCakeCart: (cart: string) => {},
  addToHamperCart: (cart: string) => {},
  removeFromHamperCart: (cart: string) => {},
  removeFromCakeCart: (cart: string) => {},
  clearCart: () => {},
});

export function useCart() {
  return useContext(CartContext);
}
