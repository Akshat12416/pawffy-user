import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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

  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.footer 
      className="bg-slate-900 text-white py-16 px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white tracking-wide">THEPAWFFY</h2>
            <p className="text-gray-300 text-base leading-relaxed max-w-sm mx-auto lg:mx-0">
              A pet services and community platform operated by Ganapati & Rani Investment LLC dba ThePawffy.
            </p>
            <div className="space-y-3">
              <motion.div 
                className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300"
                variants={linkVariants}
                whileHover="hover"
              >
                <Mail size={18} className="text-gray-400" />
                <span className="text-base">Support: support@thepawffy.com</span>
              </motion.div>
            </div>
          </motion.div>

          {/* My Account Section */}
          <motion.div variants={itemVariants} className="space-y-6 text-center lg:text-left">
            <h3 className="text-xl font-semibold text-white">My Account</h3>
            <div className="space-y-3">
              {[
                'My Account',
                'Order History',
                'Shopping Cart',
                'Wishlist',
                'Settings'
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="block text-gray-300 text-base hover:text-white transition-colors duration-200"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Us Section */}
          <motion.div variants={itemVariants} className="space-y-6 text-center lg:text-left">
            <h3 className="text-xl font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              {[
                { name: 'Contact', path: '/contact' },
                { name: 'FAQs', path: '/faqs' },
                { name: 'Terms and Conditions', path: '/terms' },
                { name: 'Privacy Policy', path: '/privacy-policy' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={linkVariants}
                  whileHover="hover"
                >
                  <Link
                    to={item.path}
                    className="block text-gray-300 text-base hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider Line */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 mb-8 border-t border-gray-700"
        />

        {/* Bottom Section */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0"
        >
          {/* Social Icons */}
          <div className="flex space-x-6">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
              variants={socialIconVariants}
              whileHover="hover"
            >
              <Facebook size={24} />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-blue-300 transition-colors duration-200"
              variants={socialIconVariants}
              whileHover="hover"
            >
              <Twitter size={24} />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-pink-400 transition-colors duration-200"
              variants={socialIconVariants}
              whileHover="hover"
            >
              <Instagram size={24} />
            </motion.a>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-base text-center order-last lg:order-none">
             © 2026 Ganapati & Rani Investment LLC dba ThePawffy. All Rights Reserved.
          </p>

          {/* Payment Icons */}
          <div className="flex items-center space-x-3 order-first lg:order-last">
            {/* PayPal */}
            <motion.div
              className="bg-white p-2.5 rounded-md shadow-sm min-w-[60px] h-10 flex items-center justify-center"
              variants={linkVariants}
              whileHover="hover"
            >
              <img 
                src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png" 
                alt="PayPal" 
                className="h-4 w-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="text-blue-600 font-bold text-xs hidden">PayPal</span>
            </motion.div>
            
            {/* Visa */}
            <motion.div
              className="bg-white p-2.5 rounded-md shadow-sm min-w-[60px] h-10 flex items-center justify-center"
              variants={linkVariants}
              whileHover="hover"
            > 
              <svg className="h-4 w-auto" viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" fill="white"/>
                <path d="M18.5 8.5L15.2 23.5H11.8L9.9 11.8C9.8 11.3 9.6 10.9 9.2 10.7C8.4 10.3 7.4 9.9 6.5 9.7V8.5H12.2C12.9 8.5 13.5 9.1 13.6 9.8L14.8 17.2L17.7 8.5H18.5Z" fill="#1434CB"/>
                <path d="M21.5 8.5L18.9 23.5H15.5L18.1 8.5H21.5Z" fill="#1434CB"/>
                <path d="M31.2 11.8C31.2 11.1 30.6 10.5 29.9 10.5C28.8 10.5 27.8 11.2 27.8 12.3C27.8 13.1 28.4 13.6 29.3 14C30.2 14.4 30.5 14.7 30.5 15.2C30.5 15.9 29.8 16.4 28.9 16.4C27.9 16.4 27.1 15.8 26.8 15.1L25.9 15.9C26.5 17.1 27.6 17.7 28.9 17.7C30.7 17.7 32.1 16.5 32.1 15C32.1 12.8 29.5 12.6 29.5 11.8H31.2Z" fill="#1434CB"/>
                <path d="M39.5 23.5H36.2L36.8 21.8H33.2L32.4 23.5H29.5L34.1 8.5H37.8L39.5 23.5ZM34.2 19.2H36.2L35.8 15.1L34.2 19.2Z" fill="#1434CB"/>
              </svg>
            </motion.div>
            
            {/* Mastercard */}
            <motion.div
              className="bg-white p-2.5 rounded-md shadow-sm min-w-[60px] h-10 flex items-center justify-center"
              variants={linkVariants}
              whileHover="hover"
            >
              <svg className="h-6 w-auto" viewBox="0 0 48 32" fill="none">
                <rect width="48" height="32" fill="white"/>
                <circle cx="18" cy="16" r="10" fill="#EB001B"/>
                <circle cx="30" cy="16" r="10" fill="#F79E1B"/>
                <path d="M24 8.5C21.8 10.2 20.5 12.9 20.5 16C20.5 19.1 21.8 21.8 24 23.5C26.2 21.8 27.5 19.1 27.5 16C27.5 12.9 26.2 10.2 24 8.5Z" fill="#FF5F00"/>
              </svg>
            </motion.div>
            
            {/* Secured Payments Badge */}
            {/* <motion.div
              className="bg-blue-500 text-white text-xs px-3 py-2.5 rounded-md font-medium"
              variants={linkVariants}
              whileHover="hover"
            >
              <div className="text-center leading-tight">
                SECURED
                <br />
                PAYMENTS
              </div>
            </motion.div> */}
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;