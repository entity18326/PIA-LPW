import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone } from '../../types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchBar from '../ui/SearchBar';

interface HeroSectionProps {
  featuredPhone: Phone;
}

const HeroSection = ({ featuredPhone }: HeroSectionProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/reviews/${featuredPhone.slug}`);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-900 dark:to-primary-900">
      <div className="container mx-auto mb-40 px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Reseña destacada
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {featuredPhone.brand} {featuredPhone.name}
            </h1>
            <p className="text-primary-100 dark:text-gray-300 text-lg mb-6 max-w-lg">
              Descubre las últimas novedades de {featuredPhone.brand} así como sus lanzamientos y tecnologías. 
              Mira porque este dispositivo está revolucionando la industria.
            </p>
            
            <div className="mb-8 max-w-md">
              <SearchBar 
                placeholder="Buscar telefonos, noticias o marcas..."
                className="w-full"
              />
            </div>
            
            <button
              onClick={handleViewDetails}
              className="inline-flex items-center px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors group"
            >
              Leer reseña completa
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative z-10">
              <img
                src={featuredPhone.image}
                alt={`${featuredPhone.brand} ${featuredPhone.name}`}
                className="max-h-[500px] object-contain drop-shadow-2xl"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400/20 dark:bg-primary-500/10 blur-2xl z-0"></div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full bg-accent-500/20 blur-xl z-0 animate-pulse-slow"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,176C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            className="dark:fill-gray-900"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;