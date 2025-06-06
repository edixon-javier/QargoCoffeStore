import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isSupplierRoute = location.pathname.startsWith('/proveedor');
  const isFranchiseeRoute = location.pathname.startsWith('/franquiciado');
  
  const isPortalPage = isAdminRoute || isSupplierRoute || isFranchiseeRoute;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <motion.main 
        className={`flex-grow ${isPortalPage ? 'bg-primary-50' : 'bg-secondary-50'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        key={location.pathname}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;