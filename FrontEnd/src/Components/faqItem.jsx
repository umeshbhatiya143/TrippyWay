import React, { useState } from 'react';
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

// A single FAQ item
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full px-4 py-3 text-left text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75"
      >
        <span className="font-medium">{question}</span>
        {isOpen ? (
          <FaChevronUp className="w-5 h-5" />
        ) : (
          <FaChevronDown className="w-5 h-5" />
        )}
      </button>
      <div
        className={`px-4 pt-3 pb-2 text-gray-700 rounded-lg transition-height duration-5000 ease-in-out ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

export default FAQItem