"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserData from "@/hook/useUser";

export default function EditGiftHamperPage({
  params,
}: {
  params: { id: string };
}) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    province: "",
  }) as any;

  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({} as any);

  const router = useRouter();
  const userData = useUserData();

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
      newErrors.category = "Category is required";
    }

    if (!formData.image) {
      newErrors.image = "Image is required";
    } else if (formData.image.length > 1 * 1024 * 1024) {
      newErrors.image = "Image size must be less than 1MB";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  useEffect(() => {
    if (userData.id && userData.role !== "admin") {
      router.push("/"); // Redirect non-admin users to the home page
    }

    fetch(`http://localhost:5000/v1/api/giftHampers/${params.id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data);
        setImagePreview(data.image);
      })
      .catch((error) =>
        console.error("Error fetching gift hamper details:", error)
      );
  }, [params.id, userData.role]);

  // Handle form input changes
  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    fetch(`http://localhost:5000/v1/api/giftHampers/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error:", data.error);
          return;
        }
        alert("Gift Hamper updated successfully");
        console.log("Gift Hamper updated successfully:", data);
        setFormData({
          name: "",
          description: "",
          price: "",
          image: "",
          category: "",
          province: "",
        });
        router.push(`/gift-hampers/${params.id}`); // Redirect to the gift hamper detail page
      })
      .catch((error) => {
        alert("An error occurred. Please try again.");
        console.error("Error:", error);
      });
  };

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
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          Edit Gift Hamper
        </h1>
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
              required
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
              required
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
              Price (LKR)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              required
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
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Gift Hamper Preview"
                className="mt-4 w-full h-32 object-cover rounded-md shadow-sm"
              />
            )}
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">{errors.image}</p>
            )}
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update Gift Hamper
          </button>
        </form>
      </div>
    </div>
  );
}
