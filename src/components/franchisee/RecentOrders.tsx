import React, { useState } from 'react';
import { useOrders, type Order } from '../../contexts/OrderContext';
import { formatCurrency } from '../../lib/utils';
import { ChevronDown, ChevronUp, Package } from 'lucide-react';

const OrderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  // Paleta de colores para los estados predefinidos
  const statusStyles: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-blue-100 text-blue-800',
    'Shipped': 'bg-indigo-100 text-indigo-800',
    'Delivered': 'bg-green-100 text-green-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };

  // Si no existe un estilo predefinido para este estado, usamos un color por defecto
  const style = statusStyles[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
};

const OrderDetails: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-2">Order Information</h4>
          <dl className="space-y-1">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Order Number:</dt>
              <dd className="text-sm font-medium">{order.orderNumber || order.id.substring(0, 10)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Order Date:</dt>
              <dd className="text-sm">
                {new Date(order.orderDate).toLocaleString()}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Current Status:</dt>
              <dd><OrderStatusBadge status={order.status} /></dd>
            </div>
            {order.trackingNumber && (
              <div className="flex justify-between">
                <dt className="text-sm text-gray-500">Tracking Number:</dt>
                <dd className="text-sm font-medium">{order.trackingNumber}</dd>
              </div>
            )}
          </dl>
          
          {order.statusHistory && order.statusHistory.length > 1 && (
            <div className="mt-4">
              <h5 className="font-medium text-xs text-gray-700 mb-1">Status History</h5>
              <div className="bg-white rounded border border-gray-200 p-2 max-h-28 overflow-y-auto">
                {order.statusHistory.slice().reverse().map((history, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs py-1">
                    <span className="text-gray-600">
                      {new Date(history.date).toLocaleString()}
                    </span>
                    <OrderStatusBadge status={history.status} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-gray-700 mb-2">Billing Information</h4>
          <dl className="space-y-1">
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Company:</dt>
              <dd className="text-sm">{order.billingInfo.companyName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">DBA:</dt>
              <dd className="text-sm">{order.billingInfo.dba}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-gray-500">Payment:</dt>
              <dd className="text-sm">
                {order.paymentMethod.type} ****{order.paymentMethod.lastFourDigits}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Order Items</h4>
        <div className="bg-white rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <tr key={index} className="text-sm">
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3 text-right">{item.quantity}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(item.price)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(item.price * item.quantity)}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-medium">
                <td colSpan={3} className="px-4 py-3 text-right">Total</td>
                <td className="px-4 py-3 text-right">{formatCurrency(order.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-sm text-gray-700 mb-2">Shipping Address</h4>
        <p className="text-sm text-gray-600">
          {order.billingInfo.shippingAddress.street}<br />
          {order.billingInfo.shippingAddress.city}, {order.billingInfo.shippingAddress.state} {order.billingInfo.shippingAddress.zipCode}
        </p>
      </div>
    </div>
  );
};

const RecentOrders: React.FC = () => {
  const { orders } = useOrders();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h2 className="text-xl font-medium mb-4">Recent Orders</h2>
        <div className="text-center py-8">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No orders found</p>
        </div>
      </div>
    );
  }

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="bg-white rounded-lg shadow-soft p-6">
      <h2 className="text-xl font-medium mb-4">Recent Orders</h2>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border rounded-lg">
            <button
              onClick={() => toggleOrderDetails(order.id)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="flex flex-col">
                  <span className="font-medium">
                    {order.orderNumber || order.id.substring(0, 10)}
                  </span>
                  {order.trackingNumber && (
                    <span className="text-xs text-gray-500">
                      Tracking: {order.trackingNumber}
                    </span>
                  )}
                </div>
                <OrderStatusBadge status={order.status} />
                <span className="text-sm text-gray-500">
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium">{formatCurrency(order.total)}</span>
                {expandedOrderId === order.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </button>
            {expandedOrderId === order.id && <OrderDetails order={order} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
