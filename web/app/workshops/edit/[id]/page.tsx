"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useUserData from "@/hook/useUser";

export default function EditWorkshopPage({
  params,
}: {
  params: { id: string };
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    link: "",
    price: 0,
    instructor: "",
    image: "",
  });

  const router = useRouter();
  const userData = useUserData();

  useEffect(() => {
    if (userData.id && userData.role !== "admin") {
      router.push("/"); // Redirect non-admin users to the home page
    }

    fetch(`http://localhost:5000/v1/api/workshops/${params.id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) =>
        console.error("Error fetching workshop details:", error)
      );
  }, [params.id, userData.role]);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prevData) => ({
        ...prevData,
        image: reader.result as string,
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    fetch(`http://localhost:5000/v1/api/workshops/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert("Failed to update the workshop");
          console.error("Error:", data.error);
          return;
        }
        alert("Workshop updated successfully");
        console.log("Workshop updated successfully:", data);
        router.push(`/workshops/${params.id}`);
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800">Edit Workshop</h1>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              required
            />
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
          </div>
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={
                formData.date
                  ? new Date(formData.date).toISOString().split("T")[0]
                  : ""
              }
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="link"
              className="block text-sm font-medium text-gray-700"
            >
              Link
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              required
            />
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
          </div>
          <div>
            <label
              htmlFor="instructor"
              className="block text-sm font-medium text-gray-700"
            >
              Instructor
            </label>
            <input
              type="text"
              id="instructor"
              name="instructor"
              value={formData.instructor}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              required
            />
          </div>
          <div>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
            />
            {formData.image && (
              <img
                src={formData.image}
                alt="Workshop"
                className="mt-4 w-full h-32 object-cover rounded-md shadow-sm"
              />
            )}
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Update Workshop
          </button>
        </form>
      </div>
    </div>
  );
}
