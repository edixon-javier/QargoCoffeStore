import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Edit, 
  ArrowLeft, 
  Tag, 
  Package, 
  Calendar, 
  DollarSign,
  ShoppingCart,
  Mail,
  Phone
} from 'lucide-react';
import { Product } from '../../lib/types';
import { mockProducts } from '../../mockData';
import { formatCurrency } from '../../lib/utils';
import LoadingSpinner from '../ui/LoadingSpinner';

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProductData = async () => {
      try {
        // Simulating data loading
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Find product by ID
        const foundProduct = mockProducts.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        }
      } catch (error) {
        console.error('Error loading product data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      loadProductData();
    }
  }, [id]);

  const handleEditProduct = () => {
    navigate(`/admin/products/edit/${id}`);
  };

  if (loading) {
    return <div className="flex justify-center p-8"><LoadingSpinner /></div>;
  }

  if (!product) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800">Product not found</h2>
        <p className="mt-2 text-gray-600">The product you are looking for does not exist or has been deleted</p>
        <button 
          onClick={() => navigate('/admin/products')}
          className="mt-4 rounded-lg bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/admin/products')} 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={18} />
          <span>Back to Products</span>
        </button>
        <button
          onClick={handleEditProduct}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark"
        >
          <Edit size={18} />
          <span>Edit Product</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Product Images */}
        <div className="md:col-span-1">
          <div className="overflow-hidden rounded-lg bg-white p-4 shadow-md">
            {product.images && product.images.length > 0 ? (
              <div className="space-y-4">
                <div className="aspect-square overflow-hidden rounded-md">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.slice(1).map((image, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-md">
                        <img
                          src={image}
                          alt={`${product.name} ${index + 2}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-md bg-gray-100">
                <Package size={64} className="text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6 md:col-span-2">
          <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  product.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="mb-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">SKU</p>
                <p className="text-gray-800">{product.sku}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Description</p>
                <p className="text-gray-700">{product.description}</p>
              </div>
              
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <div className="flex items-center gap-2">
                    <DollarSign size={18} className="text-gray-600" />
                    <p className="text-xl font-semibold text-gray-800">{formatCurrency(product.price)}</p>
                    {product.salePrice && product.salePrice < product.price && (
                      <p className="text-sm text-green-600">
                        Sale: {formatCurrency(product.salePrice)}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <div className="flex items-center gap-2">
                    <Tag size={16} className="text-gray-600" />
                    <p className="text-gray-800">{product.category.name}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Stock</p>
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={16} className="text-gray-600" />
                    <p className={`${product.stock < 5 ? 'text-red-600 font-semibold' : 'text-gray-800'}`}>
                      {product.stock} units
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Minimum Order</p>
                  <p className="text-gray-800">{product.minOrderQuantity} units</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-500">Created On</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-600" />
                    <p className="text-gray-800">{new Date(product.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Updated</p>
                  <p className="text-gray-800">{new Date(product.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">Supplier Information</h3>
              <div className="rounded-md bg-gray-50 p-4">
                <Link 
                  to={`/admin/suppliers/${product.supplier.id}`}
                  className="mb-2 inline-block text-lg font-medium text-blue-600 hover:underline"
                >
                  {product.supplier.name}
                </Link>
                <p className="text-sm text-gray-600">{product.supplier.description || 'No description available'}</p>
                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Mail size={14} className="text-gray-500" />
                    <span>{product.supplier.contactEmail}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone size={14} className="text-gray-500" />
                    <span>{product.supplier.contactPhone}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">Specifications</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="font-medium text-gray-600">{key}</span>
                  <span className="text-gray-800">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
