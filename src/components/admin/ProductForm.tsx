import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, AlertCircle } from 'lucide-react';
import { Product, Supplier } from '../../lib/types';
import { mockProducts } from '../../mockData';
import { categories } from '../../catalogData';
import { mockSuppliers } from '../../mockSuppliers';
import LoadingSpinner from '../ui/LoadingSpinner';

interface ProductFormProps {
  mode: 'create' | 'edit';
}

// Initial data for a new product
const emptyProduct: Product = {
  id: "",
  name: "",
  description: "",
  sku: "",
  price: 0,
  images: [],
  category: { id: "", name: "", slug: "" },
  supplier: {
    id: "",
    name: "",
    contactEmail: "",
    contactPhone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    status: "active",
    createdAt: ""
  },
  stock: 0,
  minOrderQuantity: 1,
  specifications: {},
  isActive: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const ProductForm: React.FC<ProductFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>(emptyProduct);
  const [loading, setLoading] = useState(mode === 'edit');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [newSpecKey, setNewSpecKey] = useState("");
  const [newSpecValue, setNewSpecValue] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  useEffect(() => {
    setSuppliers(mockSuppliers);

    if (mode === 'edit' && id) {
      // In a real implementation, this would make an API call
      const timer = setTimeout(() => {
        const foundProduct = mockProducts.find(p => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
          setImageUrls(foundProduct.images.length > 0 ? foundProduct.images : [""]);
        }
        setLoading(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [id, mode]);

  const validateField = (name: string, value: string | number): string => {
    if (value === "" || value === 0) {
      if (['name', 'sku', 'price', 'category.id', 'supplier.id'].includes(name)) {
        return `${name} is required`;
      }
    }
    
    if (name === 'price' || name === 'salePrice' || name === 'stock') {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 0) {
        return 'Must be a positive number';
      }
    }
    
    return '';
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent] = name.split('.');
      
      if (parent === 'category') {
        const selectedCategory = categories.find(cat => cat.id === value);
        if (selectedCategory) {
          setProduct(prev => ({
            ...prev,
            category: selectedCategory
          }));
        }
      } else if (parent === 'supplier') {
        const selectedSupplier = suppliers.find(sup => sup.id === value);
        if (selectedSupplier) {
          setProduct(prev => ({
            ...prev,
            supplier: selectedSupplier
          }));
        }
      }
      
      const error = validateField(name, value);
      updateErrors(name, error);
      return;
    }
    
    let parsedValue: string | number | boolean = value;
    if (name === 'price' || name === 'salePrice' || name === 'stock' || name === 'minOrderQuantity') {
      parsedValue = value === '' ? 0 : Number(value);
    } else if (name === 'isActive') {
      parsedValue = value === 'true';
    }
    
    const error = validateField(name, parsedValue as string | number);
    updateErrors(name, error);
    
    setProduct(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const updateErrors = (name: string, error: string) => {
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleAddSpecification = () => {
    if (!newSpecKey.trim() || !newSpecValue.trim()) return;
    
    setProduct(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [newSpecKey]: newSpecValue
      }
    }));
    
    setNewSpecKey("");
    setNewSpecValue("");
  };

  const handleRemoveSpecification = (key: string) => {
    setProduct(prev => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return {
        ...prev,
        specifications: newSpecs
      };
    });
  };

  const handleImageUrlChange = (index: number, url: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
  };

  const handleAddImageField = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleRemoveImageField = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    if (newUrls.length === 0) {
      newUrls.push("");
    }
    setImageUrls(newUrls);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const requiredFields = ['name', 'sku', 'price', 'category.id', 'supplier.id'];
    const formErrors: Record<string, string> = {};
    
    requiredFields.forEach(field => {
      let value;
      if (field.includes('.')) {
        const [parent] = field.split('.');
        if (parent === 'category' && field === 'category.id') {
          value = product.category?.id || '';
        } else if (parent === 'supplier' && field === 'supplier.id') {
          value = product.supplier?.id || '';
        }
      } else {
        value = product[field as keyof Product];
      }
      
      const error = validateField(field, value as string | number);
      if (error) {
        formErrors[field] = error;
      }
    });
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    try {
      setSaving(true);
      
      // Clean up images array (remove empty strings)
      const validImages = imageUrls.filter(url => url.trim() !== "");
      
      // Prepare product data with images
      const productToSave = {
        ...product,
        images: validImages,
        updatedAt: new Date().toISOString()
      };
      
      if (mode === 'create') {
        // Generate a new ID in a real implementation, this would be done by the backend
        productToSave.id = `new-${Date.now()}`;
        productToSave.createdAt = new Date().toISOString();
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, here we would make the API call to save the product
      console.log('Product saved:', productToSave);
      
      // Navigate back to products list
      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
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
        <button 
          onClick={() => navigate('/admin/products')} 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={18} />
          <span>Back to Products</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          {mode === 'create' ? 'Add New Product' : 'Edit Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Basic Information</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                Product Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={product.name}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${
                  errors['name'] ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-primary focus:outline-none`}
              />
              {errors['name'] && (
                <p className="mt-1 text-xs text-red-500">{errors['name']}</p>
              )}
            </div>

            <div>
              <label htmlFor="sku" className="mb-1 block text-sm font-medium text-gray-700">
                SKU *
              </label>
              <input
                id="sku"
                name="sku"
                type="text"
                value={product.sku}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${
                  errors['sku'] ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-primary focus:outline-none`}
              />
              {errors['sku'] && (
                <p className="mt-1 text-xs text-red-500">{errors['sku']}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={product.description}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Pricing and Inventory */}
        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label htmlFor="price" className="mb-1 block text-sm font-medium text-gray-700">
                Price (USD) *
              </label>
              <input
                id="price"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={product.price}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${
                  errors['price'] ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-primary focus:outline-none`}
              />
              {errors['price'] && (
                <p className="mt-1 text-xs text-red-500">{errors['price']}</p>
              )}
            </div>

            <div>
              <label htmlFor="salePrice" className="mb-1 block text-sm font-medium text-gray-700">
                Sale Price (USD) (Optional)
              </label>
              <input
                id="salePrice"
                name="salePrice"
                type="number"
                step="0.01"
                min="0"
                value={product.salePrice || ''}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${
                  errors['salePrice'] ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-primary focus:outline-none`}
              />
              {errors['salePrice'] && (
                <p className="mt-1 text-xs text-red-500">{errors['salePrice']}</p>
              )}
            </div>

            <div>
              <label htmlFor="isActive" className="mb-1 block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="isActive"
                name="isActive"
                value={product.isActive.toString()}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div>
              <label htmlFor="stock" className="mb-1 block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={product.stock}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${
                  errors['stock'] ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-primary focus:outline-none`}
              />
              {errors['stock'] && (
                <p className="mt-1 text-xs text-red-500">{errors['stock']}</p>
              )}
            </div>

            <div>
              <label htmlFor="minOrderQuantity" className="mb-1 block text-sm font-medium text-gray-700">
                Minimum Order Quantity
              </label>
              <input
                id="minOrderQuantity"
                name="minOrderQuantity"
                type="number"
                min="1"
                value={product.minOrderQuantity}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Categories and Supplier */}
        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Categories & Supplier</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="category.id" className="mb-1 block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="category.id"
                name="category.id"
                value={product.category.id}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${
                  errors['category.id'] ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-primary focus:outline-none`}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors['category.id'] && (
                <p className="mt-1 text-xs text-red-500">{errors['category.id']}</p>
              )}
            </div>

            <div>
              <label htmlFor="supplier.id" className="mb-1 block text-sm font-medium text-gray-700">
                Supplier *
              </label>
              <select
                id="supplier.id"
                name="supplier.id"
                value={product.supplier.id}
                onChange={handleInputChange}
                className={`w-full rounded-md border ${
                  errors['supplier.id'] ? 'border-red-500' : 'border-gray-300'
                } px-4 py-2 focus:border-primary focus:outline-none`}
              >
                <option value="">Select Supplier</option>
                {suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </select>
              {errors['supplier.id'] && (
                <p className="mt-1 text-xs text-red-500">{errors['supplier.id']}</p>
              )}
              {product.supplier && product.supplier.id && (
                <div className="mt-2 rounded-md bg-gray-50 p-2">
                  <p className="text-xs text-gray-600">
                    {product.supplier.contactEmail} | {product.supplier.contactPhone}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Product Images</h2>
          <div className="space-y-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-grow">
                  <label htmlFor={`image-${index}`} className="mb-1 block text-sm font-medium text-gray-700">
                    Image URL {index + 1}
                  </label>
                  <input
                    id={`image-${index}`}
                    type="text"
                    value={url}
                    onChange={(e) => handleImageUrlChange(index, e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                {url && (
                  <div className="h-16 w-16 flex-shrink-0">
                    <img
                      src={url}
                      alt="Preview"
                      className="h-full w-full rounded-md object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/100x100?text=Error';
                      }}
                    />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImageField(index)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <div>
              <button
                type="button"
                onClick={handleAddImageField}
                className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
              >
                <Plus size={16} />
                Add Image
              </button>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="overflow-hidden rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Specifications</h2>
          
          <div className="mb-6 space-y-4">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex items-center gap-4">
                <div className="flex-grow grid grid-cols-2 gap-4">
                  <div className="text-sm font-medium text-gray-700">{key}</div>
                  <div className="text-gray-800">{value}</div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSpecification(key)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="spec-key" className="mb-1 block text-sm font-medium text-gray-700">
                  Specification Name
                </label>
                <input
                  id="spec-key"
                  type="text"
                  value={newSpecKey}
                  onChange={(e) => setNewSpecKey(e.target.value)}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
                  placeholder="e.g. Brand, Color, Weight"
                />
              </div>
              <div>
                <label htmlFor="spec-value" className="mb-1 block text-sm font-medium text-gray-700">
                  Specification Value
                </label>
                <div className="flex gap-2">
                  <input
                    id="spec-value"
                    type="text"
                    value={newSpecValue}
                    onChange={(e) => setNewSpecValue(e.target.value)}
                    className="flex-grow rounded-md border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSpecification}
                    disabled={!newSpecKey.trim() || !newSpecValue.trim()}
                    className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || Object.keys(errors).length > 0}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 text-white hover:bg-primary-dark disabled:bg-gray-400"
          >
            {saving ? (
              <>
                <LoadingSpinner size="sm" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save Product</span>
              </>
            )}
          </button>
        </div>
        
        {/* Error Summary */}
        {Object.keys(errors).length > 0 && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            <div className="flex items-center gap-2">
              <AlertCircle size={20} />
              <p className="font-medium">Please correct the following errors:</p>
            </div>
            <ul className="ml-6 mt-2 list-disc">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProductForm;
