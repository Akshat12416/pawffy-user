import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function PetFinderHero() {
  const navigate = useNavigate();

  const handleReportLostPet = () => {
    navigate('/report-lost-pet');
  };

  const handleFindYourPet = () => {
    navigate('/find-pet');
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden rounded-2xl sm:rounded-3xl">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-300 to-blue-900"></div>
      
      {/* Content Container */}
      <div className="relative h-full flex items-center">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-0">
          
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex items-stretch h-full"
          >
            <img 
              src="/images/dog-paw.png" 
              alt="Dog paw in hand" 
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Right Side - Content (Now Right-Aligned) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col justify-end items-end text-right px-6 sm:px-8 md:px-12 lg:px-16 py-8 text-white space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6"
          >
            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
            >
              Found A Dog !
            </motion.h1>

            {/* Subheading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-orange-400 leading-tight"
            >
              No Worries We Are Here
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xs sm:text-sm md:text-base lg:text-lg max-w-xl leading-relaxed"
            >
              Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-3 md:pt-4 w-full sm:w-auto justify-end"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReportLostPet}
                className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-sm sm:text-base md:text-lg hover:bg-white hover:text-blue-900 transition-all duration-300 whitespace-nowrap"
              >
                Report Lost Pet
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFindYourPet}
                className="px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-white text-blue-900 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:bg-opacity-90 transition-all duration-300 shadow-lg whitespace-nowrap"
              >
                Find Your Pet
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}