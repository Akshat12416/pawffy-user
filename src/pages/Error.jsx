import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Error = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const gearVariants1 = {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const gearVariants2 = {
    animate: {
      rotate: -360,
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const gearVariants3 = {
    animate: {
      rotate: 360,
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const robotVariants = {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        {/* Gears and Robot Animation */}
        <div className="relative mb-8 h-64 flex items-center justify-center">
          {/* Gear 1 - Large Left */}
          <motion.div
            variants={gearVariants1}
            animate="animate"
            className="absolute left-1/4 top-8"
            style={{ transformOrigin: 'center' }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="20" fill="white" stroke="#CBD5E1" strokeWidth="2"/>
              <circle cx="40" cy="40" r="12" fill="white"/>
              {[...Array(12)].map((_, i) => (
                <rect
                  key={i}
                  x="38"
                  y="8"
                  width="4"
                  height="10"
                  fill="#CBD5E1"
                  style={{
                    transformOrigin: '40px 40px',
                    transform: `rotate(${i * 30}deg)`
                  }}
                />
              ))}
            </svg>
          </motion.div>

          {/* Gear 2 - Medium Center Right */}
          <motion.div
            variants={gearVariants2}
            animate="animate"
            className="absolute left-1/2 top-12"
            style={{ transformOrigin: 'center' }}
          >
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="15" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
              <circle cx="30" cy="30" r="9" fill="white"/>
              {[...Array(10)].map((_, i) => (
                <rect
                  key={i}
                  x="28"
                  y="6"
                  width="4"
                  height="8"
                  fill="#E2E8F0"
                  style={{
                    transformOrigin: '30px 30px',
                    transform: `rotate(${i * 36}deg)`
                  }}
                />
              ))}
            </svg>
          </motion.div>

          {/* Gear 3 - Small Top Right */}
          <motion.div
            variants={gearVariants3}
            animate="animate"
            className="absolute right-1/4 top-4"
            style={{ transformOrigin: 'center' }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="10" fill="white" stroke="#E2E8F0" strokeWidth="2"/>
              <circle cx="20" cy="20" r="6" fill="white"/>
              {[...Array(8)].map((_, i) => (
                <rect
                  key={i}
                  x="18"
                  y="4"
                  width="4"
                  height="6"
                  fill="#E2E8F0"
                  style={{
                    transformOrigin: '20px 20px',
                    transform: `rotate(${i * 45}deg)`
                  }}
                />
              ))}
            </svg>
          </motion.div>

          {/* Robot Character */}
           <motion.div
            variants={robotVariants}
            initial="initial"
            animate="animate"
            className="relative z-10"
          >
            <img 
              src="/images/error-robot.png"
              alt="Error Robot" 
              className="w-96 h-96 object-contain drop-shadow-2xl"
            />
          </motion.div>
        </div>


        {/* Text Content */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          404, Page not founds
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-600 text-base md:text-lg mb-8 max-w-md mx-auto leading-relaxed"
        >
          Something went wrong. It's look that your requested could not be found. It's look like the link is broken or the page is removed.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-lg hover:bg-orange-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoHome}
            className="px-6 py-3 bg-white text-gray-800 font-medium rounded-lg border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 transition-colors shadow-md"
          >
            Go to Home
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Error;