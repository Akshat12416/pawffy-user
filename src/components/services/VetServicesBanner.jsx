import React from "react";
import { motion } from "framer-motion";

const VetServicesBanner = () => {
  return (
    <div className="w-full bg-gradient-to-r from-orange-400 to-indigo-950 rounded-3xl overflow-hidden shadow-2xl relative">
      <div className="flex flex-col lg:flex-row items-stretch min-h-[380px] lg:min-h-[450px] relative">
        {/* Left side - Image */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 w-full flex justify-center items-end relative overflow-hidden"
        >
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            src="/images/vet-with-cat.png"
            alt="Veterinarian holding a cat"
            className="w-full h-full object-cover object-top"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
          {/* Fallback placeholder */}
          <div className="hidden absolute inset-0 bg-orange-300/30 items-center justify-center text-white/70 text-lg">
            <p>Vet with Cat Image</p>
          </div>
        </motion.div>

        {/* Right side - Content */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:w-1/2 w-full px-6 py-10 sm:px-8 sm:py-12 lg:p-12 xl:p-16 text-white flex flex-col justify-center"
        >
          {/* Headings */}
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 leading-tight text-center lg:text-left"
          >
            Best Services
          </motion.h1>

          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-orange-400 mb-6 text-center lg:text-left"
          >
            For Your Cute Paws
          </motion.h2>

          {/* Paragraphs */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-8 text-center lg:text-left"
          >
            <p className="text-sm sm:text-base leading-relaxed">
              We Have Curated More Than <span className="font-semibold">200+</span> Services For Your Pet.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Book Now to Explore Our World-Class Care.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 items-center lg:justify-start justify-center"
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 bg-indigo-950 text-white font-semibold rounded-full text-sm sm:text-base shadow-lg hover:bg-indigo-900 transition-colors duration-200 border-2 border-indigo-950 w-full sm:w-auto"
            >
              Book Packages
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,1)",
                color: "rgb(30, 27, 75)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 bg-white text-indigo-950 font-semibold rounded-full text-sm sm:text-base shadow-lg transition-colors duration-200 border-2 border-white w-full sm:w-auto"
            >
              Explore Services
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VetServicesBanner;
