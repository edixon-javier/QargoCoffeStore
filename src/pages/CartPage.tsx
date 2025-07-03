// filepath: c:\Users\abata\Documentos\ConsultansGC\project\src\pages\CartPage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency } from '../lib/utils';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      // If not authenticated, redirect to login with returnUrl
      navigate('/login', { state: { returnUrl: '/checkout' } });
    }
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-serif mb-6">Shopping Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-soft">
          <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="h-8 w-8 text-primary-700" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-secondary-600 mb-6">Add products to your cart to continue with your purchase</p>
          <Link to="/catalog">
            <Button variant="primary">
              Explore catalog
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-medium">Products in your cart ({itemCount})</h2>
              </div>
              
              <AnimatePresence>
                {items.map(item => (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 border-b border-gray-100 flex items-center"
                  >
                    <div className="w-20 h-20 bg-primary-50 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary-700 transition-colors">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-secondary-500 mb-1">
                        SKU: {item.product.sku}
                      </p>
                      <p className="text-sm text-secondary-500">
                        Supplier: {item.product.supplier.name}
                      </p>
                    </div>
                    
                    <div className="flex items-center mr-6">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded border border-primary-200 text-primary-600 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2 w-10 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded border border-primary-200 text-primary-600 hover:border-primary-500 hover:text-primary-700 hover:bg-primary-50 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="text-right min-w-[100px]">
                      <p className="font-medium">
                        {formatCurrency((item.product.salePrice || item.product.price) * item.quantity)}
                      </p>
                      <p className="text-sm text-secondary-500">
                        {formatCurrency(item.product.salePrice || item.product.price)} each
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="ml-4 p-2 text-secondary-400 hover:text-error-600 transition-colors"
                      aria-label="Remove product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Order summary */}
          <div>
            <div className="bg-white rounded-lg shadow-soft p-6">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
