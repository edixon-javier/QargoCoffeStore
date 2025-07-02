import React from 'react';
import { ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';
import { useOrders } from '../../contexts/OrderContext';
import { formatCurrency } from '../../lib/utils';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
}> = ({ title, value, icon, trend }) => (
  <div className="bg-white rounded-lg shadow-soft p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
        {trend && (
          <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}% from last month
          </p>
        )}
      </div>
      <div className="bg-primary-50 p-3 rounded-full">
        {icon}
      </div>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const { orders } = useOrders();

  // Calcular estadísticas
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'Pending').length;
  
  // Datos de ejemplo para las tendencias
  const trends = {
    orders: { value: 12.5, isPositive: true },
    revenue: { value: 8.2, isPositive: true },
    customers: { value: 5.1, isPositive: true },
    pending: { value: 3.2, isPositive: false }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={<ShoppingBag className="h-6 w-6 text-primary-600" />}
          trend={trends.orders}
        />
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<DollarSign className="h-6 w-6 text-primary-600" />}
          trend={trends.revenue}
        />
        <StatCard
          title="Active Franchisees"
          value="24"
          icon={<Users className="h-6 w-6 text-primary-600" />}
          trend={trends.customers}
        />
        <StatCard
          title="Pending Orders"
          value={pendingOrders}
          icon={<TrendingUp className="h-6 w-6 text-primary-600" />}
          trend={trends.pending}
        />
      </div>

      {/* Aquí puedes añadir más secciones como gráficas, tablas de órdenes recientes, etc. */}
    </div>
  );
};

export default AdminDashboard;
