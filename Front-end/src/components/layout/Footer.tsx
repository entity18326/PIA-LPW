import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, PhoneCall, MapPin, Smartphone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-900 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="src\assets\logo_odinmobile.png" alt="Logo" className="w-40 rounded-full" />
            </div>
            <p className="text-gray-100 dark:text-gray-400 mb-4">
              Tu fuente confiable para las últimas noticias, reseñas y comparaciones de teléfonos móviles. Mantente al día con las nuevas tecnologías y lanzamientos.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-100 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-100 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-100 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-100 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <Youtube size={20} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-100 dark:text-white">Accesos rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/reviews" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Phone Reviews
                </Link>
              </li>
              <li>
                <Link to="/noticias" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Tech News
                </Link>
              </li>
              <li>
                <Link to="/comparar" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Compare Phones
                </Link>
              </li>
              <li>
                <Link to="/marcas/apple" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Browse by Brand
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Brands */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-100 dark:text-white">Marcas Populares</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/marcas/apple" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Apple
                </Link>
              </li>
              <li>
                <Link to="/marcas/samsung" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Samsung
                </Link>
              </li>
              <li>
                <Link to="/marcas/google" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Google
                </Link>
              </li>
              <li>
                <Link to="/marcas/xiaomi" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  Xiaomi
                </Link>
              </li>
              <li>
                <Link to="/marcas/oneplus" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">
                  OnePlus
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-100 dark:text-white">Contáctanos</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-primary-500 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-100 dark:text-gray-400">
                  Santa Inés 505, California Residencial, General Escobedo, Nuevo León, México
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall size={18} className="mr-2 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                <span className="text-gray-100 dark:text-gray-400">
                  +52 (861) 798-4711
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                <span className="text-gray-100 dark:text-gray-400">
                  miguelalazacazares@hotmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-100 dark:text-gray-400 mb-4 md:mb-0">
              © {currentYear} OdinMobile. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm">
                Politicas de privacidad
              </Link>
              <Link to="/terms" className="text-gray-100 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors text-sm">
                Terminos y condiciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;