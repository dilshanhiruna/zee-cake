"use client";

import { useState, useEffect } from "react";

export default function AdminCustomCakeRequests() {
  const [requests, setRequests] = useState([]) as any;

  const fetchRequests = () => {
    fetch("http://localhost:5000/v1/api/customCakes")
      .then((response) => response.json())
      .then((data) => setRequests(data))
      .catch((error) => console.error("Error fetching requests:", error));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = (id: string, action: any) => {
    fetch(`http://localhost:5000/v1/api/customCakes/${id}/accept`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(() => fetchRequests())
      .catch((error) => console.error(`Error updating request: ${error}`));
  };

  const handleShippingStatusChange = (id: string, event: any) => {
    const newStatus = event.target.value;
    fetch(`http://localhost:5000/v1/api/customCakes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then(() => fetchRequests())
      .catch((error) =>
        console.error("Error updating shipping status:", error)
      );
  };

  return (
    <div className="flex flex-col items-center justify-center   pb-8 pt-2">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Customized Cake Orders
      </h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-sm">
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
            <p className="text-gray-700 mt-2">Status: {request.status}</p>
            <div className="border-t border-gray-200 mt-4"></div>
            <p className="text-gray-700 mt-2 text-sm">
              User: {request.user.email}
            </p>
            <p className="text-gray-700 mt-2 text-sm">
              Shipping Address: {request.user.address}
            </p>
            <p className="text-gray-700 mt-2 text-sm">
              To: {request.user.province} Province
            </p>
            <p className="text-gray-700 mt-2 text-sm">
              Number: {request.user.phone}
            </p>
            <div className="border-t border-gray-200 mt-4"></div>

            <div className="mt-4">
              <label
                htmlFor="shippingStatus"
                className="block text-sm font-medium text-gray-700"
              >
                Shipping Status
              </label>
              <select
                id="shippingStatus"
                name="shippingStatus"
                value={request.shippingStatus}
                onChange={(event) =>
                  handleShippingStatusChange(request._id, event)
                }
                defaultValue={request.status}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleAction(request._id, "accept")}
                className={`py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  request.accepted !== false
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-green-600 text-white focus:ring-green-500"
                }`}
                disabled={request.accepted !== false}
              >
                Accept
              </button>
              <button
                onClick={() => handleAction(request._id, "reject")}
                className={`py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  request.accepted !== true
                    ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                    : "bg-red-600 text-white focus:ring-red-500"
                }`}
                disabled={request.accepted !== true}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
