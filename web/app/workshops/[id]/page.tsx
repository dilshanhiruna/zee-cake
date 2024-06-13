"use client";

import useUserData from "@/hook/useUser";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [workshop, setWorkshop] = useState(null) as any;
  const userData = useUserData();

  useEffect(() => {
    fetch(`http://localhost:5000/v1/api/workshops/${params.id}`)
      .then((response) => response.json())
      .then((data) => setWorkshop(data))
      .catch((error) =>
        console.error("Error fetching workshop details:", error)
      );
  }, [params.id]);

  const handleDelete = () => {
    fetch(`http://localhost:5000/v1/api/workshops/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Workshop deleted successfully");
          alert("Workshop deleted successfully");
          // Redirect
          window.location.href = "/workshops";
        } else {
          alert("Failed to delete the workshop");
          console.error("Failed to delete the workshop");
        }
      })
      .catch((error) => console.error("Error deleting workshop:", error));
  };

  if (!workshop) {
    return (
      <div className="text-2xl font-semibold h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800">
          {workshop.title}
        </h1>
        <img
          className="w-full h-48 object-cover mt-4"
          src={workshop.image}
          alt={workshop.title}
        />
        <p className="text-gray-700 text-base mt-4">{workshop.description}</p>
        <p className="text-gray-700 text-base mt-4">
          Date: {new Date(workshop.date).toLocaleDateString()}
        </p>
        <p className="text-gray-700 text-base mt-4">
          Price: LKR {workshop.price}
        </p>
        <p className="text-gray-700 text-base mt-4">
          Instructor: {workshop.instructor}
        </p>
        <div className="mt-12 flex items-center justify-between w-full gap-2">
          <div className="flex gap-1 item-center">
            <Link
              href={`/workshops/register/${workshop._id}`}
              className="py-2 px-4  bg-orange-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Register Now
            </Link>
            <Link
              href={workshop.link}
              className="py-2 px-4 bg-green-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Join
            </Link>
          </div>
          {userData.role === "admin" && (
            <div className="-mt-5 text-center border p-2 rounded-md bg-slate-200">
              <>
                <p className="text-gray-500 text-sm font-bold">
                  Admin controls
                </p>
                <div className="flex gap-1">
                  <Link
                    href={`/workshops/edit/${workshop._id}`}
                    className="py-2 px-4 bg-yellow-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this workshop?"
                        )
                      ) {
                        handleDelete;
                      }
                    }}
                    className="py-2 px-4 bg-red-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
