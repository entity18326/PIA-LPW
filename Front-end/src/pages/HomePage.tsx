import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import LatestReviews from '../components/home/LatestReviews';
import LatestNews from '../components/home/LatestNews';
import BrandShowcase from '../components/home/BrandShowcase';
import { phones, news, brands } from '../data/mockData';
import { Phone } from '../types';

const HomePage = () => {
  const [featuredPhone, setFeaturedPhone] = useState<Phone>(phones[0]);

  // Simulate loading data and selecting a featured phone
  useEffect(() => {
    // In a real app, this would be fetched from an API
    // For demo, just take the first phone as featured
    setFeaturedPhone(phones[0]);
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection featuredPhone={featuredPhone} />
      
      <LatestReviews phones={phones} />
      
      <LatestNews news={news} />
      
      <BrandShowcase brands={brands} />
    </div>
  );
};

export default HomePage;