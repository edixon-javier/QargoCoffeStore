import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import RecentOrders from '../components/franchisee/RecentOrders';
import DashboardNav from '../components/franchisee/DashboardNav';

const FranchiseeDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container-custom py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif">
            Welcome back, {user?.name}
          </h1>
          <p className="text-gray-600">
            Manage your franchise operations
          </p>
        </div>
      </div>

      {/* Dashboard Navigation */}
      <DashboardNav />

      {/* Recent Orders Section */}
        <RecentOrders />
    </div>
  );
};

export default FranchiseeDashboard;
