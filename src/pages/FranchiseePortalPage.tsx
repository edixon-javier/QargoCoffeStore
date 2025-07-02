import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

// Placeholder component
const FranchiseePortalHome = () => (
  <div>
    <h2 className="text-2xl font-serif mb-4">Franchisee Portal</h2>
    <p className="text-secondary-600">Welcome to the management dashboard for Qargo Connet franchisees.</p>
  </div>
);

const FranchiseePortalPage: React.FC = () => {
  const { user } = useAuth();
  
  // Redirect if not a franchisee
  if (!user || user.role !== 'franchisee') {
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
        <Route path="/" element={<FranchiseePortalHome />} />
        {/* Add more franchisee-specific routes as needed */}
      </Routes>
    </motion.div>
  );
};

export default FranchiseePortalPage;