import React from 'react'
import HeroSection from '../components/home/HeroSection';
import ImageCarousel from '../components/home/ImageCarousel';
import PetServicesCarousel from '../components/home/PetServicesCarousel';
import PetAdoptionExplorer from '../components/home/PetAdoptionExplorer';
import PetRescueBanner from '../components/home/PetRescueBanner';


const Home = () => {
  return (
    <>
      <HeroSection />
      <ImageCarousel />
      <PetServicesCarousel />
      <PetAdoptionExplorer />
      <PetRescueBanner />
    </>
  );
};

export default Home;