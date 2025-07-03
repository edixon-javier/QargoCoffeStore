import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Coffee, LogIn } from 'lucide-react';
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
    email: userType === 'franchisee' ? 'dearborn-22022@qargocoffee.com' : 'admin@tienda.com',
    password: userType === 'franchisee' ? '123456' : 'admin123',
    remember: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleUserType = () => {
    const newType = userType === 'franchisee' ? 'admin' : 'franchisee';
    setUserType(newType);
    setFormData(prev => ({
      ...prev,
      email: newType === 'franchisee' ? 'dearborn-22022@qargocoffee.com' : 'admin@tienda.com',
      password: userType === 'franchisee' ? 'admin123': '123456',
    }));
  };

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
        <div className="text-center relative">
          <button
            type="button"
            onClick={toggleUserType}
            className="absolute -top-4 -right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title={`Switch to ${userType === 'franchisee' ? 'Admin' : 'Franchisee'} login`}
          >
            <motion.div
              animate={{ rotate: userType === 'franchisee' ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <HelpCircle className="h-5 w-5" />
            </motion.div>
          </button>
          
          <Coffee className="mx-auto h-12 w-12 text-primary-600" strokeWidth={2} />
          <h2 className="mt-6 text-3xl font-serif text-gray-900">Welcome back</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in as {userType === 'franchisee' ? 'Franchisee' : 'Administrator'}
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
