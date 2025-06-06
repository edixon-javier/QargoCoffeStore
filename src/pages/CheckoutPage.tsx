import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../lib/utils';
import Button from '../components/ui/Button';
import { Check, CreditCard, ChevronRight } from 'lucide-react';

type CheckoutStep = 'information' | 'shipping' | 'payment' | 'confirmation';

const CheckoutPage: React.FC = () => {
  const { items, total } = useCart();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('information');

  if (items.length === 0) {
    navigate('/carrito');
    return null;
  }

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'information') {
      setCurrentStep('shipping');
    } else if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('confirmation');
    }
  };

  const steps = [
    { id: 'information', label: 'Información' },
    { id: 'shipping', label: 'Envío' },
    { id: 'payment', label: 'Pago' },
    { id: 'confirmation', label: 'Confirmación' },
  ];

  return (
    <div className="container-custom py-8">
      {/* Checkout steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep === step.id
                      ? 'bg-primary-600 text-white'
                      : step.id === 'confirmation' && currentStep === 'confirmation'
                      ? 'bg-success-500 text-white'
                      : steps.findIndex(s => s.id === currentStep) > steps.findIndex(s => s.id === step.id)
                      ? 'bg-primary-200 text-primary-800'
                      : 'bg-gray-200 text-secondary-500'
                  }`}
                >
                  {step.id === 'confirmation' && currentStep === 'confirmation' ? (
                    <Check size={20} />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className="text-sm mt-1 hidden sm:block">{step.label}</span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 bg-gray-200 mx-2">
                  <div 
                    className="h-full bg-primary-600 transition-all duration-300"
                    style={{ 
                      width: steps.findIndex(s => s.id === currentStep) > index ? '100%' : '0%' 
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main checkout form */}
        <div className="lg:col-span-2">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-soft p-6"
          >
            {currentStep === 'information' && (
              <form onSubmit={handleNextStep}>
                <h2 className="text-xl font-medium mb-6">Información de contacto</h2>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input"
                    placeholder="ejemplo@correo.com"
                    required
                  />
                </div>
                
                <h2 className="text-xl font-medium mb-4">Información de facturación</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-secondary-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-secondary-700 mb-1">
                      Apellidos
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      className="input"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="company" className="block text-sm font-medium text-secondary-700 mb-1">
                    Empresa
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="input"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="taxId" className="block text-sm font-medium text-secondary-700 mb-1">
                    RFC
                  </label>
                  <input
                    type="text"
                    id="taxId"
                    className="input"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="input"
                    required
                  />
                </div>
                
                <div className="mt-6">
                  <Button 
                    type="submit" 
                    variant="primary" 
                    fullWidth
                    rightIcon={<ChevronRight size={16} />}
                  >
                    Continuar a envío
                  </Button>
                </div>
              </form>
            )}
            
            {currentStep === 'shipping' && (
              <form onSubmit={handleNextStep}>
                <h2 className="text-xl font-medium mb-6">Información de envío</h2>
                
                <div className="mb-4">
                  <label htmlFor="address" className="block text-sm font-medium text-secondary-700 mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="input"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address2" className="block text-sm font-medium text-secondary-700 mb-1">
                    Apartamento, suite, etc. (opcional)
                  </label>
                  <input
                    type="text"
                    id="address2"
                    className="input"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-secondary-700 mb-1">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="city"
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-secondary-700 mb-1">
                      Estado
                    </label>
                    <select id="state" className="input">
                      <option value="">Seleccionar...</option>
                      <option value="CDMX">Ciudad de México</option>
                      <option value="JAL">Jalisco</option>
                      <option value="NL">Nuevo León</option>
                      {/* Otros estados */}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm font-medium text-secondary-700 mb-1">
                      Código postal
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-secondary-700 mb-1">
                      País
                    </label>
                    <select id="country" className="input" defaultValue="MX">
                      <option value="MX">México</option>
                      <option value="US">Estados Unidos</option>
                      <option value="CA">Canadá</option>
                    </select>
                  </div>
                </div>
                
                <h3 className="font-medium mb-4">Método de envío</h3>
                
                <div className="space-y-3 mb-6">
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors">
                    <input
                      type="radio"
                      name="shipping"
                      value="standard"
                      className="mr-3"
                      defaultChecked
                    />
                    <div className="flex-grow">
                      <p className="font-medium">Estándar (3-5 días hábiles)</p>
                      <p className="text-sm text-secondary-500">Entrega a domicilio</p>
                    </div>
                    <p className="font-medium">$150.00</p>
                  </label>
                  
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors">
                    <input
                      type="radio"
                      name="shipping"
                      value="express"
                      className="mr-3"
                    />
                    <div className="flex-grow">
                      <p className="font-medium">Express (1-2 días hábiles)</p>
                      <p className="text-sm text-secondary-500">Entrega a domicilio</p>
                    </div>
                    <p className="font-medium">$350.00</p>
                  </label>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setCurrentStep('information')}
                  >
                    Volver
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    fullWidth
                    rightIcon={<ChevronRight size={16} />}
                  >
                    Continuar a pago
                  </Button>
                </div>
              </form>
            )}
            
            {currentStep === 'payment' && (
              <form onSubmit={handleNextStep}>
                <h2 className="text-xl font-medium mb-6">Información de pago</h2>
                
                <div className="space-y-3 mb-6">
                  <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="credit_card"
                      className="mr-3"
                      defaultChecked
                    />
                    <div className="flex-grow">
                      <p className="font-medium">Tarjeta de crédito/débito</p>
                      <p className="text-sm text-secondary-500">Visa, Mastercard, AMEX</p>
                    </div>
                    <CreditCard className="h-6 w-6 text-secondary-400" />
                  </label>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="cardHolder" className="block text-sm font-medium text-secondary-700 mb-1">
                    Titular de la tarjeta
                  </label>
                  <input
                    type="text"
                    id="cardHolder"
                    className="input"
                    placeholder="Nombre como aparece en la tarjeta"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-secondary-700 mb-1">
                    Número de tarjeta
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    className="input"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-secondary-700 mb-1">
                      Fecha de expiración (MM/AA)
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      className="input"
                      placeholder="MM/AA"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-secondary-700 mb-1">
                      Código de seguridad (CVV)
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      className="input"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setCurrentStep('shipping')}
                  >
                    Volver
                  </Button>
                  <Button 
                    type="submit" 
                    variant="primary" 
                    fullWidth
                  >
                    Completar compra
                  </Button>
                </div>
              </form>
            )}
            
            {currentStep === 'confirmation' && (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-success-600" />
                </div>
                <h2 className="text-2xl font-medium mb-2">¡Gracias por tu compra!</h2>
                <p className="text-secondary-600 mb-6">
                  Tu pedido ha sido procesado correctamente. Hemos enviado un correo con los detalles de tu compra.
                </p>
                
                <div className="bg-primary-50 rounded-lg p-4 mb-6 text-left">
                  <p className="font-medium mb-2">Número de pedido: <span className="font-normal">QC-12345678</span></p>
                  <p className="font-medium">Estado: <span className="text-success-600">Procesando</span></p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    variant="primary"
                    onClick={() => navigate('/')}
                  >
                    Explorar catálogo
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Order summary */}
        <div>
          <div className="bg-white rounded-lg shadow-soft p-6 sticky top-24">
            <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>
            
            <div className="divide-y divide-gray-200">
              {items.map(item => (
                <div key={item.product.id} className="py-3 flex items-start">
                  <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-50">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-contain"
                    />
                    <div className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="ml-3 flex-grow">
                    <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                    <p className="text-xs text-secondary-500">{item.product.sku}</p>
                  </div>
                  <div className="text-right ml-2 flex-shrink-0">
                    <p className="text-sm font-medium">
                      {formatCurrency((item.product.salePrice || item.product.price) * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Envío</span>
                <span>{currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'confirmation' ? '$150.00' : 'A calcular'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Impuestos (16%)</span>
                <span>{formatCurrency(total * 0.16)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-4 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-semibold">
                  {currentStep === 'shipping' || currentStep === 'payment' || currentStep === 'confirmation'
                    ? formatCurrency(total * 1.16 + 150)
                    : formatCurrency(total * 1.16)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;