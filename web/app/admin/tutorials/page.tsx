"use client";

import { useState } from "react";

export default function CreateTutorialPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [urlError, setUrlError] = useState("");

  const validateUrl = (url: string) => {
    const youtubeRegex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate the URL
    if (!validateUrl(url)) {
      setUrlError("Please enter a valid YouTube URL.");
      setLoading(false);
      return;
    } else {
      setUrlError("");
    }

    const tutorialData = {
      title,
      description,
      url,
      published,
    };

    try {
      const response = await fetch("http://localhost:5000/v1/api/tutorials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tutorialData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Tutorial created successfully");
        console.log("Tutorial created:", data);
        // Clear the form
        setTitle("");
        setDescription("");
        setUrl("");
        setPublished(true);
        setError("");

        // Redirect
        window.location.href = "/admin";
      } else {
        setError("Failed to create tutorial. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Create Tutorial
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-gray-700">
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-gray-700">
              YouTube URL
            </label>
            <input
              id="url"
              type="url"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            {urlError && (
              <div className="text-red-600 text-xs mt-1">{urlError}</div>
            )}
          </div>
          <div className="flex items-center">
            <input
              id="published"
              type="checkbox"
              className="h-4 w-4 text-orange-700 focus:ring-orange-400 border-gray-300 rounded"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <label htmlFor="published" className="ml-2 block text-gray-700">
              Published
            </label>
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Tutorial"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
