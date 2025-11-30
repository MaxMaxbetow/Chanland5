import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import CitiesSection from '@/components/CitiesSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="relative bg-black/10">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Cities Section */}
      <CitiesSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
