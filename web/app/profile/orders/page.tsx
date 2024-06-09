"use client";

import { useEffect, useState } from "react";
import useUserData from "@/hook/useUser";

export default function UserOrdersPage() {
  const user = useUserData();
  const [orders, setOrders] = useState([]) as any;

  const fetchUserOrders = async () => {
    if (user) {
      fetch(`http://localhost:5000/v1/api/orders/user/${user.id}`)
        .then((response) => response.json())
        .then((data) => setOrders(data))
        .catch((error) => console.error("Error fetching user orders:", error));
    }
  };

  useEffect(() => {
    fetchUserOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="text-2xl font-semibold h-screen flex items-center justify-center">
        Please log in to view your orders.
      </div>
    );
  }

  const deleteOrder = async (orderId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/v1/api/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Order deleted successfully");
        fetchUserOrders();
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h1>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2">Order ID</th>
            <th className="py-2 px-4 border-b-2">Cakes</th>
            <th className="py-2 px-4 border-b-2">Quantity</th>
            <th className="py-2 px-4 border-b-2">Price</th>
            <th className="py-2 px-4 border-b-2">Status</th>
            <th className="py-2 px-4 border-b-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b">{order._id}</td>
              <td className="py-2 px-4 border-b">
                {order.cakes.map((cake: any) => (
                  <div key={cake._id}>{cake.name}</div>
                ))}
              </td>
              <td className="py-2 px-4 border-b">{order.quantity}</td>
              <td className="py-2 px-4 border-b">LKR {order.price}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b flex justify-center items-center">
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this order?"
                      )
                    ) {
                      deleteOrder(order._id);
                    }
                  }}
                  className="py-1 px-3  bg-red-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
