/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PetServicesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('lg');
  const [cardsPerView, setCardsPerView] = useState(3);
  const [cardWidth, setCardWidth] = useState(320);
  const [gap, setGap] = useState(24);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Color gradients for different services
  const bgColors = [
    "from-orange-400 to-orange-500",
    "from-yellow-400 to-orange-400",
    "from-blue-400 to-blue-500",
    "from-yellow-500 to-orange-400",
    "from-green-400 to-blue-500",
    "from-pink-400 to-purple-500",
    "from-purple-400 to-pink-500",
    "from-teal-400 to-cyan-500"
  ];

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://thepawffy-dev.onrender.com/api/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        
        // Filter active services and map to required format
        const formattedServices = data
          .filter(service => service.status === true)
          .map((service, index) => ({
            id: service.id,
            title: service.name.trim(),
            subtitle: "Top-Quality Pet Services By Our Experts at Your Home",
            image: service.image,
            bgColor: bgColors[index % bgColors.length]
          }));
        
        setServices(formattedServices);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Responsive breakpoints and settings
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      
      if (width < 640) {
        setScreenSize('sm');
        setCardsPerView(1);
        setCardWidth(280);
        setGap(16);
      } else if (width < 768) {
        setScreenSize('md');
        setCardsPerView(1);
        setCardWidth(320);
        setGap(20);
      } else if (width < 1024) {
        setScreenSize('lg');
        setCardsPerView(2);
        setCardWidth(300);
        setGap(20);
      } else if (width < 1280) {
        setScreenSize('xl');
        setCardsPerView(3);
        setCardWidth(300);
        setGap(24);
      } else {
        setScreenSize('2xl');
        setCardsPerView(3);
        setCardWidth(320);
        setGap(24);
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const maxIndex = Math.max(0, services.length - cardsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  // Auto-slide functionality
  useEffect(() => {
    if (services.length === 0 || loading) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [maxIndex, services.length, loading]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="relative w-full bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-800 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Floating Background Elements */}
      <motion.div 
        className="absolute top-4 right-4 sm:top-10 sm:right-20 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-purple-400 rounded-full opacity-20 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute bottom-4 left-4 sm:bottom-10 sm:left-10 w-12 h-12 sm:w-18 sm:h-18 lg:w-24 lg:h-24 bg-blue-400 rounded-full opacity-15 blur-lg"
        animate={{
          scale: [1, 1.4, 1],
          rotate: [360, 180, 0],
          x: [0, -25, 0],
          y: [0, 15, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Additional floating elements */}
      <motion.div 
        className="absolute top-1/2 left-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-orange-300 rounded-full opacity-10 blur-md"
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 40, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col justify-center items-center min-h-[500px]">
          <motion.div
            className="w-16 h-16 border-4 border-white/30 border-t-orange-400 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-white mt-4 text-lg">Loading services...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="flex justify-center items-center min-h-[500px]">
          <div className="text-center">
            <p className="text-white text-xl mb-4">Failed to load services</p>
            <p className="text-white/60 text-sm mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-8 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors font-semibold"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* No Services State */}
      {!loading && !error && services.length === 0 && (
        <div className="flex justify-center items-center min-h-[500px]">
          <p className="text-white text-xl">No services available at the moment</p>
        </div>
      )}

      {/* Main Content */}
      {!loading && !error && services.length > 0 && (
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 sm:mb-4"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Explore Our <motion.span 
                className="text-orange-400"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(251, 146, 60, 0.5)",
                    "0 0 20px rgba(251, 146, 60, 0.8)",
                    "0 0 10px rgba(251, 146, 60, 0.5)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >Services</motion.span>
            </motion.h1>
            <motion.p 
              className="text-white/80 text-sm sm:text-base lg:text-lg max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto leading-relaxed px-4"
              variants={itemVariants}
            >
              Top-Quality Pet Services By Our Experts at Your Home !
            </motion.p>
          </motion.div>

          {/* Carousel Container */}
          <motion.div 
            className="relative"
            variants={itemVariants}
          >
            {/* Navigation Buttons */}
            <motion.button
              onClick={prevSlide}
              className={`absolute ${screenSize === 'sm' ? 'left-0' : 'left-2 sm:left-4'} top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg`}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                x: [0, -2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronLeft size={screenSize === 'sm' ? 16 : screenSize === 'md' ? 18 : 24} />
            </motion.button>

            <motion.button
              onClick={nextSlide}
              className={`absolute ${screenSize === 'sm' ? 'right-0' : 'right-2 sm:right-4'} top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 shadow-lg`}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgba(255, 255, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                x: [0, 2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronRight size={screenSize === 'sm' ? 16 : screenSize === 'md' ? 18 : 24} />
            </motion.button>

            {/* Cards Container */}
            <div className={`overflow-hidden ${screenSize === 'sm' ? 'mx-8' : 'mx-10 sm:mx-12 lg:mx-16'}`}>
              <motion.div
                className="flex"
                animate={{
                  x: `-${currentIndex * (cardWidth + gap)}px`
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 40,
                  duration: 0.8
                }}
                style={{ gap: `${gap}px` }}
              >
                <AnimatePresence>
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      className="flex-shrink-0"
                      style={{ width: `${cardWidth}px` }}
                      initial={{ opacity: 0, y: 100, rotateX: -15 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0, 
                        rotateX: 0,
                      }}
                      exit={{ opacity: 0, y: -100, rotateX: 15 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ 
                        y: -15,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.div 
                        className={`relative ${screenSize === 'sm' ? 'h-72' : screenSize === 'md' ? 'h-80' : 'h-80 lg:h-80'} rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br ${service.bgColor} shadow-2xl cursor-pointer group`}
                        whileHover={{ 
                          scale: screenSize === 'sm' ? 1.02 : 1.05,
                          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)"
                        }}
                        transition={{ duration: 0.4 }}
                        animate={{
                          boxShadow: [
                            "0 10px 30px rgba(0, 0, 0, 0.2)",
                            "0 15px 40px rgba(0, 0, 0, 0.3)",
                            "0 10px 30px rgba(0, 0, 0, 0.2)"
                          ]
                        }}
                      >
                        {/* Service Image */}
                        <div className="absolute inset-0">
                          <motion.img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0.7, scale: 1.2 }}
                            animate={{ opacity: 0.8, scale: 1 }}
                            whileHover={{ 
                              opacity: 0.9, 
                              scale: 1.1,
                              filter: "brightness(1.1)"
                            }}
                            transition={{ duration: 0.6 }}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                          <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                            animate={{
                              background: [
                                "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent)",
                                "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3), transparent)",
                                "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2), transparent)"
                              ]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          />
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                          <motion.h3 
                            className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            whileHover={{
                              scale: 1.05,
                              textShadow: "0 0 10px rgba(255, 255, 255, 0.5)"
                            }}
                          >
                            {service.title}
                          </motion.h3>
                          <motion.p 
                            className="text-white/90 text-xs sm:text-sm leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            {service.subtitle}
                          </motion.p>
                        </div>

                        {/* Animated border and overlay effects */}
                        <motion.div
                          className="absolute inset-0 bg-white/10"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <motion.div
                          className="absolute inset-0 border-2 border-white/20 rounded-xl sm:rounded-2xl"
                          whileHover={{ 
                            borderColor: "rgba(255, 255, 255, 0.5)",
                            boxShadow: "inset 0 0 20px rgba(255, 255, 255, 0.2)"
                          }}
                          animate={{
                            borderColor: [
                              "rgba(255, 255, 255, 0.2)",
                              "rgba(255, 255, 255, 0.4)",
                              "rgba(255, 255, 255, 0.2)"
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Sparkle effect */}
                        <motion.div
                          className="absolute top-4 right-4 w-2 h-2 bg-white rounded-full"
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0.5, 1.5, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.5,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Dots Indicator */}
            <motion.div 
              className="flex justify-center mt-6 sm:mt-8 gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'bg-orange-400' : 'bg-white/40 hover:bg-white/60'
                  }`}
                  animate={{
                    width: currentIndex === index ? (screenSize === 'sm' ? 20 : 32) : (screenSize === 'sm' ? 8 : 12),
                    opacity: currentIndex === index ? 1 : 0.7
                  }}
                  whileHover={{ scale: 1.3, opacity: 1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* Animated background gradients */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(135deg, transparent, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.1))",
            "linear-gradient(225deg, transparent, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.1))",
            "linear-gradient(315deg, transparent, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.1))",
            "linear-gradient(135deg, transparent, rgba(168, 85, 247, 0.05), rgba(59, 130, 246, 0.1))"
          ]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
};

export default PetServicesCarousel;