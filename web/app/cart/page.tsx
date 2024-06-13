"use client";

import useUserData from "@/hook/useUser";
import { useCart } from "@/store/cart.store";
import { useEffect, useState } from "react";
import PaymentModal from "./payment";

const provinces = [
  "Western",
  "Central",
  "Southern",
  "North Western",
  "Sabaragamuwa",
  "Eastern",
  "Uva",
  "North Central",
  "Northern",
];

export default function CartPage() {
  const {
    cakeCart,
    hamperCart,
    removeFromCakeCart,
    removeFromHamperCart,
    clearCart,
  } = useCart();
  const [cakes, setCakes] = useState([]) as any;
  const [hampers, setHampers] = useState([]) as any;
  const [quantity, setQuantity] = useState({}) as any;
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const userData = useUserData();
  const [selectedProvince, setSelectedProvince] = useState(userData.province);
  const [address, setAddress] = useState(userData.address);

  useEffect(() => {
    const fetchCakes = async () => {
      const promises = cakeCart.map((id) =>
        fetch(`http://localhost:5000/v1/api/cakes/${id}`).then((response) =>
          response.json()
        )
      );
      const cakeDetails = await Promise.all(promises);
      setCakes(cakeDetails);
    };

    const fetchHampers = async () => {
      const promises = hamperCart.map((id) =>
        fetch(`http://localhost:5000/v1/api/giftHampers/${id}`).then(
          (response) => response.json()
        )
      );
      const hamperDetails = await Promise.all(promises);
      setHampers(hamperDetails);
    };

    if (cakeCart.length > 0) {
      fetchCakes();
    }

    if (hamperCart.length > 0) {
      fetchHampers();
    }
  }, [cakeCart, hamperCart]);

  useEffect(() => {
    setSelectedProvince(userData.province);
    setAddress(userData.address);
  }, [userData.province, userData.address]);

  const handleQuantityChange = (id: string, qty: number) => {
    setQuantity((prevQuantity: any) => ({
      ...prevQuantity,
      [id]: qty,
    }));
  };

  const handleCheckout = async () => {
    const cakeOrderDetails = cakes.map((cake: any) => ({
      cake: cake._id,
      quantity: quantity[cake._id] || 1,
    }));

    const hamperOrderDetails = hampers.map((hamper: any) => ({
      hamper: hamper._id,
      quantity: quantity[hamper._id] || 1,
    }));

    const deliveryCharge =
      deliveryOption === "delivery"
        ? selectedProvince === "Western"
          ? 200
          : 500
        : 0;

    const orderData = {
      user: userData?.id,
      cakes: cakeOrderDetails.map((item: any) => item.cake),
      giftHampers: hamperOrderDetails.map((item: any) => item.hamper),
      quantity:
        cakeOrderDetails.reduce(
          (acc: any, item: any) => acc + item.quantity,
          0
        ) +
        hamperOrderDetails.reduce(
          (acc: any, item: any) => acc + item.quantity,
          0
        ),
      price:
        cakeOrderDetails.reduce(
          (total: any, item: any) =>
            total +
            item.quantity *
              cakes.find((cake: any) => cake._id === item.cake).price,
          0
        ) +
        hamperOrderDetails.reduce(
          (total: any, item: any) =>
            total +
            item.quantity *
              hampers.find((hamper: any) => hamper._id === item.hamper).price,
          0
        ) +
        deliveryCharge,
      status: "Pending",
      deliveryOption,
      province: deliveryOption === "delivery" ? selectedProvince : null,
      address: address.trim(),
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
        window.location.href = "/";
      } else {
        console.error("Error placing order:", result);
        alert("Error placing order");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error placing order");
    }
  };

  const subtotalPrice =
    cakes.reduce(
      (total: any, cake: any) => total + (quantity[cake._id] || 1) * cake.price,
      0
    ) +
    hampers.reduce(
      (total: any, hamper: any) =>
        total + (quantity[hamper._id] || 1) * hamper.price,
      0
    );

  const deliveryCharge =
    deliveryOption === "delivery"
      ? selectedProvince === "Western"
        ? 200
        : 500
      : 0;

  const totalPrice = subtotalPrice + deliveryCharge;

  if (!userData.id) {
    return <></>;
  }

  if (cakeCart.length === 0 && hamperCart.length === 0) {
    return (
      <div className="text-2xl font-semibold h-screen flex items-center justify-center">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center">
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
                <p className="text-gray-700 text-base">
                  Price: LKR {cake.price} | Weight: {cake.weight} Kg
                </p>
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
                    className="w-16 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                  />
                </div>
                <button
                  onClick={() => removeFromCakeCart(cake._id)}
                  className="mt-2 py-1 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {hampers.map((hamper: any) => (
            <div key={hamper._id} className="flex items-center space-x-4">
              <img
                className="w-24 h-24 object-cover rounded-md"
                src={hamper.image}
                alt={hamper.name}
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {hamper.name}
                </h2>
                <p className="text-gray-700 text-base">
                  {hamper.description.slice(0, 100)}...
                </p>
                <p className="text-gray-700 text-base">
                  Price: LKR {hamper.price}
                </p>
                <div className="flex items-center mt-2">
                  <label htmlFor={`quantity-${hamper._id}`} className="mr-2">
                    Quantity:
                  </label>
                  <input
                    id={`quantity-${hamper._id}`}
                    type="number"
                    min="1"
                    value={quantity[hamper._id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(hamper._id, parseInt(e.target.value))
                    }
                    className="w-16 p-1 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                  />
                </div>
                <button
                  onClick={() => removeFromHamperCart(hamper._id)}
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
            Delivery Options
          </h2>
          <div className="mt-2">
            <label className="mr-4">
              <input
                type="radio"
                name="deliveryOption"
                value="pickup"
                checked={deliveryOption === "pickup"}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              Pickup
            </label>
            <label>
              <input
                type="radio"
                name="deliveryOption"
                value="delivery"
                checked={deliveryOption === "delivery"}
                onChange={(e) => setDeliveryOption(e.target.value)}
              />
              Delivery
            </label>
          </div>
          {deliveryOption === "delivery" && (
            <div className="mt-4">
              <p>
                <strong>Delivery Address:</strong>
              </p>
              <div className="flex justify-between items-center gap-2 mt-2">
                <input
                  id="address"
                  type="text"
                  placeholder="Address"
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-1/2 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                />
                <select
                  id="province"
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="bg-slate-100 block w-1/2 p-2 text-base border-gray-700 sm:text-sm rounded-md"
                >
                  <option value="">Select a province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className="mt-8">
            <h2 className="text-sm text-gray-800">
              Subtotal: LKR {subtotalPrice.toFixed(2)}
            </h2>
            <h2 className="text-sm text-gray-800">
              Shipping:{" "}
              {deliveryOption === "delivery"
                ? "LKR " + deliveryCharge.toFixed(2)
                : "Free"}
            </h2>
            <h2 className="mt-5 text-xl font-semibold text-gray-800">
              Total Price: LKR {totalPrice.toFixed(2)}
            </h2>
            <button
              onClick={() => {
                if (deliveryOption === "delivery" && !selectedProvince) {
                  alert("Please select a province");
                  return;
                }
                if (address.trim() === "") {
                  alert("Please enter an address");
                  return;
                }
                setPaymentModalOpen(true);
              }}
              className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            >
              Checkout
            </button>
          </div>
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
