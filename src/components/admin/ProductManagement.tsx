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
import { Pagination } from '../ui';
import Modal from '../ui/Modal';
import { formatCurrency } from '../../lib/utils';

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
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <PlusCircle size={18} />
          <span className="font-medium">Add New Product</span>
        </button>
      </div>

      {/* Filters and search */}
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
          
          {/* Category and supplier filters */}
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-600">Filter:</span>
            </div>

            {/* Status filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-md border border-gray-200 px-3 py-2 focus:border-primary focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            {/* Category filter */}
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

            {/* Supplier filter */}
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

        {/* Price range filter */}
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-600">
              Price Range:
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) =>
                setPriceRange({ ...priceRange, min: e.target.value })
              }
              className="w-24 rounded-md border border-gray-200 px-3 py-2 focus:border-primary focus:outline-none"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: e.target.value })
              }
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

      {/* Products table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                <div
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort("name")}
                >
                  Product Name
                  {sortConfig.key === "name" && (
                    <ArrowUpDown
                      size={16}
                      className={
                        sortConfig.direction === "asc"
                          ? "transform rotate-180"
                          : ""
                      }
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                <div
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort("sku")}
                >
                  SKU
                  {sortConfig.key === "sku" && (
                    <ArrowUpDown
                      size={16}
                      className={
                        sortConfig.direction === "asc"
                          ? "transform rotate-180"
                          : ""
                      }
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                <div
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort("price")}
                >
                  Price
                  {sortConfig.key === "price" && (
                    <ArrowUpDown
                      size={16}
                      className={
                        sortConfig.direction === "asc"
                          ? "transform rotate-180"
                          : ""
                      }
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                <div
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort("category.name")}
                >
                  Category
                  {sortConfig.key === "category.name" && (
                    <ArrowUpDown
                      size={16}
                      className={
                        sortConfig.direction === "asc"
                          ? "transform rotate-180"
                          : ""
                      }
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                <div
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort("supplier.name")}
                >
                  Supplier
                  {sortConfig.key === "supplier.name" && (
                    <ArrowUpDown
                      size={16}
                      className={
                        sortConfig.direction === "asc"
                          ? "transform rotate-180"
                          : ""
                      }
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                <div
                  className="flex cursor-pointer items-center gap-1"
                  onClick={() => handleRequestSort("stock")}
                >
                  Stock
                  {sortConfig.key === "stock" && (
                    <ArrowUpDown
                      size={16}
                      className={
                        sortConfig.direction === "asc"
                          ? "transform rotate-180"
                          : ""
                      }
                    />
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
              >
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
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">{product.sku}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(product.price)}
                      {product.salePrice &&
                        product.salePrice < product.price && (
                          <span className="ml-2 text-xs text-green-600">
                            Sale: {formatCurrency(product.salePrice)}
                          </span>
                        )}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {product.category.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-500">
                      {product.supplier.name}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div
                      className={`text-sm ${
                        product.stock < 5
                          ? "text-red-600 font-medium"
                          : "text-gray-500"
                      }`}
                    >
                      {product.stock}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        product.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.isActive ? "Active" : "Inactive"}
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
                          product.isActive
                            ? "text-red-400 hover:text-red-500"
                            : "text-green-400 hover:text-green-500"
                        }`}
                        title={product.isActive ? "Disable" : "Enable"}
                      >
                        {product.isActive ? (
                          <XCircle size={18} />
                        ) : (
                          <CheckCircle size={18} />
                        )}
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
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          itemName="productos"
          previousLabel="Anterior"
          nextLabel="Siguiente"
          variant="full"
          maxPageButtons={5}
        />
      )}

      {/* Delete confirmation modal */}
      {isDeleteModalOpen && selectedProduct && (
        <Modal
          title="Delete Product"
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Deletion
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="mt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteProduct}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ProductManagement;
