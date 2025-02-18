import { motion, useAnimation, useScroll } from "framer-motion";
import { useEffect } from "react";

const Firstbanner = () => {
  const { scrollY } = useScroll(); // Get scroll position
  const controls = useAnimation();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      // Update animation based on scroll
      controls.start({
        x: latest > 300 ? 400 : 0,
        opacity: latest > 300 ? 0 : 1, 
        transition: { duration: 0.4 },
      });
    });
  }, [scrollY, controls]);

  return (
    <div className=" mb-8 relative w-full h-[580px] flex flex-col justify-center items-center text-white text-center px-4 overflow-hidden ">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full -rotate-[0deg]"
        style={{
          backgroundImage: `url("https://i.ibb.co/wwvpTyQ/maxim-tolchinskiy-cr-Hh-Zl-ES310-unsplash.jpg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-95"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center  "
        animate={controls}
        initial={{ x: 0, opacity: 1 }}
      >
        {/* Heading Animation */}
        <motion.h1
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Fast & Reliable Parcel Delivery
        </motion.h1>

        {/* Paragraph Animation */}
        <motion.p
          className="text-lg mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Deliver your parcels securely and on time.
        </motion.p>

        {/* Input Box Animation */}
        <motion.div
          className="relative w-full max-w-md m-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <input
            type="text"
            placeholder="Track your parcel..."
            className="w-full py-3 px-4 rounded-full text-gray-800 focus:outline-none"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full">
            Search
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Firstbanner;
