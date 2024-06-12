"use client";

import { useState } from "react";

const faqs = [
  {
    question: "What types of cakes do you offer?",
    answer:
      "We offer a variety of cakes including chocolate, vanilla, red velvet, and more. Custom flavors are also available upon request.",
  },
  {
    question: "Do you offer custom cake designs?",
    answer:
      "Yes, we specialize in custom cake designs for all occasions. Please contact us with your ideas and we will bring them to life.",
  },
  {
    question: "How far in advance should I place my order?",
    answer:
      "We recommend placing your order at least a week in advance to ensure availability. For custom designs, please allow more time.",
  },
  {
    question: "Do you deliver?",
    answer:
      "Yes, we offer delivery services. Delivery charges apply based on your provience.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Orders can be cancelled before the scheduled delivery or pickup date. Please contact us as soon as possible to make changes to your order.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      <div className="space-y-4 mt-10">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 py-2">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center py-2 focus:outline-none"
            >
              <span className="text-lg font-medium">{faq.question}</span>
              <span className="text-lg">{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="my-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
