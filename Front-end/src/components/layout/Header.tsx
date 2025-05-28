import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Search, LogIn, User, LogOut, Settings } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../App'; // Ajusta la ruta según tu estructura
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Reviews', path: '/reviews' },
    { name: 'Noticias', path: '/noticias' },
    { name: 'Comparar', path: '/comparar' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
    setIsUserMenuOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    
    switch (user.roleId) {
      case 1:
        return '/dashboard';
      case 2:
        return '/publisher/dashboard';
      default:
        return '/dashboard';
    }
  };

  const getDashboardText = () => {
    if (!user) return 'Dashboard';
    
    switch (user.roleId) {
      case 1:
        return 'Panel Admin';
      case 2:
        return 'Panel Publicador';
      default:
        return 'Dashboard';
    }
  };

  const getRoleBadge = () => {
    if (!user) return null;
    
    const roleColors = {
      1: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', // Admin
      2: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', // Publicador
    };

    const roleNames = {
      1: 'Admin',
      2: 'Publicador',
    };

    const colorClass = roleColors[user.roleId as keyof typeof roleColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    const roleName = roleNames[user.roleId as keyof typeof roleNames] || 'Usuario';

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
        {roleName}
      </span>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm'
          : 'bg-gray-900 dark:bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <img src="src/assets/logo_odinmobile.png" alt="Logo" className="w-40 rounded-full" />
            </motion.div>
          </Link>

          {/* Navbar para escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="group relative"
              >
                <span className={`text-sm font-medium transition-colors ${
                  location.pathname.startsWith(link.path)
                    ? 'text-primary-500 dark:text-primary-400'
                    : 'text-gray-50 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400'
                }`}>
                  {link.name}
                </span>
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary-500 dark:bg-primary-400 transition-all duration-300 ${
                  location.pathname.startsWith(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Controles del header */}
          <div className="flex items-center space-x-4">
            {/* Botón de búsqueda */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="/search"
                className="p-2 rounded-full transition-colors hover:bg-gray-800"
                aria-label="Search"
              >
                <Search className="h-5 w-5 text-gray-50" />
              </Link>
            </motion.div>

            {/* Botón de tema */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-50" />
              ) : (
                <Sun className="h-5 w-5 text-gray-300" />
              )}
            </motion.button>

            {/* Área de autenticación */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-4">
                {/* Información del usuario */}
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-50">
                      {user?.name}
                    </div>
                    <div className="flex justify-end mt-1">
                      {getRoleBadge()}
                    </div>
                  </div>
                  
                  {/* Menú desplegable del usuario */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                      aria-label="User menu"
                    >
                      <User className="h-5 w-5 text-gray-50" />
                    </motion.button>

                    {/* Dropdown del usuario */}
                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2"
                        >
                          <Link
                            to={getDashboardLink()}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <Settings className="h-4 w-4 mr-3" />
                            {getDashboardText()}
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                          >
                            <LogOut className="h-4 w-4 mr-3" />
                            Cerrar Sesión
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/login"
                  className="hidden md:flex items-center space-x-2 bg-primary-500 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </Link>
              </motion.div>
            )}

            {/* Botón de menú para móvil */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5 text-gray-50" />
              ) : (
                <Menu className="h-5 w-5 text-gray-50" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Navbar para móvil */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4"
            >
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-sm font-medium p-3 rounded-md transition-colors ${
                      location.pathname.startsWith(link.path)
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-50 hover:bg-gray-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                
                {/* Opciones de autenticación en móvil */}
                <div className="border-t border-gray-700 pt-4 mt-4">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <div className="px-3 py-2">
                        <div className="text-sm font-medium text-gray-50 mb-2">
                          {user?.name}
                        </div>
                        {getRoleBadge()}
                      </div>
                      <Link
                        to={getDashboardLink()}
                        className="flex items-center text-sm font-medium p-3 rounded-md text-gray-50 hover:bg-gray-800 transition-colors"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        {getDashboardText()}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center text-sm font-medium p-3 rounded-md text-red-400 hover:bg-gray-800 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Cerrar Sesión
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center text-sm font-medium p-3 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
                    >
                      <LogIn className="h-4 w-4 mr-3" />
                      Iniciar Sesión
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;