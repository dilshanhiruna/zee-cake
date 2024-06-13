"use client";

import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";

export default function Page() {
  const [errors, setErrors] = useState({} as any);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    address: "",
    province: "",
    phone: "",
  });

  const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token) as any;
      const response = await fetch(
        `http://localhost:5000/v1/api/user/${decodedToken.id}`
      );
      const data = await response.json();
      setFormData(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // validate password
  function validateForm() {
    let errors = {} as any;

    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  }

  // Handle form update
  function handleUpdate() {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setErrors({});

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
        if (data.message === "successful") {
          console.log("Update Success:", data);
          localStorage.setItem("token", data.token);
          getUserData();
          alert("Profile updated successfully");
        } else {
          alert("An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        alert("An error occurred. Please try again.");
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
    <>
      <div className="flex justify-center items-center space-x-4 p-4">
        <Link
          href="/profile/orders"
          className="py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          View Orders
        </Link>
        <Link
          href="/profile/customized-cake-request"
          className="py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Customized Cake Request
        </Link>
      </div>
      <div className="flex items-center justify-center h-screen mt-10  ">
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                placeholder="Address"
              />
            </div>
            <div>
              <label
                htmlFor="province"
                className="block text-sm font-medium text-gray-700"
              >
                Province
              </label>
              <select
                id="province"
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              >
                <option value="Western">Western</option>
                <option value="Central">Central</option>
                <option value="Eastern">Eastern</option>
                <option value="North Central">North Central</option>
                <option value="Northern">Northern</option>
                <option value="North Western">North Western</option>
                <option value="Sabaragamuwa">Sabaragamuwa</option>
                <option value="Southern">Southern</option>
                <option value="Uva">Uva</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                placeholder="Phone"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
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
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete your profile?"
                  )
                ) {
                  handleDelete();
                }
              }}
              className="w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete Profile
            </button>
            <button
              type="button"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to logout? You will be redirected to the home page."
                  )
                ) {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }
              }}
              className="w-full py-2 px-4 mt-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
