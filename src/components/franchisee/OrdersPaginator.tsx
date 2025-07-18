import React, { useState } from 'react';
import Pagination from '../ui/Pagination';
import { Order } from '../../contexts/OrderContext';

interface OrdersPaginatorProps {
  orders: Order[];
  itemsPerPage?: number;
  renderOrder: (order: Order, expandedOrderId: string | null, toggleOrderDetails: (id: string) => void) => React.ReactNode;
}

const OrdersPaginator: React.FC<OrdersPaginatorProps> = ({ orders, itemsPerPage = 10, renderOrder }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);
  const currentOrders = orders.slice(startIdx, endIdx);

  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <>
      <div className="space-y-4">
        {currentOrders.map(order => renderOrder(order, expandedOrderId, toggleOrderDetails))}
      </div>
      {totalItems > itemsPerPage && (
        <div className="mt-6">
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            itemName="orders"
            variant="full"
            size="md"
            previousLabel="Previous"
            nextLabel="Next"
          />
        </div>
      )}
    </>
  );
};

export default OrdersPaginator;
