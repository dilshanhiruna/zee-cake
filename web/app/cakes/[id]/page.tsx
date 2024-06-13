"use client";

import useUserData from "@/hook/useUser";
import { useCart } from "@/store/cart.store";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [cake, setCake] = useState(null) as any;
  const { addToCakeCart } = useCart();

  const userData = useUserData();

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
    if (!userData.id) {
      alert("Please login to add to cart");
      return;
    }
    addToCakeCart(cake._id);
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/v1/api/cakes/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Cake deleted successfully");
          alert("Cake deleted successfully");
          // Redirect
          window.location.href = "/cakes";
        } else {
          alert("Failed to delete the Cake");
          console.error("Failed to delete the Cake");
        }
      })
      .catch((error) => console.error("Error deleting Cake:", error));
  };

  if (!cake) {
    return (
      <div className="text-2xl font-semibold h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center">
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
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {cake.calories} Calories
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {cake.weight || 0} Kg
        </span>

        <button
          onClick={toCart}
          className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
        >
          Add to Cart
        </button>

        {userData.role === "admin" && (
          <div className="mt-4 items-center text-center border p-2 rounded-md bg-slate-200">
            <>
              <p className="text-gray-500 text-sm font-bold">Admin controls</p>
              <div className="flex justify-center gap-1">
                <Link
                  href={`/cakes/edit/${cake._id}`}
                  className="py-2 px-4 bg-yellow-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Edit
                </Link>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this cake?"
                      )
                    ) {
                      handleDelete();
                    }
                  }}
                  className="py-2 px-4 bg-red-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </>
          </div>
        )}
      </div>
    </div>
  );
}
