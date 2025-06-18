import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Coffee, LogIn } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: 'franchisee@tienda.com',
    password: '123456',
    remember: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      
      // Determinar la ruta según el rol del usuario
      const user = JSON.parse(localStorage.getItem('qargo_user') || '{}');
      const redirectPath = user.role === 'admin' 
        ? '/admin'
        : user.role === 'franchisee'
        ? '/franchisee'
        : user.role === 'supplier'
        ? '/supplier'
        : '/';
      
      navigate(redirectPath);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-soft relative"
      >
        <div className="text-center">
          <Coffee className="mx-auto h-12 w-12 text-primary-600" strokeWidth={2} />
          <h2 className="mt-6 text-3xl font-serif text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="rounded-md bg-error-50 p-4">
              <p className="text-sm text-error-800">{error}</p>
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={formData.remember}
                onChange={(e) => setFormData(prev => ({ ...prev, remember: e.target.checked }))}
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={isLoading}
            rightIcon={<LogIn size={16} />}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          {/* Botón de ayuda */}
          <div className="absolute top-4 right-4">
            <button
              type="button"
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 text-secondary-400 hover:text-primary-600 transition-colors"
              aria-label="Show demo credentials"
            >
              <HelpCircle size={20} />
            </button>

            {/* Popover con credenciales */}
            <AnimatePresence>
              {showHelp && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 border border-gray-100 z-10"
                >
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Credenciales de prueba:</h3>
                  <div className="space-y-3">
                    <div className="p-2 bg-primary-50 rounded-md">
                      <p className="text-xs font-medium text-primary-800 mb-1">Acceso Franquicia:</p>
                      <p className="text-xs text-primary-600">Email: franchisee@tienda.com</p>
                      <p className="text-xs text-primary-600">Password: 123456</p>
                    </div>
                    <div className="p-2 bg-secondary-50 rounded-md">
                      <p className="text-xs font-medium text-secondary-800 mb-1">Acceso Corporativo:</p>
                      <p className="text-xs text-secondary-600">Email: admin@tienda.com</p>
                      <p className="text-xs text-secondary-600">Password: admin123</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
