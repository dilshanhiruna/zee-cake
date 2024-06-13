"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function TutorialsPage() {
  const [tutorials, setTutorials] = useState([]) as any;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/v1/api/tutorials")
      .then((response) => response.json())
      .then((data) => {
        setTutorials(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tutorials:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-8   min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Tutorials</h1>
      {tutorials.length === 0 && (
        <div className="text-xl text-gray-800">No tutorials found</div>
      )}
      <div className="space-y-4">
        {tutorials.map((tutorial: any) => (
          <div
            key={tutorial._id}
            className="bg-white p-4 rounded-lg shadow-md space-y-2"
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {tutorial.title}
              </h2>
              <p className="text-gray-700">{tutorial.description}</p>
            </div>
            <div className="text-start pt-5">
              <Link
                href={`/tutorials/${tutorial._id}`}
                className=" w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              >
                Watch Tutorial
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
