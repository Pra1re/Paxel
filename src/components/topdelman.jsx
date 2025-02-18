import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "./loading";

const Topdelman = () => {
  const [users, setUsers] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    fetch("https://assignment-12-lovat.vercel.app/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoad(false);
      });
  }, []);

  if (load) {
    return <Loading />;
  }

 
  const deliverymen = users.filter((u) => u.role === "deliveryman");

  
  const topDeliverymen = deliverymen
    .map((man) => ({
      ...man,
      avgRating:
        man.ratingCount > 0
          ? parseFloat((man.ratingSum / man.ratingCount).toFixed(2))
          : 0,
    }))
    .sort((a, b) => {
      if (b.delivered !== a.delivered) {
        return b.delivered - a.delivered; 
      }
      return b.rating - a.rating; 
    })
    .slice(0, 3); 

  
  const testimonials = [
    "Working here has completely changed my life! I feel valued every day.",
    "I love the flexible hours and the team spirit here is amazing!",
    "This job gave me the opportunity to grow and support my family.",
  ];

  return (
    <div className="dark:bg-gray-950 py-10 pb-20 bg-blue-50 to-blue-50 ">
      <motion.h2
        className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Top Delivery Men
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {topDeliverymen.map((man, index) => (
          <motion.div
            key={man._id}
            className="dark:bg-gray-800 p-6 bg-white border rounded-2xl shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <img
              src={man.image || "https://thumbs.dreamstime.com/z/smiling-delivery-man-17905770.jpg"}
              alt={man.name}
              className="w-24 h-24 object-cover rounded-full border-4 border-blue-200 mb-4"
            />
            <h3 className="text-xl font-semibold dark:text-white text-gray-800">{man.name}</h3>
            <p className="dark:text-white text-gray-600">📦 Delivered: {man.delivered}</p>
            <p className="dark:text-white text-yellow-500 font-medium">
              ⭐ Rating: {man.avgRating}
            </p>
            <p className="dark:text-white text-sm text-gray-500 italic mt-4">
              "{testimonials[index % testimonials.length]}"
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Topdelman;
