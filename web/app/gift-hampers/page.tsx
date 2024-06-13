"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function GiftHampersPage() {
  const [giftHampers, setGiftHampers] = useState([]) as any;
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [filteredGiftHampers, setFilteredGiftHampers] = useState([]) as any;

  useEffect(() => {
    fetch("http://localhost:5000/v1/api/giftHampers")
      .then((response) => response.json())
      .then((data) => {
        setGiftHampers(data);
        setFilteredGiftHampers(data); // Initially set filtered gift hampers to all gift hampers
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    let filtered = giftHampers;

    if (searchTerm) {
      filtered = filtered.filter((hamper: any) =>
        hamper.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter((hamper: any) => hamper.type === category);
    }

    setFilteredGiftHampers(filtered);
  }, [searchTerm, category, giftHampers]);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-lg font-bold text-start w-full mb-4">
        Browse our selection of gift hampers. Click on a hamper to view more
        details.
      </h2>
      <div className="flex justify-start space-x-6 w-full mb-4">
        <input
          type="text"
          placeholder="Search by hamper name..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border w-80 border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
        >
          <option value="">All Categories</option>
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
        {filteredGiftHampers.map((hamper: any) => (
          <Link
            key={hamper._id}
            href={`/gift-hampers/${hamper._id}`}
            className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white"
          >
            <div>
              <img
                className="w-full h-48 object-cover"
                src={hamper.image}
                alt={hamper.name}
              />
              <span className="inline-block m-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {hamper.type}
              </span>
              <div className="px-4 py-4">
                <div className="font-bold text-xl mb-2">{hamper.name}</div>
                <p className="text-gray-700 text-sm">{hamper.description}</p>
                <div className="mt-4">
                  <span className="inline-block rounded-full text-sm font-semibold text-gray-700">
                    LKR {hamper.price}
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
