"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { CartContext } from "@/store/cart.store";
import Link from "next/link";
import useUserData from "@/hook/useUser";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cart, setCart] = useState([]) as any;

  const user = useUserData();

  const addToCart = (cake: string) => {
    // Check if the cake already exists in the cart
    const exists = cart.find((item: string) => item === cake);

    if (!exists) {
      setCart((prevCart: any) => [...prevCart, cake]);
    } else {
      // Optionally, show a message that the item is already in the cart
      alert("This item is already in your cart.");
    }
  };

  const removeFromCart = (cakeId: string) => {
    setCart((prevCart: any) => prevCart.filter((id: string) => id !== cakeId));
  };

  const clearCart = () => setCart([]);

  return (
    <html lang="en" suppressHydrationWarning>
      <CartContext.Provider
        value={{ cart, addToCart, removeFromCart, clearCart }}
      >
        <body className={inter.className}>
          {/* Header */}
          <header className="w-full bg-white shadow-md">
            <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
              <h1 className="text-3xl font-bold text-gray-800">Zee Cakes 🍥</h1>
              <nav className="flex space-x-4 items-center">
                <Link href="/" className="text-gray-700 hover:text-gray-900">
                  Home
                </Link>
                <Link
                  href="/cakes"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Cakes
                </Link>
                <Link
                  href="/customized-cakes"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Customized Cakes
                </Link>
                <Link
                  href="/workshops"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Workshops
                </Link>
                <Link
                  href="/tutorials"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Tutorials
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="text-red-700 hover:text-gray-900"
                  >
                    Admin Portal
                  </Link>
                )}
                <div className="flex space-x-2 items-center">
                  {user.email ? (
                    <>
                      <p className="text-sm text-gray-400 mx-2">{user.email}</p>
                      <Link href="/profile">
                        <FaUser className="text-blue-500 hover:text-blue-600 text-xl mx-2" />
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="hidden lg:inline-block py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/signup"
                        className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                  <Link href="/cart" className="relative">
                    <FaShoppingCart className="text-blue-500 hover:text-blue-600 text-xl" />
                    {cart.length > 0 && (
                      <span className="absolute top-0 right-0 inline-block w-5 h-5 bg-red-500 text-white text-center text-xs rounded-full">
                        {cart.length}
                      </span>
                    )}
                  </Link>
                </div>
              </nav>
            </div>
          </header>

          <div className="mx-auto px-16 bg-gray-50">{children}</div>

          {/* Footer */}
          <footer className="w-full bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <p className="text-sm">
                &copy; 2024 Cake Delight. All rights reserved.
              </p>
              <nav className="flex space-x-4">
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
                <Link href="/cakes" className="text-gray-400 hover:text-white">
                  Cakes
                </Link>
                <Link
                  href="/customized-cakes"
                  className="text-gray-400 hover:text-white"
                >
                  Customized Cakes
                </Link>

                <Link
                  href="/workshops"
                  className="text-gray-400 hover:text-white"
                >
                  Workshops
                </Link>
                <Link
                  href="/tutorials"
                  className="text-gray-400 hover:text-white"
                >
                  Tutorials
                </Link>
              </nav>
            </div>
          </footer>
        </body>
      </CartContext.Provider>
    </html>
  );
}
