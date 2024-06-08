"use client";

import useUserData from "@/hook/useUser";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-stone-700 text-white p-6 rounded-md mt-5">
      <h2 className="text-2xl font-semibold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/admin/orders"
        >
          Orders
        </Link>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/admin/cake"
        >
          Add Cake
        </Link>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/admin/customized-cakes"
        >
          Customized Cake Requests
        </Link>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/admin/workshops"
        >
          Add Workshops
        </Link>
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          href="/admin/tutorials"
        >
          Add Tutorials
        </Link>
      </nav>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const userData = useUserData();

  if (userData.role !== "admin") {
    return (
      <div className="text-2xl font-semibold text-red-500 h-screen flex items-center justify-center">
        Unauthorized User
      </div>
    );
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">{children}</div>
    </div>
  );
}
