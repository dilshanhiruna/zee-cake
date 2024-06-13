"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomCakeGallery() {
  const [cakes, setCakes] = useState([]) as any;
  const [filters, setFilters] = useState({
    topping: "",
    decoration: "",
    glutenFree: "",
    vegan: "",
    nutFree: "",
    category: "",
    flavor: "",
  }) as any;
  const [filteredCakes, setFilteredCakes] = useState([]) as any;

  useEffect(() => {
    fetch("http://localhost:5000/v1/api/customCakes/display")
      .then((response) => response.json())
      .then((data) => {
        setCakes(data);
        setFilteredCakes(data); // Initially set filtered cakes to all cakes
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    let filtered = cakes;

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        if (key === "glutenFree" || key === "vegan" || key === "nutFree") {
          filtered = filtered.filter(
            (cake: any) => cake[key] === (filters[key] === "true")
          );
        } else {
          filtered = filtered.filter((cake: any) => cake[key] === filters[key]);
        }
      }
    });

    setFilteredCakes(filtered);
  }, [filters, cakes]);

  const handleFilterChange = (event: any) => {
    const { name, value } = event.target;
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-lg font-bold text-start w-full mb-4">
        Browse our selection of customized cakes. Click on a cake to view more
        details.
      </h2>
      <div className="flex justify-between space-x-6 w-full mb-4">
        <div className="space-x-4">
          <select
            name="topping"
            value={filters.topping}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
          >
            <option value="">All Toppings</option>
            <option value="Buttercream Frosting">Buttercream Frosting</option>
            <option value="Chocolate Ganache">Chocolate Ganache</option>
            <option value="Cream Cheese Frosting">Cream Cheese Frosting</option>
            <option value="Whipped Cream Frosting">
              Whipped Cream Frosting
            </option>
            <option value="Coconut Enveloping">Coconut Enveloping</option>
            <option value="Fondant">Fondant</option>
          </select>
          <select
            name="flavor"
            value={filters.flavor}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
          >
            <option value="">All Flavors</option>
            <option value="Vanilla">Vanilla</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Red Velvet">Red Velvet</option>
            <option value="Marble">Marble</option>
          </select>
          <select
            name="decoration"
            value={filters.decoration}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
          >
            <option value="">All Decorations</option>
            <option value="Fresh Fruit">Fresh Fruit</option>
            <option value="Flowers">Flowers</option>
            <option value="Sprinkles">Sprinkles</option>
            <option value="Chocolate Shavings">Chocolate Shavings</option>
            <option value="Cookies">Cookies</option>
            <option value="Candies">Candies</option>
            <option value="None">None</option>
          </select>
          <select
            name="glutenFree"
            value={filters.glutenFree}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
          >
            <option value="">Gluten Free?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <select
            name="vegan"
            value={filters.vegan}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
          >
            <option value="">Vegan?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <select
            name="nutFree"
            value={filters.nutFree}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
          >
            <option value="">Nut Free?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-400 focus:border-orange-400 sm:text-sm"
          >
            <option value="">All Categories</option>
            <option value="Birthday">Birthday</option>
            <option value="Wedding">Wedding</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Farewell">Farewell</option>
            <option value="Graduation">Graduation</option>
            <option value="Baby Shower">Baby Shower</option>
            <option value="Engagement">Engagement</option>
            <option value="Valentine">Valentine</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex justify-end">
          <Link
            href="/customized-cakes/create"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Create a Custom Cake
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap justify-center">
        {filteredCakes.map((cake: any) => (
          <div
            key={cake._id}
            className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white"
          >
            <div>
              <img
                className="w-full h-48 object-cover"
                src={cake.image}
                alt={cake.flavor}
              />
              <div className="py-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-2">
                  {cake.flavor}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {cake.topping}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {cake.decoration}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {cake.category}
                </span>
              </div>

              <div className="flex space-x-4 my-4 justify-center">
                <div className="flex items-center">
                  <input
                    id="glutenFree"
                    name="glutenFree"
                    type="checkbox"
                    checked={cake.glutenFree}
                    className="h-4 w-4 text-orange-700 border-gray-300 rounded focus:ring-orange-400"
                  />
                  <label
                    htmlFor="glutenFree"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Gluten Free
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="vegan"
                    name="vegan"
                    type="checkbox"
                    checked={cake.vegan}
                    className="h-4 w-4 text-orange-700 border-gray-300 rounded focus:ring-orange-400"
                  />
                  <label
                    htmlFor="vegan"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Vegan
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="nutFree"
                    name="nutFree"
                    type="checkbox"
                    checked={cake.nutFree}
                    className="h-4 w-4 text-orange-700 border-gray-300 rounded focus:ring-orange-400"
                  />
                  <label
                    htmlFor="nutFree"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Nut Free
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
