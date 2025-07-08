import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../contexts/AuthContext';
import { Menu } from 'lucide-react';

const AdminLayout: React.FC = () => {
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
      <div className={`transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : ''}`}>
        {/* Header */}
        <header className={`bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-0 z-10 transition-all duration-300 ${sidebarOpen ? 'md:left-64' : ''}`}>
          <div className="px-4 md:px-8 h-full flex items-center justify-between">
            <div className="flex items-center">
              {/* Botón para mostrar/ocultar el drawer (visible en móvil y también en desktop cuando el sidebar está oculto) */}
              <button 
                className="mr-4 p-2 rounded-md hover:bg-gray-100"
                onClick={toggleSidebar}
                aria-label="Menu"
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
              <h2 className="text-lg font-medium text-gray-800">
                Bienvenido, {user?.name}
              </h2>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-16 px-4 md:px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
