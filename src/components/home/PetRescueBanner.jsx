import React from 'react';
import { motion } from 'framer-motion';

const PetRescueBanner = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <motion.div 
        className="relative bg-gradient-to-r from-orange-400 via-orange-500 to-blue-900 rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/90 via-orange-500/80 to-blue-900/95"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-6 lg:py-6 min-h-[300px] lg:min-h-[200px]">
          {/* Left side - Dogs and hut images */}
          <motion.div 
            className="flex-shrink-0 relative w-full max-w-xs sm:max-w-sm lg:w-72 h-48 sm:h-52 lg:h-56 mb-6 lg:mb-0"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Background image - hut (larger) */}
            <img 
              src="/images/dog-hut.png" 
              alt="Dog hut background" 
              className="h-48 sm:h-52 lg:h-56 w-auto object-contain absolute inset-0 mx-auto"
            />
            {/* Foreground image - dogs (overlapping) */}
            <img 
              src="/images/dog-banner.png" 
              alt="Dogs" 
              className="h-32 sm:h-36 lg:h-40 w-auto object-contain absolute top-16 sm:top-16 lg:top-16 left-2 sm:left-4 z-10"
            />
          </motion.div>
          
          {/* Right side - Content */}
          <motion.div 
            className="flex-1 text-center lg:text-right lg:pl-12 w-full"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Main heading */}
            <motion.h1 
              className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-2"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Found A Pet !
            </motion.h1>
            
            {/* Subheading */}
            <motion.h2 
              className="text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Lets Rescue The Pet
            </motion.h2>
            
            {/* Description */}
            <motion.p 
              className="text-white/90 text-xs sm:text-sm leading-relaxed mb-6 max-w-md mx-auto lg:ml-auto lg:mr-0"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!
            </motion.p>
            
            {/* Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-end"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <motion.button
                className="px-4 sm:px-6 py-2 sm:py-3 bg-transparent border-2 border-white text-white rounded-full font-medium hover:bg-white hover:text-blue-900 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Report Lost Pet
              </motion.button>
              
              <motion.button
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-900 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Find Lost Pet
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PetRescueBanner;