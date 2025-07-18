import { mockProducts } from './mockData';
import { mockOrders } from './mockOrders';
import { mockFranchisees } from './mockData/franchiseesData';

export const initializeMockData = () => {
  // Inicializar franquiciado por defecto (Prestige Cafe)
  const selectedStore = localStorage.getItem('selectedStore');
  if (!selectedStore) {
    // Busca el franquiciado Prestige Cafe
    const prestigeCafe = mockFranchisees.find(f => f.name === 'Prestige Cafe');
    if (prestigeCafe) {
      localStorage.setItem('selectedStore', JSON.stringify(prestigeCafe));
    }
  }

  // Inicializar productos mock
  const existingProducts = localStorage.getItem('products');
  if (!existingProducts || JSON.parse(existingProducts).length === 0) {
    localStorage.setItem('products', JSON.stringify(mockProducts));
  }

  // Inicializar órdenes mock
  const existingOrders = localStorage.getItem('orders');
  if (!existingOrders || JSON.parse(existingOrders).length === 0) {
    localStorage.setItem('orders', JSON.stringify(mockOrders));
  }
};
