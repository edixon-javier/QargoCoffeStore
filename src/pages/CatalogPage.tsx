import React, { useState } from 'react';
import { Filter, SlidersHorizontal, X, ChevronDown, ChevronUp, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import ProductCard from '../components/products/ProductCard';
import { useLocation } from 'react-router-dom';

// Mock data
import { mockProducts } from '../mockData';

const CatalogPage: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    suppliers: false,
  });
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('categoria');
  
  // Filter products based on URL parameters if needed
  const filteredProducts = categoryParam 
    ? mockProducts.filter(p => p.category.slug === categoryParam)
    : mockProducts;

  const toggleFilter = () => setFilterOpen(!filterOpen);
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const addFilter = (filter: string) => {
    if (!activeFilters.includes(filter)) {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-serif mb-2">Catálogo de Productos</h1>
        <p className="text-secondary-600">
          Encuentra todo lo que necesitas para tu negocio de café
        </p>
      </div>

      {/* Filter and sort bar */}
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Filter size={16} />}
          onClick={toggleFilter}
          className="md:hidden"
        >
          Filtros
        </Button>

        <div className="flex items-center gap-2 flex-grow md:flex-grow-0">
          <span className="text-sm text-secondary-600">Ver como:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${
              viewMode === 'grid' ? 'bg-primary-100 text-primary-800' : 'text-secondary-400'
            }`}
            aria-label="Ver en cuadrícula"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${
              viewMode === 'list' ? 'bg-primary-100 text-primary-800' : 'text-secondary-400'
            }`}
            aria-label="Ver en lista"
          >
            <List size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-secondary-600">Ordenar por:</span>
          <select className="border border-gray-300 rounded p-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500">
            <option>Relevancia</option>
            <option>Precio: Menor a Mayor</option>
            <option>Precio: Mayor a Menor</option>
            <option>Más vendidos</option>
          </select>
        </div>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-secondary-600">Filtros activos:</span>
          {activeFilters.map((filter) => (
            <span 
              key={filter} 
              className="px-2 py-1 bg-primary-100 text-primary-800 text-sm rounded-full flex items-center"
            >
              {filter}
              <button 
                onClick={() => removeFilter(filter)} 
                className="ml-1 text-primary-600 hover:text-primary-800"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          <button 
            className="text-sm text-primary-600 hover:text-primary-800"
            onClick={() => setActiveFilters([])}
          >
            Limpiar todos
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-soft p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Filtros</h3>
              <SlidersHorizontal size={18} className="text-secondary-400" />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <button 
                className="flex items-center justify-between w-full text-left font-medium mb-2"
                onClick={() => toggleSection('categories')}
              >
                <span>Categorías</span>
                {expandedSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <AnimatePresence>
                {expandedSections.categories && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-2 ml-1">
                      {['Café en grano', 'Café molido', 'Máquinas profesionales', 'Accesorios', 'Insumos'].map((cat) => (
                        <div key={cat} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`cat-${cat}`} 
                            className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                            onChange={() => addFilter(cat)}
                          />
                          <label htmlFor={`cat-${cat}`} className="text-sm">{cat}</label>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Price range */}
            <div className="mb-6">
              <button 
                className="flex items-center justify-between w-full text-left font-medium mb-2"
                onClick={() => toggleSection('price')}
              >
                <span>Rango de precio</span>
                {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <AnimatePresence>
                {expandedSections.price && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-3 px-1">
                      <div className="flex items-center justify-between gap-2">
                        <input 
                          type="number" 
                          placeholder="Min" 
                          className="w-full p-1.5 border border-gray-300 rounded text-sm" 
                        />
                        <span className="text-gray-400">-</span>
                        <input 
                          type="number" 
                          placeholder="Max" 
                          className="w-full p-1.5 border border-gray-300 rounded text-sm" 
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                      >
                        Aplicar
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Suppliers */}
            <div className="mb-6">
              <button 
                className="flex items-center justify-between w-full text-left font-medium mb-2"
                onClick={() => toggleSection('suppliers')}
              >
                <span>Proveedores</span>
                {expandedSections.suppliers ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <AnimatePresence>
                {expandedSections.suppliers && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="space-y-2 ml-1">
                      {['Café Italiano S.A.', 'ImportCoffee', 'CafeMaq', 'BaristaTools'].map((sup) => (
                        <div key={sup} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`sup-${sup}`} 
                            className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                            onChange={() => addFilter(sup)}
                          />
                          <label htmlFor={`sup-${sup}`} className="text-sm">{sup}</label>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile filters drawer */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
              onClick={toggleFilter}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'tween' }}
                className="absolute top-0 left-0 w-3/4 h-full bg-white overflow-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Filtros</h3>
                    <button onClick={toggleFilter} className="p-1">
                      <X size={20} className="text-secondary-600" />
                    </button>
                  </div>
                  
                  {/* Filter content - same as desktop but mobile optimized */}
                  <div className="space-y-6">
                    {/* Categories */}
                    <div>
                      <button 
                        className="flex items-center justify-between w-full text-left font-medium mb-2"
                        onClick={() => toggleSection('categories')}
                      >
                        <span>Categorías</span>
                        {expandedSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSections.categories && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="space-y-2 ml-1">
                              {['Café en grano', 'Café molido', 'Máquinas profesionales', 'Accesorios', 'Insumos'].map((cat) => (
                                <div key={cat} className="flex items-center">
                                  <input 
                                    type="checkbox" 
                                    id={`m-cat-${cat}`} 
                                    className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                                    onChange={() => addFilter(cat)}
                                  />
                                  <label htmlFor={`m-cat-${cat}`} className="text-sm">{cat}</label>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Price range */}
                    <div>
                      <button 
                        className="flex items-center justify-between w-full text-left font-medium mb-2"
                        onClick={() => toggleSection('price')}
                      >
                        <span>Rango de precio</span>
                        {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSections.price && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="space-y-3 px-1">
                              <div className="flex items-center justify-between gap-2">
                                <input 
                                  type="number" 
                                  placeholder="Min" 
                                  className="w-full p-2 border border-gray-300 rounded text-sm" 
                                />
                                <span className="text-gray-400">-</span>
                                <input 
                                  type="number" 
                                  placeholder="Max" 
                                  className="w-full p-2 border border-gray-300 rounded text-sm" 
                                />
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full"
                              >
                                Aplicar
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Other filters */}
                    {/* ... */}
                  </div>
                  
                  <div className="mt-8 space-y-3">
                    <Button 
                      variant="primary" 
                      fullWidth
                      onClick={toggleFilter}
                    >
                      Aplicar filtros
                    </Button>
                    <Button 
                      variant="outline" 
                      fullWidth
                      onClick={() => {
                        setActiveFilters([]);
                        toggleFilter();
                      }}
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products grid */}
        <div className="flex-grow">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-secondary-600 mb-4">No se encontraron productos.</p>
              <Button
                variant="outline"
                onClick={() => setActiveFilters([])}
              >
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" 
              : "space-y-4"
            }>
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  layout={viewMode}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="px-3">
                &laquo;
              </Button>
              {[1, 2, 3, 4, 5].map(page => (
                <Button 
                  key={page} 
                  variant={page === 1 ? 'primary' : 'outline'} 
                  size="sm" 
                  className="px-3"
                >
                  {page}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="px-3">
                &raquo;
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;