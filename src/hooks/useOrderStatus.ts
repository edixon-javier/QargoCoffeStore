import { useContext } from 'react';
import { OrderStatusContext } from '../contexts/orderStatus';

export function useOrderStatus() {
  const context = useContext(OrderStatusContext);
  if (!context) {
    throw new Error('useOrderStatus must be used within an OrderStatusProvider');
  }
  return context;
}

export default useOrderStatus;
