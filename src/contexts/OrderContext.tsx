import React, { createContext, useContext, useState, useEffect } from 'react';
import { BillingInfo } from '../lib/types';
import { initializeMockOrders } from '../mockOrders';

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface StatusHistoryItem {
  status: string;
  date: string;
}

export interface Order {
  id: string;
  orderNumber?: string;
  customerName: string;
  items: OrderItem[];
  paymentMethod: {
    type: string;
    lastFourDigits: string;
  };
  orderDate: string;
  status: string;
  statusHistory: StatusHistoryItem[];
  trackingNumber?: string;
  total: number;
  billingInfo: BillingInfo;
  franchiseeId?: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (newOrder: Omit<Order, 'id' | 'orderDate' | 'status' | 'statusHistory'>) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
  updateOrder: (orderId: string, orderUpdates: Partial<Order>) => void;
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
  // First we initialize test orders if necessary
  useEffect(() => {
    initializeMockOrders();
  }, []);
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });
  
  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder: Omit<Order, 'id' | 'orderDate' | 'status' | 'statusHistory'>) => {
    const orderNumber = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const order: Order = {
      ...newOrder,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderNumber,
      orderDate: new Date().toISOString(),
      status: 'Pending',
      statusHistory: [
        { status: 'Pending', date: new Date().toISOString() }
      ]
    };

    setOrders(prevOrders => [order, ...prevOrders]);
    return order;
  };

  const updateOrderStatus = (orderId: string, status: string) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status,
            statusHistory: [
              ...order.statusHistory,
              { status, date: new Date().toISOString() }
            ]
          };
        }
        return order;
      })
    );
  };

  const updateOrder = (orderId: string, orderUpdates: Partial<Order>) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          // Si hay actualización de estado y no viene ya con historial, lo añadimos
          if (orderUpdates.status && orderUpdates.status !== order.status && !orderUpdates.statusHistory) {
            orderUpdates.statusHistory = [
              ...order.statusHistory,
              { status: orderUpdates.status, date: new Date().toISOString() }
            ];
          }
          
          // Crear una nueva versión actualizada de la orden
          const updatedOrder = { ...order, ...orderUpdates };
          
          // Asegurarnos de que se actualice el historial de estados correctamente
          if (orderUpdates.status && orderUpdates.status !== order.status) {
            console.log(`Orden ${orderId} actualizada: ${order.status} -> ${orderUpdates.status}`);
          }
          
          // Asegurarnos de que se actualice el número de tracking correctamente
          if (orderUpdates.trackingNumber && orderUpdates.trackingNumber !== order.trackingNumber) {
            console.log(`Tracking actualizado para orden ${orderId}: ${orderUpdates.trackingNumber}`);
          }
          
          return updatedOrder;
        }
        return order;
      })
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
