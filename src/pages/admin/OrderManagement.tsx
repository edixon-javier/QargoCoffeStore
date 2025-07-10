import React, { useState, useMemo } from 'react';
import { useOrders } from '../../contexts/OrderContext';
import { useOrderStatus } from '../../hooks/useOrderStatus';
import { formatCurrency, formatDate } from '../../lib/utils';
import { 
  Package, Search, Clock, AlertTriangle, 
  Download, RefreshCw, ChevronDown, ChevronUp, Truck,
  DollarSign, ShoppingBag, Users, CheckCircle
} from 'lucide-react';

const OrderManagement: React.FC = () => {
  const { orders, updateOrder } = useOrders();
  const { customStatuses } = useOrderStatus();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [customerFilter, setCustomerFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date-desc');
  const [activePage, setActivePage] = useState<'orders' | 'stats'>('orders');
  
  // Stats tracking
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<'day' | 'week' | 'month' | 'year'>('month');

  // Process orders data for filtering and statistics
  const processedOrders = useMemo(() => {
    // Apply all filters
    let filtered = [...orders];
    
    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }
    
    // Filter by search term (orderNumber, customerName, or products)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(order => 
        order.orderNumber?.toLowerCase().includes(term) || 
        order.customerName.toLowerCase().includes(term) ||
        order.items.some(item => item.name.toLowerCase().includes(term))
      );
    }
    
    // Filter by date range
    if (dateFilter !== 'all') {
      const now = new Date();
      let startDate = new Date();
      
      switch (dateFilter) {
        case 'today': {
          startDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= startDate;
          });
          break;
        }
        case 'yesterday': {
          startDate.setDate(startDate.getDate() - 1);
          startDate.setHours(0, 0, 0, 0);
          const endDate = new Date(startDate);
          endDate.setHours(23, 59, 59, 999);
          filtered = filtered.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= startDate && orderDate <= endDate;
          });
          break;
        }
        case 'this-week': {
          startDate.setDate(startDate.getDate() - startDate.getDay());
          startDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= startDate;
          });
          break;
        }
        case 'this-month': {
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          filtered = filtered.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= startDate;
          });
          break;
        }
        case 'last-month': {
          startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          const endDate = new Date(now.getFullYear(), now.getMonth(), 0);
          filtered = filtered.filter(order => {
            const orderDate = new Date(order.orderDate);
            return orderDate >= startDate && orderDate <= endDate;
          });
          break;
        }
        default:
          // No additional filtering for 'all'
          break;
      }
    }
    
    // Filter by customer
    if (customerFilter !== 'all') {
      filtered = filtered.filter(order => order.franchiseeId === customerFilter);
    }
    
    // Sort orders
    switch (sortBy) {
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime());
        break;
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        break;
      case 'total-asc':
        filtered.sort((a, b) => a.total - b.total);
        break;
      case 'total-desc':
        filtered.sort((a, b) => b.total - a.total);
        break;
      case 'status':
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;
      default:
        // Default sort by most recent
        filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    }
    
    return filtered;
  }, [orders, filterStatus, searchTerm, dateFilter, customerFilter, sortBy]);

  // Calculate statistics
  const statistics = useMemo(() => {
    // Get the date range for the selected time frame
    const now = new Date();
    const startDate = new Date();
    
    switch (selectedTimeFrame) {
      case 'day':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }
    
    // Filter orders within the time frame manually
    const ordersInTimeFrame = orders.filter(order => 
      new Date(order.orderDate) >= startDate && new Date(order.orderDate) <= now
    );
    
    // Count orders by status
    const ordersByStatus = customStatuses.reduce((acc, status) => {
      acc[status.name] = ordersInTimeFrame.filter(order => order.status === status.name).length;
      return acc;
    }, {} as Record<string, number>);
    
    // Calculate total revenue
    const totalRevenue = ordersInTimeFrame.reduce((sum, order) => sum + order.total, 0);
    
    // Count orders per product
    const productCounts: Record<string, { count: number, name: string }> = {};
    ordersInTimeFrame.forEach(order => {
      order.items.forEach(item => {
        if (!productCounts[item.productId]) {
          productCounts[item.productId] = { count: 0, name: item.name };
        }
        productCounts[item.productId].count += item.quantity;
      });
    });
    
    // Sort products by count and get top 5
    const topProducts = Object.values(productCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
      
    // Calculate average delivery time for completed orders
    const deliveredOrders = ordersInTimeFrame.filter(order => order.status === 'Entregado');
    let avgDeliveryTime = 0;
    
    if (deliveredOrders.length > 0) {
      const totalDeliveryTime = deliveredOrders.reduce((sum, order) => {
        const orderDate = new Date(order.orderDate);
        const deliveryDate = new Date(
          order.statusHistory
            .find(history => history.status === 'Entregado')?.date || order.orderDate
        );
        return sum + (deliveryDate.getTime() - orderDate.getTime());
      }, 0);
      
      avgDeliveryTime = totalDeliveryTime / deliveredOrders.length / (1000 * 60 * 60 * 24); // in days
    }
    
    // Get unique franchisees who placed orders
    const uniqueFranchisees = new Set(ordersInTimeFrame.map(order => order.franchiseeId));
    
    // Calculate orders per day during the period
    const ordersPerDay: Record<string, number> = {};
    
    if (selectedTimeFrame !== 'day') {
      ordersInTimeFrame.forEach(order => {
        const date = new Date(order.orderDate).toISOString().split('T')[0];
        ordersPerDay[date] = (ordersPerDay[date] || 0) + 1;
      });
    }
    
    return {
      totalOrders: ordersInTimeFrame.length,
      ordersByStatus,
      totalRevenue,
      topProducts,
      avgDeliveryTime,
      uniqueCustomers: uniqueFranchisees.size,
      ordersPerDay,
    };
  }, [selectedTimeFrame, customStatuses, orders]);

  // Extract unique customers for filtering
  const uniqueCustomers = useMemo(() => {
    const customers = new Set<string>();
    const customerMap: Record<string, string> = {};
    
    orders.forEach(order => {
      if (order.franchiseeId) {
        customers.add(order.franchiseeId);
        customerMap[order.franchiseeId] = order.customerName;
      }
    });
    
    return Array.from(customers).map(id => ({
      id,
      name: customerMap[id] || id
    }));
  }, [orders]);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order && order.status !== newStatus) {
      // Solo actualizamos el status y dejamos que el contexto maneje el historial
      updateOrder(orderId, {
        status: newStatus,
      });
    }
  };

  const handleTrackingUpdate = (orderId: string, trackingNumber: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order && order.trackingNumber !== trackingNumber) {
      updateOrder(orderId, { trackingNumber });
    }
  };
  
  // Function to export orders data as CSV
  const exportOrdersCSV = () => {
    // Create CSV header
    let csv = 'ID,Número de Orden,Cliente,Fecha,Estado,Total (USD),Método de Pago,Número de Seguimiento\n';
    
    // Add each order as a row
    processedOrders.forEach(order => {
      const row = [
        order.id,
        order.orderNumber || '',
        order.customerName,
        new Date(order.orderDate).toLocaleDateString('es-ES'),
        order.status,
        formatCurrency(order.total).replace('$', ''),
        order.paymentMethod.type,
        order.trackingNumber || ''
      ];
      
      // Escape fields that might contain commas
      const escapedRow = row.map(field => {
        const stringField = String(field);
        return stringField.includes(',') ? `"${stringField}"` : stringField;
      });
      
      csv += escapedRow.join(',') + '\n';
    });
    
    // Create and download the CSV file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `pedidos_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-600 mt-1">Manage and track all orders from a centralized dashboard</p>
        </div>
        
        {/* Tab Selector */}
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActivePage('orders')}
            className={`px-4 py-2 rounded-md ${
              activePage === 'orders' 
                ? 'bg-white shadow-sm text-gray-800' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActivePage('stats')}
            className={`px-4 py-2 rounded-md ${
              activePage === 'stats' 
                ? 'bg-white shadow-sm text-gray-800' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Statistics
          </button>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-3">
          <button 
            onClick={exportOrdersCSV} 
            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center gap-2 text-sm font-medium"
          >
            <Download size={16} />
            Export CSV
          </button>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {activePage === 'orders' ? (
        <>
          {/* Advanced Filters */}
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h3 className="text-lg font-medium mb-4">Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by order number, customer or product..." 
                  className="pl-10 p-2 w-full border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              {/* Status filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="p-2 w-full border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All statuses</option>
                  {customStatuses.map(status => (
                    <option key={status.id} value={status.name}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Date filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="p-2 w-full border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All dates</option>
                  <option value="today">Today</option>
                  <option value="yesterday">Yesterday</option>
                  <option value="this-week">This week</option>
                  <option value="this-month">This month</option>
                  <option value="last-month">Last month</option>
                </select>
              </div>
              
              {/* Customer filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                <select
                  value={customerFilter}
                  onChange={(e) => setCustomerFilter(e.target.value)}
                  className="p-2 w-full border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All customers</option>
                  {uniqueCustomers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              {/* Sort options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="date-desc">Date (newest)</option>
                  <option value="date-asc">Date (oldest)</option>
                  <option value="total-desc">Amount (highest)</option>
                  <option value="total-asc">Amount (lowest)</option>
                  <option value="status">Status</option>
                </select>
              </div>
              
              {/* Results count */}
              <div className="text-sm text-gray-600">
                Showing {processedOrders.length} of {orders.length} orders
              </div>
            </div>
          </div>

          {/* Status Overview */}
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h3 className="text-lg font-medium mb-4">Status Overview</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {customStatuses.map(status => (
                <div
                  key={status.id}
                  className="p-3 rounded-lg text-center border"
                  style={{ backgroundColor: status.color + '20', borderColor: status.color }}
                >
                  <span className="font-medium" style={{ color: status.color }}>
                    {status.name}
                  </span>
                  <div className="text-2xl font-bold mt-1">
                    {orders.filter(o => o.status === status.name).length}
                  </div>
                  <div className="text-xs text-gray-500">orders</div>
                </div>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div className="bg-white rounded-lg shadow-soft">
            {processedOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No orders found</p>
                <p className="text-sm text-gray-400 mt-2">Try different filters</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {processedOrders.map(order => (
                  <div key={order.id} className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium">Order #{order.orderNumber}</h3>
                          <div
                            className="px-2 py-1 text-xs rounded-full"
                            style={{ 
                              backgroundColor: customStatuses.find(s => s.name === order.status)?.color + '20',
                              color: customStatuses.find(s => s.name === order.status)?.color
                            }}
                          >
                            {order.status}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {order.billingInfo.companyName} - {formatCurrency(order.total)}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                          <span>{order.items.length} {order.items.length === 1 ? 'product' : 'products'}</span>
                          <span>{order.paymentMethod.type}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          {customStatuses.map(status => (
                            <option key={status.id} value={status.name}>
                              {status.name}
                            </option>
                          ))}
                        </select>

                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Truck className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            placeholder="Tracking #"
                            value={order.trackingNumber || ''}
                            onChange={(e) => handleTrackingUpdate(order.id, e.target.value)}
                            className="pl-9 p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>

                        <button
                          onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                          className="p-2 text-gray-500 hover:text-gray-700 border rounded-md hover:bg-gray-50"
                        >
                          {expandedOrderId === order.id ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {expandedOrderId === order.id && (
                      <div className="mt-6 border-t pt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Order Details */}
                          <div>
                            <h4 className="font-medium mb-4">Order Details</h4>
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm text-gray-500">Order ID</div>
                                <div>{order.id}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Customer</div>
                                <div>{order.customerName}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Shipping Address</div>
                                <div>{order.billingInfo.shippingAddress.street}</div>
                                <div>
                                  {order.billingInfo.shippingAddress.city}, {order.billingInfo.shippingAddress.state} {order.billingInfo.shippingAddress.zipCode}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Contact</div>
                                <div>{order.billingInfo.email}</div>
                                <div>{order.billingInfo.phone}</div>
                              </div>
                            </div>
                          </div>

                          {/* Payment and Tracking */}
                          <div>
                            <h4 className="font-medium mb-4">Payment & Tracking</h4>
                            <div className="space-y-3">
                              <div>
                                <div className="text-sm text-gray-500">Payment Method</div>
                                <div>{order.paymentMethod.type} **** {order.paymentMethod.lastFourDigits}</div>
                              </div>
                              {order.trackingNumber && (
                                <div>
                                  <div className="text-sm text-gray-500">Tracking Number</div>
                                  <div>{order.trackingNumber}</div>
                                </div>
                              )}
                              <div>
                                <div className="text-sm text-gray-500">Status History</div>
                                <div className="ml-0 space-y-1 mt-2">
                                  {order.statusHistory.map((history, idx) => (
                                    <div key={idx} className="flex items-center gap-2">
                                      <div 
                                        className="w-2 h-2 rounded-full"
                                        style={{
                                          backgroundColor: customStatuses.find(s => s.name === history.status)?.color || '#888'
                                        }}
                                      />
                                      <div className="text-sm">
                                        <span className="font-medium">{history.status}</span> - {new Date(history.date).toLocaleDateString()} {new Date(history.date).toLocaleTimeString()}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Items */}
                          <div>
                            <h4 className="font-medium mb-4">Order Items</h4>
                            <div className="space-y-3">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between border-b pb-2">
                                  <div>
                                    <div>{item.name}</div>
                                    <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                                  </div>
                                  <div className="font-medium">
                                    {formatCurrency(item.price * item.quantity)}
                                  </div>
                                </div>
                              ))}
                              <div className="pt-2 font-medium">
                                <div className="flex justify-between">
                                  <span>Total</span>
                                  <span>{formatCurrency(order.total)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        // Statistics Page
        <div className="space-y-6">
          {/* Time frame selector */}
          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Statistics & Analytics</h3>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setSelectedTimeFrame('day')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedTimeFrame === 'day' 
                      ? 'bg-white shadow-sm text-gray-800' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Today
                </button>
                <button
                  onClick={() => setSelectedTimeFrame('week')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedTimeFrame === 'week' 
                      ? 'bg-white shadow-sm text-gray-800' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setSelectedTimeFrame('month')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedTimeFrame === 'month' 
                      ? 'bg-white shadow-sm text-gray-800' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  This Month
                </button>
                <button
                  onClick={() => setSelectedTimeFrame('year')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedTimeFrame === 'year' 
                      ? 'bg-white shadow-sm text-gray-800' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  This Year
                </button>
              </div>
            </div>
          </div>
          
          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Orders */}
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-3xl font-bold mt-2">{statistics.totalOrders}</p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              {selectedTimeFrame !== 'day' && (
                <div className="mt-4 text-sm text-gray-500">
                  In the last {selectedTimeFrame === 'week' ? '7 days' : selectedTimeFrame === 'month' ? '30 days' : '12 months'}
                </div>
              )}
            </div>
            
            {/* Revenue */}
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <p className="text-3xl font-bold mt-2">{formatCurrency(statistics.totalRevenue)}</p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            {/* Customers */}
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Customers</p>
                  <p className="text-3xl font-bold mt-2">{statistics.uniqueCustomers}</p>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
            
            {/* Avg Delivery Time */}
            <div className="bg-white rounded-lg shadow-soft p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">Average Delivery Time</p>
                  <p className="text-3xl font-bold mt-2">
                    {statistics.avgDeliveryTime.toFixed(1)} days
                  </p>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts and detailed stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Orders by Status Chart */}
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h3 className="text-lg font-medium mb-4">Orders by Status</h3>
              <div className="h-64 flex items-end justify-around">
                {Object.entries(statistics.ordersByStatus).map(([status, count]) => {
                  const statusObj = customStatuses.find(s => s.name === status);
                  const maxCount = Math.max(...Object.values(statistics.ordersByStatus));
                  const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  
                  return (
                    <div key={status} className="flex flex-col items-center">
                      <div className="text-sm font-medium mb-1">{count}</div>
                      <div 
                        className="w-12 rounded-t-md"
                        style={{
                          height: `${Math.max(percentage, 5)}%`,
                          backgroundColor: statusObj?.color || '#888'
                        }}
                      />
                      <div className="text-xs mt-2 text-center max-w-[80px] truncate">{status}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Top Products */}
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h3 className="text-lg font-medium mb-4">Most Popular Products</h3>
              <div className="space-y-4">
                {statistics.topProducts.length > 0 ? (
                  statistics.topProducts.map((product, index) => {
                    const maxCount = statistics.topProducts[0].count;
                    const percentage = (product.count / maxCount) * 100;
                    
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{product.name}</span>
                          <span className="font-medium">{product.count} units</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No data available
                  </div>
                )}
              </div>
            </div>
            
            {/* Orders Over Time Chart */}
            <div className="bg-white rounded-lg shadow-soft p-6 lg:col-span-2">
              <h3 className="text-lg font-medium mb-4">Order Trends</h3>
              {selectedTimeFrame !== 'day' && Object.keys(statistics.ordersPerDay).length > 0 ? (
                <div className="h-64 flex items-end justify-between">
                  {Object.entries(statistics.ordersPerDay)
                    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                    .slice(-14) // Show last 14 data points
                    .map(([date, count]) => {
                      const maxCount = Math.max(...Object.values(statistics.ordersPerDay));
                      const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
                      const displayDate = new Date(date).toLocaleDateString('en-US', { 
                        day: '2-digit',
                        month: 'short'
                      });
                      
                      return (
                        <div key={date} className="flex flex-col items-center">
                          <div className="text-sm mb-1">{count}</div>
                          <div 
                            className="w-8 rounded-t-md bg-blue-500"
                            style={{ height: `${Math.max(percentage, 5)}%` }}
                          />
                          <div className="text-xs mt-2 rotate-45 origin-top-left">{displayDate}</div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Not enough data to display a trend
                </div>
              )}
            </div>
            
            {/* Orders needing attention */}
            <div className="bg-white rounded-lg shadow-soft p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Orders Requiring Attention</h3>
                <div className="flex items-center gap-2 text-sm text-red-500">
                  <AlertTriangle size={16} />
                  Requires immediate action
                </div>
              </div>
              
              {orders.filter(o => 
                // Criteria for orders needing attention: Pending for more than 3 days or issues
                (o.status === 'Pending' || o.status === 'Pendiente') && 
                (new Date().getTime() - new Date(o.orderDate).getTime()) > 3 * 24 * 60 * 60 * 1000
              ).length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p>All orders are up to date!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders
                    .filter(o => 
                      (o.status === 'Pending' || o.status === 'Pendiente') && 
                      (new Date().getTime() - new Date(o.orderDate).getTime()) > 3 * 24 * 60 * 60 * 1000
                    )
                    .map(order => (
                      <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg bg-red-50 border-red-200">
                        <div>
                          <div className="font-medium">Order #{order.orderNumber}</div>
                          <div className="text-sm text-gray-600">{order.customerName}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(order.orderDate).toLocaleDateString()} ({Math.floor((new Date().getTime() - new Date(order.orderDate).getTime()) / (1000 * 60 * 60 * 24))} days)
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className="p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          >
                            {customStatuses.map(status => (
                              <option key={status.id} value={status.name}>
                                {status.name}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => setExpandedOrderId(order.id)}
                            className="p-2 bg-white text-gray-600 hover:text-gray-800 rounded-md border"
                          >
                            View details
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
