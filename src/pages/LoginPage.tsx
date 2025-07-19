import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, LogIn, Store, Building2 } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';

interface LocationState {
  returnUrl?: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [userType, setUserType] = useState<'franchisee' | 'admin'>('franchisee');
  const [formData, setFormData] = useState({
    email: userType === 'franchisee' ? 'QargoConnect@qargocoffee.com' : 'admin@tienda.com',
    password: userType === 'franchisee' ? '123456' : 'admin123',
    remember: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      
      // Get returnUrl from location state
      const state = location.state as LocationState;
      const returnUrl = state?.returnUrl;

      if (returnUrl) {
        // Si hay un returnUrl, redirigir a esa página
        navigate(returnUrl);
      } else {
        // Si no hay returnUrl, determinar la ruta según el rol del usuario
        const user = JSON.parse(localStorage.getItem('auth_state') || '{}').user;
        const redirectPath = user?.role === 'admin' 
          ? '/admin'
          : user?.role === 'franchisee'
          ? '/franchisee'
          : user?.role === 'supplier'
          ? '/supplier'
          : '/';
        
        navigate(redirectPath);
      }
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
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full shadow-md p-2">
            <motion.div
              className="flex items-center space-x-8 p-1 bg-gray-100 rounded-full"
              animate={{ backgroundColor: userType === 'franchisee' ? '#E5E7EB' : '#F3F4F6' }}
            >
              <motion.button
                type="button"
                onClick={() => {
                  setUserType('franchisee');
                  setFormData(prev => ({
                    ...prev,
                    email: 'QargoConnect@qargocoffee.com',
                    password: '123456'
                  }));
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  userType === 'franchisee' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Store size={20} />
                <span className="text-sm font-medium">Franchisee</span>
              </motion.button>
              <motion.button
                type="button"
                onClick={() => {
                  setUserType('admin');
                  setFormData(prev => ({
                    ...prev,
                    email: 'admin@tienda.com',
                    password: 'admin123'
                  }));
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  userType === 'admin' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Building2 size={20} />
                <span className="text-sm font-medium">Administrator</span>
              </motion.button>
            </motion.div>
          </div>
          
          <Coffee className="mx-auto h-12 w-12 text-primary-600 mt-8" strokeWidth={2} />
          <h2 className="mt-6 text-3xl font-serif text-gray-900">Good to have you back!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Log in as {userType === 'franchisee' ? 'Franchisee' : 'Administrator'}
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
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
