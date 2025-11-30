import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CitiesSection from '@/components/CitiesSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <CitiesSection />
      <Footer />
    </div>
  );
}