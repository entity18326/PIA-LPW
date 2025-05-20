import React, { useState } from 'react';
import NewsCard from '../components/ui/NewsCard';
import SearchBar from '../components/ui/SearchBar';
import { news } from '../data/mockData';
import { motion } from 'framer-motion';

const NewsPage = () => {
  const [category, setCategory] = useState('all');
  
  const categories = ['all', ...new Set(news.map(article => article.category))];
  
  const filteredNews = news.filter(article => 
    category === 'all' ? true : article.category === category
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Noticias de Tecnología Móvil
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Mantente al día con las últimas noticias, anuncios y tendencias de la industria de smartphones.
        </p>
      </motion.div>
      
      <div className="mb-8 max-w-2xl mx-auto">
        <SearchBar placeholder="Buscar artículos de noticias..." />
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {cat === 'all' ? 'Todas las categorías' : cat}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((article, index) => (
          <React.Fragment key={article.id}>
            {index === 0 ? (
              <div className="md:col-span-2">
                <NewsCard article={article} featured={true} />
              </div>
            ) : (
              <NewsCard article={article} />
            )}
          </React.Fragment>
        ))}
      </div>
      
      {filteredNews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No se encontraron artículos de noticias para esta categoría.</p>
        </div>
      )}
    </div>
  );
};

export default NewsPage;