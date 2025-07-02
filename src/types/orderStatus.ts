export interface OrderStatus {
  id: string;
  name: string;
  color: string;
}

export interface OrderStatusContextType {
  customStatuses: OrderStatus[];
  addStatus: (status: Omit<OrderStatus, 'id'>) => void;
  updateStatus: (id: string, status: Partial<OrderStatus>) => void;
  deleteStatus: (id: string) => void;
}

export const defaultStatuses: OrderStatus[] = [
  { id: '1', name: 'Pending', color: '#FFA500' },
  { id: '2', name: 'Processing', color: '#0000FF' },
  { id: '3', name: 'Shipped', color: '#008000' },
  { id: '4', name: 'Delivered', color: '#006400' },
  { id: '5', name: 'Cancelled', color: '#FF0000' }
];
