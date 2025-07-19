import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../hooks/useAuth';
import { useOrders } from '../contexts/OrderContext';
import { formatCurrency } from '../lib/utils';
import type { BillingInfo } from '../lib/types';

// Mock data for Franchisee Nort
const mockFranchiseeData: BillingInfo = {
  companyName: "Matari Coffee Co.",
  dba: "Qargo Connect",
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
  email: "QargoConnect@qargocoffee.com",
  phone: "(734) 686-1192",
  paymentMethod: {
    type: 'credit_card',
    cardNumber: "**** **** **** 4242",
    expiryDate: "12/25",
    cvv: "***",
    cardholderName: "JOHN NORT"
  }
};

const CheckoutPage: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  // Get stored billing info or use mock data as fallback
  const storedBillingInfo = localStorage.getItem('franchiseeBillingInfo');
  const [billingInfo, setBillingInfo] = useState<BillingInfo>(
    storedBillingInfo ? JSON.parse(storedBillingInfo) : mockFranchiseeData
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(true);


  // Save billing info changes to localStorage
  React.useEffect(() => {
    localStorage.setItem('franchiseeBillingInfo', JSON.stringify(billingInfo));
  }, [billingInfo]);

  // If there are no items in the cart, redirect to cart
  React.useEffect(() => {
  if (items.length === 0 && shouldRedirect) {
      navigate('/franchisee');
    }
  }, [items.length, shouldRedirect, navigate]);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsProcessing(true);

  try {
    // Crear nuevo pedido
    const order = addOrder({
      customerName: billingInfo.companyName,
      items: items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images?.[0] || null
      })),
      paymentMethod: {
        type: 'Credit Card',
        lastFourDigits: billingInfo.paymentMethod.cardNumber.slice(-4)
      },
      total,
      billingInfo,
      franchiseeId: user?.franchiseeId
    });

    console.log('Nueva orden creada:', order);

    setShouldRedirect(false); 
    clearCart();
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      navigate('/franchisee');
    }, 1500); 
  } catch (error) {
    console.error('Error creating order:', error);
    alert('There was an error processing your order. Please try again.');
  } finally {
    setIsProcessing(false);
  }
};
  return (
    <div className="container-custom py-8">
      {/* Modal de éxito */}
      {showSuccessModal && (
       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity">
          <div className="bg-white rounded-2xl shadow-2xl p-10 flex flex-col items-center space-y-4 animate-pop-in min-w-[340px] max-w-sm">
            <svg className="w-16 h-16 text-green-500 mb-2 animate-bounce-in" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#e6f9ed" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l3 3.5 5-6" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 text-center">Order Confirmed</h2>
            <p className="text-gray-600 text-sm text-center">
              Your order has been successfully placed. You will be redirected to your dashboard shortly.
            </p>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-serif mb-6">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing and Shipping Information */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bill To Section */}
              <div className="bg-white rounded-lg shadow-soft p-6">
                <h2 className="text-xl font-medium mb-4">Bill To</h2>
                <div className="space-y-4">
                  {/* ...existing code... */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={billingInfo.companyName}
                      onChange={(e) => setBillingInfo({...billingInfo, companyName: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Franchise Company Name"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      DBA (Doing Business As)
                    </label>
                    <input
                      type="text"
                      value={billingInfo.dba}
                      onChange={(e) => setBillingInfo({...billingInfo, dba: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="DBA Name"
                    />
                  </div>
                  {/* ...existing code... */}
                  <div>
                    <h3 className="font-medium mb-2">Billing Address</h3>
                    <div className="grid gap-4">
                      <input
                        type="text"
                        value={billingInfo.billingAddress.street}
                        onChange={(e) => setBillingInfo({
                          ...billingInfo,
                          billingAddress: {...billingInfo.billingAddress, street: e.target.value}
                        })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Street Address"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={billingInfo.billingAddress.city}
                          onChange={(e) => setBillingInfo({
                            ...billingInfo,
                            billingAddress: {...billingInfo.billingAddress, city: e.target.value}
                          })}
                          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="City"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={billingInfo.billingAddress.state}
                            onChange={(e) => setBillingInfo({
                              ...billingInfo,
                              billingAddress: {...billingInfo.billingAddress, state: e.target.value}
                            })}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="State"
                          />
                          <input
                            type="text"
                            value={billingInfo.billingAddress.zipCode}
                            onChange={(e) => setBillingInfo({
                              ...billingInfo,
                              billingAddress: {...billingInfo.billingAddress, zipCode: e.target.value}
                            })}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="ZIP Code"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ...existing code... */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) => setBillingInfo({...billingInfo, email: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Email Address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={billingInfo.phone}
                        onChange={(e) => setBillingInfo({...billingInfo, phone: e.target.value})}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>
                  {/* ...existing code... */}
                </div>
              </div>
              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow-soft p-6">
                <h2 className="text-xl font-medium mb-4">Payment Information</h2>
                <div className="space-y-4">
                  {/* ...existing code... */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={billingInfo.paymentMethod.cardNumber}
                      onChange={(e) => setBillingInfo({
                        ...billingInfo,
                        paymentMethod: {...billingInfo.paymentMethod, cardNumber: e.target.value}
                      })}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="**** **** **** ****"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={billingInfo.paymentMethod.expiryDate}
                        onChange={(e) => setBillingInfo({
                          ...billingInfo,
                          paymentMethod: {...billingInfo.paymentMethod, expiryDate: e.target.value}
                        })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="password"
                        value={billingInfo.paymentMethod.cvv}
                        onChange={(e) => setBillingInfo({
                          ...billingInfo,
                          paymentMethod: {...billingInfo.paymentMethod, cvv: e.target.value}
                        })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="***"
                        maxLength={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={billingInfo.paymentMethod.cardholderName}
                        onChange={(e) => setBillingInfo({
                          ...billingInfo,
                          paymentMethod: {...billingInfo.paymentMethod, cardholderName: e.target.value}
                        })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Name on card"
                      />
                    </div>
                  </div>
                  {/* ...existing code... */}
                </div>
              </div>
            </form>
          </div>
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-soft p-6 sticky top-24">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>{formatCurrency(item.product.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
