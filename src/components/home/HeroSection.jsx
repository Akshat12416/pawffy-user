import React from 'react';

const HeroSection = () => {
  return (
    <section className=" py-16 px-6 relative overflow-hidden">
      {/* Decorative Paw Images */}
      <div className="absolute top-10 left-0 opacity-120 animate-float">
        <img 
          src="/images/paw-left.png" 
          alt="Paw print" 
          className="w-48 h-48 md:w-64 md:h-64 transform rotate-12"
        />
      </div>
      
      <div className="absolute top-32 right-0 opacity-120 animate-float-delayed">
        <img 
          src="/images/paw-right.png" 
          alt="Paw print" 
          className="w-48 h-48 md:w-64 md:h-64 transform -rotate-45"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main Heading */}
        <div className="animate-slide-up-1">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
            <span className="text-gray-800">Find Your New</span>
            <br />
            <span className="text-orange-500">Best Friend</span>{' '}
            <span className="text-gray-800">Today</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up-2">
          Having Adopting pet means you have more joy, a new friend, a happy
          person who will always be with you to have fun.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-3">
          <button className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-orange-600 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-orange-500/30">
            Adopt a Pet Now !
          </button>
          
          <button className="border-2 border-orange-500 text-orange-500 px-8 py-3 rounded-full font-semibold text-lg hover:bg-orange-500 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95">
            Lost Your Pet !
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up-1 {
          animation: slide-up 0.8s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-slide-up-2 {
          animation: slide-up 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }
        
        .animate-slide-up-3 {
          animation: slide-up 0.6s ease-out 0.6s forwards;
          opacity: 0;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--rotation));
          }
          50% {
            transform: translateY(-10px) rotate(var(--rotation));
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;