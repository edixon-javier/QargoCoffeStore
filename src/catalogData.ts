import { Category, Supplier } from './lib/types';

// Mock Categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Café en grano',
    slug: 'cafe-grano',
    description: 'Granos de café de la más alta calidad',
    image: 'https://images.pexels.com/photos/685527/pexels-photo-685527.jpeg',
  },
  {
    id: '2',
    name: 'Máquinas profesionales',
    slug: 'maquinas',
    description: 'Equipos profesionales para preparación de café',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
  },
  {
    id: '3',
    name: 'Accesorios',
    slug: 'accesorios',
    description: 'Accesorios para mejorar tu experiencia cafetera',
    image: 'https://images.pexels.com/photos/2879812/pexels-photo-2879812.jpeg',
  },
  {
    id: '4',
    name: 'Métodos alternativos',
    slug: 'metodos-alternativos',
    description: 'Métodos de preparación manual y alternativas al espresso',
    image: 'https://images.pexels.com/photos/1627935/pexels-photo-1627935.jpeg',
  },
  {
    id: '5',
    name: 'Café de especialidad',
    slug: 'cafe-especialidad',
    description: 'Selección premium de cafés de origen único y edición limitada',
    image: 'https://images.pexels.com/photos/2799862/pexels-photo-2799862.jpeg',
  },
];

// Mock Suppliers
export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'Café Italiano S.A.',
    description: 'Importador directo de café italiano de alta calidad',
    contactEmail: 'contacto@cafeitaliano.com',
    contactPhone: '+52 55 1234 5678',
    minOrderValue: 5000,
    deliveryTime: '3-5 días',
  },
  {
    id: '2',
    name: 'ImportCoffee',
    logo: 'https://images.pexels.com/photos/1337386/pexels-photo-1337386.jpeg',
    description: 'Especialistas en máquinas para café',
    contactEmail: 'ventas@importcoffee.com',
    contactPhone: '+52 55 8765 4321',
    minOrderValue: 10000,
    deliveryTime: '5-7 días',
  },
  {
    id: '3',
    name: 'Specialty Coffee Co.',
    logo: 'https://images.pexels.com/photos/1435998/pexels-photo-1435998.jpeg',
    description: 'Proveedores de café de especialidad de origen único',
    contactEmail: 'info@specialtycoffeeco.com',
    contactPhone: '+52 55 3456 7890',
    minOrderValue: 3000,
    deliveryTime: '2-4 días',
  },
  {
    id: '4',
    name: 'BaristaPro',
    description: 'Accesorios profesionales para baristas y cafeterías',
    contactEmail: 'ventas@baristapro.com',
    contactPhone: '+52 55 9012 3456',
    minOrderValue: 2000,
    deliveryTime: '1-3 días',
  },
];
