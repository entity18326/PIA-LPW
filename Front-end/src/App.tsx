import { useEffect, createContext, useContext, useState, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import axiosInstance from './axios/Axios';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ReviewsPage from './pages/ReviewsPage';
import ReviewDetail from './pages/ReviewDetail';
import NewsPage from './pages/NewsPage';
import NewsDetail from './pages/NewsDetail';
import ComparePage from './pages/ComparePage';
import SearchPage from './pages/SearchPage';
import BrandPage from './pages/BrandPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

// Tipos para la autenticación
interface User {
  iD_Usuario: string;
  nombre: string;
  email: string;
  role: string;
  roleId: number;
}

interface AuthContextType {
  usuario: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  isAdmin: boolean;
  login: (token: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: number; // Para rutas que requieren roles específicos
}

interface PublicRouteProps {
  children: ReactNode;
}

// Contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

// Proveedor de autenticación
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      console.log('userData encontrado:', userData);
      if (token && userData) {
        try {
          console.log('Intentando parsear userData...');
          const parsedUserData = JSON.parse(userData);
          // Configurar el token en axios
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;


          console.log('Datos configurados:', parsedUserData);
          // Si tienes los datos del usuario, establecer el estado
          if (parsedUserData.iD_Usuario && parsedUserData.nombre) {
            setUser({
              iD_Usuario: parsedUserData.iD_Usuario,
              nombre: parsedUserData.nombre,
              email: parsedUserData.email || parsedUserData.nombre,
              role: parsedUserData.role || 'Usuario',
              roleId: parsedUserData.roleId || 0
            });
            setIsAuthenticated(true);
            console.log('Usuario autenticado desde localStorage:', parsedUserData.nombre);
          }
        } catch (error) {
          console.error('Error al parsear userData:', error);
          console.log('Contenido inválido de userData:', userData);
          // Limpiar datos corruptos
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
        }
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (token: string, userData: User): Promise<void> => {
    try {
      // Configurar token en axios
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Guardar en sessionStorage
      localStorage.setItem('authToken', token); // Opcional: también guardar en localStorage

      // Guardar datos del usuario en sessionStorage
      localStorage.setItem('userData', JSON.stringify(userData)); // Opcional: también guardar en localStorage
      
      // Establecer estado
      setUser(userData);
      setIsAuthenticated(true);
      
      console.log('Usuario autenticado exitosamente:', userData.nombre);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Opcional: llamar al endpoint de logout si tu API lo tiene
      // await axiosInstance.post('/Auth/logout');
      
      // Limpiar token de axios
      var token = localStorage.getItem('authToken');
      if (token) {
        console.log('Token encontrado, cerrando sesión...', token);
      }
      axiosInstance.defaults.headers.common['Authorization'] = '';

      
      // Limpiar storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      
      // Limpiar estado
      setUser(null);
      setIsAuthenticated(false);
      
      console.log('Sesión cerrada exitosamente');
    } catch (error) {
      console.error('Error en logout:', error);
      // Aún así limpiar el estado local
      delete axiosInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const isAdmin = user?.roleId === 1;

  const value: AuthContextType = {
    usuario: user,
    isAuthenticated,
    loading,
    isAdmin,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Componente para proteger rutas que requieren autenticación
function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { usuario, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  console.log('Estado de autenticación:', isAuthenticated);
  console.log('Estado de usuario:', usuario);
  console.log('Estado de carga:', loading);
  
  // Verificar si el usuario está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar rol si es requerido
  if (requiredRole && usuario?.roleId !== requiredRole) {
    // Redirigir a dashboard apropiado según el rol del usuario
    const redirectPath = usuario?.roleId === 1 ? '/dashboard' : '/#';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

// Componente para proteger la ruta de login (redirigir si ya está autenticado)
function PublicRoute({ children }: PublicRouteProps) {
  const { usuario, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated && usuario) {
    // Redirigir según el rol del usuario
    const redirectPath = usuario.roleId === 1 ? '/dashboard' : '/#';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/reviews" element={<ReviewsPage />} />
                <Route path="/reviews/:id" element={<ReviewDetail />} />
                <Route path="/noticias" element={<NewsPage />} />
                <Route path="/noticias/:id" element={<NewsDetail />} />
                <Route path="/comparar" element={<ComparePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/marcas/:brand" element={<BrandPage />} />
                
                {/* Ruta pública - solo accesible si NO está autenticado */}
                <Route 
                  path="/login" 
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  } 
                />
                
                {/* Dashboard genérico para otros roles */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute requiredRole={1}>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;