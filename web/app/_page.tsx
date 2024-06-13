"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [cakes, setCakes] = useState([]) as any;
  const [Hampers, setHampers] = useState([]) as any;
  useEffect(() => {
    fetch("http://localhost:5000/v1/api/cakes")
      .then((response) => response.json())
      .then((data) => {
        setCakes(data);
      })
      .catch((error) => console.error("Error:", error));

    fetch("http://localhost:5000/v1/api/giftHampers")
      .then((response) => response.json())
      .then((data) => {
        setHampers(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-6  ">
      {/* Hero Section */}
      <section
        className="w-full bg-cover bg-center h-96"
        style={{ backgroundImage: "url('/img/hero.jpg')" }}
      >
        <div className="flex items-center justify-center h-full bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold">
              Delicious Cakes for Every Occasion
            </h2>
            <p className="mt-4 text-lg">
              Order your favorite cakes online and enjoy the sweet moments.
            </p>
            <Link
              href="/cakes"
              className="mt-6 inline-block py-3 px-6 bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-md"
            >
              Browse Cakes
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cakes */}
      <h3 className="text-3xl font-semibold text-gray-800 mb-8 mt-16">
        Featured Cakes
      </h3>
      <div className="flex flex-wrap justify-center">
        {cakes.slice(0, 3).map((cake: any) => (
          <Link
            key={cake._id}
            href={`/cakes/${cake._id}`}
            className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white"
          >
            <div>
              <img
                className="w-full h-48 object-cover"
                src={cake.image}
                alt={cake.name}
              />
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-2">
                {cake.type}
              </span>
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {cake.calories} Calories
              </span>
              <div>
                <div className="px-4 py-4">
                  <div className="font-bold text-xl mb-2">{cake.name}</div>
                  <p className="text-gray-700 text-sm">{cake.description}</p>
                </div>
                <div className="px-4 pt-4 mb-4">
                  <span className="inline-block rounded-full text-sm font-semibold text-gray-700">
                    LKR {cake.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Gift Hampers */}
      <h3 className="text-3xl font-semibold text-gray-800 mb-8 mt-16">
        Featured Gift Hampers
      </h3>
      <div className="flex flex-wrap justify-center">
        {Hampers.slice(0, 3).map((hamper: any) => (
          <Link
            key={hamper._id}
            href={`/gift-hampers/${hamper._id}`}
            className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white"
          >
            <div>
              <img
                className="w-full h-48 object-cover"
                src={hamper.image}
                alt={hamper.name}
              />
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 m-2">
                {hamper.type}
              </span>
              <div>
                <div className="px-4 py-4">
                  <div className="font-bold text-xl mb-2">{hamper.name}</div>
                  <p className="text-gray-700 text-sm">{hamper.description}</p>
                </div>
                <div className="px-4 pt-4 mb-4">
                  <span className="inline-block rounded-full text-sm font-semibold text-gray-700">
                    LKR {hamper.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Testimonials Section */}
      <section className="max-w-4xl mx-auto mt-24 px-4 text-center">
        <h3 className="text-3xl font-semibold mb-6">What Our Customers Say</h3>
        {/* Add testimonials here */}

        <div className="flex flex-wrap justify-center">
          <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white">
            <div className="flex flex-col px-6 py-4 justify-center items-center">
              <Image
                src="/img/testimonial-1.jpg"
                alt="John Doe"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="font-bold text-xl mb-2">John Doe</div>
              <p className="text-gray-700 text-sm">
                "The cake was delicious and the service was excellent. I would
                definitely recommend Anything with Zee Cakes to anyone looking
                for a quality cake."
              </p>
            </div>
          </div>
          <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white">
            <div className="flex flex-col px-6 py-4 justify-center items-center">
              <Image
                src="/img/testimonial-2.jpg"
                alt="Jane Doe"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="font-bold text-xl mb-2">Jane Doe</div>
              <p className="text-gray-700 text-sm">
                "I ordered a customized cake for my daughter's birthday and it
                was amazing. The cake looked exactly like the picture I sent and
                it tasted great too."
              </p>
            </div>
          </div>
          <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white">
            <div className="flex flex-col px-6 py-4 justify-center items-center">
              <Image
                src="/img/testimonial-3.jpg"
                alt="Jane Doe"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="font-bold text-xl mb-2">Alice Smith</div>
              <p className="text-gray-700 text-sm">
                "The cakes at Anything with Zee Cakes are always fresh and
                delicious. I have ordered multiple times and have never been
                disappointed."
              </p>
            </div>
          </div>
          <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white">
            <div className="flex flex-col px-6 py-4 justify-center items-center">
              <Image
                src="/img/testimonial-4.jpg"
                alt="Jane Doe"
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="font-bold text-xl mb-2">Sarah Johnson</div>
              <p className="text-gray-700 text-sm">
                "The cake was delicious and the service was excellent. I would
                definitely recommend Anything with Zee Cakes to anyone looking
                for a quality cake."
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
