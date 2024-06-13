"use client";

import { useState } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    type: "",
    calories: 0,
    weight: 0,
  }) as any;

  const [errors, setErrors] = useState({} as any);
  const [imagePreview, setImagePreview] = useState("");

  // Handle form input changes
  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  }

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
    if (!formData.type) {
      newErrors.type = "Type is required";
    }
    if (!formData.calories) {
      newErrors.calories = "Calories are required";
    } else if (isNaN(formData.calories) || formData.calories <= 0) {
      newErrors.calories = "Calories must be a positive number";
    }
    if (!formData.weight) {
      newErrors.weight = "Weight is required";
    }
    if (!formData.image) {
      newErrors.image = "Image is required";
    } else if (formData.image.length > 1 * 1024 * 1024) {
      newErrors.image = "Image size must be less than 1MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // Handle form submission
  function handleSubmit(event: any) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    fetch("http://localhost:5000/v1/api/cakes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);

        setFormData({
          name: "",
          description: "",
          price: "",
          image: "",
          type: "",
          calories: 0,
        });
        setImagePreview("");

        window.location.href = "/admin";
      })
      .catch((error) => {
        alert("An error occurred. Please try again.");
        console.error("Error:", error);
      });
  }

  return (
    <div className=" flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800">Add New Cake</h1>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Cake Name"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Cake Description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Cake Price"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
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
              onChange={handleInputChange}
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
              htmlFor="calories"
              className="block text-sm font-medium text-gray-700"
            >
              Calories
            </label>
            <input
              type="number"
              id="calories"
              name="calories"
              value={formData.calories}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Cake Calories"
            />
            {errors.calories && (
              <p className="text-red-500 text-xs mt-1">{errors.calories}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              placeholder="Cake Weight"
            />
            {errors.weight && (
              <p className="text-red-500 text-xs mt-1">{errors.weight}</p>
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
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            Add Cake
          </button>
        </form>
      </div>
    </div>
  );
}
