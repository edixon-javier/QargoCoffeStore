import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, User, X, Coffee, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  // Check if we're on an admin/portal page
  const isPortalPage = 
    location.pathname.startsWith('/admin') || 
    location.pathname.startsWith('/supplier') || 
    location.pathname.startsWith('/franchisee');
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isPortalPage ? 'bg-white shadow-card' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Coffee 
            className="h-8 w-8 text-primary-600" 
            strokeWidth={2.5} 
          />
          <span className="ml-2 font-serif font-bold text-xl text-primary-600">
            Qargo Coffee
          </span>
        </Link>        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/catalog" className="nav-link font-medium hover:text-primary-600">
            Catalog
          </Link>
          <Link to="/about-us" className="nav-link font-medium hover:text-primary-600">
            About Us
          </Link>
          <Link to="/contact" className="nav-link font-medium hover:text-primary-600">
            Contact
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">          {/* Search button */}
          <button 
            onClick={toggleSearch}
            aria-label="Search"
            className="p-2 rounded-full hover:bg-primary-100 transition-colors"
          >
            <Search className="h-5 w-5 text-primary-600" />
          </button>

          {/* Cart link with counter */}          {!isPortalPage && (
            <Link 
              to="/cart" 
              className="p-2 rounded-full hover:bg-primary-100 transition-colors relative"
              aria-label="Shopping Cart"
            ><ShoppingCart className="h-5 w-5 text-primary-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-button">
                  {itemCount}
                </span>
              )}
            </Link>
          )}

          {/* User profile / login */}
          <div className="relative">
            {isAuthenticated ? (              <Link 
                to={
                  user?.role === 'admin' ? '/admin' : 
                  user?.role === 'supplier' ? '/supplier' : 
                  '/franchisee'
                } 
                className="flex items-center"
              >
                <div className="w-8 h-8 bg-primary-200 rounded-full flex items-center justify-center overflow-hidden">                  {user?.profileImage ? (
                    <img 
                      src={user.profileImage}
                      alt={user?.name || "User profile"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5 text-primary-800" />
                  )}
                </div>
              </Link>
            ) : (              <Link 
                to="/login" 
                className="hidden md:block btn-secondary"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}          <button 
            className="md:hidden p-2 rounded-full hover:bg-primary-100 transition-colors"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-primary-800" />
            ) : (
              <Menu className="h-6 w-6 text-primary-800" />
            )}
          </button>
        </div>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white shadow-md p-4"
          >
            <div className="container-custom">
              <div className="relative">                <input 
                  type="text" 
                  placeholder="Search products, categories or brands..." 
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-md"
          >            <nav className="container-custom py-4 flex flex-col space-y-4">
              <Link to="/catalog" className="py-2 font-medium hover:text-primary-700">
                Catalog
              </Link>
              <Link to="/about-us" className="py-2 font-medium hover:text-primary-700">
                About Us
              </Link>
              <Link to="/contact" className="py-2 font-medium hover:text-primary-700">
                Contact
              </Link>
              {!isAuthenticated && (
                <Link to="/login" className="btn-primary w-full text-center">
                  Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;