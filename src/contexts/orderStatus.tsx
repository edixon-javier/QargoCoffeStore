import React, { createContext, useState, useEffect } from 'react';

// Types
interface OrderStatus {
  id: string;
  name: string;
  color: string;
}

interface OrderStatusContextType {
  customStatuses: OrderStatus[];
  addStatus: (status: Omit<OrderStatus, 'id'>) => void;
  updateStatus: (id: string, status: Partial<OrderStatus>) => void;
  deleteStatus: (id: string) => void;
}

// Default statuses in English
const defaultStatuses = [
  { id: '1', name: 'Pending', color: '#FFA500' },
  { id: '2', name: 'Processing', color: '#3B82F6' },
  { id: '3', name: 'Shipped', color: '#10B981' },
  { id: '4', name: 'Delivered', color: '#047857' },
  { id: '5', name: 'Cancelled', color: '#EF4444' },
  { id: '6', name: 'Awaiting Payment', color: '#6B7280' },
  { id: '7', name: 'Returned', color: '#8B5CF6' },
  { id: '8', name: 'Payment Confirmed', color: '#F59E0B' }
] as const;

// Create context
const OrderStatusContext = createContext<OrderStatusContextType>({
  customStatuses: defaultStatuses,
  addStatus: () => {},
  updateStatus: () => {},
  deleteStatus: () => {}
});

// Provider component
const OrderStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [customStatuses, setCustomStatuses] = useState(() => {
    const savedStatuses = localStorage.getItem('orderStatuses');
    return savedStatuses ? JSON.parse(savedStatuses) : defaultStatuses;
  });

  useEffect(() => {
    localStorage.setItem('orderStatuses', JSON.stringify(customStatuses));
  }, [customStatuses]);

  const addStatus = (newStatus: Omit<OrderStatus, 'id'>) => {
    const status: OrderStatus = {
      ...newStatus,
      id: Date.now().toString()
    };
    setCustomStatuses(prev => [...prev, status]);
  };

  const updateStatus = (id: string, updatedStatus: Partial<OrderStatus>) => {
    setCustomStatuses(prev => 
      prev.map(status => 
        status.id === id ? { ...status, ...updatedStatus } : status
      )
    );
  };

  const deleteStatus = (id: string) => {
    setCustomStatuses(prev => prev.filter(status => status.id !== id));
  };

  return (
    <OrderStatusContext.Provider 
      value={{ 
        customStatuses, 
        addStatus, 
        updateStatus, 
        deleteStatus 
      }}
    >
      {children}
    </OrderStatusContext.Provider>
  );
};

export { OrderStatusContext, OrderStatusProvider };
