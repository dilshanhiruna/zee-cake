"use client";

import { useEffect, useState } from "react";
import useUserData from "@/hook/useUser";

export default function UserCustomCakeRequests() {
  const user = useUserData();
  const [requests, setRequests] = useState([]) as any;

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
    <div className="p-8 bg-gray-50 min-h-screen">
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
            <p className="text-gray-700 mt-2">{request.greeting}</p>
            <p className="text-gray-700 mt-2">{request.description}</p>
            <p className="text-gray-700 mt-2">Color: {request.color}</p>
            <p className="text-gray-700 mt-2">Weight: {request.weight} kg</p>
            <p className="text-gray-700 mt-2">Price: LKR {request.price}</p>
            <p className="text-gray-700 mt-2">Status: {request.status}</p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to cancel this customized cake request?"
                    )
                  ) {
                    handleCancelRequest(request._id);
                  }
                }}
                className="py-2 px-4 bg-red-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel Request
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
