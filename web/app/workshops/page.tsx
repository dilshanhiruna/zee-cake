"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const WorkshopList = () => {
  const [workshops, setWorkshops] = useState([]) as any;

  useEffect(() => {
    fetch("http://localhost:5000/v1/api/workshops")
      .then((response) => response.json())
      .then((data) => setWorkshops(data))
      .catch((error) => console.error("Error fetching workshops:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center   py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">
        Upcoming Workshops
      </h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {workshops.map((workshop: any) => (
          <div key={workshop._id} className="p-6 bg-white rounded-lg shadow-md">
            <img
              className="w-full h-48 object-cover rounded-md mb-4"
              src={workshop.image}
              alt={workshop.title}
            />
            <h2 className="text-xl font-semibold text-gray-800">
              {workshop.title}
            </h2>
            <p className="text-gray-700 mt-2">{workshop.description}</p>
            <p className="text-gray-700 mt-2">
              Date: {new Date(workshop.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mt-2">Price: LKR {workshop.price}</p>
            <div className="mt-4 flex justify-start w-full gap-4">
              <Link
                href={`/workshops/${workshop._id}`}
                className="py-2 px-4  bg-orange-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                View Details
              </Link>
              <Link
                href={workshop.link}
                className="py-2 px-4 bg-green-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Join
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkshopList;
