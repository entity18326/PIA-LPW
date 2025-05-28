import React, { useState, useEffect } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Eye, Smartphone, FileText, Users, TrendingUp, Search, Filter, Plus, Edit, Trash2, RefreshCw, LucideIcon, AlertCircle, LogOut, User, Menu, X } from 'lucide-react';
import axiosInstance from '../axios/Axios';
import LoginPage from './LoginPage';
import { useNavigate } from 'react-router-dom';
import ProductoFormModal from '../components/ui/ProductoFormModal';
import NoticiaFormModal from '../components/ui/NoticiaFormModal';

// Interfaces de Autenticación
interface Usuario {
  iD_Usuario: number;
  nombre: string;
  iD_Rol: number;
  roleName: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  logout: () => void;
}

interface LoginCredentials {
  username: string;
  password: string;
}

// Interfaces de Datos
interface DailyVisit {
  date: string;
  visits: number;
}

interface SourceDistribution {
  name: string;
  value: number;
  color: string;
}

interface VisitStats {
  totalVisits: number;
  dailyVisits: DailyVisit[];
  sourceDistribution: SourceDistribution[];
}

interface Productos {
  iD_Producto: number;
  nombre: string;
  fecha: string;
  camara: string;
  pantalla: string;
  bateria: string;
  caracteristicas: string;
  imagen: string;
}

interface ProductoFormData {
  nombre: string;
  fecha: string;
  camara: string;
  pantalla: string;
  bateria: string;
  caracteristicas: string;
  imagen: string;
}

interface Noticias {
  iD_Noticia: number;
  iD_Usuario: number;
  iD_Producto?: number | null;
  titulo: string;
  imagen: string;
  fecha: string;
  texto: string;
  resumen: string;
}

interface NoticiaFormData {
  iD_Usuario: number;
  iD_Producto?: number | null;
  titulo: string; // AGREGADO: faltaba el título
  imagen: string;
  fecha: string;
  texto: string;
  resumen: string;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

interface ApiResponse<T> {
  data: T;
}

type TabType = 'overview' | 'news' | 'products';

const useAuth = (): AuthContextType => {
    const navigate = useNavigate();
    const [user, setUser] = useState<Usuario | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async (): Promise<void> => {
        const token = sessionStorage.getItem('authToken');

        if (!token) {
          logout(); // Sin token, cerrar sesión
          return;
        }

        const response = await authApi.revalidateUser(token);

        if (response.success && response.usuario) {
            setUser(response.usuario);
            setIsAuthenticated(true);
            sessionStorage.setItem('userData', JSON.stringify(response.usuario));
        } else {
            logout(); // Token inválido
        }
    };

    const logout = (): void => {
        setUser(null);
        setIsAuthenticated(false);
        sessionStorage.removeItem('userData');
        sessionStorage.removeItem('authToken');
        navigate('/login'); // Redirigir al login
    };

    return {
        usuario: user,
        isAuthenticated,
        isAdmin: user?.iD_Rol == 1,
        logout
    };
};

const authApi = {
    revalidateUser: async (token: string): Promise<{
        success: boolean;
        usuario?: Usuario;
        mensaje?: string;
        iD_Rol?: number;
    }> => {
        try {
        const response = await axiosInstance.get('/Auth/me', {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        });

        return {
            success: true,
            usuario: response.data.usuario,
            mensaje: 'Usuario revalidado correctamente',
            iD_Rol: response.data.iD_Rol,
        };
        } catch (error: any) {
        return {
            success: false,
            mensaje: 'Token inválido o expirado',
        };
        }
    }
};

// Componente de Acceso Denegado
const AccessDenied: React.FC<{ user: Usuario; onLogout: () => void }> = ({ user, onLogout }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h2>
      <p className="text-gray-600 mb-6">
        Tu cuenta no tiene permisos para acceder al panel administrativo.
        Solo los administradores pueden acceder a esta sección.
      </p>
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-3">
          <div className="text-left">
            <p className="font-medium text-gray-900">{user.nombre}</p>
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              {user.iD_Rol == 1 ? 'Administrador' : 'Usuario'}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={onLogout}
        className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Cerrar Sesión
      </button>
    </div>
  </div>
);

// APIs Mock para datos del dashboard
const mockApi = {
  getVisitStats: (): Promise<ApiResponse<VisitStats>> => Promise.resolve({
    data: {
      totalVisits: 15420,
      dailyVisits: [
        { date: '2024-01-20', visits: 320 },
        { date: '2024-01-21', visits: 280 },
        { date: '2024-01-22', visits: 450 },
        { date: '2024-01-23', visits: 380 },
        { date: '2024-01-24', visits: 520 },
        { date: '2024-01-25', visits: 610 },
        { date: '2024-01-26', visits: 490 }
      ],
      sourceDistribution: [
        { name: 'Búsqueda Directa', value: 45, color: '#3B82F6' },
        { name: 'Redes Sociales', value: 30, color: '#10B981' },
        { name: 'Referencias', value: 15, color: '#F59E0B' },
        { name: 'Email', value: 10, color: '#EF4444' }
      ]
    }
  }),
  
  getProducts: (): Promise<ApiResponse<Productos[]>> => 
    axiosInstance.get<Productos[]>('/Productos'),

  getNews: (): Promise<ApiResponse<Noticias[]>> => 
    axiosInstance.get<Noticias[]>('/Noticias'),

  deleteNews: (id: number): Promise<void> => 
    axiosInstance.delete(`/Noticias/${id}`).then(() => {}),

  deleteProduct: (id: number): Promise<void> => 
    axiosInstance.delete(`/Productos/${id}`).then(() => {}),

  editProduct: (id: number, updatedProductData: any): Promise<Productos> => 
    axiosInstance.put(`/Productos/${id}`, updatedProductData).then(res => res.data),

  // CORREGIDO: Función para editar noticias
  editNoticia: (id: number, updatedNoticiaData: any): Promise<Noticias> => 
    axiosInstance.put(`/Noticias/${id}`, updatedNoticiaData).then(res => res.data),

  createProduct: (productData: ProductoFormData): Promise<Productos> =>
    axiosInstance.post<Productos>('/Productos', productData).then(res => res.data),

  createNoticia: (noticiaData: NoticiaFormData): Promise<Noticias> =>
    axiosInstance.post<Noticias>('/Noticias', noticiaData).then(res => res.data)
};

const AdminDashboard: React.FC = () => {
  const [editProduct, setEditProduct] = useState<Productos | null>(null);
  const [editNoticia, setEditNoticia] = useState<Noticias | null>(null);
  const [showProductForm, setShowProductForm] = useState<boolean>(false);
  const [showNoticiaForm, setShowNoticiaForm] = useState<boolean>(false);
  const { usuario, isAuthenticated, isAdmin, logout } = useAuth();
  const [visitStats, setVisitStats] = useState<VisitStats | null>(null);
  const [products, setProducts] = useState<Productos[]>([]);
  const [noticias, setNoticias] = useState<Noticias[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      loadDashboardData();
    }
  }, [isAuthenticated, isAdmin]);

  if (!isAuthenticated) {
    return <LoginPage/>;
  }

  if (isAuthenticated && !isAdmin) {
    return <AccessDenied user={usuario!} onLogout={logout} />;
  }

  const loadDashboardData = async (): Promise<void> => {
    setLoading(true);
    try {
      const [statsResponse, productsResponse, noticiasResponse] = await Promise.all([
        mockApi.getVisitStats(),
        mockApi.getProducts(),
        mockApi.getNews() // CORREGIDO: Cargar noticias
      ]);
      
      setVisitStats(statsResponse.data);
      setProducts(productsResponse.data);
      setNoticias(noticiasResponse.data); // CORREGIDO: Establecer noticias
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (): Promise<void> => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleDeleteNews = async (id: number): Promise<void> => {
    try {
      await mockApi.deleteNews(id);
      setNoticias(prev => prev.filter(item => item.iD_Noticia !== id));
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const handleDeleteProduct = async (id: number): Promise<void> => {
    try {
      await mockApi.deleteProduct(id);
      setProducts(prev => prev.filter(item => item.iD_Producto !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdittProducts = async (id: number, updatedProductData: any): Promise<void> => {
    try {
      const updatedProduct = await mockApi.editProduct(id, updatedProductData);
      // Actualizar el producto en la lista local
      setProducts(prev =>
        prev.map(item => (item.iD_Producto === id ? updatedProduct : item))
      );
    } catch (error) {
      console.error('Error al editar producto:', error);
    }
  };

  const handleEditProducts = (product: Productos): void => {
    setEditProduct(product);
    setShowProductForm(true);
  };

  // CORREGIDO: Función para editar noticias
  const handleEditNoticias = (noticia: Noticias): void => {
    setEditNoticia(noticia);
    setShowNoticiaForm(true);
  };

  // Función para manejar nuevo producto
  const handleNewProduct = (): void => {
    setEditProduct(null); // CORREGIDO: Limpiar producto en edición
    setShowProductForm(true);
  };

  // Función para manejar nueva noticia
  const handleNewNoticia = (): void => {
    setEditNoticia(null); // CORREGIDO: Limpiar noticia en edición
    setShowNoticiaForm(true);
  };

// Función para manejar el envío del formulario
const handleSubmitProduct = async (product: ProductoFormData) => {
  setLoading(true);
  try {
    if (editProduct) {
      const updated = await mockApi.editProduct(editProduct.iD_Producto, product);
      setProducts(prev =>
        prev.map(p => (p.iD_Producto === editProduct.iD_Producto ? updated : p))
      );
    } else {
      const newProduct = await mockApi.createProduct(product);
      setProducts(prev => [...prev, newProduct]);
    }
    setShowProductForm(false);
    setEditProduct(null); // Limpiar estado de edición
  } catch (error) {
    console.error("Error guardando producto:", error);
  } finally {
    setLoading(false);
  }
};

// CORREGIDO: Función para manejar envío de noticias
const handleSubmitNoticia = async (noticia: NoticiaFormData) => {
  setLoading(true);
  try {
    if (editNoticia) {
      // Editar noticia existente
      const updated = await mockApi.editNoticia(editNoticia.iD_Noticia, noticia);
      setNoticias(prev =>
        prev.map(n => (n.iD_Noticia === editNoticia.iD_Noticia ? updated : n))
      );
    } else {
      // Crear nueva noticia
      const newNoticia = await mockApi.createNoticia(noticia);
      setNoticias(prev => [...prev, newNoticia]);
    }
    setShowNoticiaForm(false);
    setEditNoticia(null); // Limpiar estado de edición
  } catch (error) {
    console.error("Error guardando noticia:", error);
  } finally {
    setLoading(false);
  }
};

  // Función para cerrar el modal
  const handleCloseModalProductos = (): void => {
    setShowProductForm(false);
    setEditProduct(null);
  };

  const handleCloseModalNoticias = (): void => {
    setShowNoticiaForm(false);
    setEditNoticia(null);
  };

  //#region Componente de tarjeta de estadísticas
  const StatCard: React.FC<StatCardProps> = ({ 
    title, 
    value, 
    icon: Icon
  }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
        </div>
        <div className="p-3 rounded-full bg-red-100">
          <Icon className="w-8 h-8 text-red-600" />
        </div>
      </div>
    </div>
  );
  //#endregion

  const NewsTable: React.FC = () => {
    

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Noticias Populares</h3>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              onClick={handleNewNoticia}
              disabled={loading}>
              <Plus className="w-4 h-4" />
              Nueva Noticia
            </button>
          </div>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar noticias..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Título</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Usuario</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Resumen</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {noticias.map((item) => (
                <tr key={item.iD_Noticia} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                      {item.titulo}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-600">
                      <User className="w-4 h-4 mr-2" />
                      {item.iD_Usuario}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(item.fecha).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-xs truncate">
                      {item.resumen}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                        onClick={() => handleEditNoticias(item)}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                        onClick={() => handleDeleteNews(item.iD_Noticia)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* CORREGIDO: Modal de Formulario de Noticia */}
      <NoticiaFormModal
        isOpen={showNoticiaForm}
        onClose={handleCloseModalNoticias}
        onSubmit={handleSubmitNoticia}
        loading={loading}
        noticiaToEdit={editNoticia}
        usuarios={usuario ? [usuario] : []} // Asegurarse de pasar un array de usuarios
        productos={products} // Pasar productos para el formulario
      />
      </div>
    );
  };

  const ProductsTable: React.FC = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Productos de Celulares</h3>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            onClick={handleNewProduct}
            disabled={loading}>
            <Plus className="w-4 h-4" />
            Nuevo Producto
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nombre</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Camara</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Pantalla</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Bateria</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Caracteristicas</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Imagen</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Editar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.iD_Producto} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{product.nombre}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">{product.fecha}</td>
                <td className="px-6 py-4">
                  {product.camara}
                </td>
                <td className="px-6 py-4">
                  {product.pantalla}
                </td>
                <td className="px-6 py-4">
                  {product.bateria}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-600">{product.caracteristicas}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className="ml-1 text-gray-600">{product.imagen}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button 
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                      onClick={() => handleEditProducts(product)}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                      onClick={() => handleDeleteProduct(product.iD_Producto)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal de Formulario de Producto */}
      <ProductoFormModal
        isOpen={showProductForm}
        onClose={handleCloseModalProductos}
        onSubmit={handleSubmitProduct}
        loading={loading}
        productToEdit={editProduct}
      />
    </div>
  );

  // Definición de las pestañas de navegación
  const navigationTabs = [
    { id: 'overview' as TabType, name: 'Resumen', icon: TrendingUp },
    { id: 'news' as TabType, name: 'Noticias', icon: FileText },
    { id: 'products' as TabType, name: 'Productos', icon: Smartphone }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Administrativo</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-0 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
          <div className="flex items-center justify-between p-6 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menú</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <nav className="p-6">
            <div className="space-y-2">
              {navigationTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-red-50 text-red-700 border-r-2 border-red-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.name}
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Overlay para móvil */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Visitas Totales"
                  value={visitStats?.totalVisits || 0}
                  icon={Eye}
                  trend={12}
                  color="blue"
                />
                <StatCard
                  title="Noticias Publicadas"
                  value={noticias.length}
                  icon={FileText}
                  trend={8}
                  color="green"
                />
                <StatCard
                  title="Productos Activos"
                  value={products.length}
                  icon={Smartphone}
                  trend={5}
                  color="purple"
                />
                <StatCard
                  title="Usuarios Registrados"
                  value={1247}
                  icon={Users}
                  trend={15}
                  color="orange"
                />
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visitas Diarias */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Visitas Diarias</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={visitStats?.dailyVisits || []}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="visits" 
                        stroke="#bf0603" 
                        strokeWidth={2}
                        dot={{ fill: '#8d0801', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Distribución de Fuentes */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Fuentes de Tráfico</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={visitStats?.sourceDistribution || []}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {visitStats?.sourceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Resumen de Noticias Populares */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Top 5 Noticias más Visitadas</h3>
                <div className="space-y-4">
                  {noticias.slice(0, 5).map((item, index) => (
                    <div key={item.iD_Noticia} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{item.titulo}</h4>
                          <p className="text-sm text-gray-500">{item.fecha}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'news' && <NewsTable />}
          {activeTab === 'products' && <ProductsTable />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;