import { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validación básica
    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
      setError('Por favor, ingresa un correo electrónico válido');
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    // Simulación de inicio de sesión
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('¡Inicio de sesión exitoso!');
    }, 1500);
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
          <p className="text-white">Inicia sesión para continuar</p>
        </div>
        
        {/* Formulario */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="text-primary-100 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {/* Campo de correo electrónico */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-100">
              Correo electrónico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-primary-500" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="correo@ejemplo.com"
              />
            </div>
          </div>
          
          {/* Campo de contraseña */}
          <div className="space-y-2">
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
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
              <div 
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={18} className="text-gray-400" />
                ) : (
                  <Eye size={18} className="text-gray-400" />
                )}
              </div>
            </div>
          </div>
          
          {/* Enlaces y recordatorio */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-gray-100">
                Recordarme
              </label>
            </div>
            <div className="font-medium text-primary-300 hover:text-primary-100 cursor-pointer">
              ¿Olvidaste tu contraseña?
            </div>
          </div>
          
          {/* Botón de inicio de sesión */}
          <div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                isLoading ? 'bg-indigo-400' : 'bg-primary-500 hover:bg-primary-400'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </div>
          
          {/* Registro */}
          <div className="text-center text-sm">
            <span className="text-gray-100">¿No tienes una cuenta? </span>
            <span className="font-medium text-primary-300 hover:text-primary-100 cursor-pointer">
              Regístrate ahora
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}