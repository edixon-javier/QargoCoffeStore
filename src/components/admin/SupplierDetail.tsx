import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Supplier, Product } from '../../lib/types';
import { mockSuppliers } from '../../mockSuppliers';
import { formatCurrency } from '../../lib/utils';
import { Edit, ExternalLink, Package, Calendar, CheckCircle, XCircle, MapPin, Phone, Mail, FileText } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';

const SupplierDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    lastDelivery: '',
    averageDeliveryTime: ''
  });

  useEffect(() => {
    const loadSupplierData = async () => {
      try {
        // Simulating data loading
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Find supplier by ID
        const foundSupplier = mockSuppliers.find(s => s.id === id);
        if (foundSupplier) {
          setSupplier(foundSupplier);
          
          // En un caso real, aquí cargarías los productos asociados
          setProducts([]); // Placeholder
          
          // Estadísticas de ejemplo
          setStats({
            totalProducts: 8, // Placeholder
            totalOrders: 24, // Placeholder
            lastDelivery: '2023-06-15', // Placeholder
            averageDeliveryTime: '4 days' // Placeholder
          });
        }
      } catch (error) {
        console.error('Error loading supplier data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadSupplierData();
    }
  }, [id]);

  const handleEditSupplier = () => {
    navigate(`/admin/suppliers/edit/${id}`);
  };

  if (loading) {
    return <div className="flex justify-center p-8"><LoadingSpinner /></div>;
  }

  if (!supplier) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-800">Supplier not found</h2>
        <p className="text-gray-600 mt-2">The supplier you are looking for does not exist or has been deleted</p>
        <button 
          onClick={() => navigate('/admin/suppliers')}
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
          <div className="h-16 w-16 flex-shrink-0">
            {supplier.logo ? (
              <img
                src={supplier.logo}
                alt={supplier.name}
                className="h-16 w-16 rounded-full object-cover border-2 border-primary-100"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-700 text-xl font-semibold">
                  {supplier.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{supplier.name}</h1>
            <p className="text-gray-600">{supplier.companyName || 'No company name provided'}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
            supplier.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {supplier.status === 'active' ? (
              <CheckCircle className="h-4 w-4 mr-1" />
            ) : (
              <XCircle className="h-4 w-4 mr-1" />
            )}
            {supplier.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
        <button 
          onClick={handleEditSupplier}
          className="flex items-center gap-2 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Edit className="h-5 w-5" />
          <span>Edit Supplier</span>
        </button>
      </div>
      
      {/* Información General */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Supplier Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-800">
                  {supplier.description || 'No description available'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                <div className="mt-1 flex items-center text-gray-800">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  {new Date(supplier.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Minimum Order Value (USD)</h3>
                <p className="mt-1 text-gray-800">
                  {supplier.minOrderValue ? formatCurrency(supplier.minOrderValue) : 'Not specified'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500">Delivery Time</h3>
                <p className="mt-1 text-gray-800">
                  {supplier.deliveryTime || 'Not specified'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <Package className="h-6 w-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">{stats.totalProducts}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FileText className="h-6 w-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">{stats.totalOrders}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <Calendar className="h-6 w-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Last Delivery</p>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">
                {stats.lastDelivery ? new Date(stats.lastDelivery).toLocaleDateString() : 'N/A'}
              </h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100 text-orange-600">
              <ExternalLink className="h-6 w-6" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Avg Delivery Time</p>
              <h3 className="mt-1 text-xl font-semibold text-gray-900">{stats.averageDeliveryTime}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Información de contacto y ubicación */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <a href={`mailto:${supplier.contactEmail}`} className="text-blue-600 hover:underline">
                  {supplier.contactEmail}
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <a href={`tel:${supplier.contactPhone}`} className="text-gray-800">
                  {supplier.contactPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Address</h2>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
            <div>
              <p className="text-gray-800">{supplier.address.street}</p>
              <p className="text-gray-800">
                {supplier.address.city}, {supplier.address.state} {supplier.address.zipCode}
              </p>
              <p className="text-gray-800">{supplier.address.country}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Notas */}
      {supplier.notes && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Notes</h2>
          <p className="text-gray-700 whitespace-pre-line">{supplier.notes}</p>
        </div>
      )}
      
      {/* Productos Asociados */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Associated Products</h2>
          <button 
            onClick={() => navigate('/admin/products/new', { state: { supplierId: supplier.id } })}
            className="flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-800"
          >
            <span>Add Product</span>
            <Package className="h-4 w-4" />
          </button>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
            <Package className="h-12 w-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No products yet</h3>
            <p className="mt-1 text-gray-500">Get started by adding a new product for this supplier</p>
            <button
              onClick={() => navigate('/admin/products/new', { state: { supplierId: supplier.id } })}
              className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    {/* Product cell */}
                    {/* Price cell */}
                    {/* Stock cell */}
                    {/* Actions cell */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupplierDetail;
