import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Star, Truck, ShieldCheck, Clock, Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useCart } from '../contexts/CartContext';
import { formatCurrency, getDiscountPercentage } from '../lib/utils';
import ProductCard from '../components/products/ProductCard';

// Mock data
import { mockProducts } from '../mockData';

// Static mock reviews data
const mockReviews = [
  {
    id: 1,
    franchiseeName: "John Doe",
    rating: 5,
    comment: "Excellent product! It has significantly improved our coffee quality and customer satisfaction.",
    date: "2023-05-15"
  },
  {
    id: 2,
    franchiseeName: "Jane Smith",
    rating: 4,
    comment: "Very good, but I think the price could be a bit lower for the quantity provided.",
    date: "2023-05-10"
  },
  {
    id: 3,
    franchiseeName: "Carlos Ramirez",
    rating: 5,
    comment: "Perfect for our needs. The delivery was fast and the product arrived in perfect condition.",
    date: "2023-05-05"
  },
];

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'faq'>('description');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastOrderId, setLastOrderId] = useState<string>('');
  
  // Find product by ID
  const product = mockProducts.find(p => p.id === id) || mockProducts[0]; // Fallback to first product if not found
  
  const hasDiscount = !!product.salePrice && product.salePrice < product.price;
  
  // Related products - mock implementation
  const relatedProducts = mockProducts
    .filter(p => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);
  
  const handleAddToCart = () => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setLastOrderId(orderId);
    setIsSuccessModalOpen(true);
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setLastOrderId(orderId);
    navigate('/cart');
  };
  
  const handleCloseModal = () => {
    navigate('/catalog');
  };

  const handleViewCart = () => {
    setIsSuccessModalOpen(false);
    navigate('/cart');
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Calculate average rating
  const averageRating = mockReviews.reduce((acc, review) => acc + review.rating, 0) / mockReviews.length;

  return (
    <div className="container-custom py-8">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-secondary-500 mb-6">
        <Link to="/" className="hover:text-primary-700">Catalog</Link>
        <ChevronRight size={16} className="mx-2" />
        <span className="text-secondary-700">{product.category.name}</span>
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
                <strong>Supplier:</strong> {product.supplier.name}
              </p>
            </div>
            
            {/* Quantity selector and buttons */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Quantity</p>
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
                
                <p className="text-sm text-secondary-500">Minimum order: {product.minOrderQuantity} units</p>
                
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
                Add to Cart
              </Button>
              <Button
                variant="accent"
                size="lg"
                fullWidth
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>
            
            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center p-3 bg-primary-50 rounded-md">
                <Truck className="h-5 w-5 text-primary-700 mr-2 flex-shrink-0" />
                <span className="text-sm">Fast Shipping</span>
              </div>
              <div className="flex items-center p-3 bg-primary-50 rounded-md">
                <ShieldCheck className="h-5 w-5 text-primary-700 mr-2 flex-shrink-0" />
                <span className="text-sm">Official Warranty</span>
              </div>
              <div className="flex items-center p-3 bg-primary-50 rounded-md">
                <Clock className="h-5 w-5 text-primary-700 mr-2 flex-shrink-0" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
             {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-serif mb-4">Customer Reviews</h2>
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(averageRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-lg font-medium">{averageRating.toFixed(1)} out of 5 stars</p>
          <p className="ml-2 text-gray-500">({mockReviews.length} reviews)</p>
        </div>
        <div className="space-y-6">
          {mockReviews.map(review => (
            <div key={review.id} className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                <p className="font-medium text-gray-800">{review.franchiseeName}</p>
                <div className="ml-2 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-2">{review.comment}</p>
              <p className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-4">
          Write a Review
        </Button>
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
              Description
            </button>
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-primary-700 text-primary-700'
                  : 'border-transparent text-secondary-500 hover:text-secondary-800'
              }`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
            <button
              className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'border-primary-700 text-primary-700'
                  : 'border-transparent text-secondary-500 hover:text-secondary-800'
              }`}
              onClick={() => setActiveTab('faq')}
            >
              Frequently Asked Questions
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
                  question: 'What is the delivery time?',
                  answerTON: 'Standard delivery time is 2-3 business days for metropolitan areas and 4-7 days for the rest of the country.'
                },
                {
                  question: 'Do you offer warranty for this product?',
                  answer: 'Yes, all our products come with official manufacturer warranty. The period varies depending on the product, in this case it is 12 months.'
                },
                {
                  question: 'How can I request a return?',
                  answer: 'You can request a return within the first 15 days after receiving your product. Contact us through your account or by sending an email to returns@qargocoffee.com.'
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
          <h2 className="text-2xl font-serif mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
      
      {/* Success modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseModal}
        title="Product Added Successfully!"
      >
        <div className="text-center py-4">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-medium mb-2">
            Product Added to Cart
          </h3>
          <p className="text-gray-600 mb-4">
            Order ID: {lastOrderId}
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              onClick={handleCloseModal}
            >
              Continue Shopping
            </Button>
            <Button
              variant="primary"
              onClick={handleViewCart}
            >
              View Cart
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetailPage;