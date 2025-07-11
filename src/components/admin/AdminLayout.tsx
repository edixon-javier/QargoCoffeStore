import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../contexts/AuthContext';
import { Menu } from 'lucide-react';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  // Por defecto, el sidebar está abierto en desktop y cerrado en móvil
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return window.innerWidth >= 768; // md breakpoint en Tailwind
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar como drawer */}
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Contenido principal */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-20'}`}>
        {/* Header */}
        <header className={`bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-0 z-10 transition-all duration-300 ${
          sidebarOpen ? 'md:left-64' : 'md:left-20'
        }`}>
          <div className="px-4 md:px-8 h-full flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="mr-4 p-2 rounded-md hover:bg-gray-100"
                onClick={toggleSidebar}
                aria-label={sidebarOpen ? "Collapse menu" : "Expand menu"}
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
              <h2 className="text-lg font-medium text-gray-800">
                Welcome, {user?.name}
              </h2>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-24 px-4 md:px-8 py-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
