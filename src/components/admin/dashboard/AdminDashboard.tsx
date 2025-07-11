import React, { useState, useMemo } from 'react';
import { 
  DollarSign, ShoppingBag, Users, Clock, Activity, 
  Package, AlertTriangle, TrendingUp
} from 'lucide-react';
import { useOrders } from '../../../contexts/OrderContext';
import { useOrderStatus } from '../../../hooks/useOrderStatus';
import { formatCurrency } from '../../../lib/utils';
import { 
  OrderStatusPieChart, 
  TopProductsBarChart,
  RevenueLineChart,
  SupplierPerformanceRadar,
  KeyMetricCard,
  RecentDataTable
} from './DashboardCharts';

// Tipo para las métricas del dashboard
type TimeFrameType = 'day' | 'week' | 'month' | 'year';

const AdminDashboard: React.FC = () => {
  const { orders } = useOrders();
  const { customStatuses } = useOrderStatus();
  const [timeFrame, setTimeFrame] = useState<TimeFrameType>('month');
  
  // Calcular estadísticas basadas en el periodo de tiempo seleccionado
  const statistics = useMemo(() => {
    // Obtener el rango de fechas para el período seleccionado
    const now = new Date();
    const startDate = new Date();
    const previousPeriodStart = new Date();
    const previousPeriodEnd = new Date(startDate);
    
    switch (timeFrame) {
      case 'day':
        startDate.setHours(0, 0, 0, 0);
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 1);
        previousPeriodStart.setHours(0, 0, 0, 0);
        previousPeriodEnd.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        previousPeriodStart.setDate(previousPeriodStart.getDate() - 14);
        previousPeriodEnd.setDate(previousPeriodEnd.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        previousPeriodStart.setMonth(previousPeriodStart.getMonth() - 2);
        previousPeriodEnd.setMonth(previousPeriodEnd.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        previousPeriodStart.setFullYear(previousPeriodStart.getFullYear() - 2);
        previousPeriodEnd.setFullYear(previousPeriodEnd.getFullYear() - 1);
        break;
    }
    
    // Filtrar órdenes dentro del período de tiempo
    const ordersInTimeFrame = orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= startDate && orderDate <= now;
    });
    
    // Filtrar órdenes del período anterior para comparación
    const previousPeriodOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate >= previousPeriodStart && orderDate <= previousPeriodEnd;
    });
    
    // Calcular ingresos totales
    const totalRevenue = ordersInTimeFrame.reduce((sum, order) => sum + order.total, 0);
    const previousRevenue = previousPeriodOrders.reduce((sum, order) => sum + order.total, 0);
    
    // Calcular tendencia de ingresos (porcentaje de cambio)
    const revenueTrend = previousRevenue === 0 
      ? 100 
      : ((totalRevenue - previousRevenue) / previousRevenue) * 100;
    
    // Calcular órdenes por estado
    const ordersByStatus = customStatuses.map(status => ({
      id: status.name,
      label: status.name,
      value: ordersInTimeFrame.filter(order => order.status === status.name).length,
      color: status.color
    }));
    
    // Contar productos vendidos
    const productCounts: Record<string, { count: number; name: string }> = {};
    ordersInTimeFrame.forEach(order => {
      order.items.forEach(item => {
        if (!productCounts[item.productId]) {
          productCounts[item.productId] = { count: 0, name: item.name };
        }
        productCounts[item.productId].count += item.quantity;
      });
    });
    
    // Ordenar productos por cantidad y obtener los 5 principales
    const topProducts = Object.entries(productCounts)
      .map(([productId, data]) => ({
        productId,
        name: data.name,
        count: data.count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    
    // Calcular tiempo promedio de entrega
    const deliveredOrders = ordersInTimeFrame.filter(order => order.status === 'Entregado' || order.status === 'Delivered');
    let avgDeliveryTime = 0;
    
    if (deliveredOrders.length > 0) {
      const totalDeliveryTime = deliveredOrders.reduce((sum, order) => {
        const orderDate = new Date(order.orderDate);
        const deliveryDate = new Date(
          order.statusHistory
            .find(history => history.status === 'Entregado' || history.status === 'Delivered')?.date || order.orderDate
        );
        return sum + (deliveryDate.getTime() - orderDate.getTime());
      }, 0);
      
      avgDeliveryTime = totalDeliveryTime / deliveredOrders.length / (1000 * 60 * 60 * 24); // en días
    }
    
    // Calcular clientes únicos
    const uniqueCustomers = new Set(ordersInTimeFrame.map(order => order.franchiseeId)).size;
    const previousUniqueCustomers = new Set(previousPeriodOrders.map(order => order.franchiseeId)).size;
    
    // Calcular tendencia de clientes
    const customerTrend = previousUniqueCustomers === 0 
      ? 100 
      : ((uniqueCustomers - previousUniqueCustomers) / previousUniqueCustomers) * 100;
    
    // Calcular órdenes por día para gráficos de línea
    const revenueByDay: Record<string, number> = {};
    
    ordersInTimeFrame.forEach(order => {
      const date = new Date(order.orderDate).toISOString().split('T')[0];
      revenueByDay[date] = (revenueByDay[date] || 0) + order.total;
    });
    
    // Convertir los datos a un formato adecuado para los gráficos
    const revenueChartData = Object.entries(revenueByDay)
      .map(([date, amount]) => ({
        date: new Date(date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
        amount
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Datos para el radar de proveedores (simulados por ahora)
    const supplierPerformanceData = [
      {
        supplier: "Proveedor A",
        fulfillmentRate: 95,
        deliverySpeed: 90,
        qualityScore: 85,
        priceCompetitiveness: 80
      },
      {
        supplier: "Proveedor B",
        fulfillmentRate: 88,
        deliverySpeed: 95,
        qualityScore: 90,
        priceCompetitiveness: 75
      },
      {
        supplier: "Proveedor C",
        fulfillmentRate: 92,
        deliverySpeed: 85,
        qualityScore: 95,
        priceCompetitiveness: 90
      }
    ];
    
    // Calcular el valor promedio de las órdenes
    const averageOrderValue = totalRevenue / (ordersInTimeFrame.length || 1);
    const previousAverageOrderValue = previousRevenue / (previousPeriodOrders.length || 1);
    
    // Calcular tendencia del valor promedio de órdenes
    const aovTrend = previousAverageOrderValue === 0 
      ? 100 
      : ((averageOrderValue - previousAverageOrderValue) / previousAverageOrderValue) * 100;
    
    return {
      totalOrders: ordersInTimeFrame.length,
      previousPeriodOrders: previousPeriodOrders.length,
      ordersTrend: previousPeriodOrders.length === 0 
        ? 100 
        : ((ordersInTimeFrame.length - previousPeriodOrders.length) / previousPeriodOrders.length) * 100,
      totalRevenue,
      previousRevenue,
      revenueTrend,
      ordersByStatus,
      topProducts,
      avgDeliveryTime,
      uniqueCustomers,
      customerTrend,
      revenueChartData,
      supplierPerformanceData,
      averageOrderValue,
      aovTrend
    };
  }, [orders, customStatuses, timeFrame]);
  
  // Datos para las tablas
  const recentOrders = useMemo(() => {
    return orders
      .sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
      .slice(0, 5)
      .map(order => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customer: order.customerName,
        date: new Date(order.orderDate).toLocaleDateString('es-ES'),
        status: order.status,
        total: order.total,
        paymentMethod: order.paymentMethod.type
      }));
  }, [orders]);
  
  // Columnas para la tabla de órdenes recientes
  const recentOrderColumns = [
    { key: 'orderNumber', label: 'Order #' },
    { key: 'customer', label: 'Customer' },
    { key: 'date', label: 'Date' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: unknown) => (
        <span 
          className="px-2 py-1 text-xs rounded-full"
          style={{
            backgroundColor: customStatuses.find(s => s.name === value)?.color + '20',
            color: customStatuses.find(s => s.name === value)?.color
          }}
        >
          {String(value)}
        </span>
      )
    },
    { 
      key: 'total', 
      label: 'Total',
      render: (value: unknown) => formatCurrency(value as number)
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Control Panel</h1>
          <p className="text-gray-600 mt-1">Business Analytics and Statistics</p>
        </div>
        
        {/* Time period selector */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setTimeFrame('day')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeFrame === 'day' 
                ? 'bg-white shadow-sm text-gray-800' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeFrame('week')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeFrame === 'week' 
                ? 'bg-white shadow-sm text-gray-800' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setTimeFrame('month')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeFrame === 'month' 
                ? 'bg-white shadow-sm text-gray-800' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setTimeFrame('year')}
            className={`px-3 py-1 text-sm rounded-md ${
              timeFrame === 'year' 
                ? 'bg-white shadow-sm text-gray-800' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            This Year
          </button>
        </div>
      </div>
      
      {/* Métricas clave */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KeyMetricCard
          title="Total Orders"
          value={statistics.totalOrders}
          icon={<ShoppingBag className="h-6 w-6 text-blue-600" />}
          trend={{
            value: Math.round(statistics.ordersTrend * 10) / 10,
            label: "vs previous period"
          }}
        />
        
        <KeyMetricCard
          title="Total Revenue"
          value={formatCurrency(statistics.totalRevenue)}
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
          trend={{
            value: Math.round(statistics.revenueTrend * 10) / 10,
            label: "vs previous period"
          }}
        />
        
        <KeyMetricCard
          title="Active Customers"
          value={statistics.uniqueCustomers}
          icon={<Users className="h-6 w-6 text-purple-600" />}
          trend={{
            value: Math.round(statistics.customerTrend * 10) / 10,
            label: "vs previous period"
          }}
        />
        
        <KeyMetricCard
          title="Average Order Value"
          value={formatCurrency(statistics.averageOrderValue)}
          icon={<Activity className="h-6 w-6 text-amber-600" />}
          trend={{
            value: Math.round(statistics.aovTrend * 10) / 10,
            label: "vs previous period"
          }}
        />
      </div>
      
      {/* Charts and graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-medium mb-4">Revenue Over Time</h3>
          <RevenueLineChart data={statistics.revenueChartData} />
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-medium mb-4">Orders by Status</h3>
          <OrderStatusPieChart data={statistics.ordersByStatus} />
        </div>
      </div>
      
      {/* Segunda fila de gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-medium mb-4">Top Selling Products</h3>
          <TopProductsBarChart data={statistics.topProducts} />
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-medium mb-4">Supplier Performance</h3>
          <SupplierPerformanceRadar data={statistics.supplierPerformanceData} />
        </div>
      </div>
      
      {/* Órdenes recientes */}
      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        <RecentDataTable
          title="Recent Orders"
          data={recentOrders}
          columns={recentOrderColumns}
        />
      </div>
      
      {/* Métricas adicionales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Delivery Time</h3>
            <div className="h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl font-bold">
            {statistics.avgDeliveryTime.toFixed(1)} days
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Average time from order creation to delivery
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Pending Orders</h3>
            <div className="h-10 w-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Package className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="text-3xl font-bold">
            {orders.filter(order => order.status === 'Pending').length}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Orders requiring immediate attention
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Conversion Rate</h3>
            <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
          <div className="text-3xl font-bold">
            78.5%
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Percentage of visits resulting in orders
          </p>
        </div>
      </div>
      
      {/* Important alerts and notifications */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Important Alerts</h3>
          <div className="flex items-center text-sm text-amber-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Requires attention
          </div>
        </div>
        
        <div className="space-y-4">
          {orders.filter(o => 
            (o.status === 'Pending' || o.status === 'Pendiente') && 
            (new Date().getTime() - new Date(o.orderDate).getTime()) > 3 * 24 * 60 * 60 * 1000
          ).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <p>No hay alertas pendientes</p>
            </div>
          ) : (
            orders
              .filter(o => 
                (o.status === 'Pending' || o.status === 'Pendiente') && 
                (new Date().getTime() - new Date(o.orderDate).getTime()) > 3 * 24 * 60 * 60 * 1000
              )
              .map(order => (
                <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg bg-red-50 border-red-200">
                  <div>
                    <div className="font-medium">Pedido #{order.orderNumber}</div>
                    <div className="text-sm text-gray-600">{order.customerName}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(order.orderDate).toLocaleDateString()} ({Math.floor((new Date().getTime() - new Date(order.orderDate).getTime()) / (1000 * 60 * 60 * 24))} días)
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm">
                    Ver detalles
                  </button>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
