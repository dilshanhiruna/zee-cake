"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [cakes, setCakes] = useState([]) as any;
  const [searchTerm, setSearchTerm] = useState("");
  const [cakeType, setCakeType] = useState("");
  const [filteredCakes, setFilteredCakes] = useState([]) as any;

  useEffect(() => {
    fetch("http://localhost:5000/v1/api/cakes")
      .then((response) => response.json())
      .then((data) => {
        setCakes(data);
        setFilteredCakes(data); // Initially set filtered cakes to all cakes
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    let filtered = cakes;

    if (searchTerm) {
      filtered = filtered.filter((cake: any) =>
        cake.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (cakeType) {
      filtered = filtered.filter((cake: any) => cake.type === cakeType);
    }

    setFilteredCakes(filtered);
  }, [searchTerm, cakeType, cakes]);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleTypeChange = (event: any) => {
    setCakeType(event.target.value);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-lg font-bold text-start w-full mb-4">
        Browse our selection of cakes. Click on a cake to view more details.
      </h2>
      <div className="flex justify-start space-x-6 w-full mb-4">
        <input
          type="text"
          placeholder="Search by cake name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border w-80 border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
        />
        <select
          value={cakeType}
          onChange={handleTypeChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
        >
          <option value="">All Types</option>
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
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredCakes.map((cake: any) => (
          <Link
            key={cake._id}
            href={`/cakes/${cake._id}`}
            className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white"
          >
            <div>
              <img
                className="w-full h-48 object-cover"
                src={cake.image}
                alt={cake.name}
              />
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-2">
                {cake.type}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {cake.calories} Calories
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {cake.weight || 0} Kg
              </span>
              <div>
                <div className="px-4 py-4">
                  <div className="font-bold text-xl mb-2">{cake.name}</div>
                  <p className="text-gray-700 text-sm">{cake.description}</p>
                </div>
                <div className="px-4 pt-4 mb-4">
                  <span className="inline-block rounded-full text-sm font-semibold text-gray-700">
                    LKR {cake.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
