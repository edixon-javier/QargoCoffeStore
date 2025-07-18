import React, { useState, useEffect } from 'react';
import { useOrders, type Order, type OrderItem } from '../../contexts/OrderContext';
import { useAuth } from '../../contexts/AuthContext';
import { formatCurrency } from '../../lib/utils';
import { 
  ChevronDown, 
  Package, 
  FileText, 
  Truck, 
  CreditCard,
  Calendar,
  Hash
} from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from '../pdf/InvoicePDF';
import OrdersPaginator from './OrdersPaginator';

// A more refined status badge
const OrderStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusStyles: Record<string, string> = {
    'Pending': 'bg-yellow-100 text-yellow-800 ring-1 ring-inset ring-yellow-600/20',
    'Processing': 'bg-blue-100 text-blue-800 ring-1 ring-inset ring-blue-600/20',
    'Shipped': 'bg-indigo-100 text-indigo-800 ring-1 ring-inset ring-indigo-600/20',
    'Delivered': 'bg-green-100 text-green-800 ring-1 ring-inset ring-green-600/20',
    'Cancelled': 'bg-red-100 text-red-800 ring-1 ring-inset ring-red-600/20',
    'Awaiting Payment': 'bg-gray-100 text-gray-800 ring-1 ring-inset ring-gray-600/20',
    'Returned': 'bg-purple-100 text-purple-800 ring-1 ring-inset ring-purple-600/20',
    'Payment Confirmed': 'bg-orange-100 text-orange-800 ring-1 ring-inset ring-orange-600/20'
  };
  const style = statusStyles[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
};

// A dedicated component for displaying a single product item within the order
const OrderProductItem: React.FC<{ item: OrderItem }> = ({ item }) => (
  <div className="flex items-center space-x-4 py-4">
   <img 
      src={item.image || 'https://via.placeholder.com/150'}
      alt={item.name} 
      className="w-20 h-20 object-cover rounded-lg"
    />
    <div className="flex-grow">
      <p className="font-semibold text-gray-800">{item.name}</p>
      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
    </div>
    <div className="text-right">
      <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
      <p className="text-sm text-gray-500">@{formatCurrency(item.price)}</p>
    </div>
  </div>
);


// The main component for displaying all details of an expanded order
const OrderDetailsCard: React.FC<{ order: Order }> = ({ order }) => (
  <div className="bg-slate-50 p-6 transition-all duration-300 ease-in-out">
    {/* Product Items */}
    <div className="mb-6">
      <h4 className="text-lg font-semibold text-gray-900 mb-2">Order Items</h4>
      <div className="divide-y divide-gray-200">
        {order.items.map(item => <OrderProductItem key={item.productId} item={item} />)}
      </div>
    </div>
    
    {/* Order Summary */}
    <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
      <h5 className="text-md font-semibold mb-3">Summary</h5>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between"><dt className="text-gray-600">Subtotal</dt><dd>{formatCurrency(order.total)}</dd></div>
        <div className="flex justify-between"><dt className="text-gray-600">Shipping</dt><dd>Free</dd></div>
        <div className="flex justify-between"><dt className="text-gray-600">Taxes</dt><dd>{formatCurrency(0)}</dd></div>
        <div className="flex justify-between text-base font-semibold border-t pt-2 mt-2"><dt>Total</dt><dd>{formatCurrency(order.total)}</dd></div>
      </dl>
    </div>

    {/* Shipping and Billing */}
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-2">
          <Truck className="w-5 h-5 mr-2 text-gray-500"/> Shipping Details
        </h4>
        <div className="text-sm text-gray-600 bg-white p-4 rounded-lg border">
          <p className="font-semibold">{order.billingInfo.companyName}</p>
          <p>{order.billingInfo.shippingAddress.street}</p>
          <p>{order.billingInfo.shippingAddress.city}, {order.billingInfo.shippingAddress.state} {order.billingInfo.shippingAddress.zipCode}</p>
          {order.trackingNumber && <p className="mt-2 font-medium text-blue-600">Tracking: {order.trackingNumber}</p>}
        </div>
      </div>
      <div>
        <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-2">
          <CreditCard className="w-5 h-5 mr-2 text-gray-500"/> Billing Details
        </h4>
        <div className="text-sm text-gray-600 bg-white p-4 rounded-lg border">
           <p className="font-semibold">{order.billingInfo.companyName} ({order.billingInfo.dba})</p>
           <p>Payment via {order.paymentMethod.type}</p>
           <p>Card ending in **** {order.paymentMethod.lastFourDigits}</p>
        </div>
      </div>
    </div>
    
    {/* Action Footer */}
    <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-end space-x-4">
      {order.trackingNumber && (
        <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
          <Truck className="w-4 h-4 mr-2" />
          Track Order
        </a>
      )}
      <PDFDownloadLink
        document={<InvoicePDF order={order} />}
        fileName={`purchase-order_${order.orderNumber}.pdf`}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {({ loading }) => loading ? 'Generating PDF...' : (
          <>
            <FileText className="w-4 h-4 mr-2" />
            Download Purchase Order
          </>
        )}
      </PDFDownloadLink>
    </div>
  </div>
);

// Main Component
const RecentOrders: React.FC = () => {
  const { orders, getOrdersByCustomer } = useOrders();
  const { user } = useAuth();
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.franchiseeId) {
      // Logic to get orders is already in context, no need to manage local state
    }
  }, [user, orders]);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(prevId => (prevId === orderId ? null : orderId));
  };
  
  const userOrders = user?.franchiseeId 
    ? getOrdersByCustomer(user.franchiseeId).sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime())
    : [];

  if (userOrders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
        <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-slate-100 rounded-full p-4 mb-4">
              <Package className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">No Orders Yet</h3>
            <p className="text-gray-500 mt-2">Your recent orders will appear here once you place them.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h2>
      <OrdersPaginator
        orders={userOrders}
        itemsPerPage={5} // A smaller number is better for this detailed view
        renderOrder={(order) => {
          const isExpanded = expandedOrderId === order.id;
          return (
            <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <button
                onClick={() => toggleOrderDetails(order.id)}
                className="w-full p-6 text-left bg-white hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Left Side: Order Info */}
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-lg text-gray-900">Order #{order.orderNumber}</span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(order.orderDate).toLocaleDateString()}</div>
                        <div className="flex items-center gap-1.5"><Hash size={14} /> ID: {order.id.substring(0, 10)}</div>
                    </div>
                  </div>
                  
                  {/* Right Side: Total and Toggle Icon */}
                  <div className="flex items-center justify-between sm:justify-end gap-6">
                    <span className="text-xl font-bold text-gray-800">{formatCurrency(order.total)}</span>
                    <ChevronDown className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>
              
              {/* Expanded Details Section */}
              {isExpanded && <OrderDetailsCard order={order} />}
            </div>
          );
        }}
      />
    </div>
  );
};

export default RecentOrders;