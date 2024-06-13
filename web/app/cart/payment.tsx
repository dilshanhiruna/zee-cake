import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  totalPrice: number;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  totalPrice,
}) => {
  const [cvc, setCvc] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocus(e.target.name);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "number") setNumber(value);
    if (name === "name") setName(value);
    if (name === "expiry") setExpiry(value);
    if (name === "cvc") setCvc(value);
  };

  const handlePayment = () => {
    // Here you can add more comprehensive validation
    if (number && name && expiry && cvc) {
      // Fake payment processing
      setTimeout(() => {
        onPaymentSuccess();
        onClose();
      }, 1000);
    } else {
      alert("Please fill in all fields");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Payment</h2>
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus as any}
          name={name}
          number={number}
        />
        <form className="mt-4">
          <div className="mb-2">
            <input
              type="tel"
              name="number"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Card Number"
              value={number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="name"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Name"
              value={name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              name="expiry"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Expiry (MM/YY)"
              value={expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className="mb-2">
            <input
              type="tel"
              name="cvc"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="CVC"
              value={cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <button
            type="button"
            className="w-full py-2 px-4 bg-orange-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
            onClick={handlePayment}
          >
            Pay LKR {totalPrice}
          </button>
        </form>
        <button
          type="button"
          className="mt-4 w-full py-2 px-4 bg-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentModal;
