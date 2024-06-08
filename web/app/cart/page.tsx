"use client";

import useUserData from "@/hook/useUser";
import { useCart } from "@/store/cart.store";
import { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PaymentModal from "./payment";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [cakes, setCakes] = useState([]) as any;
  const [quantity, setQuantity] = useState({}) as any;

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  const userData = useUserData();

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

  const handleQuantityChange = (id: string, qty: number) => {
    setQuantity((prevQuantity: any) => ({
      ...prevQuantity,
      [id]: qty,
    }));
  };

  const handleCheckout = async () => {
    const orderDetails = cakes.map((cake: any) => ({
      cake: cake._id,
      quantity: quantity[cake._id] || 1,
    }));

    const orderData = {
      user: userData?.id,
      cakes: orderDetails.map((item: any) => item.cake),
      quantity: orderDetails.reduce(
        (acc: any, item: any) => acc + item.quantity,
        0
      ),
      price: orderDetails.reduce(
        (total: any, item: any) =>
          total +
          item.quantity *
            cakes.find((cake: any) => cake._id === item.cake).price,
        0
      ),
      status: "Pending",
    };

    try {
      const response = await fetch("http://localhost:5000/v1/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Order placed successfully:", result);
        alert("Order placed successfully");
        clearCart();
        // Redirect to a success page or show a success message
        window.location.href = "/cakes";
      } else {
        console.error("Error placing order:", result);
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error placing order");
    }
  };

  const totalPrice = cakes.reduce(
    (total: any, cake: any) => total + (quantity[cake._id] || 1) * cake.price,
    0
  );

  if (!userData.id) {
    return <></>;
  }

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
                <div className="flex items-center mt-2">
                  <label htmlFor={`quantity-${cake._id}`} className="mr-2">
                    Quantity:
                  </label>
                  <input
                    id={`quantity-${cake._id}`}
                    type="number"
                    min="1"
                    value={quantity[cake._id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(cake._id, parseInt(e.target.value))
                    }
                    className="w-16 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
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
            Total Price: LKR {totalPrice.toFixed(2)}
          </h2>
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Checkout
          </button>
        </div>
      </div>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onPaymentSuccess={handleCheckout}
        totalPrice={totalPrice}
      />
    </div>
  );
}
