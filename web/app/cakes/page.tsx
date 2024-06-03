"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [cakes, setCakes] = useState([]) as any;

  useEffect(() => {
    fetch("http://localhost:5000/v1/api/cakes")
      .then((response) => response.json())
      .then((data) => setCakes(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="flex flex-wrap justify-center p-4 mt-10">
      <h2 className="text-lg font-bold text-start w-full mb-4">
        Browse our selection of cakes. Click on a cake to view more details.
      </h2>
      {cakes.map((cake: any) => (
        <Link href={`/cakes/${cake._id}`}>
          <div
            key={cake._id}
            className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white"
          >
            <img
              className="w-full h-48 object-cover"
              src={cake.image}
              alt={cake.name}
            />
            <div>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{cake.name}</div>
                <p className="text-gray-700 text-base">{cake.description}</p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  LKR {cake.price}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {cake.type}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
