import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, User, X, Coffee, Search, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on an admin/portal page
  const isPortalPage =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/supplier") ||
    location.pathname.startsWith("/franchisee");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderAuthButton = () => {
    if (isAuthenticated && user) {
      return (
        <div className="flex items-center gap-4">
            <Link
            to={user.role === "franchisee" ? "/franchisee" : 
              user.role === "admin" ? "/admin" : 
              user.role === "supplier" ? "/supplier" : "/"}
            className="text-sm font-medium hidden md:block"
            >
            {user.name}
            </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            <LogOut size={20} />
            <span className="hidden md:block">Log out</span>
          </button>
        </div>
      );
    }

    return (
      <Link
        to="/login"
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
      >
        <User size={20} />
        <span className="hidden md:block">Log in</span>
      </Link>
    );
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isPortalPage ? "bg-white shadow-card" : "bg-transparent"
      }`}
    >
      <div className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Coffee className="h-8 w-8 text-primary-600" strokeWidth={2.5} />
          <span className="ml-2 font-serif font-bold text-xl text-primary-600">
            Qargo Connet
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/catalog"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            Products
          </Link>
          <Link
            to="/about-us"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSearch}
            className="p-2 hover:text-primary-600 transition-colors"
          >
            <Search size={20} />
          </button>

          {/* Auth button */}
          {renderAuthButton()}

          {/* Cart */}
          {/* {isAuthenticated && ( */}
            <Link
              to="/cart"
              className="relative p-2 hover:text-primary-600 transition-colors"
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          {/* )} */}

          {/* Mobile menu button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:text-primary-600 transition-colors"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
              <div className="relative">
                {" "}
                <input
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
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 shadow-md"
          >
            {" "}
            <nav className="container-custom py-4 flex flex-col space-y-4">
              <Link
                to="/catalog"
                className="py-2 font-medium hover:text-primary-700"
              >
                Catalog
              </Link>
              <Link
                to="/about-us"
                className="py-2 font-medium hover:text-primary-700"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="py-2 font-medium hover:text-primary-700"
              >
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
