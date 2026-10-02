import React, { useState, useEffect } from "react";
import { MapPin, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "./home/brand";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className="bg-white shadow-sm py-3 px-4 sm:py-4 sm:px-6 lg:py-5 lg:px-8 animate-fade-in sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
            <button
              onClick={() => navigate("/")}
              className="text-gray-700 hover:text-orange-500 font-medium transition-all duration-200 hover:scale-105 text-sm xl:text-base"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/services")}
              className="text-gray-700 hover:text-orange-500 font-medium transition-all duration-200 hover:scale-105 text-sm xl:text-base"
            >
              Services
            </button>
            <button
              onClick={() => navigate("/lostandfound")}
              className="text-gray-700 hover:text-orange-500 font-medium transition-all duration-200 hover:scale-105 text-sm xl:text-base"
            >
              Lost & Found
            </button>
            <button
              type="button"
              className="text-gray-700 hover:text-orange-500 font-medium transition-all duration-200 hover:scale-105 text-sm xl:text-base"
            >
              My Bookings
            </button>
          </nav>

          {/* Right side - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3 xl:space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-orange-500 text-white px-3 py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2 xl:px-6 xl:py-2.5 rounded-full font-medium text-xs md:text-sm lg:text-base hover:bg-orange-600 transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <span className="hidden lg:inline">Login or Signup</span>
              <span className="lg:hidden">Login</span>
            </button>
            <div className="flex items-center text-gray-600 text-xs lg:text-sm xl:text-base whitespace-nowrap">
              <MapPin size={14} className="mr-1 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
              <span className="hidden lg:inline">London, UK</span>
              <span className="lg:hidden">London</span>
            </div>
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center space-x-2 md:hidden">
            <div className="flex items-center text-gray-600 text-xs">
              <MapPin size={12} className="mr-1" />
              <span className="hidden xs:inline">London</span>
            </div>

            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-orange-500 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-6 h-full bg-white overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div onClick={toggleMenu}>
              <Logo />
            </div>
            <button
              onClick={toggleMenu}
              className="p-1 text-gray-700 hover:text-orange-500 transition-colors duration-200"
            >
              <X size={24} />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-6 mb-8">
            <button
              onClick={() => {
                navigate("/");
                toggleMenu();
              }}
              className="block w-full text-left text-gray-700 hover:text-orange-500 font-medium text-lg transition-colors duration-200 py-2"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate("/services");
                toggleMenu();
              }}
              className="block w-full text-left text-gray-700 hover:text-orange-500 font-medium text-lg transition-colors duration-200 py-2"
            >
              Services
            </button>
            <button
              onClick={() => {
                navigate("/lostandfound");
                toggleMenu();
              }}
              className="block w-full text-left text-gray-700 hover:text-orange-500 font-medium text-lg transition-colors duration-200 py-2"
            >
              Lost & Found
            </button>
          </nav>
          <button
            type="button"
            className="block w-full text-left text-gray-700 hover:text-orange-500 font-medium text-lg transition-colors duration-200 py-2"
          >
            My Bookings
          </button>

          {/* Mobile Login Button */}
          <button
            onClick={() => {
              navigate("/login");
              toggleMenu();
            }}
            className="w-full bg-orange-500 text-white py-3 rounded-full font-medium text-base hover:bg-orange-600 transition-all duration-200 mb-6"
          >
            Login or Signup
          </button>

          {/* Mobile Location */}
          <div className="flex items-center justify-center text-gray-600 text-sm bg-gray-50 py-3 rounded-lg">
            <MapPin size={16} className="mr-2" />
            London, UK
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        @media (min-width: 475px) {
          .xs\\:inline {
            display: inline !important;
          }
        }

        @media (max-width: 374px) {
          .text-xs {
            font-size: 0.625rem;
          }
        }

        @media (min-width: 1536px) {
          .max-w-7xl {
            max-width: 90rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
