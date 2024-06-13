"use client";

import { useEffect, useState } from "react";
import useUserData from "@/hook/useUser";

export default function UserCustomCakeRequests() {
  const user = useUserData();
  const [requests, setRequests] = useState([]);

  const fetchUserRequests = async () => {
    if (user.id) {
      fetch(`http://localhost:5000/v1/api/customCakes/user/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setRequests(data);
        })
        .catch((error) =>
          console.error("Error fetching user requests:", error)
        );
    }
  };

  useEffect(() => {
    fetchUserRequests();
  }, [user]);

  if (!user) {
    return (
      <div className="text-2xl font-semibold h-screen flex items-center justify-center">
        Please log in to view your customized cake requests.
      </div>
    );
  }

  const handleCancelRequest = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/v1/api/customCakes/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Customized cake request canceled successfully");
        fetchUserRequests();
      } else {
        console.error("Failed to cancel customized cake request");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (requests.length === 0) {
    return (
      <div className="text-2xl font-semibold h-screen flex items-center justify-center">
        You have not made any customized cake requests yet.
      </div>
    );
  }

  return (
    <div className="p-8   min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        My Customized Cake Requests
      </h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request: any) => (
          <div key={request._id} className="p-6 bg-white rounded-lg shadow-md">
            <img
              className="w-full h-48 object-cover rounded-md mb-4"
              src={request.image}
              alt={request.flavor}
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {request.flavor}
            </h2>
            <div className="border-t border-gray-200 mt-4"></div>
            <p className="text-gray-700 mt-2">Topping: {request.topping}</p>
            <p className="text-gray-700 mt-2">Topper: {request.topper}</p>
            <p className="text-gray-700 mt-2">
              Decoration: {request.decoration}
            </p>
            <p className="text-gray-700 mt-2">Weight: {request.weight} kg</p>
            <p className="text-gray-700 mt-2">Message: {request.message}</p>
            <p className="text-gray-700 mt-2">
              Extra Details: {request.extraDetails}
            </p>

            <div className="flex space-x-4 mt-4">
              <div className="flex items-center">
                <input
                  id="glutenFree"
                  name="glutenFree"
                  type="checkbox"
                  checked={request.glutenFree}
                  className="h-4 w-4 text-orange-700 border-gray-300 rounded focus:ring-orange-400"
                />
                <label
                  htmlFor="glutenFree"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Gluten Free
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="vegan"
                  name="vegan"
                  type="checkbox"
                  checked={request.vegan}
                  className="h-4 w-4 text-orange-700 border-gray-300 rounded focus:ring-orange-400"
                />
                <label
                  htmlFor="vegan"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Vegan
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="nutFree"
                  name="nutFree"
                  type="checkbox"
                  checked={request.nutFree}
                  className="h-4 w-4 text-orange-700 border-gray-300 rounded focus:ring-orange-400"
                />
                <label
                  htmlFor="nutFree"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Nut Free
                </label>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4"></div>
            <p className="text-gray-700 mt-2">
              Delivery Date: {new Date(request.deliveryDate).toDateString()}
            </p>
            <p className="text-gray-700 mt-2">Price: LKR {request.price}</p>

            <div className="border-t border-gray-200 mt-4">
              {request.accepted && (
                <p className="text-green-600 mt-2">Order Accepted 😄</p>
              )}
            </div>
            <p className="text-gray-700 mt-2">Status: {request.status}</p>

            <div className="mt-4 flex space-x-4">
              <button
                disabled={request.accepted}
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to cancel this customized cake request?"
                    )
                  ) {
                    handleCancelRequest(request._id);
                  }
                }}
                className={`${
                  request.accepted
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                } text-white py-2 px-4 rounded-md`}
              >
                Cancel Request
              </button>
            </div>
            {request.accepted && (
              <p className="mt-2 text-[10px]">
                You can't cancel this request because it has been accepted.
                Please wait for the delivery.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
