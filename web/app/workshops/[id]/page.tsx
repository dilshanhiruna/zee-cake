"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const [workshop, setWorkshop] = useState(null) as any;

  useEffect(() => {
    fetch(`http://localhost:5000/v1/api/workshops/${params.id}`)
      .then((response) => response.json())
      .then((data) => setWorkshop(data))
      .catch((error) =>
        console.error("Error fetching workshop details:", error)
      );
  }, [params.id]);

  if (!workshop) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
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
          Location: {workshop.location}
        </p>
        <p className="text-gray-700 text-base mt-4">Price: ${workshop.price}</p>
        <p className="text-gray-700 text-base mt-4">
          Instructor: {workshop.instructor}
        </p>
        <div className="mt-4 flex justify-start w-full gap-4">
          <Link
            href={`/workshops/register/${workshop._id}`}
            className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}
