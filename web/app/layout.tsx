"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { CartContext } from "@/store/cart.store";
import Link from "next/link";
import useUserData from "@/hook/useUser";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [cakeCart, setCakeCart] = useState([]) as any;
  const [hamperCart, setHamperCart] = useState([]) as any;

  const user = useUserData();

  const addToCakeCart = (cake: string) => {
    // Check if the cake already exists in the cart
    const exists = cakeCart.find((item: string) => item === cake);

    if (!exists) {
      setCakeCart((prevCart: any) => [...prevCart, cake]);
    } else {
      // Optionally, show a message that the item is already in the cart
      alert("This item is already in your cart.");
    }
  };

  const removeFromCakeCart = (cakeId: string) => {
    setCakeCart((prevCart: any) =>
      prevCart.filter((id: string) => id !== cakeId)
    );
  };

  const addToHamperCart = (hamper: string) => {
    // Check if the cake already exists in the cart
    const exists = hamperCart.find((item: string) => item === hamper);

    if (!exists) {
      setHamperCart((prevCart: any) => [...prevCart, hamper]);
    } else {
      // Optionally, show a message that the item is already in the cart
      alert("This item is already in your cart.");
    }
  };

  const removeFromHamperCart = (hamperId: string) => {
    setHamperCart((prevCart: any) =>
      prevCart.filter((id: string) => id !== hamperId)
    );
  };

  const clearCart = () => {
    setCakeCart([]);
    setHamperCart([]);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <CartContext.Provider
        value={{
          cakeCart,
          hamperCart,
          addToCakeCart,
          addToHamperCart,
          removeFromCakeCart,
          removeFromHamperCart,
          clearCart,
        }}
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
                  href="/gift-hampers"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Gift Hampers
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
                    {(cakeCart.length || hamperCart.length) > 0 && (
                      <span className="absolute -top-2 left-4 inline-block w-5 h-5 bg-red-500 text-white text-center text-xs rounded-full">
                        {parseInt(cakeCart.length) +
                          parseInt(hamperCart.length)}
                      </span>
                    )}
                  </Link>
                </div>
              </nav>
            </div>
          </header>

          <div className="mx-auto px-16 bg-gray-50 mb-28 mt-10">{children}</div>

          <FloatingWhatsApp phoneNumber={""} accountName={"ZeeCakes"} />

          {/* Footer */}
          <footer className="w-full bg-gray-800 text-white py-6 text-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <p className="text-sm">
                &copy; 2024 Zee Cake Delight. All rights reserved.
              </p>
              <nav className="flex space-x-4">
                <Link href="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
                <Link href="/cakes" className="text-gray-400 hover:text-white">
                  Cakes
                </Link>
                <Link
                  href="/gift-hampers"
                  className="text-gray-400 hover:text-white"
                >
                  Gift Hampers
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
                <Link
                  href="/about-us"
                  className="text-gray-400 hover:text-white"
                >
                  About Us
                </Link>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
                <Link
                  href="/contact-us"
                  className="text-gray-400 hover:text-white"
                >
                  Contact Us
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-gray-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </nav>
            </div>
          </footer>
        </body>
      </CartContext.Provider>
    </html>
  );
}
