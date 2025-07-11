import { format, subDays, subMonths } from 'date-fns';

// Generar fechas para los últimos 12 meses
const generateDates = (days: number) => {
  return Array.from({ length: days }, (_, i) => {
    return format(subDays(new Date(), i), 'yyyy-MM-dd');
  }).reverse();
};

// Estados de pedidos con colores
export const orderStatuses = [
  { name: 'Pendiente', color: '#FFA500', value: 45 },
  { name: 'En Proceso', color: '#4299E1', value: 32 },
  { name: 'Enviado', color: '#805AD5', value: 28 },
  { name: 'Entregado', color: '#48BB78', value: 65 },
  { name: 'Cancelado', color: '#F56565', value: 12 },
];

// Datos para el gráfico de estados de pedidos
export const orderStatusData = orderStatuses.map(status => ({
  id: status.name,
  label: status.name,
  value: status.value,
  color: status.color
}));

// Productos más vendidos
export const topProductsData = [
  { productId: 'P001', name: 'Smartphone Galaxy S22', count: 142 },
  { productId: 'P002', name: 'Laptop ThinkPad X1', count: 98 },
  { productId: 'P003', name: 'AirPods Pro', count: 87 },
  { productId: 'P004', name: 'Smart Watch Series 7', count: 76 },
  { productId: 'P005', name: 'iPad Pro 12.9"', count: 65 },
];

// Datos de ingresos por día (últimos 30 días)
const dates = generateDates(30);
export const revenueData = dates.map(date => ({
  date,
  amount: Math.floor(Math.random() * (15000 - 5000) + 5000)
}));

// Datos de rendimiento de proveedores
export const supplierPerformanceData = [
  {
    supplier: 'TechCorp Inc.',
    fulfillmentRate: 98,
    deliverySpeed: 95,
    qualityScore: 92,
    priceCompetitiveness: 88
  },
  {
    supplier: 'Global Electronics',
    fulfillmentRate: 92,
    deliverySpeed: 88,
    qualityScore: 95,
    priceCompetitiveness: 94
  },
  {
    supplier: 'Smart Devices Ltd.',
    fulfillmentRate: 85,
    deliverySpeed: 92,
    qualityScore: 88,
    priceCompetitiveness: 96
  },
  {
    supplier: 'Digital Solutions',
    fulfillmentRate: 94,
    deliverySpeed: 89,
    qualityScore: 90,
    priceCompetitiveness: 85
  }
];

// Métricas clave con tendencias
export const keyMetrics = {
  totalOrders: {
    value: 1247,
    trend: { value: 12.5, label: 'vs último mes' }
  },
  totalRevenue: {
    value: 284750,
    trend: { value: 8.3, label: 'vs último mes' }
  },
  averageOrderValue: {
    value: 228.35,
    trend: { value: -2.1, label: 'vs último mes' }
  },
  activeCustomers: {
    value: 892,
    trend: { value: 15.7, label: 'vs último mes' }
  }
};

// Datos de pedidos recientes
export const recentOrders = [
  {
    id: 'ORD-2025-001',
    customer: 'María González',
    date: '2025-07-10',
    amount: 1299.99,
    status: 'Entregado',
    products: 3
  },
  {
    id: 'ORD-2025-002',
    customer: 'Carlos Rodríguez',
    date: '2025-07-09',
    amount: 899.50,
    status: 'En Proceso',
    products: 2
  },
  {
    id: 'ORD-2025-003',
    customer: 'Ana Martínez',
    date: '2025-07-09',
    amount: 2499.99,
    status: 'Pendiente',
    products: 4
  },
  {
    id: 'ORD-2025-004',
    customer: 'José Luis Pérez',
    date: '2025-07-08',
    amount: 749.99,
    status: 'Enviado',
    products: 1
  },
  {
    id: 'ORD-2025-005',
    customer: 'Laura Sánchez',
    date: '2025-07-08',
    amount: 1899.99,
    status: 'Entregado',
    products: 3
  }
];

// Datos de rendimiento mensual
export const monthlyPerformance = {
  currentMonth: {
    orders: 427,
    revenue: 98750.45,
    averageOrderValue: 231.27,
    customerRetentionRate: 87.5
  },
  previousMonth: {
    orders: 389,
    revenue: 91234.56,
    averageOrderValue: 234.54,
    customerRetentionRate: 85.2
  },
  yearToDate: {
    totalOrders: 2847,
    totalRevenue: 657892.34,
    averageOrderValue: 231.08,
    customerRetentionRate: 86.8
  }
};

// Datos de productos populares con tendencias
export const popularProducts = [
  {
    id: 'P001',
    name: 'Smartphone Galaxy S22',
    sales: 142,
    revenue: 127800,
    trend: 15.7,
    stock: 89
  },
  {
    id: 'P002',
    name: 'Laptop ThinkPad X1',
    sales: 98,
    revenue: 196000,
    trend: 8.3,
    stock: 45
  },
  {
    id: 'P003',
    name: 'AirPods Pro',
    sales: 87,
    revenue: 21750,
    trend: -2.1,
    stock: 156
  },
  {
    id: 'P004',
    name: 'Smart Watch Series 7',
    sales: 76,
    revenue: 30400,
    trend: 12.5,
    stock: 92
  },
  {
    id: 'P005',
    name: 'iPad Pro 12.9"',
    sales: 65,
    revenue: 84500,
    trend: 5.8,
    stock: 34
  }
];

// Datos de satisfacción del cliente
export const customerSatisfaction = {
  overall: 4.7,
  categories: {
    productQuality: 4.8,
    deliverySpeed: 4.6,
    customerService: 4.7,
    priceValue: 4.5
  },
  trends: {
    lastMonth: 4.6,
    last3Months: 4.5,
    last6Months: 4.4
  }
};

// Datos de actividad por región
export const regionalActivity = [
  {
    region: 'Norte',
    orders: 427,
    revenue: 98750.45,
    customers: 245,
    growth: 12.5
  },
  {
    region: 'Centro',
    orders: 389,
    revenue: 91234.56,
    customers: 198,
    growth: 8.7
  },
  {
    region: 'Sur',
    orders: 312,
    revenue: 76543.21,
    customers: 167,
    growth: 15.2
  },
  {
    region: 'Este',
    orders: 278,
    revenue: 65432.10,
    customers: 134,
    growth: 9.8
  },
  {
    region: 'Oeste',
    orders: 256,
    revenue: 54321.98,
    customers: 112,
    growth: 11.3
  }
];
