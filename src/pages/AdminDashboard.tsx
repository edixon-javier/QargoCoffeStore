import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Package, TrendingUp, DollarSign, 
  Download, Filter, Plus, Edit, Trash
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

// Mock data
const franchises = [
  { id: 1, name: 'Prestige Cafe', location: 'Miami, FL', status: 'Active' },
  { id: 2, name: 'South Franchise', location: 'Orlando, FL', status: 'Active' },
  { id: 3, name: 'East Franchise', location: 'Tampa, FL', status: 'Pending' },
];

const inventory = [
  { id: 1, name: 'Coffee Beans', stock: 500, price: 45 },
  { id: 2, name: 'Filters', stock: 1000, price: 12 },
  { id: 3, name: 'Machine Parts', stock: 50, price: 89 },
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-soft p-6 mb-6"
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-serif mb-2">
              Administrative Panel
            </h1>
            <p className="text-secondary-600">
              Welcome, {user?.name}
            </p>
          </div>
          <div className="space-x-3">
            <Button
              variant="outline"
              rightIcon={<Download size={16} />}
            >
              Export Reports
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: <DollarSign />, label: 'Total Sales', value: '$158,890' },
          { icon: <Users />, label: 'Franchises', value: '24 active' },
          { icon: <Package />, label: 'Products', value: '156 items' },
          { icon: <TrendingUp />, label: 'Growth', value: '+22.5%' },
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-soft"
          >
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-lg">
                {metric.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm text-secondary-600">{metric.label}</p>
                <p className="text-xl font-medium">{metric.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Franchise Management */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-soft p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif">Franchise Management</h2>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<Plus size={16} />}
            >
              New Franchise
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Name</th>
                  <th className="text-left py-3">Location</th>
                  <th className="text-left py-3">Status</th>
                  <th className="text-right py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {franchises.map((franchise) => (
                  <tr key={franchise.id} className="border-b">
                    <td className="py-3">{franchise.name}</td>
                    <td className="py-3">{franchise.location}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        franchise.status === 'Active' 
                          ? 'bg-success-100 text-success-800'
                          : 'bg-warning-100 text-warning-800'
                      }`}>
                        {franchise.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        rightIcon={<Edit size={16} />}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Inventory Management */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg shadow-soft p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-serif">Inventory Management</h2>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                rightIcon={<Filter size={16} />}
              >
                Filter
              </Button>
              <Button
                variant="primary"
                size="sm"
                rightIcon={<Plus size={16} />}
              >
                New Product
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Product</th>
                  <th className="text-right py-3">Stock</th>
                  <th className="text-right py-3">Price</th>
                  <th className="text-right py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-3">{item.name}</td>
                    <td className="py-3 text-right">{item.stock}</td>
                    <td className="py-3 text-right">${item.price}</td>
                    <td className="py-3 text-right space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        rightIcon={<Edit size={16} />}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        rightIcon={<Trash size={16} />}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
