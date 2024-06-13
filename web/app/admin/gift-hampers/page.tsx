"use client";

import { useState } from "react";

export default function AddGiftHamper() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: 0,
    type: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({}) as any;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate form data
  function validateForm() {
    const newErrors = {} as any;

    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.description) {
      newErrors.description = "Description is required";
    }
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.image) {
      newErrors.image = "Image is required";
    } else if (formData.image.length > 1 * 1024 * 1024) {
      newErrors.image = "Image size must be less than 1MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/v1/api/giftHampers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Gift Hamper added successfully!");
        // Reset form data
        setFormData({
          name: "",
          description: "",
          image: "",
          price: 0,
          type: "",
        });

        setImagePreview("");

        window.location.href = "/admin";
      } else {
        alert("Failed to add Gift Hamper.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding Gift Hamper.");
    }
  };

  // Handle image upload
  function handleImageChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData: any) => ({
        ...prevData,
        image: reader.result,
      }));
      setImagePreview(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className=" flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-2xl font-semibold text-gray-800">
          Add Gift Hamper
        </h1>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
              min="0"
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            >
              <option value="">Select Type</option>
              <option value="Birthday">Birthday</option>
              <option value="Wedding">Wedding</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Valentine">Valentine</option>
              <option value="Farewell">Farewell</option>
              <option value="Graduation">Graduation</option>
              <option value="Baby Shower">Baby Shower</option>
              <option value="Engagement">Engagement</option>
              <option value="Other">Other</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type}</p>
            )}
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
              className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-orange-400 focus:border-orange-400"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Cake Preview"
                className="mt-4 w-full h-32 object-cover rounded-md shadow-sm"
              />
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="mt-4 py-2 px-4 bg-orange-500 text-white rounded-md shadow-sm"
            >
              Add Gift Hamper
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
