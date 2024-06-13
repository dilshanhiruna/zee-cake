"use client";

import useUserData from "@/hook/useUser";
import Link from "next/link";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-stone-700 text-white p-6 rounded-md">
      <h2 className="flex justify-center text-center text-sm font-bold mb-6 text-stone-300">
        Admin Panel
      </h2>
      <nav className="flex flex-col space-y-4">
        <p className="text-lg font-semibold !mt-10">Manage Orders</p>
        <Link
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded text-sm"
          href="/admin/orders"
        >
          All Orders
        </Link>

        <Link
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded text-sm"
          href="/admin/customized-cakes"
        >
          Customized Cake Orders
        </Link>
        <p className="text-lg font-semibold !mt-10">Manage Inventory</p>
        <Link
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded text-sm"
          href="/admin/cake"
        >
          Add Cake
        </Link>

        <Link
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded text-sm"
          href="/admin/workshops"
        >
          Add Workshops
        </Link>
        <Link
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded text-sm"
          href="/admin/tutorials"
        >
          Add Tutorials
        </Link>
        <Link
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded text-sm"
          href="/admin/gift-hampers"
        >
          Add Gift Hampers
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
    <div className="flex px-16 pt-10">
      <Sidebar />
      <div className="flex-1 px-8 min-h-screen">{children}</div>
    </div>
  );
}
