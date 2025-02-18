import React, { useEffect, useState } from "react";
import Loading from "./loading";

const Alldeliveryman = () => {
  const [dman, setdman] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/user")
      .then((res) => res.json())
      .then((data) => {
        setdman(data.filter((user) => user.role === "deliveryman"));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching deliverymen:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        All Delivery Men
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Phone Number</th>
              <th className="px-4 py-2 text-left">Parcels Delivered</th>
              <th className="px-4 py-2 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {dman.map((man, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-gray-700"
                    : "bg-gray-100 dark:bg-gray-600"
                } hover:bg-blue-50 dark:hover:bg-blue-700 transition`}
              >
                <td className="px-4 py-3 text-gray-800 dark:text-white font-medium">
                  {man.name}
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {man.number}
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-white font-semibold">
                  {man.delivered || 0}
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-white">
                  {man.rating ? (
                    <span className="text-yellow-500 font-semibold">
                      {man.rating.toFixed(1)} / 5
                    </span>
                  ) : (
                    <span className="italic text-gray-400 dark:text-gray-500">
                      No ratings yet
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Alldeliveryman;
