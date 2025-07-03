import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Edit, Eye, Trash2, Users } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';

// Mock data para franquiciados
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
  {
    id: "f2",
    name: "Coffee Central",
    email: "chicagocentral@qargocoffee.com",
    role: "franchisee",
    createdAt: "2023-03-22T10:30:00Z",
    billingInfo: {
      companyName: "Coffee Central LLC",
      dba: "Qargo Connect Chicago Central",
      billingAddress: {
        street: "322 N Michigan Ave",
        city: "Chicago",
        state: "IL",
        zipCode: "60601"
      },
      shippingAddress: {
        street: "322 N Michigan Ave",
        city: "Chicago",
        state: "IL",
        zipCode: "60601"
      },
      email: "chicagocentral@qargocoffee.com",
      phone: "(312) 555-1234",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 5678",
        expiryDate: "09/24",
        cvv: "***",
        cardholderName: "SARAH JOHNSON"
      }
    }
  },
  {
    id: "f3",
    name: "Urban Brews",
    email: "newark-downtown@qargocoffee.com",
    role: "franchisee",
    createdAt: "2023-05-10T09:15:00Z",
    billingInfo: {
      companyName: "Urban Brews Inc.",
      dba: "Qargo Connect Newark",
      billingAddress: {
        street: "744 Broad Street",
        city: "Newark",
        state: "NJ",
        zipCode: "07102"
      },
      shippingAddress: {
        street: "744 Broad Street",
        city: "Newark",
        state: "NJ",
        zipCode: "07102"
      },
      email: "newark-downtown@qargocoffee.com",
      phone: "(973) 555-9876",
      paymentMethod: {
        type: 'credit_card',
        cardNumber: "**** **** **** 9012",
        expiryDate: "03/26",
        cvv: "***",
        cardholderName: "MICHAEL CHEN"
      }
    }
  }
];

const FranchiseeManagement: React.FC = () => {
  const navigate = useNavigate();
  const [franchisees, setFranchisees] = useState<(User & { billingInfo?: BillingInfo })[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFranchisee, setSelectedFranchisee] = useState<(User & { billingInfo?: BillingInfo }) | null>(null);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Cargar datos de franquiciados
  useEffect(() => {
    // Simular carga de datos
    const timer = setTimeout(() => {
      setFranchisees(mockFranchisees);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filtrar franquiciados según búsqueda y filtro
  const filteredFranchisees = franchisees.filter((franchisee) => {
    const matchesSearch = 
      franchisee.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      franchisee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchisee.billingInfo?.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      franchisee.billingInfo?.dba.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    
    // Aquí se pueden agregar otros filtros como 'active', 'inactive', etc.
    return matchesSearch;
  });

  // Paginación
  const totalItems = filteredFranchisees.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const handleCreateNew = () => {
    navigate('/admin/franchisees/new');
  };

  const handleEdit = (franchisee: User & { billingInfo?: BillingInfo }) => {
    navigate(`/admin/franchisees/edit/${franchisee.id}`);
  };

  const handleViewDetails = (franchisee: User & { billingInfo?: BillingInfo }) => {
    navigate(`/admin/franchisees/${franchisee.id}`);
  };

  const handleDeleteClick = (franchisee: User & { billingInfo?: BillingInfo }) => {
    setSelectedFranchisee(franchisee);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedFranchisee) return;
    
    // En una implementación real, esto se conectaría a una API
    setFranchisees(franchisees.filter(f => f.id !== selectedFranchisee.id));
    setIsDeleteModalOpen(false);
    setSelectedFranchisee(null);
  };

  if (loading) {
    return <div className="flex justify-center p-8"><LoadingSpinner /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-semibold">Qargo Connect</h1>
          <p className="text-gray-600">Manage franchisees, their profiles and orders</p>
        </div>
        <button 
          onClick={handleCreateNew}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          <span>New Franchisee</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2 flex-1">
            <Search className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar franquiciados..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-0 focus:ring-0 text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <div>
              <label htmlFor="status" className="text-sm font-medium text-gray-700 mr-2">
                Estado:
              </label>
              <select
                id="status"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="text-sm border-gray-300 rounded-md"
              >
                <option value="all">Todos</option>
                <option value="active">Activos</option>
                <option value="inactive">Inactivos</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de franquiciados */}
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Franchisee
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFranchisees.length > 0 ? (
                filteredFranchisees.map((franchisee) => (
                  <tr key={franchisee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{franchisee.name}</div>
                          <div className="text-sm text-gray-500">{franchisee.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{franchisee.city}</div>
                      <div className="text-sm text-gray-500">{franchisee.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        franchisee.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {franchisee.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(franchisee.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleViewDetails(franchisee)}
                          className="text-primary-600 hover:text-primary-900 p-1"
                          title="Ver detalles"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(franchisee)}
                          className="text-blue-600 hover:text-blue-900 p-1"
                          title="Editar franquiciado"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(franchisee)}
                          className="text-red-600 hover:text-red-900 p-1"
                          title="Eliminar franquiciado"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No se encontraron franquiciados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1 
                    ? 'text-gray-300 bg-gray-50' 
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages || totalPages === 0
                    ? 'text-gray-300 bg-gray-50' 
                    : 'text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Mostrando de <span className="font-medium">{startItem}</span> a <span className="font-medium">{endItem}</span> de{' '}
                  <span className="font-medium">{totalItems}</span> franquiciados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 
                        ? 'text-gray-300' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <span>&laquo;</span>
                  </button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    )
                    .map((page, index, array) => {
                      const showEllipsis = index > 0 && page - array[index - 1] > 1;
                      return (
                        <React.Fragment key={page}>
                          {showEllipsis && (
                            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                              ...
                            </span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              page === currentPage 
                                ? 'z-10 bg-primary-600 text-white' 
                                : 'text-gray-500 bg-white hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      );
                    })}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages || totalPages === 0
                        ? 'text-gray-300' 
                        : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <span>&raquo;</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirmar eliminación</h3>
            <p className="text-gray-700 mb-6">
              ¿Estás seguro de que deseas eliminar este franquiciado? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FranchiseeManagement;
