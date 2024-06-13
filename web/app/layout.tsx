"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/bootstrap.css";
import "../styles/style.css";
import "../styles/responsive.css";
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
          <div className="min-h-screen">
            {/* Header */}
            <header className="w-full bg-[#2f2519] text-white shadow-md">
              <div className="max-w-7xl mx-auto flex justify-between items-center p-6">
                <h1 className="text-3xl font-bold text-white">
                  Anything with Zee Cakes
                </h1>
                <nav className="flex space-x-4 items-center">
                  <Link href="/" className="text-white/80 hover:text-white">
                    Home
                  </Link>
                  <Link
                    href="/cakes"
                    className="text-white/80 hover:text-white"
                  >
                    Cakes
                  </Link>
                  <Link
                    href="/gift-hampers"
                    className="text-white/80 hover:text-white"
                  >
                    Gift Hampers
                  </Link>
                  <Link
                    href="/customized-cakes"
                    className="text-white/80 hover:text-white"
                  >
                    Customized Cakes
                  </Link>
                  <Link
                    href="/workshops"
                    className="text-white/80 hover:text-white"
                  >
                    Workshops
                  </Link>
                  <Link
                    href="/tutorials"
                    className="text-white/80 hover:text-white"
                  >
                    Tutorials
                  </Link>
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="text-red-500 hover:text-white"
                    >
                      Admin Portal
                    </Link>
                  )}
                  <div className="flex space-x-3 items-center">
                    {user.email ? (
                      <>
                        <p className="text-sm text-white mx-2 mt-3">
                          {user.email}
                        </p>
                        <Link href="/profile">
                          <FaUser className="text-orange-400 hover:text-orange-600 text-xl mx-2" />
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="hidden lg:inline-block py-2 px-6 hover:bg-orange-600 text-sm bg-orange-400 font-bold rounded-xl transition duration-200"
                        >
                          Sign In
                        </Link>
                        <Link
                          href="/signup"
                          className="hidden lg:inline-block py-2 px-6 bg-orange-500 hover:bg-orange-600 text-sm text-white font-bold rounded-xl transition duration-200"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                    <Link href="/cart" className="relative">
                      <FaShoppingCart className="text-orange-400 hover:text-orange-600 text-xl" />
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

            <main className="mx-auto min-h-screen py-10  bg-yellow-50">
              {children}
            </main>

            <FloatingWhatsApp phoneNumber={""} accountName={"ZeeCakes"} />

            {/* Footer */}

            <footer className="footer_section">
              <div className="container">
                <div className="row">
                  <div className="col-md-4 footer-col">
                    <div className="footer_contact">
                      <h4>Reach at..</h4>
                      <div className="contact_link_box">
                        <a href="">
                          <i className="fa fa-map-marker" aria-hidden="true" />
                          <span>Location</span>
                        </a>
                        <a href="">
                          <i className="fa fa-phone" aria-hidden="true" />
                          <span>Call +94 11238987</span>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope" aria-hidden="true" />
                          <span>contact@sliit.com</span>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 footer-col">
                    <div className="footer_detail">
                      <a href="" className="footer-logo">
                        Zee Cake
                      </a>
                      <p>
                        Necessary, making this the first true generator on the
                        Internet. It uses a dictionary of over 200 Latin words,
                        combined with
                      </p>
                    </div>
                  </div>
                </div>
                <div className="footer-info mx-auto flex justify-center">
                  <div className="max-w-7xl">
                    <p className="text-sm mb-3">
                      &copy; 2024 Zee Cake Delight. All rights reserved.
                    </p>
                    <nav className="flex space-x-4">
                      <Link href="/" className="text-gray-200 hover:text-white">
                        Home
                      </Link>
                      <Link
                        href="/cakes"
                        className="text-gray-200 hover:text-white"
                      >
                        Cakes
                      </Link>
                      <Link
                        href="/gift-hampers"
                        className="text-gray-200 hover:text-white"
                      >
                        Gift Hampers
                      </Link>
                      <Link
                        href="/customized-cakes"
                        className="text-gray-200 hover:text-white"
                      >
                        Customized Cakes
                      </Link>

                      <Link
                        href="/workshops"
                        className="text-gray-200 hover:text-white"
                      >
                        Workshops
                      </Link>
                      <Link
                        href="/tutorials"
                        className="text-gray-200 hover:text-white"
                      >
                        Tutorials
                      </Link>
                      <Link
                        href="/about-us"
                        className="text-gray-200 hover:text-white"
                      >
                        About Us
                      </Link>
                      <Link
                        href="/faq"
                        className="text-gray-200 hover:text-white"
                      >
                        FAQ
                      </Link>
                      <Link
                        href="/contact-us"
                        className="text-gray-200 hover:text-white"
                      >
                        Contact Us
                      </Link>
                      <Link
                        href="/privacy-policy"
                        className="text-gray-200 hover:text-white"
                      >
                        Privacy Policy
                      </Link>
                    </nav>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </CartContext.Provider>
    </html>
  );
}
