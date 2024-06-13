// pages/tutorials/edit/[id].tsx

"use client";

import useUserData from "@/hook/useUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTutorialPage({
  params,
}: {
  params: { id: string };
}) {
  const [tutorial, setTutorial] = useState(null) as any;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    published: true,
  });
  const router = useRouter();

  const userData = useUserData();

  useEffect(() => {
    if (params.id) {
      fetch(`http://localhost:5000/v1/api/tutorials/${params.id}`)
        .then((response) => response.json())
        .then((data) => {
          setTutorial(data);
          setFormData({
            title: data.title,
            description: data.description,
            url: data.url,
            published: data.published,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching tutorial:", error);
          setLoading(false);
        });
    }
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`http://localhost:5000/v1/api/tutorials/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Tutorial updated successfully");
          alert("Tutorial updated successfully");
          router.push(`/tutorials/${params.id}`);
        } else {
          alert("Failed to update the Tutorial");
          console.error("Failed to update the Tutorial");
        }
      })
      .catch((error) => console.error("Error updating Tutorial:", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!tutorial) {
    return <div>Tutorial not found</div>;
  }

  return (
    <div className="p-8   min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Edit Tutorial
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md min-h-28"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">YouTube URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Published</label>
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, published: e.target.checked }))
            }
            className="mr-2"
          />
          <span>{formData.published ? "Yes" : "No"}</span>
        </div>
        <div>
          <button
            type="submit"
            className="py-2 px-4 bg-orange-500 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
