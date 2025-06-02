import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import LatestReviews from '../components/home/LatestReviews';
import LatestNews from '../components/home/LatestNews';
import BrandShowcase from '../components/home/BrandShowcase';
import { usePhones, news, brands } from '../data/mockData';
import { Phone } from '../types';

const HomePage = () => {
  const { phones, loading, error } = usePhones();
  const [featuredPhone, setFeaturedPhone] = useState<Phone | null>(phones && phones.length > 0 ? phones[0] : null);

  useEffect(() => {
    // Aquí se podría hacer una llamada a la API para obtener el teléfono destacado
    if (phones && phones.length > 0) {
      setFeaturedPhone(phones[0]);
    }
  }, [phones]);

  return (
    <div className="min-h-screen">
      {featuredPhone && <HeroSection featuredPhone={featuredPhone} />}
      
      <LatestReviews phones={phones} />
      
      <LatestNews news={news} />
      
      <BrandShowcase brands={brands} />
    </div>
  );
};

export default HomePage;