import React, { useState, useEffect } from 'react';
import type { BillingInfo } from '../../lib/types';
import { Check } from 'lucide-react';
import Modal from '../ui/Modal';
import { useAuth } from '../../contexts/AuthContext';
import { mockFranchisees } from '../../mockData/franchiseesData';

const FranchiseeProfile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Buscar los datos del franquiciado autenticado
  const getFranchiseeData = () => {
    if (user?.franchiseeId) {
      const franchiseeData = mockFranchisees.find(f => f.id === user.franchiseeId);
      if (franchiseeData?.billingInfo) {
        console.log('Datos de franquiciado encontrados:', franchiseeData.billingInfo);
        return franchiseeData.billingInfo;
      }
    }

    // Si no encontramos datos o el usuario no tiene franchiseeId, buscamos en localStorage
    const storedBillingInfo = localStorage.getItem('franchiseeBillingInfo');
    if (storedBillingInfo) {
      return JSON.parse(storedBillingInfo);
    }

    // Datos por defecto si no hay información disponible
    return {
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
    };
  };

  const [billingInfo, setBillingInfo] = useState<BillingInfo>(getFranchiseeData());

  // Actualizar los datos cuando cambie el usuario
  useEffect(() => {
    setBillingInfo(getFranchiseeData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.franchiseeId]);

  const validateField = (name: string, value: string) => {
    if (!value) return `${name} is required`;
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format';
      case 'phone':
        return /^[\d\s-()]+$/.test(value) ? '' : 'Invalid phone format';
      case 'cardNumber':
        return /^\d{16}$/.test(value.replace(/\s/g, '')) ? '' : 'Invalid card number';
      case 'cvv':
        return /^\d{3,4}$/.test(value) ? '' : 'Invalid CVV';
      case 'expiryDate':
        return /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(value) ? '' : 'Invalid expiry date (MM/YY)';
      case 'zipCode':
        return /^\d{5}(-\d{4})?$/.test(value) ? '' : 'Invalid ZIP code';
      default:
        return value.length < 2 ? 'Field is too short' : '';
    }
  };

  const handleFieldChange = (
    field: string,
    value: string,
    section?: 'billingAddress' | 'shippingAddress' | 'paymentMethod'
  ) => {
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    if (section) {
      setBillingInfo(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setBillingInfo(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    // Validate all fields
    const newErrors: Record<string, string> = {};
    
    // Validate company info
    ['companyName', 'email', 'phone'].forEach(field => {
      const value = billingInfo[field as keyof BillingInfo];
      if (typeof value === 'string') {
        const error = validateField(field, value);
        if (error) {
          newErrors[field] = error;
        }
      }
    });

    // Validate billing address
    ['street', 'city', 'state', 'zipCode'].forEach(field => {
      const value = billingInfo.billingAddress[field];
      const error = validateField(field, value);
      if (error) {
        newErrors[`billingAddress.${field}`] = error;
      }
    });

    // If there are errors, show them and stop
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save to localStorage
    localStorage.setItem('franchiseeBillingInfo', JSON.stringify(billingInfo));
    setIsEditing(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <form className="space-y-6">
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-medium">Profile & Billing Information</h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage your business profile and payment methods
              </p>
            </div>
            <div className="flex gap-2">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>

          <div className={`space-y-6 ${isEditing ? 'editing-mode' : ''}`}>
            {/* Company Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name
                </label>              {isEditing ? (
                    <div>
                      <input
                        type="text"
                        value={billingInfo.companyName}
                        onChange={(e) => handleFieldChange('companyName', e.target.value)}
                        className={`w-full p-2 border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-primary focus:border-transparent`}
                        placeholder="Enter company name"
                        required
                      />
                      {errors.companyName && (
                        <p className="mt-1 text-sm text-red-500">{errors.companyName}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900">{billingInfo.companyName || 'Not set'}</p>
                  )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  DBA (Doing Business As)
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={billingInfo.dba}
                    onChange={(e) => setBillingInfo({...billingInfo, dba: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{billingInfo.dba || 'Not set'}</p>
                )}
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <h3 className="text-lg font-medium mb-4">Billing Address</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={billingInfo.billingAddress.street}
                      onChange={(e) => setBillingInfo({
                        ...billingInfo,
                        billingAddress: {...billingInfo.billingAddress, street: e.target.value}
                      })}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Street Address"
                    />
                  ) : (
                    <p className="text-gray-900">{billingInfo.billingAddress.street || 'Not set'}</p>
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={billingInfo.billingAddress.city}
                      onChange={(e) => setBillingInfo({
                        ...billingInfo,
                        billingAddress: {...billingInfo.billingAddress, city: e.target.value}
                      })}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="City"
                    />
                  ) : (
                    <p className="text-gray-900">{billingInfo.billingAddress.city || 'Not set'}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={billingInfo.billingAddress.state}
                        onChange={(e) => setBillingInfo({
                          ...billingInfo,
                          billingAddress: {...billingInfo.billingAddress, state: e.target.value}
                        })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="State"
                      />
                      <input
                        type="text"
                        value={billingInfo.billingAddress.zipCode}
                        onChange={(e) => setBillingInfo({
                          ...billingInfo,
                          billingAddress: {...billingInfo.billingAddress, zipCode: e.target.value}
                        })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="ZIP Code"
                      />
                    </>
                  ) : (
                    <p className="text-gray-900 col-span-2">
                      {billingInfo.billingAddress.state} {billingInfo.billingAddress.zipCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? (
                    <div>
                      <input
                        type="email"
                        value={billingInfo.email}
                        onChange={(e) => handleFieldChange('email', e.target.value)}
                        className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-primary focus:border-transparent`}
                        placeholder="Enter email address"
                        required
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-900">{billingInfo.email || 'Not set'}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={billingInfo.phone}
                      onChange={(e) => setBillingInfo({...billingInfo, phone: e.target.value})}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  ) : (
                    <p className="text-gray-900">{billingInfo.phone || 'Not set'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-medium mb-4">Payment Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={billingInfo.paymentMethod.cardNumber}
                      onChange={(e) => setBillingInfo({
                        ...billingInfo,
                        paymentMethod: {...billingInfo.paymentMethod, cardNumber: e.target.value}
                      })}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="**** **** **** ****"
                    />
                  ) : (
                    <p className="text-gray-900">
                      {billingInfo.paymentMethod.cardNumber ? '****' + billingInfo.paymentMethod.cardNumber.slice(-4) : 'Not set'}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={billingInfo.paymentMethod.expiryDate}
                        onChange={(e) => setBillingInfo({
                          ...billingInfo,
                          paymentMethod: {...billingInfo.paymentMethod, expiryDate: e.target.value}
                        })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    ) : (
                      <p className="text-gray-900">{billingInfo.paymentMethod.expiryDate || 'Not set'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    {isEditing ? (
                      <input
                        type="password"
                        value={billingInfo.paymentMethod.cvv}
                        onChange={(e) => setBillingInfo({
                          ...billingInfo,
                          paymentMethod: {...billingInfo.paymentMethod, cvv: e.target.value}
                        })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="***"
                        maxLength={4}
                      />
                    ) : (
                      <p className="text-gray-900">***</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cardholder Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={billingInfo.paymentMethod.cardholderName}
                        onChange={(e) => setBillingInfo({
                          ...billingInfo,
                          paymentMethod: {...billingInfo.paymentMethod, cardholderName: e.target.value}
                        })}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900">{billingInfo.paymentMethod.cardholderName || 'Not set'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Information
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setErrors({});
                      setBillingInfo(getFranchiseeData());
                    }}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Changes Saved Successfully"
      >
        <div className="p-6">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-center text-gray-600">
            Your profile and billing information has been updated successfully.
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FranchiseeProfile;
