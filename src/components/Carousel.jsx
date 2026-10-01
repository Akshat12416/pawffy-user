/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Carousel = () => {
  // Sample images - replace with your actual image URLs
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop&crop=faces",
      alt: "Man with Shiba Inu outdoors"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop&crop=faces",
      alt: "Person kneeling with Shiba Inu wearing bandana"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop&crop=faces",
      alt: "Man holding Shiba Inu"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=400&h=300&fit=crop&crop=faces",
      alt: "Person in military uniform with dog"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop&crop=faces",
      alt: "Person with Shiba Inu wearing bandana"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(3);

  // Responsive visible images count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleImages(1);
      } else if (window.innerWidth < 1024) {
        setVisibleImages(2);
      } else {
        setVisibleImages(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= images.length - visibleImages ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length, visibleImages]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= images.length - visibleImages ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex <= 0 ? images.length - visibleImages : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const maxDots = images.length - visibleImages + 1;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 mt-16">
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-4 lg:gap-6"
          animate={{
            x: `calc(-${currentIndex * (100 / visibleImages)}% - ${currentIndex * (visibleImages === 1 ? 0 : visibleImages === 2 ? 0.5 : 1)}rem)`
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        >
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              className={`flex-shrink-0 ${
                visibleImages === 1 ? 'w-full' : 
                visibleImages === 2 ? 'w-1/2' : 'w-1/3'
              }`}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden aspect-[4/3]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Subtle overlay for better image contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 lg:p-3 transition-all duration-200 hover:scale-110 z-10"
          aria-label="Previous image"
        >
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 lg:p-3 transition-all duration-200 hover:scale-110 z-10"
          aria-label="Next image"
        >
          <svg className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dot Navigation */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: maxDots }, (_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? 'bg-blue-500 w-8' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center mt-4 text-sm text-gray-600">
        {currentIndex + 1} - {Math.min(currentIndex + visibleImages, images.length)} of {images.length}
      </div>
    </div>
  );
};

export default Carousel;