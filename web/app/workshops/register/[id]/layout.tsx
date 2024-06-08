"use client";

import useUserData from "@/hook/useUser";

export default function Layout({ children }: { children: React.ReactNode }) {
  const userData = useUserData();

  if (!userData.id) {
    return (
      <div className="text-2xl font-semibold h-screen flex items-center justify-center">
        Please login to register for a workshop
      </div>
    );
  }
  return <div>{children}</div>;
}
