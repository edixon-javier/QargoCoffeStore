import { Category, Supplier } from './lib/types';

// Mock Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Coffee Beans',
    slug: 'coffee-beans',
    description: 'Highest quality coffee beans',
    image: 'https://images.pexels.com/photos/685527/pexels-photo-685527.jpeg',
  },
  {
    id: '2',
    name: 'Professional Machines',
    slug: 'machines',
    description: 'Professional equipment for coffee preparation',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
  },
  {
    id: '3',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Accessories to enhance your coffee experience',
    image: 'https://images.pexels.com/photos/2879812/pexels-photo-2879812.jpeg',
  },
  {
    id: '4',
    name: 'Alternative Methods',
    slug: 'alternative-methods',
    description: 'Manual brewing methods and espresso alternatives',
    image: 'https://images.pexels.com/photos/1627935/pexels-photo-1627935.jpeg',
  },
  {
    id: '5',
    name: 'Specialty Coffee',
    slug: 'specialty-coffee',
    description: 'Premium selection of single-origin and limited edition coffees',
    image: 'https://images.pexels.com/photos/2799862/pexels-photo-2799862.jpeg',
  },
];

// Mock Suppliers
export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'Italian Coffee Co.',
    description: 'Direct importer of high-quality Italian coffee',
    contactEmail: 'contact@italiancoffee.com',
    contactPhone: '+1 555 1234 5678',
    minOrderValue: 5000,
    deliveryTime: '3-5 days',
  },
  {
    id: '2',
    name: 'ImportCoffee',
    logo: 'https://images.pexels.com/photos/1337386/pexels-photo-1337386.jpeg',
    description: 'Specialists in coffee machines',
    contactEmail: 'sales@importcoffee.com',
    contactPhone: '+1 555 8765 4321',
    minOrderValue: 10000,
    deliveryTime: '5-7 days',
  },
  {
    id: '3',
    name: 'Specialty Coffee Co.',
    logo: 'https://images.pexels.com/photos/1435998/pexels-photo-1435998.jpeg',
    description: 'Providers of single-origin specialty coffee',
    contactEmail: 'info@specialtycoffeeco.com',
    contactPhone: '+1 555 3456 7890',
    minOrderValue: 3000,
    deliveryTime: '2-4 days',
  },
  {
    id: '4',
    name: 'BaristaPro',
    description: 'Professional accessories for baristas and coffee shops',
    contactEmail: 'sales@baristapro.com',
    contactPhone: '+1 555 9012 3456',
    minOrderValue: 2000,
    deliveryTime: '1-3 days',
  },
];
