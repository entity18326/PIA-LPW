import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { NewsArticle } from '../../types';
import { motion } from 'framer-motion';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

const NewsCard = ({ article, featured = false }: NewsCardProps) => {
  // Format the date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <Link to={`/news/${article.slug}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className={`w-full object-cover transition-transform duration-500 hover:scale-105 ${
              featured ? 'h-64' : 'h-48'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
            <div className="px-2 py-1 bg-accent-500 text-white text-xs font-semibold rounded-full w-fit mb-3">
              {article.category}
            </div>
            <h3 className={`text-white font-bold mb-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
              {article.title}
            </h3>
            <div className="flex items-center text-xs text-white/90">
              <Clock size={14} className="mr-1" />
              <span>{formatDate(article.date)}</span>
              <span className="mx-2">•</span>
              <span>{article.author}</span>
            </div>
          </div>
        </div>
        
        {!featured && (
          <div className="p-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
              {article.excerpt}
            </p>
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default NewsCard;