import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  { question: "How long does delivery take?", answer: "Delivery usually takes 3-5 business days depending on the location." },
  { question: "Can I track my parcel?", answer: "Yes, you will receive a tracking number once your order is dispatched." },
  { question: "What happens if my parcel is lost?", answer: "If your parcel is lost, contact our support team for assistance." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-[90%] mx-auto p-4 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold text-center mb-4">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="w-[100%] border rounded-lg overflow-hidden dark:border-gray-600">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === index && (
              <div className="p-4 bg-white dark:bg-gray-900 border-t dark:border-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
