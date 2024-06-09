"use client";

import { useState, useEffect } from "react";
import useUserData from "@/hook/useUser";

const flavorPrices: { [key: string]: number } = {
  vanilla: 100,
  chocolate: 120,
  strawberry: 110,
};

const colorPrices: { [key: string]: number } = {
  red: 50,
  blue: 70,
  green: 30,
};

const weightPrices: { [key: number]: number } = {
  1: 2000,
  2: 3500,
  3: 5000,
};

interface FormData {
  flavor: string;
  greeting: string;
  description: string;
  color: string;
  weight: number;
  image: string;
  user: string | null;
}

interface FormErrors {
  flavor?: string;
  greeting?: string;
  description?: string;
  color?: string;
  weight?: string;
  image?: string;
}

export default function CustomCakePage() {
  const user = useUserData();
  const [formData, setFormData] = useState<FormData>({
    flavor: "vanilla",
    greeting: "",
    description: "",
    color: "red",
    weight: 1,
    image: "",
    user: user.id,
  });
  const [price, setPrice] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  useEffect(() => {
    calculatePrice();
  }, [formData]);

  const calculatePrice = () => {
    const flavorPrice = flavorPrices[formData.flavor];
    const colorPrice = colorPrices[formData.color];
    const weightPrice = weightPrices[formData.weight];
    const totalPrice = flavorPrice + colorPrice + weightPrice;
    setPrice(totalPrice);
  };

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result as string,
        }));
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.greeting) errors.greeting = "Greeting is required.";
    if (!formData.description) errors.description = "Description is required.";
    if (!formData.image) errors.image = "Image is required.";

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      alert("Please log in to customize your cake.");
      return;
    }

    if (!validateForm()) return;

    fetch("http://localhost:5000/v1/api/customcakes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, price, user: user.id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setFormData({
          flavor: "vanilla",
          greeting: "",
          description: "",
          color: "red",
          weight: 1,
          image: "",
          user: user.id,
        });
        setImagePreview("");
        alert("Your request has been submitted successfully.");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (!user) {
    return (
      <div className="text-2xl font-semibold h-screen flex items-center justify-center">
        Please log in to customize your cake.
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          Customize Your Cake
        </h1>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="flavor"
              className="block text-sm font-medium text-gray-700"
            >
              Flavor
            </label>
            <select
              id="flavor"
              name="flavor"
              value={formData.flavor}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="vanilla">Vanilla</option>
              <option value="chocolate">Chocolate</option>
              <option value="strawberry">Strawberry</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="greeting"
              className="block text-sm font-medium text-gray-700"
            >
              Greeting
            </label>
            <input
              type="text"
              id="greeting"
              name="greeting"
              value={formData.greeting}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formErrors.greeting ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Greeting Message"
            />
            {formErrors.greeting && (
              <p className="mt-2 text-sm text-red-600">{formErrors.greeting}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                formErrors.description ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              placeholder="Description"
            />
            {formErrors.description && (
              <p className="mt-2 text-sm text-red-600">
                {formErrors.description}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700"
            >
              Color
            </label>
            <select
              id="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight (kg)
            </label>
            <select
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={1}>1 kg</option>
              <option value={2}>2 kg</option>
              <option value={3}>3 kg</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className={`mt-1 block w-full text-sm text-gray-900 border ${
                formErrors.image ? "border-red-500" : "border-gray-300"
              } rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {formErrors.image && (
              <p className="mt-2 text-sm text-red-600">{formErrors.image}</p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Cake Preview"
                className="mt-4 w-full h-32 object-cover rounded-md shadow-sm"
              />
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Total Price: LKR {price}
            </h2>
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
