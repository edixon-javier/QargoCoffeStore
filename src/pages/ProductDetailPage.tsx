import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Truck, ShieldCheck, Clock, Heart, Share2, Minus, Plus, ShoppingCart } from 'lucide-react';
import Button from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { formatCurrency, getDiscountPercentage } from '../lib/utils';
import ProductCard from '../components/products/ProductCard';

// Mock data
import { mockProducts } from '../mockData';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'faq'>('description');
  
  // Find product by ID
  const product = mockProducts.find(p => p.id === id) || mockProducts[0]; // Fallback to first product if not found
  
  const hasDiscount = !!product.salePrice && product.salePrice < product.price;
  
  // Related products - mock implementation
  const relatedProducts = mockProducts
    .filter(p => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-secondary-500 mb-6">
        <Link to="/" className="hover:text-primary-700">Inicio</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to="/catalogo" className="hover:text-primary-700">Catálogo</Link>
        <ChevronRight size={16} className="mx-2" />
        <Link to={`/catalogo?categoria=${product.category.slug}`} className="hover:text-primary-700">
          {product.category.name}
        </Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-secondary-700 truncate">{product.name}</span>
      </nav>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product images */}
        <div>
          <motion.div 
            className="bg-white rounded-lg overflow-hidden aspect-square mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <img 
              src={product.images[activeImage]} 
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          </motion.div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div 
                key={index} 
                className={`cursor-pointer rounded border-2 ${
                  index === activeImage ? 'border-primary-600' : 'border-transparent'
                } overflow-hidden aspect-square`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - vista ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Product info */}
        <div>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-sm text-secondary-500">{product.category.name}</p>
              <span className="text-secondary-300">|</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <Star className="h-4 w-4 text-yellow-300 fill-current" />
                <span className="ml-1 text-sm text-secondary-500">(24)</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
            
            <div className="flex items-end gap-2 mb-4">
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-semibold text-accent-600">
                    {formatCurrency(product.salePrice!)}
                  </span>
                  <span className="text-lg text-secondary-400 line-through">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="ml-2 px-2 py-0.5 bg-accent-100 text-accent-800 text-sm font-medium rounded-full">
                    {getDiscountPercentage(product.price, product.salePrice!)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-semibold">
                  {formatCurrency(product.price)}
                </span>
              )}
            </div>
            
            <p className="text-secondary-700 mb-6">
              {product.description}
            </p>
            
            {/* SKU and supplier info */}
            <div className="flex flex-col space-y-1 mb-6 text-sm">
              <p className="text-secondary-500">
                <strong>SKU:</strong> {product.sku}
              </p>
              <p className="text-secondary-500">
                <strong>Proveedor:</strong> {product.supplier.name}
              </p>
              <p className={`font-medium ${product.stock > 0 ? 'text-success-600' : 'text-error-600'}`}>
                {product.stock > 10 
                  ? 'En stock' 
                  : product.stock > 0 
                    ? `¡Solo quedan ${product.stock} unidades!` 
                    : 'Agotado'
                }
              </p>
            </div>
            
            {/* Quantity selector and buttons */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Cantidad</p>
              <div className="flex items-center gap-4">
                <div className="flex border border-gray-300 rounded-md">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-secondary-500 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 border-x border-gray-300 text-center"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-1.5 text-secondary-500"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <p className="text-sm text-secondary-500">
                  Pedido mínimo: {product.minOrderQuantity} unidades
                </p>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="md:col-span-2"
                leftIcon={<ShoppingCart size={18} />}
                onClick={handleAddToCart}
              >
                Agregar al carrito
              </Button>
              <Button
                variant="accent"
                size="lg"
                fullWidth
                onClick={() => window.location.href = '/checkout'}
              >
                Comprar ahora
              </Button>
              <Button
                variant="outline"
                size="lg"
                fullWidth
                leftIcon={<Heart size={18} />}
                className="hidden md:flex"
              >
                Guardar
              </Button>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center p-3 bg-primary-50 rounded-md">
                <Truck className="h-5 w-5 text-primary-700 mr-2 flex-shrink-0" />
                <span className="text-sm">Envío rápido</span>
              </div>
              <div className="flex items-center p-3 bg-primary-50 rounded-md">
                <ShieldCheck className="h-5 w-5 text-primary-700 mr-2 flex-shrink-0" />
                <span className="text-sm">Garantía oficial</span>
              </div>
              <div className="flex items-center p-3 bg-primary-50 rounded-md">
                <Clock className="h-5 w-5 text-primary-700 mr-2 flex-shrink-0" />
                <span className="text-sm">Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="mb-12">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto scrollbar-hide space-x-8">
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'description'
                  ? 'border-primary-700 text-primary-700'
                  : 'border-transparent text-secondary-500 hover:text-secondary-800'
              }`}
              onClick={() => setActiveTab('description')}
            >
              Descripción
            </button>
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-primary-700 text-primary-700'
                  : 'border-transparent text-secondary-500 hover:text-secondary-800'
              }`}
              onClick={() => setActiveTab('specs')}
            >
              Especificaciones
            </button>
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'border-primary-700 text-primary-700'
                  : 'border-transparent text-secondary-500 hover:text-secondary-800'
              }`}
              onClick={() => setActiveTab('faq')}
            >
              Preguntas frecuentes
            </button>
          </div>
        </div>

        <div className="py-6">
          {activeTab === 'description' && (
            <div className="prose text-secondary-700 max-w-none">
              <p>{product.description}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. 
                Sed euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget 
                aliquam nisl nisl eget nisl. Nulla facilisi. Sed euismod, nisl eget ultricies 
                ultrices, nisl nisl aliquam nisl, eget aliquam nisl nisl eget nisl.
              </p>
              <p>
                Sed euismod, nisl eget ultricies ultrices, nisl nisl aliquam nisl, eget
                aliquam nisl nisl eget nisl. Nulla facilisi.
              </p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="overflow-hidden bg-white rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="divide-y divide-gray-200">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <tr key={key}>
                      <th className="px-4 py-3 text-left text-sm font-medium text-secondary-900 bg-gray-50 w-1/3">
                        {key}
                      </th>
                      <td className="px-4 py-3 text-sm text-secondary-700">
                        {value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-4">
              {[
                {
                  question: '¿Cuál es el tiempo de entrega?',
                  answer: 'El tiempo de entrega estándar es de 2 a 3 días hábiles para zonas metropolitanas y de 4 a 7 días para el resto del país.'
                },
                {
                  question: '¿Ofrecen garantía para este producto?',
                  answer: 'Sí, todos nuestros productos cuentan con garantía oficial del fabricante. El período varía según el producto, en este caso es de 12 meses.'
                },
                {
                  question: '¿Cómo puedo realizar una devolución?',
                  answer: 'Puedes solicitar una devolución dentro de los primeros 15 días después de recibir tu producto. Contáctanos a través de tu cuenta o enviando un correo a devoluciones@qargocoffee.com.'
                },
              ].map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h3 className="font-medium text-secondary-900 mb-2">{item.question}</h3>
                  <p className="text-secondary-600">{item.answer}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-serif mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;