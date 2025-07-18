import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Productos } from '../../types';
import PhoneCard from '../ui/PhoneCard';
import { motion } from 'framer-motion';

interface LatestReviewsProps {
  phones: Productos[];
}

const LatestReviews = ({ phones }: LatestReviewsProps) => {
  // Ensure we have at least 5 phones for the grid layout
  const displayPhones = phones.slice(0, Math.min(5, phones.length));
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2"
            >
              Últimas Reseñas de Teléfonos
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 max-w-2xl"
            >
              Descubre reseñas detalladas de los smartphones más nuevos con especificaciones, análisis de rendimiento y comparaciones.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/reviews" 
              className="inline-flex items-center text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600 dark:hover:text-primary-300 transition-colors group mt-4 md:mt-0"
            >
              Ver todas las reseñas
              <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
          {displayPhones.map((phone, index) => (
            <React.Fragment key={phone.iD_Producto}>
              {index === 0 ? (
                <div className="sm:col-span-2 lg:col-span-2 lg:row-span-2">
                  <PhoneCard phone={phone} featured={true} />
                </div>
              ) : (
                <PhoneCard phone={phone} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestReviews;