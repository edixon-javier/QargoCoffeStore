import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Filter,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  DollarSign,
  Tag
} from 'lucide-react';
import { Product, Supplier } from '../../lib/types';
import { mockProducts } from '../../mockData';
import { categories } from '../../catalogData';
import { mockSuppliers } from '../../mockSuppliers';
import LoadingSpinner from '../ui/LoadingSpinner';
import Modal from '../ui/Modal';

const ProductManagement: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [supplierFilter, setSupplierFilter] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product | 'supplier.name', 
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' });
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  // Cargar datos de productos
  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setSuppliers(mockSuppliers);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Función para ordenar la lista
  const sortedProducts = React.useMemo(() => {
    const sortableItems = [...products];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'supplier.name') {
          const aName = a.supplier?.name || '';
          const bName = b.supplier?.name || '';
          return sortConfig.direction === 'asc' 
            ? aName.localeCompare(bName) 
            : bName.localeCompare(aName);
        }

        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [products, sortConfig]);

  // Filtrar productos según búsqueda y filtros
  const filteredProducts = sortedProducts.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && product.isActive) ||
      (statusFilter === 'inactive' && !product.isActive);
    
    const matchesCategory = categoryFilter === 'all' || 
      product.category?.id === categoryFilter;

    const matchesSupplier = supplierFilter === 'all' || 
      product.supplier?.id === supplierFilter;
    
    const matchesPrice = (!priceRange.min || product.price >= Number(priceRange.min)) && 
                         (!priceRange.max || product.price <= Number(priceRange.max));
    
    return matchesSearch && matchesStatus && matchesCategory && matchesSupplier && matchesPrice;
  });

  // Paginación
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const currentProducts = filteredProducts.slice(startItem, endItem);

  const handleRequestSort = (key: keyof Product | 'supplier.name') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleCreateNew = () => {
    navigate('/admin/products/new');
  };

  const handleEditProduct = (product: Product) => {
    navigate(`/admin/products/edit/${product.id}`);
  };

  const handleViewProduct = (product: Product) => {
    navigate(`/admin/products/${product.id}`);
  };

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      // En un sistema real, aquí se haría una llamada a la API
      setProducts(products.filter(p => p.id !== selectedProduct.id));
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleToggleActive = (product: Product) => {
    // En un sistema real, aquí se haría una llamada a la API
    setProducts(products.map(p => 
      p.id === product.id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setSupplierFilter('all');
    setPriceRange({ min: '', max: '' });
  };

  if (loading) {
    return <div className="flex justify-center p-8"><LoadingSpinner /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <button
          onClick={handleCreateNew}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark"
        >
          <PlusCircle size={18} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border border-gray-200 py-2 pl-10 pr-4 focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Filter:</span>
            </div>

            {/* Filtro de estado */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-gray-200 px-3 py-2 focus:border-primary focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Filtro de categoría */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-md border border-gray-200 px-3 py-2 focus:border-primary focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Filtro de proveedor */}
            <select
              value={supplierFilter}
              onChange={(e) => setSupplierFilter(e.target.value)}
              className="rounded-md border border-gray-200 px-3 py-2 focus:border-primary focus:outline-none"
            >
              <option value="all">All Suppliers</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filtro de precio */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-600">Price Range:</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="w-24 rounded-md border border-gray-200 px-3 py-2 focus:border-primary focus:outline-none"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="w-24 rounded-md border border-gray-200 px-3 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          <button
            onClick={resetFilters}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <div 
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort('name')}
                >
                  Product Name
                  {sortConfig.key === 'name' && (
                    <ArrowUpDown size={16} className={sortConfig.direction === 'asc' ? 'transform rotate-180' : ''} />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <div 
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort('sku')}
                >
                  SKU
                  {sortConfig.key === 'sku' && (
                    <ArrowUpDown size={16} className={sortConfig.direction === 'asc' ? 'transform rotate-180' : ''} />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <div 
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort('price')}
                >
                  Price
                  {sortConfig.key === 'price' && (
                    <ArrowUpDown size={16} className={sortConfig.direction === 'asc' ? 'transform rotate-180' : ''} />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <div 
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort('category.name')}
                >
                  Category
                  {sortConfig.key === 'category.name' && (
                    <ArrowUpDown size={16} className={sortConfig.direction === 'asc' ? 'transform rotate-180' : ''} />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <div 
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort('supplier.name')}
                >
                  Supplier
                  {sortConfig.key === 'supplier.name' && (
                    <ArrowUpDown size={16} className={sortConfig.direction === 'asc' ? 'transform rotate-180' : ''} />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                <div 
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort('stock')}
                >
                  Stock
                  {sortConfig.key === 'stock' && (
                    <ArrowUpDown size={16} className={sortConfig.direction === 'asc' ? 'transform rotate-180' : ''} />
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {product.images && product.images.length > 0 ? (
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={product.images[0]}
                            alt={product.name}
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                            <Tag size={16} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{product.sku}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                      {product.salePrice && product.salePrice < product.price && (
                        <span className="ml-2 text-xs text-green-600">
                          Sale: ${product.salePrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{product.category.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{product.supplier.name}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className={`text-sm ${product.stock < 5 ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                      {product.stock}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        product.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleViewProduct(product)}
                        className="text-gray-400 hover:text-gray-500"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-400 hover:text-blue-500"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleToggleActive(product)}
                        className={`${
                          product.isActive ? 'text-red-400 hover:text-red-500' : 'text-green-400 hover:text-green-500'
                        }`}
                        title={product.isActive ? 'Disable' : 'Enable'}
                      >
                        {product.isActive ? <XCircle size={18} /> : <CheckCircle size={18} />}
                      </button>
                      <button
                        onClick={() => handleDeleteClick(product)}
                        className="text-red-400 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center">
                  <div className="text-gray-500">No products found</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === 1
                  ? 'text-gray-300'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                currentPage === totalPages
                  ? 'text-gray-300'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startItem + 1}</span> to{' '}
                <span className="font-medium">{endItem}</span> of{' '}
                <span className="font-medium">{totalItems}</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center rounded-l-md px-2 py-2 ${
                    currentPage === 1
                      ? 'text-gray-300'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                        pageNumber === currentPage
                          ? 'z-10 border-primary bg-primary text-white'
                          : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center rounded-r-md px-2 py-2 ${
                    currentPage === totalPages
                      ? 'text-gray-300'
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {isDeleteModalOpen && selectedProduct && (
        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete the product "{selectedProduct.name}"? This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductManagement;
