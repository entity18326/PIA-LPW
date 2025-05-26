import { useState } from 'react';
import { User, Lock, User2, Eye, EyeOff } from 'lucide-react';
import axios, { AxiosResponse, AxiosError } from 'axios';

// Interfaces para tipado
interface LoginRequest {
  username: string;
  password: string;
}

interface User {
  id: number;
  name?: string;
  nombre?: string; // Por si tu API usa 'nombre' en lugar de 'name'
}

interface LoginResponse {
  token?: string;
  user?: User;
  message?: string;
  success?: boolean;
}

interface ApiError {
  message?: string;
  error?: string;
  Message?: string; // Por si tu API usa 'Message' con mayúscula
  errors?: Record<string, string[]>;
}

// Configuración de Axios
const api = axios.create({
  baseURL: 'https://localhost:7039/api', // URL base de tu API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para manejar respuestas y errores globalmente
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    
    // Validación básica
    if (!username || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const loginData: LoginRequest = {
        username,
        password
      };

      const response: AxiosResponse<LoginResponse> = await api.post('/Usuarios/login', loginData);

      // Manejo de respuesta exitosa
      const { data } = response;
      
      // Guardar token en memoria o configurar para futuras peticiones
      if (data.token) {
        // Configurar token para futuras peticiones
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        
        // También podrías guardarlo en un context o state manager
        console.log('Token recibido:', data.token);
        // Guardar el token (ejemplo)
        localStorage.setItem("token", data.token);
      }
      
      // Mensaje de éxito
      const userName = data.user?.name || data.user?.nombre || 'usuario';
      alert(`¡Bienvenido ${userName}!`);
      
      // Limpiar formulario
      setUsername('');
      setPassword('');
      
      console.log('Usuario autenticado:', data.user?.nombre);

      // Redirigir o actualizar el estado global de autenticación

      
    } catch (error) {
      console.error('Error de login:', error);
      
      const axiosError = error as AxiosError<ApiError>;
      
      if (axiosError.response) {
        // El servidor respondió con un código de error
        const status = axiosError.response.status;
        const errorData = axiosError.response.data;
        const errorMessage = errorData?.message || 
                           errorData?.error || 
                           errorData?.Message;
        
        switch (status) {
          case 400:
            setError('Datos de entrada inválidos. Verifica la información.');
            break;
          case 401:
            setError('Credenciales incorrectas. Verifica tu email y contraseña.');
            break;
          case 404:
            setError('Usuario no encontrado o endpoint no disponible.');
            break;
          case 422:
            // Manejo especial para errores de validación
            if (errorData?.errors) {
              const validationErrors = Object.values(errorData.errors).flat();
              setError(validationErrors.join(', '));
            } else {
              setError(errorMessage || 'Datos de entrada inválidos.');
            }
            break;
          case 429:
            setError('Demasiados intentos. Intenta más tarde.');
            break;
          case 500:
            setError('Error interno del servidor. Intenta más tarde.');
            break;
          default:
            setError(errorMessage || 'Error al iniciar sesión. Intenta nuevamente.');
        }
      } else if (axiosError.request) {
        // La petición se hizo pero no hubo respuesta
        setError('No se pudo conectar con el servidor. Verifica tu conexión y que el servidor esté ejecutándose.');
      } else {
        // Algo más ocurrió al configurar la petición
        setError('Error inesperado. Intenta nuevamente.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-800 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Encabezado */}
        <div className="bg-primary-500 p-6 text-center">
          <div className="mx-auto bg-white rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <User size={30} className="text-primary-500" />
          </div>
          <h2 className="text-2xl font-bold text-white">Bienvenido de nuevo</h2>
          <p className="text-blue-100">Inicia sesión para continuar</p>
        </div>
        
        {/* Formulario */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Campo de correo electrónico */}
            <div className="space-y-2 mb-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-100">
                Nombre de usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User2 size={18} className="text-primary-500" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="username"
                  value={username}
                  onChange={handleUsernameChange}
                  disabled={isLoading}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Nombre de usuario"
                />
              </div>
            </div>
            
            {/* Campo de contraseña */}
            <div className="space-y-2 mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-100">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-primary-500" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  required
                  minLength={6}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Enlaces y recordatorio */}
            <div className="flex items-center justify-between text-sm mb-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  disabled={isLoading}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <label htmlFor="remember-me" className="ml-2 block text-gray-100">
                  Recordarme
                </label>
              </div>
              <button
                type="button"
                className="font-medium text-blue-300 hover:text-blue-100 cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            
            {/* Botón de inicio de sesión */}
            <div className="mb-6">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors ${
                  isLoading 
                    ? 'bg-primary-500 cursor-not-allowed' 
                    : 'bg-primary-500 hover:bg-primary-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Iniciando sesión...
                  </div>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </div>
          </form>
          
          {/* Registro */}
          <div className="text-center text-sm">
            <span className="text-gray-100">¿No tienes una cuenta? </span>
            <button
              type="button"
              className="font-medium text-blue-300 hover:text-blue-100 cursor-pointer"
            >
              Regístrate ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// Función auxiliar para hacer peticiones autenticadas después del login
export const authenticatedRequest = async <T = any>(
  endpoint: string, 
  options: any = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api({
      url: endpoint,
      ...options
    });
    return response.data;
  } catch (error) {
    console.error('Error en petición autenticada:', error);
    throw error;
  }
};

// Función para limpiar la autenticación (logout)
export const logout = (): void => {
  delete api.defaults.headers.common['Authorization'];
  // Aquí también podrías limpiar el estado global de autenticación
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = (): boolean => {
  return !!api.defaults.headers.common['Authorization'];
};

// Función para obtener el token actual
export const getToken = (): string | undefined => {
  const authHeader = api.defaults.headers.common['Authorization'] as string;
  return authHeader?.replace('Bearer ', '');
};