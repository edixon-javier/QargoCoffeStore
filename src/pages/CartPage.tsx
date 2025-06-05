import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../lib/utils';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeItem, total, itemCount } = useCart();

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-serif mb-6">Carrito de Compra</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-soft">
          <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="h-8 w-8 text-primary-700" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Tu carrito está vacío</h2>
          <p className="text-secondary-600 mb-6">Agrega productos a tu carrito para continuar con la compra</p>
          <Link to="/catalogo">
            <Button variant="primary">
              Explorar catálogo
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-soft overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-medium">Productos en tu carrito ({itemCount})</h2>
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
                    <div className="w-20 h-20 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <Link to={`/producto/${item.product.id}`} className="font-medium hover:text-primary-700 transition-colors">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-secondary-500 mb-1">
                        SKU: {item.product.sku}
                      </p>
                      <p className="text-sm text-secondary-500">
                        Proveedor: {item.product.supplier.name}
                      </p>
                    </div>
                    
                    <div className="flex items-center mr-6">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded border border-gray-200 text-secondary-500 hover:border-primary-500 hover:text-primary-700 transition-colors"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="mx-2 w-10 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded border border-gray-200 text-secondary-500 hover:border-primary-500 hover:text-primary-700 transition-colors"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="text-right min-w-[100px]">
                      <p className="font-medium">
                        {formatCurrency((item.product.salePrice || item.product.price) * item.quantity)}
                      </p>
                      <p className="text-sm text-secondary-500">
                        {formatCurrency(item.product.salePrice || item.product.price)} c/u
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="ml-4 p-2 text-secondary-400 hover:text-error-600 transition-colors"
                      aria-label="Eliminar producto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-soft p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>
              
              <div className="space-y-3 border-b border-gray-200 pb-4">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Subtotal</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Envío</span>
                  <span>A calcular</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-secondary-600">Impuestos</span>
                  <span>{formatCurrency(total * 0.16)}</span>
                </div>
              </div>
              
              <div className="flex justify-between py-4 border-b border-gray-200 mb-6">
                <span className="font-medium">Total</span>
                <span className="font-semibold text-lg">
                  {formatCurrency(total * 1.16)}
                </span>
              </div>
              
              <Button 
                variant="primary" 
                fullWidth
                size="lg"
                rightIcon={<ArrowRight size={18} />}
                onClick={() => window.location.href = '/checkout'}
              >
                Proceder al pago
              </Button>
              
              <div className="mt-4">
                <Link to="/catalogo" className="text-sm text-primary-700 hover:text-primary-800 flex items-center justify-center">
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;