"use client";

import { useCart } from "@/store/cart.store";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [cake, setCake] = useState(null) as any;
  const { addToCart } = useCart();

  const id = params.id;

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/v1/api/cakes/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.error("Error:", data.error);
            return;
          }
          setCake(data);
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [id]);

  const toCart = () => {
    addToCart(cake._id);
  };

  if (!cake) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800">{cake.name}</h1>
        <img
          className="w-full h-48 object-cover mt-4"
          src={cake.image}
          alt={cake.name}
        />
        <p className="text-gray-700 text-base mt-4">{cake.description}</p>
        <p className="text-gray-700 text-base mt-4">Price: LKR {cake.price}</p>
        <span className="mt-6 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {cake.type}
        </span>

        <button
          onClick={toCart}
          className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
