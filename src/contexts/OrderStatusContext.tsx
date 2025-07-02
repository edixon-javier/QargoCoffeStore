import React, { createContext, useState, useEffect } from 'react';
import { OrderStatusContextType, defaultStatuses } from '../types/orderStatus';

export const OrderStatusContext = createContext<OrderStatusContextType>({
  customStatuses: defaultStatuses,
  addStatus: () => {},
  updateStatus: () => {},
  deleteStatus: () => {}
});

export function OrderStatusProvider({ children }: { children: React.ReactNode }) {
  const [customStatuses, setCustomStatuses] = useState(() => {
    const savedStatuses = localStorage.getItem('orderStatuses');
    return savedStatuses ? JSON.parse(savedStatuses) : defaultStatuses;
  });

  useEffect(() => {
    localStorage.setItem('orderStatuses', JSON.stringify(customStatuses));
  }, [customStatuses]);

  const addStatus = (newStatus: Omit<{ id: string; name: string; color: string }, 'id'>) => {
    const status = {
      ...newStatus,
      id: Date.now().toString()
    };
    setCustomStatuses(prev => [...prev, status]);
  };

  const updateStatus = (id: string, updatedStatus: Partial<{ id: string; name: string; color: string }>) => {
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
}


