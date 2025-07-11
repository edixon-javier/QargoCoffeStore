import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import './pagination.css';

export interface PaginationProps {
  /**
   * Total number of items to paginate
   */
  totalItems: number;
  /**
   * Number of items per page
   */
  itemsPerPage: number;
  /**
   * Current page
   */
  currentPage: number;
  /**
   * Function to change the current page
   */
  onPageChange: (page: number) => void;
  /**
   * Text to display with the item counter (e.g., "products", "franchisees")
   */
  itemName?: string;
  /**
   * Maximum number of page buttons to display
   * @default 5
   */
  maxPageButtons?: number;
  /**
   * Design options
   * - 'simple': Only shows pagination buttons
   * - 'full': Shows item information and pagination buttons
   * - 'compact': Shows a compact version of pagination buttons
   */
  variant?: 'simple' | 'full' | 'compact';
  /**
   * Pagination size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Custom CSS class
   */
  className?: string;
  /**
   * Text for the "previous" button (used for accessibility)
   * @default "Previous"
   */
  previousLabel?: string;
  /**
   * Text for the "next" button (used for accessibility)
   * @default "Next"
   */
  nextLabel?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  itemName = 'items',
  maxPageButtons = 5,
  variant = 'full',
  size = 'md',
  className = '',
  previousLabel = 'Previous',
  nextLabel = 'Next',
}) => {
  // Basic pagination calculations
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Don't show pagination if there are no items or only one page
  if (totalItems <= 0 || totalPages <= 1) return null;

  // Function to go to the previous page
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Function to go to the next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Generate an array with page numbers to display
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    // If there are fewer pages than the maximum number of buttons, show them all
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Initialize the results array
    const result: (number | 'ellipsis')[] = [];
    
    // Always add the first page
    result.push(1);
    
    // Calculate the range of central pages
    const siblingsCount = Math.floor((maxPageButtons - 2) / 2); // 2 because we always show first and last
    
    let leftSiblingIndex = Math.max(2, currentPage - siblingsCount);
    let rightSiblingIndex = Math.min(totalPages - 1, currentPage + siblingsCount);
    
    // Adjust indices to maintain consistent total number of buttons
    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;
    
    if (!showLeftDots && showRightDots) {
      leftSiblingIndex = 2;
      rightSiblingIndex = Math.min(totalPages - 1, leftSiblingIndex + maxPageButtons - 3);
    }
    
    if (showLeftDots && !showRightDots) {
      rightSiblingIndex = totalPages - 1;
      leftSiblingIndex = Math.max(2, rightSiblingIndex - (maxPageButtons - 3));
    }
    
    // Add ellipsis or pages as appropriate
    if (showLeftDots) {
      result.push('ellipsis');
    }
    
    // Add central pages
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      result.push(i);
    }
    
    if (showRightDots) {
      result.push('ellipsis');
    }
    
    // Always add the last page if it's not the same as the first
    if (totalPages > 1) {
      result.push(totalPages);
    }
    
    return result;
  };

  const pageNumbers = getPageNumbers();

  // Determine size classes
  const sizeClasses = {
    sm: 'pagination-sm',
    md: 'pagination-md',
    lg: 'pagination-lg',
  }[size];
  
  return (
    <div className={`pagination-container ${variant === 'full' ? 'full' : ''} ${className}`}>
      {variant === 'full' && (
        <div className="pagination-info">
          Showing <span className="font-medium">{startItem}-{endItem}</span> of <span className="font-medium">{totalItems}</span> {itemName}
        </div>
      )}
      
      {/* Mobile version */}
      <div className="pagination-mobile">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage <= 1}
          className={`pagination-btn-mobile ${currentPage <= 1 ? 'disabled' : ''}`}
          aria-label={previousLabel}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="flex items-center justify-center text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage >= totalPages}
          className={`pagination-btn-mobile ${currentPage >= totalPages ? 'disabled' : ''}`}
          aria-label={nextLabel}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      
      {/* Desktop version */}
      <div className={`pagination-desktop ${sizeClasses}`}>
        <nav aria-label="Pagination">
          <ul className="pagination-list">
            {/* Previous button */}
            <li>
              <button
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
                className={`pagination-btn pagination-arrow ${currentPage <= 1 ? 'disabled' : ''}`}
                aria-label={previousLabel}
              >
                <ChevronLeft className="pagination-icon" aria-hidden="true" />
              </button>
            </li>
            
            {/* Page numbers */}
            {pageNumbers.map((pageNumber, index) => {
              if (pageNumber === 'ellipsis') {
                return (
                  <li key={`ellipsis-${index}`}>
                    <span className="pagination-ellipsis">
                      <MoreHorizontal className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                );
              }
              
              return (
                <li key={pageNumber}>
                  <button
                    onClick={() => onPageChange(pageNumber)}
                    className={`pagination-btn ${currentPage === pageNumber ? 'active' : ''}`}
                    aria-current={currentPage === pageNumber ? 'page' : undefined}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}
            
            {/* Next button */}
            <li>
              <button
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
                className={`pagination-btn pagination-arrow ${currentPage >= totalPages ? 'disabled' : ''}`}
                aria-label={nextLabel}
              >
                <ChevronRight className="pagination-icon" aria-hidden="true" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;