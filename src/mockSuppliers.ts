import { Supplier } from './lib/types';

export const mockSuppliers: Supplier[] = [
  {
    id: 'sup-001',
    name: 'Bean Masters Coffee',
    companyName: 'Bean Masters Inc.',
    contactEmail: 'contact@beanmasters.com',
    contactPhone: '+1 (555) 123-4567',
    logo: '/assets/suppliers/bean-masters-logo.png',
    description: 'Premium coffee bean supplier with sustainable farming practices.',
    address: {
      street: '123 Coffee Road',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'USA'
    },
    status: 'active',
    notes: 'Offers special discounts for bulk orders. Contact the regional representative for custom blends.',
    createdAt: '2022-03-15T10:30:00Z',
    minOrderValue: 500,
    deliveryTime: '3-5 business days'
  },
  {
    id: 'sup-002',
    name: 'Brewing Essentials',
    companyName: 'Brewing Essentials Co.',
    contactEmail: 'orders@brewingessentials.com',
    contactPhone: '+1 (555) 987-6543',
    logo: '/assets/suppliers/brewing-essentials-logo.png',
    description: 'High-quality brewing equipment and accessories for coffee shops.',
    address: {
      street: '456 Brewer Avenue',
      city: 'Portland',
      state: 'OR',
      zipCode: '97204',
      country: 'USA'
    },
    status: 'active',
    notes: 'Provides maintenance and repair services for all equipment.',
    createdAt: '2022-05-20T09:15:00Z',
    minOrderValue: 1000,
    deliveryTime: '5-7 business days'
  },
  {
    id: 'sup-003',
    name: 'Sweet Additions',
    companyName: 'Sweet Additions LLC',
    contactEmail: 'info@sweetadditions.com',
    contactPhone: '+1 (555) 234-5678',
    logo: '/assets/suppliers/sweet-additions-logo.png',
    description: 'Variety of syrups, sweeteners, and flavorings for coffee beverages.',
    address: {
      street: '789 Flavor Street',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    status: 'active',
    createdAt: '2022-07-10T11:45:00Z',
    minOrderValue: 250,
    deliveryTime: '2-3 business days'
  },
  {
    id: 'sup-004',
    name: 'Eco Cups & Packaging',
    companyName: 'Eco Friendly Supplies Inc.',
    contactEmail: 'sales@ecocups.com',
    contactPhone: '+1 (555) 876-5432',
    logo: '/assets/suppliers/eco-cups-logo.png',
    description: 'Sustainable cups, sleeves, and packaging solutions for beverages.',
    address: {
      street: '101 Green Way',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      country: 'USA'
    },
    status: 'active',
    notes: 'All products are made from recycled materials and are compostable.',
    createdAt: '2022-09-05T13:20:00Z',
    minOrderValue: 750,
    deliveryTime: '4-6 business days'
  },
  {
    id: 'sup-005',
    name: 'Café Furniture',
    companyName: 'Modern Café Solutions',
    contactEmail: 'contact@cafefurniture.com',
    contactPhone: '+1 (555) 345-6789',
    logo: '/assets/suppliers/cafe-furniture-logo.png',
    description: 'Stylish and durable furniture for café interiors and outdoor seating.',
    address: {
      street: '202 Design Boulevard',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      country: 'USA'
    },
    status: 'inactive',
    notes: 'Currently undergoing warehouse relocation, limited stock available until further notice.',
    createdAt: '2023-01-12T15:10:00Z',
    deliveryTime: '10-14 business days'
  }
];
