import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import { Noticias } from '../types';
import { useNews } from '../data/mockData';
import { motion } from 'framer-motion';

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Noticias | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Noticias[]>([]);
  const { news, loading: newsLoading, error: newsError } = useNews();
  
  useEffect(() => {
    // Aqui se obtiene los datos de la API
    const foundArticle = news.find(a => a.slug === id);
    setArticle(foundArticle || null);
    
    if (foundArticle) {
      const related = news
        .filter(a => a.iD_Noticia !== foundArticle.iD_Noticia && 
          (a.categoria === foundArticle.categoria || a.etiquetas.some(etiqueta => foundArticle.etiquetas.includes(etiqueta))))
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [id]);
  
  if (!article) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">Cargando artículo...</p>
      </div>
    );
  }
  
  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative h-[400px] sm:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={article.imagen}
            alt={article.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative h-full flex flex-col justify-end pb-12">
          <div className="py-6">
            <Link
              to="/news"
              className="inline-flex items-center text-white hover:text-gray-200 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver a Noticias
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="mb-4">
              <span className="inline-block bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {article.categoria}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {article.titulo}
            </h1>
            
            <div className="flex flex-wrap items-center text-white/80 text-sm gap-4 md:gap-6">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{article.iD_Usuario}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{formatDate(article.fecha)}</span>
              </div>
              <div className="flex items-center flex-wrap gap-2">
                <Tag size={16} className="mr-1" />
                {article.etiquetas.map((tag, index) => (
                  <span key={index} className="bg-white/20 px-2 py-0.5 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {article.texto.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-gray-700 dark:text-gray-300">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      alt={article.iD_Usuario.toString()}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {article.iD_Usuario}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Redactor de tecnología
                      </p>
                    </div>
                  </div>
                  
                  <button className="p-2 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    <Share2 size={18} className="text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div>
            {relatedArticles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Artículos Relacionados
                  </h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      key={relatedArticle.iD_Noticia}
                      to={`/news/${relatedArticle.slug}`}
                      className="block p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                    >
                      <div className="flex items-start">
                        <img
                          src={relatedArticle.imagen}
                          alt={relatedArticle.titulo}
                          className="w-20 h-20 object-cover rounded-md mr-4 flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-2">
                            {relatedArticle.titulo}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(relatedArticle.fecha)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;