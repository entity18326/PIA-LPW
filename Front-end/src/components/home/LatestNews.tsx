import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Noticias } from '../../types';
import NewsCard from '../ui/NewsCard';
import { motion } from 'framer-motion';

interface LatestNewsProps {
  news: Noticias[];
}

const LatestNews = ({ news }: LatestNewsProps) => {
  // Take the first 5 news articles for display
  const displayNews = news.slice(0, Math.min(5, news.length));
  
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
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
              Últimas Noticias
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 max-w-2xl"
            >
              Mantente al día con los últimos anuncios de smartphones, tendencias de la industria e innovaciones tecnológicas.
            </motion.p>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/news" 
              className="inline-flex items-center text-primary-500 dark:text-primary-400 font-medium hover:text-primary-600 dark:hover:text-primary-300 transition-colors group mt-4 md:mt-0"
            >
              Ver todas las noticias 
              <ArrowRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayNews.map((article, index) => (
            <React.Fragment key={article.iD_Noticia}>
              {index === 0 ? (
                <div className="lg:col-span-2">
                  <NewsCard article={article} featured={true} />
                </div>
              ) : (
                <NewsCard article={article} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;