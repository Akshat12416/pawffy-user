import React, { useState, useEffect, useRef } from 'react';

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  // Local images from your images folder
  const images = [
    {
      id: 1,
      src: "/images/carousel-1.png",
      alt: "Woman with small dog"
    },
    {
      id: 2,
      src: "/images/carousel-2.png", 
      alt: "Woman with kitten"
    },
    {
      id: 3,
      src: "/images/carousel-3.png",
      alt: "Dog by the water"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }
    if (isRightSwipe) {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  const getImageClasses = (index) => {
    const isCenter = index === currentIndex;
    const isLeft = index === (currentIndex - 1 + images.length) % images.length;
    const isRight = index === (currentIndex + 1) % images.length;

    let classes = "transition-all duration-700 ease-in-out cursor-pointer absolute ";
    
    if (isCenter) {
      // Center image - responsive sizing
      classes += `
        w-48 h-32 xs:w-52 xs:h-36 sm:w-64 sm:h-44 md:w-80 md:h-56 lg:w-96 lg:h-64 xl:w-[500px] xl:h-80
        z-30 opacity-100 scale-100 
        left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
      `;
    } else if (isLeft) {
      // Left image - responsive sizing and positioning
      classes += `
        w-24 h-16 xs:w-28 xs:h-20 sm:w-32 sm:h-24 md:w-40 md:h-28 lg:w-48 lg:h-32 xl:w-64 xl:h-48
        z-10 opacity-60 sm:opacity-70 scale-75 sm:scale-90
        left-2 xs:left-4 sm:left-8 md:left-12 lg:left-16 xl:left-20
        top-1/2 -translate-y-1/2
      `;
    } else if (isRight) {
      // Right image - responsive sizing and positioning
      classes += `
        w-24 h-16 xs:w-28 xs:h-20 sm:w-32 sm:h-24 md:w-40 md:h-28 lg:w-48 lg:h-32 xl:w-64 xl:h-48
        z-10 opacity-60 sm:opacity-70 scale-75 sm:scale-90
        right-2 xs:right-4 sm:right-8 md:right-12 lg:right-16 xl:right-20
        top-1/2 -translate-y-1/2
      `;
    } else {
      // Hidden images
      classes += "w-24 h-16 z-0 opacity-0 scale-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2";
    }
    
    return classes.replace(/\s+/g, ' ').trim();
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 px-3 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Carousel Container */}
        <div 
          ref={carouselRef}
          className="relative h-48 xs:h-52 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] mb-6 sm:mb-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-40 
                     hidden sm:flex items-center justify-center
                     w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12
                     bg-white/80 hover:bg-white text-orange-500 
                     rounded-full shadow-lg hover:shadow-xl
                     transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Previous image"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-40 
                     hidden sm:flex items-center justify-center
                     w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12
                     bg-white/80 hover:bg-white text-orange-500 
                     rounded-full shadow-lg hover:shadow-xl
                     transition-all duration-200 hover:scale-110 active:scale-95"
            aria-label="Next image"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Images */}
          <div className="relative w-full h-full">
            {images.map((image, index) => (
              <div
                key={image.id}
                className={getImageClasses(index)}
                onClick={() => setCurrentIndex(index)}
              >
                <div className="w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden 
                              shadow-lg sm:shadow-xl hover:shadow-2xl
                              border-2 sm:border-4 border-orange-400 
                              transition-all duration-300 hover:border-orange-500">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center space-x-2 sm:space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 hover:scale-110 active:scale-90 rounded-full
                ${
                  index === currentIndex 
                    ? 'w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 scale-125 shadow-lg' 
                    : 'w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 hover:bg-orange-300'
                }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile swipe indicator */}
        <div className="sm:hidden text-center mt-4">
          <p className="text-xs text-gray-500">Swipe left or right to navigate</p>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;