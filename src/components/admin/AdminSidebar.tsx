import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
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
import { useAuth } from '../../contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import Tooltip from '../ui/Tooltip';

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
  }
  // ,
  // {
  //   title: 'Settings',
  //   icon: Settings,
  //   path: '/admin/settings'
  // }
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
      className={`h-full flex flex-col bg-white border-r border-gray-200 overflow-y-auto transition-all duration-300 ${
        !isOpen ? 'lg:w-20' : 'w-64'
      }`}
    >
      <div className={`px-4 py-4 flex justify-between items-center border-b border-gray-200 ${
        !isOpen ? 'lg:justify-center lg:px-2' : ''
      }`}>
        {isOpen ? (
          <>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Coffee className="h-8 w-8 text-primary-600" strokeWidth={2.5} />
                <span className="font-serif font-bold text-xl text-primary-600">
                  Qargo Connect
                </span>
              </div>
            </div>
            <button
              className="p-2 rounded-full hover:bg-gray-100 lg:hidden"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </>
        ) : (
          <div className="hidden lg:block">
            <Tooltip content="Qargo Connect Admin">
              <Coffee className="h-8 w-8 text-primary-600" strokeWidth={2.5} />
            </Tooltip>
          </div>
        )}
      </div>

      <nav className={`px-4 py-4 flex-grow `}>
        {menuItems.map((item) => {
          const isActive = item.exact
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          // Item sin submenu (comportamiento original)
          const itemContent = (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-600 hover:bg-gray-50"
              } ${!isOpen ? 'lg:justify-center lg:px-2' : ''}`}
              onClick={() => {
                if (window.innerWidth < 768) {
                  toggleSidebar();
                }
              }}
            >
              {!isOpen ? (
                <Tooltip content={item.title}>
                  <item.icon className="h-5 w-5" />
                </Tooltip>
              ) : (
                <>
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.title}</span>
                </>
              )}
            </Link>
          );

          return itemContent;
        })}
      </nav>

      {/* Botón de cierre de sesión */}
      <div className={`mt-auto border-t border-gray-200 p-4 ${!isOpen ? 'lg:px-2' : ''}`}>
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors w-full ${
            !isOpen ? 'lg:justify-center lg:px-2' : ''
          }`}
        >
          {!isOpen ? (
            <Tooltip content="Logout">
              <LogOut className="h-5 w-5" />
            </Tooltip>
          ) : (
            <>
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Versión desktop - puede mostrarse/ocultarse pero mantiene los íconos */}
      <div className={`hidden md:block fixed left-0 top-0 z-30 h-screen transition-all duration-300 ${
        !isOpen ? 'lg:w-20' : 'w-64'
      }`}>
        {sidebarContent}
      </div>

      {/* Versión móvil - drawer con AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
            />
            <motion.div 
              className="fixed left-0 top-0 h-full w-64 z-50 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
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
