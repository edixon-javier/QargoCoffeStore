import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';

const Layout: React.FC = () => {
  const location = useLocation();
  
  const isSupplierRoute = location.pathname.startsWith('/supplier');
  const isFranchiseeRoute = location.pathname.startsWith('/franchisee');
  
  const isPortalPage = isSupplierRoute || isFranchiseeRoute;

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
        <Outlet />
      </motion.main>
      {/* Don't show footer on supplier and franchisee routes */}
      {!isPortalPage && <Footer />}
    </div>
  );
};

export default Layout;