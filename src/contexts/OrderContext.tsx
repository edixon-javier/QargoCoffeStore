import React, { createContext, useContext, useState } from 'react';
import { BillingInfo } from '../lib/types';

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  paymentMethod: {
    type: string;
    lastFourDigits: string;
  };
  orderDate: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  billingInfo: BillingInfo;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (newOrder: Omit<Order, 'id' | 'orderDate' | 'status'>) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (newOrder: Omit<Order, 'id' | 'orderDate' | 'status'>) => {
    const order: Order = {
      ...newOrder,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderDate: new Date().toISOString(),
      status: 'Pending'
    };

    setOrders(prevOrders => [order, ...prevOrders]);
    return order;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};
