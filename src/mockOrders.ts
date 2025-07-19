import { Order } from './contexts/OrderContext';
import { mockProducts } from './mockData';

// Function to generate a random date within a range
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

// Generamos órdenes de prueba
export const mockOrders: Order[] = [
  // Órdenes de Matari Coffee Co. (20 órdenes simuladas con datos realistas)
  {
    id: 'ORD-001-pc1',
    orderNumber: 'ORD-12345',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[0].id,
        name: mockProducts[0].name,
        quantity: 1,
        price: mockProducts[0].price,
        image: mockProducts[0].images?.[0] || undefined,
      },
      {
        productId: mockProducts[1].id,
        name: mockProducts[1].name,
        quantity: 2,
        price: mockProducts[1].price,
        image: mockProducts[1].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-01-05'), new Date('2025-01-10')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-01-05'), new Date('2025-01-06')) },
      { status: 'Processing', date: randomDate(new Date('2025-01-06'), new Date('2025-01-08')) },
      { status: 'Shipped', date: randomDate(new Date('2025-01-08'), new Date('2025-01-09')) },
      { status: 'Delivered', date: randomDate(new Date('2025-01-09'), new Date('2025-01-10')) },
    ],
    trackingNumber: 'TRACK-1234567890',
    total: mockProducts[0].price + (mockProducts[1].price * 2),
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  {
    id: 'ORD-002-pc2',
    orderNumber: 'ORD-23456',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[1].id,
        name: mockProducts[1].name,
        quantity: 3,
        price: mockProducts[1].price,
        image: mockProducts[1].images?.[0] || undefined,
      },
      {
        productId: mockProducts[6].id,
        name: mockProducts[6].name,
        quantity: 2,
        price: mockProducts[6].price,
        image: mockProducts[6].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-01-15'), new Date('2025-01-20')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-01-15'), new Date('2025-01-16')) },
      { status: 'Processing', date: randomDate(new Date('2025-01-16'), new Date('2025-01-18')) },
      { status: 'Shipped', date: randomDate(new Date('2025-01-18'), new Date('2025-01-19')) },
      { status: 'Delivered', date: randomDate(new Date('2025-01-19'), new Date('2025-01-20')) },
    ],
    trackingNumber: 'TRACK-9876543210',
    total: (mockProducts[1].price * 3) + (mockProducts[6].price * 2),
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-003-pc3',
    orderNumber: 'ORD-34567',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[4].id,
        name: mockProducts[4].name,
        quantity: 1,
        price: mockProducts[4].price,
        image: mockProducts[4].images?.[0] || undefined,
      },
      {
        productId: mockProducts[7].id,
        name: mockProducts[7].name,
        quantity: 2,
        price: mockProducts[7].price,
        image: mockProducts[7].images?.[0] || undefined,
      },
      {
        productId: mockProducts[8].id,
        name: mockProducts[8].name,
        quantity: 1,
        price: mockProducts[8].price,
        image: mockProducts[8].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-02-05'), new Date('2025-02-10')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-02-05'), new Date('2025-02-06')) },
      { status: 'Processing', date: randomDate(new Date('2025-02-06'), new Date('2025-02-08')) },
      { status: 'Shipped', date: randomDate(new Date('2025-02-08'), new Date('2025-02-09')) },
      { status: 'Delivered', date: randomDate(new Date('2025-02-09'), new Date('2025-02-10')) },
    ],
    trackingNumber: 'TRACK-4567890123',
    total: mockProducts[4].price + (mockProducts[7].price * 2) + mockProducts[8].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-004-pc4',
    orderNumber: 'ORD-45678',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[3].id,
        name: mockProducts[3].name,
        quantity: 1,
        price: mockProducts[3].price,
        image: mockProducts[3].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-02-15'), new Date('2025-02-20')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-02-15'), new Date('2025-02-16')) },
      { status: 'Processing', date: randomDate(new Date('2025-02-16'), new Date('2025-02-18')) },
      { status: 'Shipped', date: randomDate(new Date('2025-02-18'), new Date('2025-02-19')) },
      { status: 'Delivered', date: randomDate(new Date('2025-02-19'), new Date('2025-02-20')) },
    ],
    trackingNumber: 'TRACK-5678901234',
    total: mockProducts[3].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-005-pc5',
    orderNumber: 'ORD-56789',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[9].id,
        name: mockProducts[9].name,
        quantity: 2,
        price: mockProducts[9].price,
        image: mockProducts[9].images?.[0] || undefined,
      },
      {
        productId: mockProducts[10].id,
        name: mockProducts[10].name,
        quantity: 3,
        price: mockProducts[10].price,
        image: mockProducts[10].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-03-01'), new Date('2025-03-10')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-03-01'), new Date('2025-03-03')) },
      { status: 'Processing', date: randomDate(new Date('2025-03-03'), new Date('2025-03-05')) },
      { status: 'Shipped', date: randomDate(new Date('2025-03-05'), new Date('2025-03-08')) },
      { status: 'Delivered', date: randomDate(new Date('2025-03-08'), new Date('2025-03-10')) },
    ],
    trackingNumber: 'TRACK-6789012345',
    total: (mockProducts[9].price * 2) + (mockProducts[10].price * 3),
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-006-pc6',
    orderNumber: 'ORD-67890',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[1].id,
        name: mockProducts[1].name,
        quantity: 2,
        price: mockProducts[1].price,
        image: mockProducts[1].images?.[0] || undefined,
      },
      {
        productId: mockProducts[4].id,
        name: mockProducts[4].name,
        quantity: 1,
        price: mockProducts[4].price,
        image: mockProducts[4].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-03-15'), new Date('2025-03-20')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-03-15'), new Date('2025-03-16')) },
      { status: 'Processing', date: randomDate(new Date('2025-03-16'), new Date('2025-03-18')) },
      { status: 'Shipped', date: randomDate(new Date('2025-03-18'), new Date('2025-03-19')) },
      { status: 'Delivered', date: randomDate(new Date('2025-03-19'), new Date('2025-03-20')) },
    ],
    trackingNumber: 'TRACK-7890123456',
    total: (mockProducts[1].price * 2) + mockProducts[4].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-007-pc7',
    orderNumber: 'ORD-78901',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[0].id,
        name: mockProducts[0].name,
        quantity: 1,
        price: mockProducts[0].price,
        image: mockProducts[0].images?.[0] || undefined,
      },
      {
        productId: mockProducts[6].id,
        name: mockProducts[6].name,
        quantity: 2,
        price: mockProducts[6].price,
        image: mockProducts[6].images?.[0] || undefined,
      },
      {
        productId: mockProducts[8].id,
        name: mockProducts[8].name,
        quantity: 1,
        price: mockProducts[8].price,
        image: mockProducts[8].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-04-01'), new Date('2025-04-10')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-04-01'), new Date('2025-04-03')) },
      { status: 'Processing', date: randomDate(new Date('2025-04-03'), new Date('2025-04-05')) },
      { status: 'Shipped', date: randomDate(new Date('2025-04-05'), new Date('2025-04-08')) },
      { status: 'Delivered', date: randomDate(new Date('2025-04-08'), new Date('2025-04-10')) },
    ],
    trackingNumber: 'TRACK-8901234567',
    total: mockProducts[0].price + (mockProducts[6].price * 2) + mockProducts[8].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  // Orden con Qargo Connect Polanco
  {
    id: 'ORD-002-def456',
    orderNumber: 'ORD-98765',
    customerName: 'Qargo Connect Polanco',
    items: [
      {
        productId: mockProducts[2].id,
        name: mockProducts[2].name,
        quantity: 2,
        price: mockProducts[2].price,
        image: mockProducts[2].images?.[0] || undefined,
      },
      {
        productId: mockProducts[3].id,
        name: mockProducts[3].name,
        quantity: 1,
        price: mockProducts[3].price,
        image: mockProducts[3].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '1234',
    },
    orderDate: randomDate(new Date('2025-06-15'), new Date('2025-06-30')),
    status: 'Shipped',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-06-15'), new Date('2025-06-20')) },
      { status: 'Processing', date: randomDate(new Date('2025-06-20'), new Date('2025-06-25')) },
      { status: 'Shipped', date: randomDate(new Date('2025-06-25'), new Date('2025-06-30')) },
    ],
    trackingNumber: 'TRACK-9876543210',
    total: (mockProducts[2].price * 2) + mockProducts[3].price,
    billingInfo: {
      companyName: 'Qargo Connect México, S.A.',
      dba: 'Qargo Connect Polanco',
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
    franchiseeId: 'f2',
  },
  {
    id: 'ORD-003-ghi789',
    orderNumber: 'ORD-87654',
    customerName: 'Qargo Connect Santa Fe',
    items: [
      {
        productId: mockProducts[0].id,
        name: mockProducts[0].name,
        quantity: 1,
        price: mockProducts[0].price,
        image: mockProducts[0].images?.[0] || undefined,
      },
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '5678',
    },
    orderDate: randomDate(new Date('2025-07-01'), new Date()),
    status: 'Pending',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-07-01'), new Date()) },
    ],
    total: mockProducts[0].price,
    billingInfo: {
      companyName: 'Qargo Connect México, S.A.',
      dba: 'Qargo Connect Santa Fe',
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
    franchiseeId: 'f3',
  },
  
  // Continuación de órdenes para Matari Coffee Co.
  {
    id: 'ORD-008-pc8',
    orderNumber: 'ORD-89012',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[4].id,
        name: mockProducts[4].name,
        quantity: 3,
        price: mockProducts[4].price,
        image: mockProducts[4].images?.[0] || undefined,
      },
      {
        productId: mockProducts[5].id,
        name: mockProducts[5].name,
        quantity: 1,
        price: mockProducts[5].price,
        image: mockProducts[5].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-04-15'), new Date('2025-04-20')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-04-15'), new Date('2025-04-16')) },
      { status: 'Processing', date: randomDate(new Date('2025-04-16'), new Date('2025-04-18')) },
      { status: 'Shipped', date: randomDate(new Date('2025-04-18'), new Date('2025-04-19')) },
      { status: 'Delivered', date: randomDate(new Date('2025-04-19'), new Date('2025-04-20')) },
    ],
    trackingNumber: 'TRACK-9012345678',
    total: (mockProducts[4].price * 3) + mockProducts[5].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-009-pc9',
    orderNumber: 'ORD-90123',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[3].id,
        name: mockProducts[3].name,
        quantity: 1,
        price: mockProducts[3].price,
        image: mockProducts[3].images?.[0] || undefined,
      },
      {
        productId: mockProducts[9].id,
        name: mockProducts[9].name,
        quantity: 2,
        price: mockProducts[9].price,
        image: mockProducts[9].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-05-01'), new Date('2025-05-10')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-05-01'), new Date('2025-05-03')) },
      { status: 'Processing', date: randomDate(new Date('2025-05-03'), new Date('2025-05-05')) },
      { status: 'Shipped', date: randomDate(new Date('2025-05-05'), new Date('2025-05-08')) },
      { status: 'Delivered', date: randomDate(new Date('2025-05-08'), new Date('2025-05-10')) },
    ],
    trackingNumber: 'TRACK-0123456789',
    total: mockProducts[3].price + (mockProducts[9].price * 2),
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-010-pc10',
    orderNumber: 'ORD-01234',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[7].id,
        name: mockProducts[7].name,
        quantity: 3,
        price: mockProducts[7].price,
        image: mockProducts[7].images?.[0] || undefined,
      },
      {
        productId: mockProducts[11].id,
        name: mockProducts[11].name,
        quantity: 1,
        price: mockProducts[11].price,
        image: mockProducts[11].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-05-15'), new Date('2025-05-20')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-05-15'), new Date('2025-05-16')) },
      { status: 'Processing', date: randomDate(new Date('2025-05-16'), new Date('2025-05-18')) },
      { status: 'Shipped', date: randomDate(new Date('2025-05-18'), new Date('2025-05-19')) },
      { status: 'Delivered', date: randomDate(new Date('2025-05-19'), new Date('2025-05-20')) },
    ],
    trackingNumber: 'TRACK-1234567890',
    total: (mockProducts[7].price * 3) + mockProducts[11].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-011-pc11',
    orderNumber: 'ORD-12345',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[0].id,
        name: mockProducts[0].name,
        quantity: 1,
        price: mockProducts[0].price,
        image: mockProducts[0].images?.[0] || undefined,
      },
      {
        productId: mockProducts[1].id,
        name: mockProducts[1].name,
        quantity: 1,
        price: mockProducts[1].price,
        image: mockProducts[1].images?.[0] || undefined,
      },
      {
        productId: mockProducts[2].id,
        name: mockProducts[2].name,
        quantity: 1,
        price: mockProducts[2].price,
        image: mockProducts[2].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-06-01'), new Date('2025-06-10')),
    status: 'Shipped',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-06-01'), new Date('2025-06-03')) },
      { status: 'Processing', date: randomDate(new Date('2025-06-03'), new Date('2025-06-08')) },
      { status: 'Shipped', date: randomDate(new Date('2025-06-08'), new Date('2025-06-10')) },
    ],
    trackingNumber: 'TRACK-2345678901',
    total: mockProducts[0].price + mockProducts[1].price + mockProducts[2].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-012-pc12',
    orderNumber: 'ORD-23456',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[5].id,
        name: mockProducts[5].name,
        quantity: 2,
        price: mockProducts[5].price,
        image: mockProducts[5].images?.[0] || undefined,
      },
      {
        productId: mockProducts[6].id,
        name: mockProducts[6].name,
        quantity: 1,
        price: mockProducts[6].price,
        image: mockProducts[6].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-06-15'), new Date('2025-06-20')),
    status: 'Processing',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-06-15'), new Date('2025-06-17')) },
      { status: 'Processing', date: randomDate(new Date('2025-06-17'), new Date('2025-06-20')) },
    ],
    trackingNumber: '',
    total: (mockProducts[5].price * 2) + mockProducts[6].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-013-pc13',
    orderNumber: 'ORD-34567',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[4].id,
        name: mockProducts[4].name,
        quantity: 1,
        price: mockProducts[4].price,
        image: mockProducts[4].images?.[0] || undefined,
      },
      {
        productId: mockProducts[8].id,
        name: mockProducts[8].name,
        quantity: 2,
        price: mockProducts[8].price,
        image: mockProducts[8].images?.[0] || undefined,
      },
      {
        productId: mockProducts[12].id,
        name: mockProducts[12].name,
        quantity: 1,
        price: mockProducts[12].price,
        image: mockProducts[12].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-07-01'), new Date('2025-07-05')),
    status: 'Pending',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-07-01'), new Date('2025-07-05')) },
    ],
    trackingNumber: '',
    total: mockProducts[4].price + (mockProducts[8].price * 2) + mockProducts[12].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  // Órdenes adicionales para Matari Coffee Co.
  {
    id: 'ORD-014-pc14',
    orderNumber: 'ORD-45678',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[3].id,
        name: mockProducts[3].name,
        quantity: 1,
        price: mockProducts[3].price,
        image: mockProducts[3].images?.[0] || undefined,
      },
      {
        productId: mockProducts[7].id,
        name: mockProducts[7].name,
        quantity: 1,
        price: mockProducts[7].price,
        image: mockProducts[7].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-07-06'), new Date('2025-07-10')),
    status: 'Pending',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-07-06'), new Date('2025-07-10')) },
    ],
    trackingNumber: '',
    total: mockProducts[3].price + mockProducts[7].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-015-pc15',
    orderNumber: 'ORD-56789',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[1].id,
        name: mockProducts[1].name,
        quantity: 2,
        price: mockProducts[1].price,
        image: mockProducts[1].images?.[0] || undefined,
      },
      {
        productId: mockProducts[5].id,
        name: mockProducts[5].name,
        quantity: 1,
        price: mockProducts[5].price,
        image: mockProducts[5].images?.[0] || undefined,
      },
      {
        productId: mockProducts[10].id,
        name: mockProducts[10].name,
        quantity: 3,
        price: mockProducts[10].price,
        image: mockProducts[10].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-07-11'), new Date('2025-07-15')),
    status: 'Pending',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-07-11'), new Date('2025-07-15')) },
    ],
    trackingNumber: '',
    total: (mockProducts[1].price * 2) + mockProducts[5].price + (mockProducts[10].price * 3),
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-016-pc16',
    orderNumber: 'ORD-67890',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[0].id,
        name: mockProducts[0].name,
        quantity: 1,
        price: mockProducts[0].price,
        image: mockProducts[0].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-03-05'), new Date('2025-03-08')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-03-05'), new Date('2025-03-06')) },
      { status: 'Processing', date: randomDate(new Date('2025-03-06'), new Date('2025-03-07')) },
      { status: 'Shipped', date: randomDate(new Date('2025-03-07'), new Date('2025-03-07')) },
      { status: 'Delivered', date: randomDate(new Date('2025-03-07'), new Date('2025-03-08')) },
    ],
    trackingNumber: 'TRACK-5678901234',
    total: mockProducts[0].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-017-pc17',
    orderNumber: 'ORD-78901',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[6].id,
        name: mockProducts[6].name,
        quantity: 2,
        price: mockProducts[6].price,
        image: mockProducts[6].images?.[0] || undefined,
      },
      {
        productId: mockProducts[7].id,
        name: mockProducts[7].name,
        quantity: 2,
        price: mockProducts[7].price,
        image: mockProducts[7].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-05-05'), new Date('2025-05-08')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-05-05'), new Date('2025-05-06')) },
      { status: 'Processing', date: randomDate(new Date('2025-05-06'), new Date('2025-05-07')) },
      { status: 'Shipped', date: randomDate(new Date('2025-05-07'), new Date('2025-05-07')) },
      { status: 'Delivered', date: randomDate(new Date('2025-05-07'), new Date('2025-05-08')) },
    ],
    trackingNumber: 'TRACK-6789012345',
    total: (mockProducts[6].price * 2) + (mockProducts[7].price * 2),
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-018-pc18',
    orderNumber: 'ORD-89012',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[1].id,
        name: mockProducts[1].name,
        quantity: 1,
        price: mockProducts[1].price,
        image: mockProducts[1].images?.[0] || undefined,
      },
      {
        productId: mockProducts[4].id,
        name: mockProducts[4].name,
        quantity: 1,
        price: mockProducts[4].price,
        image: mockProducts[4].images?.[0] || undefined,
      },
      {
        productId: mockProducts[9].id,
        name: mockProducts[9].name,
        quantity: 1,
        price: mockProducts[9].price,
        image: mockProducts[9].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-04-10'), new Date('2025-04-13')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-04-10'), new Date('2025-04-11')) },
      { status: 'Processing', date: randomDate(new Date('2025-04-11'), new Date('2025-04-12')) },
      { status: 'Shipped', date: randomDate(new Date('2025-04-12'), new Date('2025-04-12')) },
      { status: 'Delivered', date: randomDate(new Date('2025-04-12'), new Date('2025-04-13')) },
    ],
    trackingNumber: 'TRACK-7890123456',
    total: mockProducts[1].price + mockProducts[4].price + mockProducts[9].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-019-pc19',
    orderNumber: 'ORD-90123',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[2].id,
        name: mockProducts[2].name,
        quantity: 2,
        price: mockProducts[2].price,
        image: mockProducts[2].images?.[0] || undefined,
      },
      {
        productId: mockProducts[5].id,
        name: mockProducts[5].name,
        quantity: 1,
        price: mockProducts[5].price,
        image: mockProducts[5].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-02-20'), new Date('2025-02-23')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-02-20'), new Date('2025-02-21')) },
      { status: 'Processing', date: randomDate(new Date('2025-02-21'), new Date('2025-02-22')) },
      { status: 'Shipped', date: randomDate(new Date('2025-02-22'), new Date('2025-02-22')) },
      { status: 'Delivered', date: randomDate(new Date('2025-02-22'), new Date('2025-02-23')) },
    ],
    trackingNumber: 'TRACK-8901234567',
    total: (mockProducts[2].price * 2) + mockProducts[5].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  },
  
  {
    id: 'ORD-020-pc20',
    orderNumber: 'ORD-01234',
    customerName: 'Matari Coffee Co.',
    items: [
      {
        productId: mockProducts[0].id,
        name: mockProducts[0].name,
        quantity: 1,
        price: mockProducts[0].price,
        image: mockProducts[0].images?.[0] || undefined,
      },
      {
        productId: mockProducts[3].id,
        name: mockProducts[3].name,
        quantity: 1,
        price: mockProducts[3].price,
        image: mockProducts[3].images?.[0] || undefined,
      },
      {
        productId: mockProducts[6].id,
        name: mockProducts[6].name,
        quantity: 1,
        price: mockProducts[6].price,
        image: mockProducts[6].images?.[0] || undefined,
      },
      {
        productId: mockProducts[9].id,
        name: mockProducts[9].name,
        quantity: 1,
        price: mockProducts[9].price,
        image: mockProducts[9].images?.[0] || undefined,
      }
    ],
    paymentMethod: {
      type: 'Credit Card',
      lastFourDigits: '4242',
    },
    orderDate: randomDate(new Date('2025-01-25'), new Date('2025-01-28')),
    status: 'Delivered',
    statusHistory: [
      { status: 'Pending', date: randomDate(new Date('2025-01-25'), new Date('2025-01-26')) },
      { status: 'Processing', date: randomDate(new Date('2025-01-26'), new Date('2025-01-27')) },
      { status: 'Shipped', date: randomDate(new Date('2025-01-27'), new Date('2025-01-27')) },
      { status: 'Delivered', date: randomDate(new Date('2025-01-27'), new Date('2025-01-28')) },
    ],
    trackingNumber: 'TRACK-9012345678',
    total: mockProducts[0].price + mockProducts[3].price + mockProducts[6].price + mockProducts[9].price,
    billingInfo: {
      companyName: 'Matari Coffee Co.',
      dba: 'Qargo Connect',
      billingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      shippingAddress: {
        street: '22022 Michigan Ave Unit C',
        city: 'Dearborn',
        state: 'MI',
        zipCode: '48124-2889',
      },
      email: 'QargoConnect@qargocoffee.com',
      phone: '(734) 686-1192',
      paymentMethod: {
        type: 'credit_card',
        cardNumber: '**** **** **** 4242',
        expiryDate: '12/25',
        cvv: '***',
        cardholderName: 'JOHN NORT',
      },
    },
    franchiseeId: 'f1',
  }
];

export const initializeMockOrders = () => {
  // Verificamos si ya existen órdenes en localStorage
  const existingOrders = localStorage.getItem('orders');
  
  // Solo inicializamos las órdenes mock si no hay órdenes existentes
  if (!existingOrders || JSON.parse(existingOrders).length === 0) {
    localStorage.setItem('orders', JSON.stringify(mockOrders));
    console.log('Mock orders initialized:', mockOrders.length, 'orders');
  } else {
    console.log('Existing orders found:', JSON.parse(existingOrders).length, 'orders');
  }
};
