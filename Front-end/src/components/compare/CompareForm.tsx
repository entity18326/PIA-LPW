import React, { useState } from 'react';
import { Phone } from '../../types';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CompareFormProps {
  phones: Phone[];
  onCompare: (phone1Id: string, phone2Id: string) => void;
}

const CompareForm = ({ phones, onCompare }: CompareFormProps) => {
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [error, setError] = useState('');

  const handleCompare = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone1 || !phone2) {
      setError('Please select two phones to compare');
      return;
    }
    
    if (phone1 === phone2) {
      setError('Please select two different phones');
      return;
    }
    
    setError('');
    onCompare(phone1, phone2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8"
    >
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Compare Phones Side by Side
      </h2>
      
      <form onSubmit={handleCompare}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label 
              htmlFor="phone1" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              First Phone
            </label>
            <select
              id="phone1"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            >
              <option value="">Select a phone</option>
              {phones.map((phone) => (
                <option key={phone.id} value={phone.id}>
                  {phone.brand} {phone.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label 
              htmlFor="phone2" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Second Phone
            </label>
            <select
              id="phone2"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 px-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            >
              <option value="">Select a phone</option>
              {phones.map((phone) => (
                <option key={phone.id} value={phone.id}>
                  {phone.brand} {phone.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {error && (
          <p className="mt-4 text-error-500 text-sm">{error}</p>
        )}
        
        <button
          type="submit"
          className="mt-6 w-full md:w-auto inline-flex items-center justify-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors group"
        >
          Compare Now
          <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>
    </motion.div>
  );
};

export default CompareForm;