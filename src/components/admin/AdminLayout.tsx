import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useAuth } from '../../contexts/AuthContext';

const AdminLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="pl-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 fixed top-0 right-0 left-64 z-10">
          <div className="px-8 h-full flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">
              Welcome, {user?.name}
            </h2>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-16 px-8 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
