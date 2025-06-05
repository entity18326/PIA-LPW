import { useState } from 'react';
import PhoneCard from '../components/ui/PhoneCard';
import SearchBar from '../components/ui/SearchBar';
import { usePhones } from '../data/mockData';
import { motion } from 'framer-motion';

const ReviewsPage = () => {
  const [filterBrand, setFilterBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const { phones, loading, error } = usePhones();


  const brandOptions = ['all', ...new Set(phones.map(phone => phone.marca))];

  const filteredPhones = phones
    .filter(phone => filterBrand === 'all' ? true : phone.marca === filterBrand)
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
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
          Reseñas de Teléfonos
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Análisis de expertos y reseñas detalladas de los últimos smartphones, con especificaciones y comparaciones detalladas.
        </p>
      </motion.div>
      
      <div className="mb-8 max-w-2xl mx-auto">
        <SearchBar placeholder="Buscar reseñas de teléfonos..." />
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
                {brand === 'all' ? 'Todas las marcas' : brand}
              </option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg py-2 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          >
            <option value="newest">Más nuevos primero</option>
            <option value="rating">Mejor calificados</option>
            <option value="price-high">Precio: mayor a menor</option>
            <option value="price-low">Precio: menor a mayor</option>
          </select>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Mostrando {filteredPhones.length} teléfonos
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPhones.map((phone) => (
          <PhoneCard key={phone.iD_Producto} phone={phone} />
        ))}
      </div>
      
      {filteredPhones.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Ningún teléfono coincide con tus criterios de filtro.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;