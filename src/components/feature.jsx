import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { ShieldCheck, Truck, Headset, PackageCheck, Send, Users } from "lucide-react";

const Features = () => {
  const [stats, setStats] = useState({
    parcelsBooked: 0,
    parcelsDelivered: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const parcelsRes = await fetch("https://assignment-12-lovat.vercel.app/book");
        const parcelsData = await parcelsRes.json();

        const usersRes = await fetch("https://assignment-12-lovat.vercel.app/user");
        const usersData = await usersRes.json();

        const deliveredParcels = parcelsData.filter((parcel) => parcel.status === "Delivered").length;

        setStats({
          parcelsBooked: parcelsData.length,
          parcelsDelivered: deliveredParcels,
          totalUsers: usersData.length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const features = [
    { icon: <ShieldCheck size={40} className="text-white" />, title: "Parcel Safety", description: "Your parcels are handled with utmost care and security." },
    { icon: <Truck size={40} className="text-white" />, title: "Super Fast Delivery", description: "We ensure the fastest delivery times in the industry." },
    { icon: <Headset size={40} className="text-white" />, title: "24/7 Support", description: "Our support team is available around the clock." },
  ];

  return (
    <div className="py-10 bg-gray-100 dark:bg-gray-900">
      {/* Features Section */}
      <motion.h2
        className="text-3xl font-bold text-center mb-4 text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Features
      </motion.h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 px-6">
        Discover the exceptional benefits we offer. From fast delivery to reliable support, we aim to make your shipping experience seamless and hassle-free.
      </p>

      <motion.div
        className="flex flex-wrap justify-center gap-6 mb-12"
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
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="dark:bg-gray-800 bg-white dark:text-gray-200 p-6 rounded-xl shadow-xl w-80 flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="bg-gray-700 p-3 rounded-full">{feature.icon}</div>
            <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
            <p className="text-sm text-center mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Achievements Section */}
      <motion.h2
        className="text-3xl font-bold text-center mt-12 text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Achievements
      </motion.h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8 px-6">
        We are proud of the milestones we've achieved. These numbers reflect the trust and satisfaction of our valued customers.
      </p>

      <motion.div
        className="flex flex-wrap justify-between gap-6 mt-6 w-[90%] m-auto"
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
        {[{
          icon: <PackageCheck size={35} />,
          title: "Parcels Booked",
          value: stats.parcelsBooked
        },
        {
          icon: <Send size={35} />,
          title: "Parcels Delivered",
          value: stats.parcelsDelivered
        },
        {
          icon: <Users size={35} />,
          title: "Registered Users",
          value: stats.totalUsers
        }].map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md w-64 flex flex-col items-center dark:bg-gray-800"
            whileHover={{ scale: 1.05 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="text-red-500">{stat.icon}</div>
            <h3 className="text-lg font-semibold mt-2 dark:text-white">{stat.title}</h3>
            <p className="text-2xl font-bold mt-2 text-gray-800 dark:text-white">
              <CountUp end={stat.value} duration={2.5} />
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
