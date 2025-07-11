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
  Package
} from 'lucide-react';
import { Supplier } from '../../lib/types';
import { mockSuppliers } from '../../mockSuppliers';
import LoadingSpinner from '../ui/LoadingSpinner';
import Modal from '../ui/Modal';
import { Pagination } from '../ui';

const SupplierManagement: React.FC = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Supplier | 'productsCount', 
    direction: 'asc' | 'desc'
  }>({ key: 'name', direction: 'asc' });

  // Cargar datos de proveedores
  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setSuppliers(mockSuppliers);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Función para ordenar la lista
  const sortedSuppliers = React.useMemo(() => {
    const sortableItems = [...suppliers];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === 'productsCount') {
          // En un caso real, aquí obtendrías el número de productos
          const aCount = 0; // Placeholder
          const bCount = 0; // Placeholder
          return sortConfig.direction === 'asc' ? aCount - bCount : bCount - aCount;
        }

        // Comprobamos que ambos objetos tienen la propiedad antes de comparar
        const aValue = a[sortConfig.key as keyof Supplier];
        const bValue = b[sortConfig.key as keyof Supplier];
        
        // Comparación segura usando String para evitar problemas con valores nulos/indefinidos
        const aString = String(aValue || '');
        const bString = String(bValue || '');
        
        if (aString < bString) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aString > bString) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [suppliers, sortConfig]);

  // Filtrar proveedores según búsqueda y filtro
  const filteredSuppliers = sortedSuppliers.filter((supplier) => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      supplier.contactEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (supplier.companyName && supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && supplier.status === 'active';
    if (filter === 'inactive') return matchesSearch && supplier.status === 'inactive';
    
    return matchesSearch;
  });

  // Paginación
  const totalItems = filteredSuppliers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const currentSuppliers = filteredSuppliers.slice(startItem, endItem);

  const handleRequestSort = (key: keyof Supplier | 'productsCount') => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleCreateNew = () => {
    navigate('/admin/suppliers/new');
  };

  const handleEdit = (supplier: Supplier) => {
    navigate(`/admin/suppliers/edit/${supplier.id}`);
  };

  const handleViewDetails = (supplier: Supplier) => {
    navigate(`/admin/suppliers/${supplier.id}`);
  };

  const handleDeleteClick = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedSupplier) return;
    
    // En una implementación real, esto se conectaría a una API
    setSuppliers(suppliers.filter(s => s.id !== selectedSupplier.id));
    setIsDeleteModalOpen(false);
    setSelectedSupplier(null);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="flex justify-center p-8"><LoadingSpinner /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Supplier Management</h1>
          <p className="text-gray-600">Manage your product suppliers</p>
        </div>
        <button 
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          <span>Add New Supplier</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search suppliers by name, company, or email..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select 
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Suppliers</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de proveedores */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleRequestSort('name')}
                >
                  <div className="flex items-center gap-2">
                    <span>Name</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleRequestSort('companyName')}
                >
                  <div className="flex items-center gap-2">
                    <span>Company</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleRequestSort('status')}
                >
                  <div className="flex items-center gap-2">
                    <span>Status</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleRequestSort('productsCount')}
                >
                  <div className="flex items-center gap-2">
                    <span>Products</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSuppliers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No suppliers found matching your criteria
                  </td>
                </tr>
              ) : (
                currentSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {supplier.logo ? (
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={supplier.logo}
                              alt={supplier.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-primary-700 font-medium">
                                {supplier.name.substring(0, 2).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{supplier.name}</div>
                          <div className="text-sm text-gray-500">
                            Created: {new Date(supplier.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {supplier.companyName || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{supplier.contactEmail}</div>
                      <div className="text-sm text-gray-500">{supplier.contactPhone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        supplier.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {supplier.status === 'active' ? (
                          <CheckCircle className="h-4 w-4 mr-1" />
                        ) : (
                          <XCircle className="h-4 w-4 mr-1" />
                        )}
                        {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-1 text-gray-400" />
                        {/* Aquí mostraríamos el contador real de productos */}
                        <span>0</span> 
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button 
                          onClick={() => handleViewDetails(supplier)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleEdit(supplier)}
                          className="text-amber-600 hover:text-amber-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(supplier)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <Pagination
              totalItems={filteredSuppliers.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              itemName="proveedores"
              variant="full"
              size="md"
              previousLabel="Anterior"
              nextLabel="Siguiente"
            />
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          title="Confirm Deletion"
        >
          <div className="p-6">
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete the supplier <span className="font-medium">{selectedSupplier?.name}</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Supplier
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SupplierManagement;
