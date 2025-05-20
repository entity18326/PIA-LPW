import React, { useState } from 'react';
import CompareForm from '../components/compare/CompareForm';
import ComparisonTable from '../components/compare/ComparisonTable';
import { useLocation } from 'react-router-dom';
import { phones, mockComparisonResults } from '../data/mockData';
import { Phone, ComparisonResult } from '../types';
import { motion } from 'framer-motion';

const ComparePage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialPhone1Id = params.get('phone1') || '';
  const initialPhone2Id = params.get('phone2') || '';
  
  const [phone1, setPhone1] = useState<Phone | null>(
    phones.find(p => p.id === initialPhone1Id) || null
  );
  const [phone2, setPhone2] = useState<Phone | null>(
    phones.find(p => p.id === initialPhone2Id) || null
  );
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [hasCompared, setHasCompared] = useState(false);
  
  const handleCompare = (phone1Id: string, phone2Id: string) => {
    const selectedPhone1 = phones.find(p => p.id === phone1Id) || null;
    const selectedPhone2 = phones.find(p => p.id === phone2Id) || null;
    
    setPhone1(selectedPhone1);
    setPhone2(selectedPhone2);
    
    // Aquí se haría una llamada a la API para obtener los resultados
    setResults(mockComparisonResults);
    setHasCompared(true);
    
    // Update URL with query params
    const searchParams = new URLSearchParams();
    searchParams.set('phone1', phone1Id);
    searchParams.set('phone2', phone2Id);
    window.history.pushState(null, '', `${location.pathname}?${searchParams.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Comparar Teléfonos
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Selecciona dos teléfonos para ver una comparación detallada de especificaciones, características y rendimiento.
        </p>
      </motion.div>
      
      <div className="mb-12">
        <CompareForm phones={phones} onCompare={handleCompare} />
      </div>
      
      {hasCompared && phone1 && phone2 && (
        <div>
          <ComparisonTable phone1={phone1} phone2={phone2} results={results} />
        </div>
      )}
    </div>
  );
};

export default ComparePage;