import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Share2, Star, ChevronRight } from 'lucide-react';
import { Phone } from '../types';
import { phones } from '../data/mockData';
import SpecTable from '../components/ui/SpecTable';
import { motion } from 'framer-motion';

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [phone, setPhone] = useState<Phone | null>(null);
  const [relatedPhones, setRelatedPhones] = useState<Phone[]>([]);
  
  useEffect(() => {
    // In a real app, this would be a fetch from an API
    // For demo, find the phone with matching slug
    const foundPhone = phones.find(p => p.slug === id);
    setPhone(foundPhone || null);
    
    if (foundPhone) {
      // Get related phones of same brand (excluding current phone)
      const related = phones
        .filter(p => p.brand === foundPhone.brand && p.id !== foundPhone.id)
        .slice(0, 3);
      setRelatedPhones(related);
    }
  }, [id]);
  
  if (!phone) {
    return (
      <div className="container mx-auto px-4 sm:px-6 py-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">Loading review...</p>
      </div>
    );
  }
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        size={20}
        className={`${
          index < Math.floor(rating)
            ? 'text-accent-500 fill-accent-500'
            : index < rating
            ? 'text-accent-500 fill-accent-500 opacity-50'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-gray-800 pb-8">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="py-6">
            <Link
              to="/reviews"
              className="inline-flex items-center text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Reviews
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <img
                src={phone.image}
                alt={`${phone.brand} ${phone.name}`}
                className="max-h-[500px] object-contain drop-shadow-xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {phone.brand}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {phone.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-gray-900 dark:text-white mr-2">
                  {phone.rating.toFixed(1)}
                </span>
                <div className="flex mr-4">{renderStars(phone.rating)}</div>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Expert Review
                </span>
              </div>
              
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                ${phone.price.toLocaleString()}
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {phone.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <ChevronRight size={18} className="text-primary-500 dark:text-primary-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {highlight}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex space-x-4">
                <button className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors">
                  Check Prices
                </button>
                <button className="p-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Share2 size={20} className="text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The {phone.brand} {phone.name} is a flagship smartphone that showcases the brand's latest innovations and cutting-edge technology. Released on {new Date(phone.releaseDate).toLocaleDateString()}, this device has quickly become a benchmark for premium smartphones.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Powered by the {phone.specs.processor} processor and equipped with {phone.specs.ram} of RAM, the {phone.name} delivers exceptional performance for even the most demanding applications and games. The {phone.specs.display} display offers stunning visuals with vivid colors and smooth motion, perfect for multimedia consumption and gaming.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                In the camera department, the {phone.name} features {phone.specs.camera}, allowing users to capture professional-quality photos and videos in various lighting conditions. The device runs on {phone.specs.os}, offering a clean, intuitive user interface with the latest features and security updates.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                With a {phone.specs.battery} battery, the {phone.name} provides all-day battery life for most users, even with heavy usage. The device also supports fast charging, wireless charging, and reverse wireless charging, offering versatile power options for users on the go.
              </p>
            </motion.div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Performance & User Experience
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The {phone.name} delivers excellent performance in day-to-day tasks, with apps launching quickly and multitasking handled smoothly. Gaming performance is particularly impressive, with even demanding titles running at high frame rates with consistent stability.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The user interface is polished and responsive, with thoughtful features that enhance the overall experience. Animations are smooth, and the system rarely shows any lag or stuttering, even under heavy loads.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Battery life is reliable, typically lasting a full day with moderate to heavy usage. The fast charging capability is a welcome addition, allowing the device to charge from 0 to 50% in about 30 minutes, which is convenient for quick top-ups during the day.
              </p>
            </div>
          </div>
          
          <div className="space-y-8">
            <SpecTable specs={phone.specs} />
            
            {relatedPhones.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Related Phones
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {relatedPhones.map((related) => (
                      <Link
                        key={related.id}
                        to={`/reviews/${related.slug}`}
                        className="flex items-center hover:bg-gray-50 dark:hover:bg-gray-750 p-2 rounded-lg transition-colors"
                      >
                        <img
                          src={related.image}
                          alt={`${related.brand} ${related.name}`}
                          className="w-16 h-16 object-cover rounded-md mr-4"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            {related.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ${related.price.toLocaleString()}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;