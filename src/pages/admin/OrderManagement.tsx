import React, { useState } from 'react';
import { useOrders } from '../../contexts/OrderContext';
import { useOrderStatus } from '../../hooks/useOrderStatus';
import { formatCurrency } from '../../lib/utils';
import { Package, PlusCircle, Pencil, Save, X, Filter } from 'lucide-react';
import type { Order } from '../../lib/types/order';

const OrderManagement: React.FC = () => {
  const { orders, updateOrder } = useOrders();
  const { customStatuses, addStatus } = useOrderStatus();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [showNewStatusForm, setShowNewStatusForm] = useState(false);
  const [newStatus, setNewStatus] = useState({ name: '', color: '#000000' });
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const handleStatusChange = (orderId: string, newStatus: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const updatedOrder = {
        ...order,
        status: newStatus,
        statusHistory: [
          ...order.statusHistory,
          {
            status: newStatus,
            date: new Date().toISOString(),
          }
        ]
      };
      updateOrder(orderId, updatedOrder);
    }
  };

  const handleTrackingUpdate = (orderId: string, trackingNumber: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      updateOrder(orderId, { ...order, trackingNumber });
    }
  };

  const handleNewStatus = () => {
    if (newStatus.name.trim()) {
      addStatus(newStatus);
      setNewStatus({ name: '', color: '#000000' });
      setShowNewStatusForm(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-600 mt-1">Manage and track all orders</p>
        </div>
      </div>

      {/* Status Management Form */}
      {showNewStatusForm && (
        <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Add New Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Status Name"
              value={newStatus.name}
              onChange={(e) => setNewStatus({ ...newStatus, name: e.target.value })}
              className="p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={newStatus.color}
                onChange={(e) => setNewStatus({ ...newStatus, color: e.target.value })}
                className="p-1 border rounded h-10 w-20"
              />
              <span className="text-sm text-gray-600">Pick a color</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleNewStatus}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
              >
                <Save className="h-5 w-5" />
                Save
              </button>
              <button
                onClick={() => setShowNewStatusForm(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-2"
              >
                <X className="h-5 w-5" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter and Status Overview */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="flex items-center gap-4 mb-6">
          <Filter className="h-5 w-5 text-gray-500" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Orders</option>
            {customStatuses.map(status => (
              <option key={status.id} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {customStatuses.map(status => (
            <div
              key={status.id}
              className="p-3 rounded-lg text-center"
              style={{ backgroundColor: status.color + '20', borderColor: status.color }}
            >
              <span className="font-medium" style={{ color: status.color }}>
                {status.name}
              </span>
              <div className="text-sm text-gray-600 mt-1">
                {orders.filter(o => o.status === status.name).length} orders
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-soft">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <div key={order.id} className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-medium">Order #{order.orderNumber}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.billingInfo.companyName} - {formatCurrency(order.total)}
                    </p>
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

                    <input
                      type="text"
                      placeholder="Tracking #"
                      value={order.trackingNumber || ''}
                      onChange={(e) => handleTrackingUpdate(order.id, e.target.value)}
                      className="p-2 border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />

                    <button
                      onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {expandedOrderId === order.id && (
                  <div className="mt-6 border-t pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Order Details */}
                      <div>
                        <h4 className="font-medium mb-4">Order Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status History:</span>
                          </div>
                          <div className="ml-4 space-y-1">
                            {order.statusHistory.map((history, idx) => (
                              <div key={idx} className="text-sm text-gray-600">
                                {new Date(history.date).toLocaleString()}: {history.status}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div>
                        <h4 className="font-medium mb-4">Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between">
                              <span>{item.name} x{item.quantity}</span>
                              <span>{formatCurrency(item.price * item.quantity)}</span>
                            </div>
                          ))}
                          <div className="border-t pt-2 mt-2 font-medium">
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
    </div>
  );
};

export default OrderManagement;
