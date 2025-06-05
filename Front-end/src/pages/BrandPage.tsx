import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PhoneCard from '../components/ui/PhoneCard';
import { useBrands, usePhones } from '../data/mockData';
import { Marcas, Productos } from '../types';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const BrandPage = () => {
  const { brand } = useParams<{ brand: string }>();
  const [brandData, setBrandData] = useState<Marcas | null>(null);
  const [brandPhones, setBrandPhones] = useState<Productos[]>([]);
  const { phones, loading, error } = usePhones();
  const { brands, loading: brandsLoading, error: brandsError } = useBrands();
  
  useEffect(() => {
    // Aqui se obtiene los datos de la API
    const foundBrand = brands.find(b => b.slug === brand);
    setBrandData(foundBrand || null);
    
    if (foundBrand) {
      // Obtener los teléfonos de la marca
      const brandPhones = phones.filter(p => p.marca.toLowerCase() === foundBrand.nombreMarca.toLowerCase());
      setBrandPhones(brandPhones);
    }
  }, [brand]);
  
  if (!brandData) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">Marca no encontrada</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Headers */}
      <div className="bg-white dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <Link
              to="/reviews"
              className="inline-flex items-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver a todas las marcas
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-2xl p-6"
            >
              <img
                src={brandData.logo}
                alt={brandData.nombreMarca}
                className="max-w-full max-h-full"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {brandData.nombreMarca}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                {brandData.descripcion || 'No hay descripción disponible para esta marca.'}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Marcas de telefonos */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8"
          >
            Teléfonos {brandData.nombreMarca}
          </motion.h2>
          
          {brandPhones.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {brandPhones.map((phone) => (
                <PhoneCard key={phone.iD_Producto} phone={phone} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <p className="text-gray-600 dark:text-gray-400">
                No hay teléfonos disponibles para esta marca por el momento.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandPage;