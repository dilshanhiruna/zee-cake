"use client";

import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [user, setuser] = useState({}) as any;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    user: user.id,
    attendees: 1,
    workshop: params.id,
  });

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token) as any;
      setuser({
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
        role: decodedToken.role,
      });
      setFormData((prevData) => ({
        ...prevData,
        user: decodedToken.id,
      }));
    }
  }, []);

  const handleAttendeeChange = (event: any) => {
    setFormData((prevData) => ({
      ...prevData,
      attendees: event.target.value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    fetch(`http://localhost:5000/v1/api/workshops/${params.id}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.id,
        attendees: formData.attendees,
        workshop: params.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error:", data.error);
          return;
        }
        console.log("Success:", data);
        setFormData({ user: "", attendees: 1, workshop: params.id });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          Register for Workshop
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
              value={user.name}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="attendees"
              className="block text-sm font-medium text-gray-700"
            >
              Number of Attendees
            </label>
            <input
              type="number"
              id="attendees"
              name="attendees"
              value={formData.attendees}
              onChange={handleAttendeeChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
              min="1"
              required
            />
          </div>
          <button
            type="submit"
            className="py-2 px-4 bg-green-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
