import React, { useState } from 'react';
import PhoneCard from '../components/ui/PhoneCard';
import SearchBar from '../components/ui/SearchBar';
import { Phone } from '../types';
import { phones } from '../data/mockData';
import { motion } from 'framer-motion';

const ReviewsPage = () => {
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  
  // Get unique brands for filter
  const brandOptions = ['all', ...new Set(phones.map(phone => phone.brand))];
  
  // Filter and sort phones
  const filteredPhones = phones
    .filter(phone => filterBrand === 'all' ? true : phone.brand === filterBrand)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'price-high') {
        return b.price - a.price;
      } else if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      return 0;
    });

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Phone Reviews
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Expert analysis and in-depth reviews of the latest smartphones, with detailed specifications and comparisons.
        </p>
      </motion.div>
      
      <div className="mb-8 max-w-2xl mx-auto">
        <SearchBar placeholder="Search for phone reviews..." />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          >
            {brandOptions.map((brand) => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'All Brands' : brand}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          >
            <option value="newest">Newest First</option>
            <option value="rating">Highest Rated</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
          </select>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredPhones.length} phones
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhones.map((phone) => (
          <PhoneCard key={phone.id} phone={phone} />
        ))}
      </div>
      
      {filteredPhones.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No phones match your filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;