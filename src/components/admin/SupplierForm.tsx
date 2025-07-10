import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Supplier } from '../../lib/types';
import { mockSuppliers } from '../../mockSuppliers';
import LoadingSpinner from '../ui/LoadingSpinner';
import { ArrowLeft, Save } from 'lucide-react';

interface SupplierFormProps {
  mode: 'create' | 'edit';
}

// Initial data for a new supplier
const emptySupplier: Supplier = {
  id: "",
  name: "",
  companyName: "",
  logo: "",
  description: "",
  contactEmail: "",
  contactPhone: "",
  address: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA"
  },
  status: 'active',
  notes: "",
  createdAt: new Date().toISOString(),
};

const SupplierForm: React.FC<SupplierFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [supplier, setSupplier] = useState<Supplier>(emptySupplier);
  const [loading, setLoading] = useState(mode === 'edit');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && id) {
      // In a real implementation, this would make an API call
      const timer = setTimeout(() => {
        const foundSupplier = mockSuppliers.find(s => s.id === id);
        if (foundSupplier) {
          setSupplier(foundSupplier);
        }
        setLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [id, mode]);

  const validateField = (name: string, value: string): string => {
    if (!value) {
      if (['name', 'contactEmail', 'contactPhone'].includes(name)) {
        return `${name} is required`;
      }
    }
    
    switch (name) {
      case 'contactEmail':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email format';
      case 'contactPhone':
        return value ? (/^[\d\s-()]+$/.test(value) ? '' : 'Invalid phone format') : '';
      default:
        return '';
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    section?: 'address'
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

    if (section === 'address') {
      setSupplier(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value
        }
      }));
    } else {
      setSupplier(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors: Record<string, string> = {};
    
    ['name', 'contactEmail', 'contactPhone'].forEach(field => {
      const value = supplier[field as keyof typeof supplier];
      if (typeof value === 'string' && !value) {
        newErrors[field] = `${field} is required`;
      } else if (field === 'contactEmail') {
        const error = validateField('contactEmail', value as string);
        if (error) newErrors.contactEmail = error;
      }
    });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    try {
      setSaving(true);
      
      // In a real case, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate a successful response
      if (mode === 'create') {
        // For a new supplier
        console.log("Creating new supplier:", supplier);
      } else {
        // For editing an existing supplier
        console.log("Updating supplier:", supplier);
      }
      
      // Redirect to suppliers list
      navigate('/admin/suppliers');
      
    } catch (error) {
      console.error('Error al guardar proveedor:', error);
      setErrors({ form: 'Error al guardar los cambios. Inténtalo de nuevo.' });
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return <div className="flex justify-center p-8"><LoadingSpinner /></div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/suppliers')}
            className="flex items-center justify-center p-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            {mode === 'create' ? 'Add New Supplier' : 'Edit Supplier'}
          </h1>
        </div>
      </div>
      
      {errors.form && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {errors.form}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Supplier Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={supplier.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                placeholder="Enter supplier name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={supplier.companyName || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter company name (optional)"
              />
            </div>
            
            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={supplier.contactEmail}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.contactEmail ? 'border-red-300' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                placeholder="Enter contact email"
              />
              {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail}</p>}
            </div>
            
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Contact Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="contactPhone"
                name="contactPhone"
                value={supplier.contactPhone}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border ${
                  errors.contactPhone ? 'border-red-300' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500`}
                placeholder="Enter contact phone"
              />
              {errors.contactPhone && <p className="mt-1 text-sm text-red-600">{errors.contactPhone}</p>}
            </div>
            
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={supplier.description || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter supplier description (optional)"
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={supplier.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Address Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Address Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={supplier.address.street}
                onChange={(e) => handleInputChange(e, 'address')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter street address"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={supplier.address.city}
                  onChange={(e) => handleInputChange(e, 'address')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter city"
                />
              </div>
              
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={supplier.address.state}
                  onChange={(e) => handleInputChange(e, 'address')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter state"
                />
              </div>
              
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={supplier.address.zipCode}
                  onChange={(e) => handleInputChange(e, 'address')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter zip code"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={supplier.address.country}
                onChange={(e) => handleInputChange(e, 'address')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter country"
              />
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="minOrderValue" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Order Value ($)
              </label>
              <input
                type="number"
                id="minOrderValue"
                name="minOrderValue"
                value={supplier.minOrderValue || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter minimum order value"
              />
            </div>
            
            <div>
              <label htmlFor="deliveryTime" className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Time
              </label>
              <input
                type="text"
                id="deliveryTime"
                name="deliveryTime"
                value={supplier.deliveryTime || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g. 3-5 business days"
              />
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={supplier.notes || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter any additional notes about this supplier"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/admin/suppliers')}
            className="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            {saving ? <LoadingSpinner size="sm" /> : <Save className="h-4 w-4" />}
            {saving ? 'Saving...' : 'Save Supplier'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierForm;
