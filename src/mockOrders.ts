import { Order } from './contexts/OrderContext';
import { mockProducts } from './mockData';

// Function to generate a random date within a range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Generamos algunas órdenes de prueba
export const mockOrders: Order[] = [
  {
    id: 'ORD-001-abc123',
    orderNumber: 'ORD-12345',
    customerName: 'Café Central',
    items: [
      {
        productId: mockProducts[0].id,
        name: mockProducts[0].name,
        quantity: 1,
        price: mockProducts[0].price,
      },
      {
        productId: mockProducts[1].id,
        name: mockProducts[1].name,
        quantity: 2,
        price: mockProducts[1].price,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-06-01'), new Date('2025-06-30')),
    status: 'Procesando',
    statusHistory: [
      { status: 'Pendiente', date: randomDate(new Date('2025-06-01'), new Date('2025-06-10')) },
      { status: 'Procesando', date: randomDate(new Date('2025-06-10'), new Date('2025-06-30')) },
    ],
    trackingNumber: '',
    total: mockProducts[0].price + (mockProducts[1].price * 2),
    billingInfo: {
      companyName: 'Café Central, S.A.',
      dba: 'Café Central',
      billingAddress: {
        street: 'Av. Reforma 234',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '11000',
      },
      shippingAddress: {
        street: 'Av. Reforma 234',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '11000',
      },
      email: 'compras@cafecentral.com',
      phone: '555-123-4567',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/26',
        cvv: '***',
        cardholderName: 'Carlos Méndez',
      },
    },
    franchiseeId: 'FRAN-001',
  },
  {
    id: 'ORD-002-def456',
    orderNumber: 'ORD-23456',
    customerName: 'Qargo Connet Polanco',
    items: [
      {
        productId: mockProducts[2].id,
        name: mockProducts[2].name,
        quantity: 2,
        price: mockProducts[2].price,
      },
      {
        productId: mockProducts[3].id,
        name: mockProducts[3].name,
        quantity: 1,
        price: mockProducts[3].price,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '1234',
    },
    orderDate: randomDate(new Date('2025-06-15'), new Date('2025-06-30')),
    status: 'Enviado',
    statusHistory: [
      { status: 'Pendiente', date: randomDate(new Date('2025-06-15'), new Date('2025-06-20')) },
      { status: 'Procesando', date: randomDate(new Date('2025-06-20'), new Date('2025-06-25')) },
      { status: 'Enviado', date: randomDate(new Date('2025-06-25'), new Date('2025-06-30')) },
    ],
    trackingNumber: 'TRACK-9876543210',
    total: (mockProducts[2].price * 2) + mockProducts[3].price,
    billingInfo: {
      companyName: 'Qargo Connet México, S.A.',
      dba: 'Qargo Connet Polanco',
      billingAddress: {
        street: 'Masaryk 123',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '11560',
      },
      shippingAddress: {
        street: 'Masaryk 123',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '11560',
      },
      email: 'polanco@qargocoffee.com',
      phone: '555-987-6543',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 1234',
        expiryDate: '05/27',
        cvv: '***',
        cardholderName: 'Ana Rodríguez',
      },
    },
    franchiseeId: 'FRAN-002',
  },
  {
    id: 'ORD-003-ghi789',
    orderNumber: 'ORD-34567',
    customerName: 'Qargo Connet Santa Fe',
    items: [
      {
        productId: mockProducts[0].id,
        name: mockProducts[0].name,
        quantity: 1,
        price: mockProducts[0].price,
      },
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '5678',
    },
    orderDate: randomDate(new Date('2025-07-01'), new Date()),
    status: 'Pendiente',
    statusHistory: [
      { status: 'Pendiente', date: randomDate(new Date('2025-07-01'), new Date()) },
    ],
    total: mockProducts[0].price,
    billingInfo: {
      companyName: 'Qargo Connet México, S.A.',
      dba: 'Qargo Connet Santa Fe',
      billingAddress: {
        street: 'Av. Santa Fe 456',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '05109',
      },
      shippingAddress: {
        street: 'Av. Santa Fe 456',
        city: 'Ciudad de México',
        state: 'CDMX',
        zipCode: '05109',
      },
      email: 'santafe@qargocoffee.com',
      phone: '555-765-4321',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 5678',
        expiryDate: '09/28',
        cvv: '***',
        cardholderName: 'Roberto Vázquez',
      },
    },
    franchiseeId: 'FRAN-003',
  }
];

// Función para inicializar órdenes en localStorage si no existen
export const initializeMockOrders = () => {
  const savedOrders = localStorage.getItem('orders');
  if (!savedOrders || JSON.parse(savedOrders).length === 0) {
    localStorage.setItem('orders', JSON.stringify(mockOrders));
  }
};
