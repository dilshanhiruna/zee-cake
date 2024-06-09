"use client";

import { useEffect, useState } from "react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]) as any;
  const [status, setStatus] = useState({}) as any;

  const fetchOrders = async () =>
    fetch("http://localhost:5000/v1/api/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setStatus((prevStatus: any) => ({
      ...prevStatus,
      [orderId]: newStatus,
    }));
  };

  const updateOrderStatus = async (orderId: string) => {
    const newStatus = status[orderId];

    try {
      const response = await fetch(
        `http://localhost:5000/v1/api/orders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        alert("Order status updated successfully");
        fetchOrders();
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
        fetchOrders();
      } else {
        console.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Orders</h1>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 text-sm border-b-2">Email</th>
            <th className="py-2 px-4 text-sm border-b-2">Address</th>
            <th className="py-2 px-4 text-sm border-b-2">Phone</th>
            <th className="py-2 px-4 text-sm border-b-2">Cakes</th>
            <th className="py-2 px-4 text-sm border-b-2">Quantity</th>
            <th className="py-2 px-4 text-sm border-b-2">Price</th>
            <th className="py-2 px-4 text-sm border-b-2">Status</th>
            <th className="py-2 px-4 text-sm border-b-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order._id}>
              <td className="py-2 px-4 text-sm border-b">
                {order.user?.email}
              </td>
              <td className="py-2 px-4 text-sm border-b">
                {order.user?.address}
              </td>
              <td className="py-2 px-4 text-sm border-b">
                {order.user?.phone}
              </td>

              <td className="py-2 px-4 text-sm border-b">
                {order.cakes.map((cake: any) => (
                  <div key={cake._id}>{cake.name}</div>
                ))}
              </td>
              <td className="py-2 px-4 text-sm border-b">{order.quantity}</td>
              <td className="py-2 px-4 text-sm border-b">LKR {order.price}</td>
              <td className="py-2 px-4 text-sm border-b">
                <select
                  value={status[order._id] || order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td className="py-2 px-4 text-sm border-b flex justify-end">
                <button
                  onClick={() => updateOrderStatus(order._id)}
                  className="py-1 px-3 bg-indigo-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-2"
                >
                  Update Status
                </button>
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
                  className="py-1 px-3 bg-red-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
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
