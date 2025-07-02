import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Settings, FileText } from 'lucide-react';

const DashboardNav: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const navItems = [
    {
      name: 'Orders',
      path: '/franchisee',
      icon: ShoppingBag,
      exact: true
    },
    {
      name: 'Profile & Billing',
      path: '/franchisee/profile',
      icon: Settings
    }
  ];

  return (
    <nav className="bg-white shadow-lg rounded-lg p-4 mb-8 sticky top-4">
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {navItems.map((item) => {
          const isActive = item.exact 
            ? pathname === item.path
            : pathname.startsWith(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary text-blue-900'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5 mr-2" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default DashboardNav;
