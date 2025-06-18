import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, Package, Bell, TrendingUp, Building2, 
  ClipboardList, ChevronRight, Search, History, ShoppingCart 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

// Mock data
const recentOrders = [
  { 
    id: '#QRG-12345',
    date: '2024-03-15',
    supplier: 'Lavazza Coffee',
    status: 'In Transit',
    amount: 450,
    products: 'Coffee Beans (5kg)'
  },
  { 
    id: '#QRG-12344',
    date: '2024-03-10',
    supplier: 'Coffee Supplies Co.',
    status: 'Delivered',
    amount: 120,
    products: 'Filters (200 units)'
  },
  { 
    id: '#QRG-12343',
    date: '2024-03-05',
    supplier: 'Machine Parts Ltd.',
    status: 'Processing',
    amount: 890,
    products: 'Coffee Machine Parts'
  },
];

const recommendedProducts = [
  { id: 1, name: 'Premium Coffee Blend', price: 45, image: 'coffee-blend.jpg' },
  { id: 2, name: 'New Season Cups', price: 25, image: 'cups.jpg' },
  { id: 3, name: 'Eco Filters Pack', price: 15, image: 'filters.jpg' },
];

const FranchiseeDashboard: React.FC = () => {
  const { user } = useAuth();

  const getStatusColor = (status: string) => {
    const colors = {
      'Delivered': 'bg-success-100 text-success-800',
      'In Transit': 'bg-info-100 text-info-800',
      'Processing': 'bg-warning-100 text-warning-800',
      'Cancelled': 'bg-error-100 text-error-800',
    };
    return colors[status] || 'bg-secondary-100 text-secondary-800';
  };

  return (
    <div className="container-custom py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-soft p-6 mb-6"
      >
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-serif mb-2">
              Welcome, {user?.name}
            </h1>
            <p className="text-secondary-600">
              Manage your franchise and place orders from your personalized dashboard
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-6 w-6 text-secondary-400" />
              <span className="absolute -top-1 -right-1 bg-error-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        {[
          { 
            icon: <ShoppingBag />, 
            label: 'Pending Orders', 
            value: '3 orders',
            subtext: 'View all orders'
          },
          { 
            icon: <Package />, 
            label: 'Recent Deliveries', 
            value: '5 items',
            subtext: 'Last 7 days'
          },
          { 
            icon: <TrendingUp />, 
            label: 'Stock Status', 
            value: '85% items in stock',
            subtext: 'View inventory'
          },
          { 
            icon: <Bell />, 
            label: 'Notifications', 
            value: '3 unread',
            subtext: 'View all'
          }
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
                <p className="text-xs text-secondary-500">{metric.subtext}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders - Takes 2 columns */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-soft p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif">Recent Orders and Status</h2>
              <Button
                variant="outline"
                size="sm"
                rightIcon={<History size={16} />}
              >
                View All Orders
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Order ID</th>
                    <th className="text-left py-3">Date</th>
                    <th className="text-left py-3">Supplier</th>
                    <th className="text-left py-3">Status</th>
                    <th className="text-right py-3">Amount</th>
                    <th className="text-right py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3 font-medium">{order.id}</td>
                      <td className="py-3">{order.date}</td>
                      <td className="py-3">{order.supplier}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">${order.amount}</td>
                      <td className="py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          rightIcon={<ChevronRight size={16} />}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions Panel */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-soft p-6"
          >
            <h2 className="text-xl font-serif mb-6">Quick Actions</h2>
            
            <div className="space-y-6">
              {/* Quick Reorder */}
              <div className="space-y-4">
                <h3 className="font-medium">Quick Reorder</h3>
                <select className="w-full p-2 border rounded">
                  <option>Select Previous Order</option>
                  {recentOrders.map(order => (
                    <option key={order.id} value={order.id}>
                      {order.id} - {order.products}
                    </option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  className="w-full"
                  rightIcon={<ShoppingCart size={16} />}
                >
                  Reorder Selected
                </Button>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default FranchiseeDashboard;
