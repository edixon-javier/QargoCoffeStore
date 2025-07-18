import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PackageOpen, Users, Truck, ShoppingCart, BarChart3, Settings, LogOut, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

// Dashboard components
const DashboardHome = () => (
  <div>
    <h2 className="text-2xl font-serif mb-4">Main Dashboard</h2>
    <p className="text-secondary-600">Welcome to the Qargo Connect administration dashboard.</p>
  </div>
);

const DashboardProducts = () => (
  <div>
    <h2 className="text-2xl font-serif mb-4">Product Management</h2>
    <p className="text-secondary-600">Manage all products on the platform.</p>
  </div>
);

const DashboardSuppliers = () => (
  <div>
    <h2 className="text-2xl font-serif mb-4">Supplier Management</h2>
    <p className="text-secondary-600">Manage registered suppliers.</p>
  </div>
);

const DashboardOrders = () => (
  <div>
    <h2 className="text-2xl font-serif mb-4">Order Management</h2>
    <p className="text-secondary-600">Monitor and manage all orders placed on the platform.</p>
  </div>
);

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect if not admin
  if (user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/admin' },
    { icon: <PackageOpen size={20} />, label: 'Products', path: '/admin/products' },
    { icon: <Users size={20} />, label: 'Suppliers', path: '/admin/suppliers' },
    { icon: <Truck size={20} />, label: 'Orders', path: '/admin/orders' },
    { icon: <ShoppingCart size={20} />, label: 'Sales', path: '/admin/sales' },
    { icon: <BarChart3 size={20} />, label: 'Statistics', path: '/admin/statistics' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/admin/settings' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar for mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleSidebar}
            className="fixed z-50 bottom-4 right-4 p-3 rounded-full bg-primary-700 text-white shadow-lg"
            aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile sidebar */}
          <motion.div
            className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
              sidebarOpen ? 'block' : 'hidden'
            }`}
            onClick={toggleSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-50 overflow-y-auto"
              initial={{ x: '-100%' }}
              animate={{ x: sidebarOpen ? 0 : '-100%' }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-primary-800 font-semibold">
                      {user?.name.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-secondary-800">
                      {user?.name || 'Administrador'}
                    </p>
                    <p className="text-xs text-secondary-500">
                      {user?.email || 'admin@example.com'}
                    </p>
                  </div>
                </div>
              </div>

              <nav className="p-4 space-y-1">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/admin'}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-800'
                          : 'text-secondary-600 hover:bg-gray-100'
                      }`
                    }
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </NavLink>
                ))}

                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="flex items-center w-full px-4 py-3 rounded-lg text-secondary-600 hover:bg-gray-100 transition-colors"
                >
                  <LogOut size={20} className="mr-3" />
                  Logout
                </button>
              </nav>
            </motion.div>
          </motion.div>
        </div>

        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-primary-800 font-semibold">
                    {user?.name.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-secondary-800">
                    {user?.name || 'Administrador'}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {user?.email || 'admin@example.com'}
                  </p>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-800'
                        : 'text-secondary-600 hover:bg-gray-100'
                    }`
                  }
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="flex items-center w-full px-4 py-2 rounded-lg text-secondary-600 hover:bg-gray-100 transition-colors"
              >
                <LogOut size={20} className="mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/products" element={<DashboardProducts />} />
              <Route path="/suppliers" element={<DashboardSuppliers />} />
              <Route path="/orders" element={<DashboardOrders />} />
              {/* Add routes for other dashboard sections */}
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;