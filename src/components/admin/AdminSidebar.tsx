import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard,
  Package,
  Settings,
  Store,
  ShoppingCart,
  LogOut,
  X,
  Coffee,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

interface AdminSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
  exact?: boolean;
  submenu?: Array<{
    title: string;
    path: string;
  }>;
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
    exact: true
  },
  {
    title: 'Order Management',
    icon: ShoppingCart,
    path: '/admin/orders'
  },
  {
    title: 'Franchisees',
    icon: Store,
    path: '/admin/franchisees'
  },
  {
    title: 'Suppliers',
    icon: Truck,
    path: '/admin/suppliers'
  },
  {
    title: 'Products',
    icon: Package,
    path: '/admin/products'
  },
  {
    title: 'Settings',
    icon: Settings,
    path: '/admin/settings'
  }
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Drawer para móviles y escritorio
  const sidebarContent = (
    <div
      className={`h-full flex flex-col bg-white border-r border-gray-200 overflow-y-auto`}
    >
      <div className="px-6 py-6 flex justify-between items-center border-b border-gray-200">
        <div className="flex flex-col gap-1">
          {/* Logo + Marca */}
          <div className="flex items-center gap-2">
            <Coffee className="h-8 w-8 text-primary-600" strokeWidth={2.5} />
            <span className="font-serif font-bold text-xl text-primary-600">
              Qargo Connet
            </span>
          </div>

          {/* Subtítulo */}
          <h1 className="text-sm font-semibold text-gray-700 ml-1">
            Admin Panel
          </h1>
        </div>

        <button
          className="p-2 rounded-full hover:bg-gray-100"
          onClick={toggleSidebar}
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      <nav className="px-4 py-4 flex-grow">
        {menuItems.map((item) => {
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          // Verificamos si el item tiene submenu
          if (item.submenu) {
            return (
              <div key={item.path} className="mb-2">
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary-50 text-primary-700"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </div>

                {/* Submenu items */}
                <div className="ml-9 mt-1 space-y-1">
                  {item.submenu.map((subItem) => {
                    const isSubActive = location.pathname === subItem.path;
                    return (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={`block px-4 py-2 text-sm rounded-md transition-colors ${
                          isSubActive
                            ? "bg-primary-50 text-primary-700"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        onClick={() => {
                          if (window.innerWidth < 768) {
                            toggleSidebar();
                          }
                        }}
                      >
                        {subItem.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          }

          // Item sin submenu (comportamiento original)
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
              onClick={() => {
                // En móviles, cerrar el drawer al hacer clic en un elemento del menú
                if (window.innerWidth < 768) {
                  toggleSidebar();
                }
              }}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Botón de cierre de sesión */}
      <div className="mt-auto border-t border-gray-200 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Cerrar sesión</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Versión desktop - puede mostrarse/ocultarse */}
      <div className={`hidden md:block w-64 h-screen fixed left-0 top-0 z-30 transition-transform duration-300 ${!isOpen ? '-translate-x-full' : 'translate-x-0'}`}>
        {sidebarContent}
      </div>

      {/* Versión móvil - drawer con AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para cerrar el drawer en móvil */}
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
            />
            
            {/* Drawer móvil */}
            <motion.div 
              className="fixed left-0 top-0 w-64 h-full z-50 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
