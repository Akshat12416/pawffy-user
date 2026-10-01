import React from 'react';
import { motion } from 'framer-motion';

export default function PetAppBanner() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-5xl bg-gradient-to-r from-orange-400 via-orange-300 to-blue-900 rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* Decorative paw prints */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-20">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <ellipse cx="60" cy="75" rx="25" ry="30" fill="currentColor" className="text-orange-500"/>
              <ellipse cx="35" cy="45" rx="15" ry="18" fill="currentColor" className="text-orange-500"/>
              <ellipse cx="60" cy="35" rx="15" ry="18" fill="currentColor" className="text-orange-500"/>
              <ellipse cx="85" cy="45" rx="15" ry="18" fill="currentColor" className="text-orange-500"/>
              <ellipse cx="75" cy="65" rx="12" ry="15" fill="currentColor" className="text-orange-500"/>
            </svg>
          </motion.div>
        </div>

        <div className="relative flex flex-col md:flex-row items-end md:items-center justify-between p-8 md:p-12">
          {/* Left side - Pet images */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full md:w-1/2 flex justify-center md:justify-start mb-8 md:mb-0"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              src="/images/dog-cat.png"
              alt="Dog and Cat"
              className="w-full max-w-md h-auto object-contain"
            />
          </motion.div>

          {/* Right side - Content */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-full md:w-1/2 text-center md:text-right space-y-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                Get Special Offers
              </h1>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-400">
                By Downloading Our App
              </h2>
            </motion.div>

            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white text-sm md:text-base max-w-md mx-auto md:ml-auto leading-relaxed"
            >
              Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!
            </motion.p>

            {/* App Store Buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end items-center"
            >
              {/* App Store Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm border-2 border-white rounded-xl px-6 py-3 hover:bg-opacity-20 transition-all duration-300 min-w-[180px]"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-white opacity-80">Download on the</div>
                  <div className="text-lg font-semibold text-white">App Store</div>
                </div>
              </motion.a>

              {/* Google Play Button */}
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                className="flex items-center gap-3 bg-white bg-opacity-10 backdrop-blur-sm border-2 border-white rounded-xl px-6 py-3 hover:bg-opacity-20 transition-all duration-300 min-w-[180px]"
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-white opacity-80">GET IT ON</div>
                  <div className="text-lg font-semibold text-white">Google Play</div>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}