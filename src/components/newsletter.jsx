import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true); // Open the modal
    setEmail(''); // Reset the email input
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="bg-[#1F2937] dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-white dark:text-gray-100 sm:text-4xl">
          Stay Updated!
        </h2>
        <p className="mt-4 text-lg text-gray-300 dark:text-gray-400">
          Subscribe to our newsletter to get the latest updates on your parcel deliveries.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 sm:flex justify-center">
  <div className="w-full sm:max-w-md lg:max-w-lg flex flex-col sm:flex-row gap-3">
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-5 py-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
      placeholder="Enter your email"
      required
    />
    <button
      type="submit"
      className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:bg-orange-700 dark:hover:bg-orange-800"
    >
      Subscribe
    </button>
  </div>
</form>
        <div className="mt-8 animate-bounce">
          <svg
            className="w-12 h-12 mx-auto text-orange-500 dark:text-orange-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Thank You!
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              You've successfully subscribed with <span className="font-medium text-orange-500">{email}</span>.
            </p>
            <button
              onClick={closeModal}
              className="mt-4 w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:bg-orange-700 dark:hover:bg-orange-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Newsletter;