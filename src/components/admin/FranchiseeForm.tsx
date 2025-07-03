import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, CreditCard, Store, Building } from 'lucide-react';
import type { User, BillingInfo } from '../../lib/types';
import LoadingSpinner from '../ui/LoadingSpinner';

// Mock franchisee data for editing
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

// Initial data for a new franchisee
const emptyFranchisee: User & { billingInfo: BillingInfo, password: string } = {
  id: "",
  name: "",
  email: "",
  password: "",
  role: "franchisee",
  createdAt: new Date().toISOString(),
  billingInfo: {
    companyName: "",
    dba: "",
    billingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    shippingAddress: {
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    email: "",
    phone: "",
    paymentMethod: {
      type: 'credit_card',
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: ""
    }
  }
};

interface FranchiseeFormProps {
  mode: 'create' | 'edit';
}

const FranchiseeForm: React.FC<FranchiseeFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [franchisee, setFranchisee] = useState<User & { billingInfo: BillingInfo, password?: string }>(emptyFranchisee);
  const [loading, setLoading] = useState(mode === 'edit');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [useShippingAsBilling, setUseShippingAsBilling] = useState(true);

  useEffect(() => {
    if (mode === 'edit' && id) {
      // In a real implementation, this would make an API call
      const timer = setTimeout(() => {
        const foundFranchisee = mockFranchisees.find(f => f.id === id);
        if (foundFranchisee) {
          setFranchisee({
            ...foundFranchisee,
            billingInfo: foundFranchisee.billingInfo || emptyFranchisee.billingInfo
          });
          
          // Check if billing and shipping addresses are the same
          const billing = foundFranchisee.billingInfo?.billingAddress;
          const shipping = foundFranchisee.billingInfo?.shippingAddress;
          
          if (billing && shipping) {
            const addressesMatch = 
              billing.street === shipping.street &&
              billing.city === shipping.city &&
              billing.state === shipping.state &&
              billing.zipCode === shipping.zipCode;
            
            setUseShippingAsBilling(addressesMatch);
          }
        }
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [id, mode]);

  // Update billing address when checkbox is checked
  useEffect(() => {
    if (useShippingAsBilling) {
      setFranchisee(prev => ({
        ...prev,
        billingInfo: {
          ...prev.billingInfo,
          billingAddress: { ...prev.billingInfo.shippingAddress }
        }
      }));
    }
  }, [useShippingAsBilling, franchisee.billingInfo.shippingAddress]);

  const validateField = (name: string, value: string): string => {
    if (!value && ['name', 'email', 'companyName'].includes(name)) return `${name} is required`;
    
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format';
      case 'phone':
        return value ? (/^[\d\s-()]+$/.test(value) ? '' : 'Invalid phone format') : '';
      case 'password':
        return mode === 'create' && !value ? 'Password is required' : 
               (value && value.length < 6) ? 'Password must be at least 6 characters' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    section?: 'billingAddress' | 'shippingAddress' | 'paymentMethod' | 'billingInfo'
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (section) {
      if (section === 'billingInfo') {
        setFranchisee(prev => ({
          ...prev,
          billingInfo: {
            ...prev.billingInfo,
            [name]: value
          }
        }));
      } else {
        setFranchisee(prev => ({
          ...prev,
          billingInfo: {
            ...prev.billingInfo,
            [section]: {
              ...prev.billingInfo[section],
              [name]: value
            }
          }
        }));
      }
    } else {
      setFranchisee(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors: Record<string, string> = {};
    
    ['name', 'email'].forEach(field => {
      const value = franchisee[field as keyof typeof franchisee];
      if (typeof value === 'string') {
        const error = validateField(field, value);
        if (error) {
          newErrors[field] = error;
        }
      }
    });
    
    if (mode === 'create' && !franchisee.password) {
      newErrors.password = 'La contraseña es obligatoria';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    try {
      setLoading(true);
      
      // In a real case, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate a successful response
      if (mode === 'create') {
        // In a real case, the ID would be generated by the backend
        const newFranchisee = {
          ...franchisee,
          id: `f${Math.floor(Math.random() * 10000)}`,
        };
        console.log('Nuevo franquiciado creado:', newFranchisee);
      } else {
        console.log('Franquiciado actualizado:', franchisee);
      }
      
      // Redirect to franchisees list
      navigate('/admin/franchisees');
      
    } catch (error) {
      console.error('Error al guardar franquiciado:', error);
      setErrors({ form: 'Error al guardar los cambios. Inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div className="flex justify-center p-8"><LoadingSpinner /></div>;
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
          <h1 className="text-2xl font-semibold">
            {mode === 'create' ? 'Create New Franchisee' : 'Edit Franchisee'}
          </h1>
        </div>
      </div>
      
      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Account information */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Store className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Account Information</h2>
              <p className="text-sm text-gray-500">Franchisee portal access data</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={franchisee.name}
                onChange={(e) => handleInputChange(e)}
                className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                placeholder="Franchisee name"
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={franchisee.email}
                onChange={(e) => handleInputChange(e)}
                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                placeholder="email@example.com"
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            
            {/* Only show password field in create mode */}
            {mode === 'create' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={franchisee.password || ''}
                  onChange={(e) => handleInputChange(e)}
                  className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                  placeholder="Minimum 6 characters"
                  required={mode === 'create'}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Company information */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="bg-purple-50 p-2 rounded-lg">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Company Information</h2>
              <p className="text-sm text-gray-500">Franchised company details</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={franchisee.billingInfo.companyName}
                onChange={(e) => handleInputChange(e, 'billingInfo')}
                className={`w-full p-2 border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                placeholder="Company name"
              />
              {errors.companyName && (
                <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Doing Business As (DBA)
              </label>
              <input
                type="text"
                name="dba"
                value={franchisee.billingInfo.dba}
                onChange={(e) => handleInputChange(e, 'billingInfo')}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Business name"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                name="email"
                value={franchisee.billingInfo.email}
                onChange={(e) => handleInputChange(e, 'billingInfo')}
                className={`w-full p-2 border ${errors['billingInfo.email'] ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                placeholder="Contact email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={franchisee.billingInfo.phone}
                onChange={(e) => handleInputChange(e, 'billingInfo')}
                className={`w-full p-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                placeholder="(123) 456-7890"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Shipping address */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Shipping Address</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={franchisee.billingInfo.shippingAddress.street}
                onChange={(e) => handleInputChange(e, 'shippingAddress')}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Street address"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={franchisee.billingInfo.shippingAddress.city}
                  onChange={(e) => handleInputChange(e, 'shippingAddress')}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="City"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={franchisee.billingInfo.shippingAddress.state}
                    onChange={(e) => handleInputChange(e, 'shippingAddress')}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={franchisee.billingInfo.shippingAddress.zipCode}
                    onChange={(e) => handleInputChange(e, 'shippingAddress')}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="ZIP code"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Billing address */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Billing Address</h2>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="useSameAddress"
                checked={useShippingAsBilling}
                onChange={(e) => setUseShippingAsBilling(e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="useSameAddress" className="ml-2 text-sm text-gray-700">
                Use same shipping address
              </label>
            </div>
          </div>
          
          {!useShippingAsBilling && (
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  value={franchisee.billingInfo.billingAddress.street}
                  onChange={(e) => handleInputChange(e, 'billingAddress')}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Street address"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={franchisee.billingInfo.billingAddress.city}
                    onChange={(e) => handleInputChange(e, 'billingAddress')}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={franchisee.billingInfo.billingAddress.state}
                      onChange={(e) => handleInputChange(e, 'billingAddress')}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={franchisee.billingInfo.billingAddress.zipCode}
                      onChange={(e) => handleInputChange(e, 'billingAddress')}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="ZIP code"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Payment information */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="bg-green-50 p-2 rounded-lg">
              <CreditCard className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">Payment Information</h2>
              <p className="text-sm text-gray-500">Credit card details for payments</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={franchisee.billingInfo.paymentMethod.cardNumber}
                onChange={(e) => handleInputChange(e, 'paymentMethod')}
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
                  name="expiryDate"
                  value={franchisee.billingInfo.paymentMethod.expiryDate}
                  onChange={(e) => handleInputChange(e, 'paymentMethod')}
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
                  name="cvv"
                  value={franchisee.billingInfo.paymentMethod.cvv}
                  onChange={(e) => handleInputChange(e, 'paymentMethod')}
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
                  name="cardholderName"
                  value={franchisee.billingInfo.paymentMethod.cardholderName}
                  onChange={(e) => handleInputChange(e, 'paymentMethod')}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Cardholder name"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/franchisees')}
            className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            {loading && <div className="animate-spin h-4 w-4 border-t-2 border-white rounded-full" />}
            <Save className="h-5 w-5" />
            <span>{mode === 'create' ? 'Create Franchisee' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FranchiseeForm;
