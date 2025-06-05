import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

// Placeholder component
const SupplierPortalHome = () => (
  <div>
    <h2 className="text-2xl font-serif mb-4">Portal de Proveedores</h2>
    <p className="text-secondary-600">Bienvenido al panel de gestión para proveedores de Qargo Coffee.</p>
  </div>
);

const SupplierPortalPage: React.FC = () => {
  const { user } = useAuth();
  
  // Redirect if not a supplier
  if (!user || user.role !== 'supplier') {
    return <Navigate to="/" />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <Routes>
        <Route path="/" element={<SupplierPortalHome />} />
        {/* Add more supplier-specific routes as needed */}
      </Routes>
    </motion.div>
  );
};

export default SupplierPortalPage;