import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Phone } from '../../types';
import { motion } from 'framer-motion';

interface PhoneCardProps {
  phone: Phone;
  featured?: boolean;
}

const PhoneCard = ({ phone, featured = false }: PhoneCardProps) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < Math.floor(rating)
            ? 'text-accent-500 fill-accent-500'
            : index < rating
            ? 'text-accent-500 fill-accent-500 opacity-50'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
        featured ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      <Link to={`/reviews/${phone.slug}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={phone.image}
            alt={`${phone.brand} ${phone.name}`}
            className={`w-full object-cover transition-transform duration-500 hover:scale-105 ${
              featured ? 'h-64 md:h-80' : 'h-48'
            }`}
          />
          {featured && (
            <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              Featured
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center">
              <span className="text-white font-bold mr-2">{phone.rating.toFixed(1)}</span>
              <div className="flex">{renderStars(phone.rating)}</div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="text-xs text-primary-500 dark:text-primary-400 uppercase font-semibold tracking-wider mb-1">
            {phone.brand}
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
            {phone.name}
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              ${phone.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Released: {new Date(phone.releaseDate).toLocaleDateString()}
            </span>
          </div>
          {featured && (
            <div className="mt-4">
              <ul className="space-y-1">
                {phone.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    <span className="inline-block w-1.5 h-1.5 bg-primary-500 rounded-full mr-2"></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default PhoneCard;