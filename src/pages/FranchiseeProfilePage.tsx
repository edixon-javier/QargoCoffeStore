import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import FranchiseeProfile from '../components/franchisee/FranchiseeProfile';
import DashboardNav from '../components/franchisee/DashboardNav';

const FranchiseeProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container-custom py-8">
      <DashboardNav />
      
      <div className="bg-white shadow-lg rounded-lg p-8 mt-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif">Profile & Billing Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your business information and payment methods
            </p>
          </div>
        </div>

        {/* Profile and Billing Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <FranchiseeProfile />
        </div>
      </div>
    </div>
  );
};

export default FranchiseeProfilePage;
