import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Users, Package, Calendar, Clock, MapPin, Phone, Mail, CreditCard } from 'lucide-react';
import type { User, BillingInfo } from '../../lib/types';
import LoadingSpinner from '../ui/LoadingSpinner';
import { formatCurrency } from '../../lib/utils';

// Mock franchisee data
const mockFranchisees: (User & { billingInfo?: BillingInfo })[] = [
  {
    id: "f1",
    name: "Prestige Cafe",
    email: "dearborn-22022@qargocoffee.com",
    role: "franchisee",
    createdAt: "2023-01-15T08:00:00Z",
    billingInfo: {
      companyName: "Prestige Cafe",
      dba: "Qargo Connect Dearborne",
      billingAddress: {
        street: "22022 Michigan Ave Unit C",
        city: "Dearborn",
        state: "MI",
        zipCode: "48124-2889"
      },
      shippingAddress: {
        street: "22022 Michigan Ave Unit C",
        city: "Dearborn",
        state: "MI",
        zipCode: "48124-2889"
      },
      email: "dearborn-22022@qargocoffee.com",
      phone: "(734) 686-1192",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 4242",
        expiryDate: "12/25",
        cvv: "***",
        cardholderName: "JOHN NORT"
      }
    }
  },
];

// Mock orders
const mockOrders = [
  {
    id: "ord-001",
    userId: "f1",
    customerName: "Prestige Cafe",
    orderNumber: "ORD-2023-001",
    status: "delivered",
    items: [
      { productId: "p1", name: "Premium Blend Coffee", quantity: 10, price: 24.99 },
      { productId: "p2", name: "Ceramic Mugs", quantity: 20, price: 12.99 },
    ],
    total: 509.70,
    date: "2023-06-10T14:30:00Z",
  },
  {
    id: "ord-002",
    userId: "f1",
    customerName: "Prestige Cafe",
    orderNumber: "ORD-2023-008",
    status: "processing",
    items: [
      { productId: "p3", name: "Special Coffee Beans", quantity: 5, price: 39.99 },
      { productId: "p4", name: "Coffee Grinder", quantity: 2, price: 89.99 },
    ],
    total: 379.93,
    date: "2023-06-25T10:15:00Z",
  },
  {
    id: "ord-003",
    userId: "f1",
    customerName: "Prestige Cafe",
    orderNumber: "ORD-2023-012",
    status: "pending",
    items: [
      { productId: "p5", name: "Vanilla Syrup", quantity: 8, price: 8.99 },
      { productId: "p6", name: "Napkin Pack", quantity: 30, price: 3.49 },
    ],
    total: 176.62,
    date: "2023-07-02T16:45:00Z",
  },
];

const FranchiseeDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [franchisee, setFranchisee] = useState<User & { billingInfo?: BillingInfo } | null>(null);
  const [orders, setOrders] = useState<{
    id: string;
    userId: string;
    customerName: string;
    orderNumber: string;
    status: string;
    items: Array<{ productId: string; name: string; quantity: number; price: number }>;
    total: number;
    date: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    averageOrderValue: 0,
    lastOrder: ''
  });
  
  useEffect(() => {
    const loadFranchiseeData = async () => {
      try {
        // Simulating data loading
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Find franchisee by ID
        const foundFranchisee = mockFranchisees.find(f => f.id === id);
        if (foundFranchisee) {
          setFranchisee(foundFranchisee);
          
          // Find franchisee orders
          const franchiseeOrders = mockOrders.filter(o => o.userId === id);
          setOrders(franchiseeOrders);
          
          // Calculate statistics
          if (franchiseeOrders.length > 0) {
            const totalSpent = franchiseeOrders.reduce((sum, order) => sum + order.total, 0);
            const lastOrderDate = new Date(Math.max(...franchiseeOrders.map(o => new Date(o.date).getTime()))).toISOString();
            
            setStats({
              totalOrders: franchiseeOrders.length,
              totalSpent,
              averageOrderValue: totalSpent / franchiseeOrders.length,
              lastOrder: lastOrderDate
            });
          }
        }
      } catch (error) {
        console.error('Error loading franchisee data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadFranchiseeData();
    }
  }, [id]);
  
  const handleEditFranchisee = () => {
    navigate(`/admin/franchisees/edit/${id}`);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return <div className="flex justify-center p-8"><LoadingSpinner /></div>;
  }
  
  if (!franchisee) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-800">Franchisee not found</h2>
        <p className="text-gray-600 mt-2">The franchisee you are looking for does not exist or has been deleted</p>
        <button 
          onClick={() => navigate('/admin/franchisees')}
          className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Back to list
        </button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/admin/franchisees')}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-semibold">Franchisee Details</h1>
        </div>
        <button 
          onClick={handleEditFranchisee}
          className="flex items-center gap-2 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Edit className="h-5 w-5" />
          <span>Edit</span>
        </button>
      </div>
      
      {/* Información General */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
            <Users className="h-10 w-10 text-primary-700" />
          </div>
          <div className="flex-grow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-medium text-gray-900">{franchisee.billingInfo?.companyName || franchisee.name}</h2>
                <p className="text-gray-600">{franchisee.billingInfo?.dba || 'No business name'}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  Franchisee
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{franchisee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{franchisee.billingInfo?.phone || 'Not available'}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">{franchisee.billingInfo?.billingAddress.city || 'N/A'}, {franchisee.billingInfo?.billingAddress.state || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-700">Since {new Date(franchisee.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Total Pedidos</span>
            <Package className="h-6 w-6 text-primary-600" />
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-semibold">{stats.totalOrders}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Total Gastado</span>
            <CreditCard className="h-6 w-6 text-green-600" />
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-semibold">{formatCurrency(stats.totalSpent)}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Valor Promedio</span>
            <CreditCard className="h-6 w-6 text-blue-600" />
          </div>
          <div className="mt-2">
            <h3 className="text-2xl font-semibold">{formatCurrency(stats.averageOrderValue)}</h3>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Último Pedido</span>
            <Clock className="h-6 w-6 text-purple-600" />
          </div>
          <div className="mt-2">
            <h3 className="text-lg font-semibold">
              {stats.lastOrder ? new Date(stats.lastOrder).toLocaleDateString() : 'N/A'}
            </h3>
          </div>
        </div>
      </div>
      
      {/* Información de contacto y ubicación */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Name</span>
              <span className="font-medium">{franchisee.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Email</span>
              <span className="font-medium">{franchisee.email}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Phone</span>
              <span className="font-medium">{franchisee.billingInfo?.phone || 'Not available'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Company</span>
              <span className="font-medium">{franchisee.billingInfo?.companyName || 'Not available'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">DBA</span>
              <span className="font-medium">{franchisee.billingInfo?.dba || 'Not available'}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-medium mb-4">Addresses</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h4>
              <address className="not-italic">
                <p>{franchisee.billingInfo?.shippingAddress.street || 'Not available'}</p>
                <p>
                  {franchisee.billingInfo?.shippingAddress.city || 'Not available'}, {franchisee.billingInfo?.shippingAddress.state || ''} {franchisee.billingInfo?.shippingAddress.zipCode || ''}
                </p>
              </address>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">Billing Address</h4>
              <address className="not-italic">
                <p>{franchisee.billingInfo?.billingAddress.street || 'Not available'}</p>
                <p>
                  {franchisee.billingInfo?.billingAddress.city || 'Not available'}, {franchisee.billingInfo?.billingAddress.state || ''} {franchisee.billingInfo?.billingAddress.zipCode || ''}
                </p>
              </address>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Payment Information</h4>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <span className="text-gray-700">
                {franchisee.billingInfo?.paymentMethod.cardNumber || 'Not available'} (Exp: {franchisee.billingInfo?.paymentMethod.expiryDate || 'N/A'})
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Historial de Pedidos */}
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h3 className="text-lg font-medium mb-4">Order History</h3>
        
        {orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-primary-600">{order.orderNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">{new Date(order.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-500">{new Date(order.date).toLocaleTimeString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status === 'pending' ? 'Pending' : 
                         order.status === 'processing' ? 'Processing' :
                         order.status === 'delivered' ? 'Delivered' :
                         order.status === 'canceled' ? 'Canceled' : 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items.length} {order.items.length === 1 ? 'product' : 'products'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.items.map(item => item.name).join(', ').substring(0, 30)}
                        {order.items.map(item => item.name).join(', ').length > 30 ? '...' : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            This franchisee has no registered orders.
          </div>
        )}
      </div>
    </div>
  );
};

export default FranchiseeDetail;
