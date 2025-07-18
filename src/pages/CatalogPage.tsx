import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Filter, SlidersHorizontal, X, ChevronDown, ChevronUp, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/ui/Button';
import { Select, Pagination } from '../components/ui';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProductCardSkeleton from '../components/ui/ProductCardSkeleton';
import { useLocation } from 'react-router-dom';

// Mock data
import { mockProducts, categories, suppliers } from '../mockData';

const CatalogPage: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('relevance');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  
  // States for each filter type
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{min: number|null, max: number|null}>({min: null, max: null});
  
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    suppliers: false,
  });
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('categoria');
  
  // Initialize category from URL if it exists
  useEffect(() => {
    if (categoryParam) {
      const categoryName = categories.find(c => c.slug === categoryParam)?.name;
      if (categoryName) {
        setSelectedCategories([categoryName]);
        setActiveFilters([categoryName]);
      }
    }
  }, [categoryParam]);
  
  // Simular tiempo de carga para demostración
  // Usamos useCallback para evitar regenerar la función en cada renderizado
  const applyFilters = useCallback(() => {
    setIsLoading(true);
    
    // Simular carga de datos con un pequeño retraso
    // En una implementación real, aquí iría la llamada a la API
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Cuando cambian los filtros o la paginación, aplicamos los filtros con un debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 200); // Pequeño debounce para no disparar demasiadas actualizaciones
    
    return () => clearTimeout(timer);
  }, [selectedCategories, selectedSuppliers, priceRange, sortOption, currentPage, applyFilters]);
  
  // Filtrado y ordenamiento de productos
  const filteredProducts = useMemo(() => {
    // Primero filtrar los productos
    const filtered = mockProducts.filter(product => {
      // Filtrado por categoría
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category.name)) {
        return false;
      }
      
      // Filtrado por proveedor
      if (selectedSuppliers.length > 0 && !selectedSuppliers.includes(product.supplier.name)) {
        return false;
      }
      
      // Filtrado por rango de precio
      if (priceRange.min !== null && product.price < priceRange.min) {
        return false;
      }
      if (priceRange.max !== null && product.price > priceRange.max) {
        return false;
      }
      
      return true;
    });
    
    // Luego ordenar los productos filtrados
    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          // Price low to high
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        
        case 'price-desc':
          // Price high to low
          return (b.salePrice || b.price) - (a.salePrice || a.price);
          
        case 'relevance':
        default:
          // Default, keep original order
          return 0;
      }
    });
  }, [selectedCategories, selectedSuppliers, priceRange, sortOption]);

  const toggleFilter = () => setFilterOpen(!filterOpen);
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Maneja los cambios en el filtro de categorías
  const handleCategoryChange = (category: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategories(prev => [...prev, category]);
      setActiveFilters(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
      setActiveFilters(prev => prev.filter(f => f !== category));
    }
  };

  // Maneja los cambios en el filtro de proveedores
  const handleSupplierChange = (supplier: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSuppliers(prev => [...prev, supplier]);
      setActiveFilters(prev => [...prev, supplier]);
    } else {
      setSelectedSuppliers(prev => prev.filter(s => s !== supplier));
      setActiveFilters(prev => prev.filter(f => f !== supplier));
    }
  };

  // Aplica el filtro de rango de precio
  const applyPriceFilter = () => {
    const min = minPrice ? parseInt(minPrice) : null;
    const max = maxPrice ? parseInt(maxPrice) : null;
    
    setPriceRange({min, max});
    
    // Remove previous price filters
    setActiveFilters(prev => prev.filter(f => !f.includes('Price:')));
    
    // Add new price filter if any value was specified
    if (min !== null || max !== null) {
      const priceFilterText = `Price: ${min !== null ? min : '0'}-${max !== null ? max : '∞'}`;
      setActiveFilters(prev => [...prev, priceFilterText]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
    
    // Determinar qué tipo de filtro es y eliminarlo del estado correspondiente
    if (selectedCategories.includes(filter)) {
      setSelectedCategories(prev => prev.filter(c => c !== filter));
    } else if (selectedSuppliers.includes(filter)) {
      setSelectedSuppliers(prev => prev.filter(s => s !== filter));
    } else if (filter.includes('Price:')) {
      setPriceRange({min: null, max: null});
      setMinPrice('');
      setMaxPrice('');
    }
  };
  
  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setActiveFilters([]);
    setSelectedCategories([]);
    setSelectedSuppliers([]);
    setPriceRange({min: null, max: null});
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1); // Resetear a la primera página al limpiar filtros
  };

  // Función para obtener los productos de la página actual
  const getCurrentPageProducts = () => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  };

  return (
    <div className="container-custom py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-serif mb-2">Product Catalog</h1>
        <p className="text-secondary-600">
          Find everything you need for your coffee business
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
          Filters
        </Button>

        <div className="flex items-center gap-2 flex-grow md:flex-grow-0">
          <span className="text-sm text-secondary-600">View as:</span>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded ${
              viewMode === 'grid' ? 'bg-primary-100 text-primary-800' : 'text-secondary-400'
            }`}
            aria-label="View as grid"
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded ${
              viewMode === 'list' ? 'bg-primary-100 text-primary-800' : 'text-secondary-400'
            }`}
            aria-label="View as list"
          >
            <List size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-secondary-600">Sort by:</span>
          <Select 
            size="sm"
            options={[
              { value: 'relevance', label: 'Relevance' },
              { value: 'price-asc', label: 'Price: Low to High' },
              { value: 'price-desc', label: 'Price: High to Low' }
            ]}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="min-w-[160px]"
          />
        </div>
      </div>

      {/* Active filters */}
      {activeFilters.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-secondary-600">Active filters:</span>
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
            onClick={clearAllFilters}
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-soft p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Filters</h3>
              <SlidersHorizontal size={18} className="text-secondary-400" />
            </div>

             {/* Suppliers */}
            <div className="mb-6">
              <button 
                className="flex items-center justify-between w-full text-left font-medium mb-2"
                onClick={() => toggleSection('suppliers')}
              >
                <span>Suppliers</span>
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
                      {suppliers.map((sup) => (
                        <div key={sup.id} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`sup-${sup.id}`} 
                            checked={selectedSuppliers.includes(sup.name)}
                            className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                            onChange={(e) => handleSupplierChange(sup.name, e.target.checked)}
                          />
                          <label htmlFor={`sup-${sup.id}`} className="text-sm">{sup.name}</label>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <button 
                className="flex items-center justify-between w-full text-left font-medium mb-2"
                onClick={() => toggleSection('categories')}
              >
                <span>Categories</span>
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
                      {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center">
                          <input 
                            type="checkbox" 
                            id={`cat-${cat.id}`} 
                            checked={selectedCategories.includes(cat.name)}
                            className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                            onChange={(e) => handleCategoryChange(cat.name, e.target.checked)}
                          />
                          <label htmlFor={`cat-${cat.id}`} className="text-sm">{cat.name}</label>
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
                <span>Price Range</span>
                {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              
              <AnimatePresence>
                {expandedSections.price && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >                      <div className="space-y-3 px-1">
                      <div className="flex items-center justify-between gap-2">
                        <input 
                          type="number" 
                          placeholder="Min" 
                          className="w-full p-1.5 border border-gray-300 rounded text-sm" 
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <span className="text-gray-400">-</span>
                        <input 
                          type="number" 
                          placeholder="Max" 
                          className="w-full p-1.5 border border-gray-300 rounded text-sm" 
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={applyPriceFilter}
                      >
                        Apply
                      </Button>
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
                className="absolute top-0 left-0 w-3/4 h-full bg-secondary-50 overflow-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium">Filters</h3>
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
                        <span>Categories</span>
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
                              {categories.map((cat) => (
                                <div key={`m-${cat.id}`} className="flex items-center">
                                  <input 
                                    type="checkbox" 
                                    id={`m-cat-${cat.id}`} 
                                    checked={selectedCategories.includes(cat.name)}
                                    className="rounded text-primary-600 focus:ring-primary-500 mr-2"
                                    onChange={(e) => handleCategoryChange(cat.name, e.target.checked)}
                                  />
                                  <label htmlFor={`m-cat-${cat.id}`} className="text-sm">{cat.name}</label>
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
                        <span>Price Range</span>
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
                                  className="w-full p-2 border border-primary-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-400" 
                                  value={minPrice}
                                  onChange={(e) => setMinPrice(e.target.value)}
                                />
                                <span className="text-secondary-400">-</span>
                                <input 
                                  type="number" 
                                  placeholder="Max" 
                                  className="w-full p-2 border border-primary-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary-400" 
                                  value={maxPrice}
                                  onChange={(e) => setMaxPrice(e.target.value)}
                                />
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full"
                                onClick={applyPriceFilter}
                              >
                                Apply
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
                      Apply Filters
                    </Button>
                    <Button 
                      variant="outline" 
                      fullWidth
                      onClick={() => {
                        clearAllFilters();
                        toggleFilter();
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>          {/* Products grid */}
        <div className="flex-grow">
          {isLoading ? (
            // Show skeleton during loading
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" 
              : "space-y-4"
            }>
              {Array.from({ length: productsPerPage }).map((_, index) => (
                <ProductCardSkeleton 
                  key={index} 
                  layout={viewMode}
                />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-secondary-600 mb-4">No products found.</p>
              <Button
                variant="outline"
                onClick={clearAllFilters}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" 
              : "space-y-4"
            }>
              {getCurrentPageProducts().map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  layout={viewMode}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="mt-8">
              <Pagination 
                totalItems={filteredProducts.length}
                itemsPerPage={productsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                itemName="productos"
                variant="simple"
                size="sm"
                maxPageButtons={5}
                className="justify-center" 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;