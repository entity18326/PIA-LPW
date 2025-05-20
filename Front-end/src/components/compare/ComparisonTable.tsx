import React from 'react';
import { Phone, ComparisonResult } from '../../types';
import { Check, X, Minus } from 'lucide-react';
import { motion } from 'framer-motion';

interface ComparisonTableProps {
  phone1: Phone;
  phone2: Phone;
  results: ComparisonResult[];
}

const ComparisonTable = ({ phone1, phone2, results }: ComparisonTableProps) => {
  // Funcion para renderizar el indicador de ganador
  const renderWinnerIndicator = (winner: 'phone1' | 'phone2' | 'tie') => {
    if (winner === 'tie') {
      return <Minus size={18} className="text-gray-500" />;
    }
    
    return <Check size={18} className="text-success-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
    >
      <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
        {/* Header */}
        <div className="bg-gray-50 dark:bg-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
            Especifiaciones
          </h3>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
            {phone1.brand} {phone1.name}
          </h3>
        </div>
        <div className="bg-gray-50 dark:bg-gray-700 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
            {phone2.brand} {phone2.name}
          </h3>
        </div>
      </div>

      {/* Imagenes */}
      <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
        <div className="p-6 flex items-center justify-center bg-gray-100 dark:bg-gray-750">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Dispositivo</h4>
        </div>
        <div className="p-6 flex items-center justify-center">
          <img 
            src={phone1.image} 
            alt={`${phone1.brand} ${phone1.name}`}
            className="h-48 object-contain"
          />
        </div>
        <div className="p-6 flex items-center justify-center">
          <img 
            src={phone2.image} 
            alt={`${phone2.brand} ${phone2.name}`}
            className="h-48 object-contain"
          />
        </div>
      </div>

      {/* Precio */}
      <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
        <div className="p-6 flex items-center bg-gray-100 dark:bg-gray-750">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">Precio</h4>
        </div>
        <div className="p-6 flex items-center justify-center font-medium text-gray-900 dark:text-white">
          ${phone1.price.toLocaleString()}
        </div>
        <div className="p-6 flex items-center justify-center font-medium text-gray-900 dark:text-white">
          ${phone2.price.toLocaleString()}
        </div>
      </div>

      {/* Especificaciones */}
      {Object.entries(phone1.specs).map(([key, value], index) => (
        <div 
          key={key}
          className={`grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700 ${
            index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-750'
          }`}
        >
          <div className="p-6 flex items-center">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 capitalize">
              {key}
            </h4>
          </div>
          <div className="p-6 flex items-center justify-center text-gray-900 dark:text-white">
            {value}
          </div>
          <div className="p-6 flex items-center justify-center text-gray-900 dark:text-white">
            {phone2.specs[key as keyof typeof phone2.specs]}
          </div>
        </div>
      ))}

      {/* Resultados */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
          Resultados
        </h3>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-600">
          {results.map((result, index) => (
            <div 
              key={index}
              className="grid grid-cols-3 py-4"
            >
              <div className="pl-6 flex items-center">
                <h4 className="font-medium text-gray-700 dark:text-gray-300">
                  {result.category}
                </h4>
              </div>
              <div className="flex items-center justify-center">
                {result.winner === 'phone1' ? renderWinnerIndicator('phone1') : <X size={18} className="text-gray-400" />}
              </div>
              <div className="flex items-center justify-center">
                {result.winner === 'phone2' ? renderWinnerIndicator('phone2') : <X size={18} className="text-gray-400" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonTable;