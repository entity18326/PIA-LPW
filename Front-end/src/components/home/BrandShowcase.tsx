import React from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '../../types';
import { motion } from 'framer-motion';

interface BrandShowcaseProps {
  brands: Brand[];
}

const BrandShowcase = ({ brands }: BrandShowcaseProps) => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Browse by Brand
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore phones by your favorite manufacturers and discover what makes each brand unique.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                to={`/brands/${brand.slug}`}
                className="group flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full transition-transform group-hover:scale-110"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
                  {brand.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;