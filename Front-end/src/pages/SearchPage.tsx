import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import PhoneCard from '../components/ui/PhoneCard';
import NewsCard from '../components/ui/NewsCard';
import SearchBar from '../components/ui/SearchBar';
import { phones, news, brands } from '../data/mockData';
import { Phone, NewsArticle, Brand } from '../types';
import { motion } from 'framer-motion';

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryParam = params.get('q') || '';
  
  const [query, setQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState<{
    phones: Phone[];
    news: NewsArticle[];
    brands: Brand[];
  }>({
    phones: [],
    news: [],
    brands: []
  });
  
  // Update search results when query changes
  useEffect(() => {
    if (!query) {
      setSearchResults({
        phones: [],
        news: [],
        brands: []
      });
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    // Search phones
    const matchedPhones = phones.filter(phone => 
      phone.brand.toLowerCase().includes(lowerQuery) ||
      phone.name.toLowerCase().includes(lowerQuery) ||
      Object.values(phone.specs).some(spec => 
        spec.toLowerCase().includes(lowerQuery)
      )
    );
    
    // Search news
    const matchedNews = news.filter(article => 
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.content.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
    
    // Search brands
    const matchedBrands = brands.filter(brand => 
      brand.name.toLowerCase().includes(lowerQuery) ||
      brand.description.toLowerCase().includes(lowerQuery)
    );
    
    setSearchResults({
      phones: matchedPhones,
      news: matchedNews,
      brands: matchedBrands
    });
  }, [query]);
  
  // Update query when URL param changes
  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);
  
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    
    // Update URL with query param
    const searchParams = new URLSearchParams();
    if (newQuery) {
      searchParams.set('q', newQuery);
    }
    window.history.pushState(null, '', `${location.pathname}?${searchParams.toString()}`);
  };
  
  const totalResults = searchResults.phones.length + searchResults.news.length + searchResults.brands.length;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Resultados de búsqueda
        </h1>
        <div className="max-w-2xl mx-auto">
          <SearchBar 
            placeholder="Buscar teléfonos, noticias, marcas..." 
            className="w-full"
          />
        </div>
      </motion.div>
      
      {query ? (
        <>
          <div className="mb-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {totalResults} resultados para "<span className="font-semibold">{query}</span>"
            </p>
          </div>
          
          {totalResults > 0 ? (
            <div className="space-y-12">
              {/* Phone Results */}
              {searchResults.phones.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Teléfonos ({searchResults.phones.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {searchResults.phones.map((phone) => (
                      <PhoneCard key={phone.id} phone={phone} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* News Results */}
              {searchResults.news.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Noticias ({searchResults.news.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.news.map((article) => (
                      <NewsCard key={article.id} article={article} />
                    ))}
                  </div>
                </div>
              )}
              
              {/* Brand Results */}
              {searchResults.brands.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Marcas ({searchResults.brands.length})
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {searchResults.brands.map((brand) => (
                      <Link
                        key={brand.id}
                        to={`/brands/${brand.slug}`}
                        className="group flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors shadow-md"
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
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No se encontraron resultados para "{query}".
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Intenta con otras palabras clave o revisa si hay errores de ortografía.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-gray-600 dark:text-gray-400">
            Ingresa un término de búsqueda para encontrar teléfonos, noticias o marcas.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;