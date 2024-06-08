"use client";

import useUserData from "@/hook/useUser";

export default function Layout({ children }: { children: React.ReactNode }) {
  const userData = useUserData();

  if (userData.role !== "admin") {
    return (
      <div className="text-2xl font-semibold text-red-500 h-screen flex items-center justify-center">
        Unauthorized User
      </div>
    );
  }
  return <div>{children}</div>;
}
