"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      // Decode token to get user data
      const decodedToken = jwtDecode(token) as any;
      setFormData({
        name: decodedToken.name,
        email: decodedToken.email,
        password: "",
        role: decodedToken.role,
      });
    }
  }, []);

  // Handle form update
  function handleUpdate() {
    const token = localStorage.getItem("token") as string;
    const decodedToken = jwtDecode(token) as any;

    fetch(`http://localhost:5000/v1/api/user/${decodedToken.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Update Success:", data);
        // Optionally handle UI update
      })
      .catch((error) => {
        console.error("Update Error:", error);
      });
  }

  // Handle form delete
  function handleDelete() {
    const token = localStorage.getItem("token") as string;
    const decodedToken = jwtDecode(token) as any;

    fetch(`http://localhost:5000/v1/api/user/${decodedToken.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Clear local storage
        localStorage.removeItem("token");

        console.log("Delete Success:", data);
        // Optionally handle UI update

        // Redirect
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Delete Error:", error);
      });
  }

  // Handle input change
  function handleInputChange(event: any) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          My Profile ({formData.role})
        </h1>
        <form className="mt-4 space-y-4">
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>

          <button
            type="button"
            onClick={handleUpdate}
            className="w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Profile
          </button>
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
            className="w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
