import React from 'react';
import { PhoneSpecs } from '../../types';

interface SpecTableProps {
  specs: PhoneSpecs;
  className?: string;
}

const SpecTable = ({ specs, className = '' }: SpecTableProps) => {
  const specItems = [
    { label: 'Pantalla', value: specs.pantalla },
    { label: 'Procesador', value: specs.procesador },
    { label: 'RAM', value: specs.ram },
    { label: 'Almacenamiento', value: specs.almacenamiento },
    { label: 'Cámara', value: specs.camara },
    { label: 'Batería', value: specs.bateria },
    { label: 'Sistema Operativo', value: specs.sistemaOperativo },
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Especificaciones</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {specItems.map((item, index) => (
          <div 
            key={index} 
            className="px-6 py-4 flex flex-col sm:flex-row sm:justify-between"
          >
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 sm:mb-0">
              {item.label}
            </span>
            <span className="text-sm text-gray-900 dark:text-white sm:text-right sm:max-w-[60%]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecTable;