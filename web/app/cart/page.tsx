"use client";

import { useCart } from "@/store/cart.store";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [cakes, setCakes] = useState([]) as any;

  useEffect(() => {
    // Fetch details for all cakes in the cart
    const fetchCakes = async () => {
      const promises = cart.map((id) =>
        fetch(`http://localhost:5000/v1/api/cakes/${id}`).then((response) =>
          response.json()
        )
      );
      const cakeDetails = await Promise.all(promises);
      setCakes(cakeDetails);
    };

    if (cart.length > 0) {
      fetchCakes();
    }
  }, [cart]);

  const totalPrice = cakes.reduce(
    (total: any, cake: any) => total + cake.price,
    0
  );

  if (cart.length === 0) {
    return <div>Your cart is empty</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-gray-800">Your Cart</h1>
        <div className="mt-4 space-y-4">
          {cakes.map((cake: any) => (
            <div key={cake._id} className="flex items-center space-x-4">
              <img
                className="w-24 h-24 object-cover rounded-md"
                src={cake.image}
                alt={cake.name}
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {cake.name}
                </h2>
                <p className="text-gray-700 text-base">
                  {cake.description.slice(0, 100)}...
                </p>
                <p className="text-gray-700 text-base">Price: ${cake.price}</p>
                <button
                  onClick={() => removeFromCart(cake._id)}
                  className="mt-2 py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Total Price: ${totalPrice}
          </h2>
          <button className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
