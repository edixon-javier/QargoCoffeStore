import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Package,
  Users,
  Settings,
  Store,
  FileText,
  ShoppingCart
} from 'lucide-react';

const menuItems = [
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

const AdminSidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-0 overflow-y-auto">
      <div className="px-6 py-8">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </div>

      <nav className="px-4 py-4">
        {menuItems.map((item) => {
          const isActive = item.exact 
            ? location.pathname === item.path
            : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
