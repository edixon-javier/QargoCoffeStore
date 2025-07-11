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
  },
   {
    id: 'sup-006',
    name: 'RoastWorks',
    companyName: 'RoastWorks Ltd.',
    contactEmail: 'support@roastworks.com',
    contactPhone: '+1 (555) 654-3210',
    logo: '/assets/suppliers/roastworks-logo.png',
    description: 'Specialty coffee roasters offering single-origin beans and blends.',
    address: {
      street: '321 Artisan Blvd',
      city: 'Denver',
      state: 'CO',
      zipCode: '80202',
      country: 'USA'
    },
    status: 'active',
    notes: 'Free samples available for new clients. Seasonal selections updated quarterly.',
    createdAt: '2023-02-01T10:00:00Z',
    minOrderValue: 600,
    deliveryTime: '3-5 business days'
  },
  {
    id: 'sup-007',
    name: 'Green Brew Supplies',
    companyName: 'Green Brew Global',
    contactEmail: 'hello@greenbrew.com',
    contactPhone: '+1 (555) 789-1234',
    logo: '/assets/suppliers/green-brew-logo.png',
    description: 'Eco-friendly brewing and cleaning supplies for cafés and restaurants.',
    address: {
      street: '17 Sustainability Ln',
      city: 'Boulder',
      state: 'CO',
      zipCode: '80301',
      country: 'USA'
    },
    status: 'active',
    notes: 'Partners with zero-waste programs. Supports local delivery in CO.',
    createdAt: '2023-03-11T08:25:00Z',
    minOrderValue: 350,
    deliveryTime: '2-4 business days'
  },
  {
    id: 'sup-008',
    name: 'Latte Art Lab',
    companyName: 'Latte Art Innovations Inc.',
    contactEmail: 'contact@latteartlab.com',
    contactPhone: '+1 (555) 901-4567',
    logo: '/assets/suppliers/latte-art-lab-logo.png',
    description: 'Provides latte art tools, milk frothing pitchers, and barista kits.',
    address: {
      street: '88 Crema Street',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      country: 'USA'
    },
    status: 'active',
    createdAt: '2023-04-22T14:40:00Z',
    minOrderValue: 200,
    deliveryTime: '3-5 business days'
  },
  {
    id: 'sup-009',
    name: 'Global Bean Importers',
    companyName: 'GBI International',
    contactEmail: 'orders@globalbean.com',
    contactPhone: '+1 (555) 111-2233',
    logo: '/assets/suppliers/global-bean-logo.png',
    description: 'Direct trade green coffee importers with global sourcing partnerships.',
    address: {
      street: '900 Harbor Freight Dr',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      country: 'USA'
    },
    status: 'inactive',
    notes: 'Temporarily closed for reorganization. Expected to reopen Q3 2025.',
    createdAt: '2022-11-07T12:00:00Z',
    minOrderValue: 1000,
    deliveryTime: '7-10 business days'
  },
  {
    id: 'sup-010',
    name: 'SipTech Solutions',
    companyName: 'SipTech Electronics',
    contactEmail: 'tech@siptech.com',
    contactPhone: '+1 (555) 333-4455',
    logo: '/assets/suppliers/siptech-logo.png',
    description: 'POS systems, digital menus, and order tracking technology for cafés.',
    address: {
      street: '606 Innovation Park',
      city: 'San Jose',
      state: 'CA',
      zipCode: '95112',
      country: 'USA'
    },
    status: 'active',
    notes: 'Offers 24/7 tech support and free software updates for 1 year.',
    createdAt: '2023-06-18T17:30:00Z',
    minOrderValue: 1200,
    deliveryTime: '2-3 business days'
  },
   {
    id: 'sup-011',
    name: 'Aroma World',
    companyName: 'Aroma World Trading',
    contactEmail: 'sales@aromaworld.com',
    contactPhone: '+1 (555) 222-3344',
    logo: '/assets/suppliers/aroma-world-logo.png',
    description: 'Suppliers of high-grade aromatic coffee beans and infusions.',
    address: {
      street: '300 Bean Blvd',
      city: 'Nashville',
      state: 'TN',
      zipCode: '37203',
      country: 'USA'
    },
    status: 'active',
    notes: 'Provides special blends during holiday seasons.',
    createdAt: '2023-07-10T09:00:00Z',
    minOrderValue: 400,
    deliveryTime: '3-5 business days'
  },
  {
    id: 'sup-012',
    name: 'CupGuard Supplies',
    companyName: 'CupGuard Inc.',
    contactEmail: 'contact@cupguard.com',
    contactPhone: '+1 (555) 666-7777',
    logo: '/assets/suppliers/cupguard-logo.png',
    description: 'Manufacturers of cup lids, holders, and spill-proof containers.',
    address: {
      street: '410 Commerce St',
      city: 'Houston',
      state: 'TX',
      zipCode: '77002',
      country: 'USA'
    },
    status: 'inactive',
    notes: 'Product redesign in progress; new stock expected in 2 months.',
    createdAt: '2022-10-01T11:20:00Z',
    minOrderValue: 500,
    deliveryTime: '7-10 business days'
  },
  {
    id: 'sup-013',
    name: 'FlavorFusion Co.',
    companyName: 'FlavorFusion LLC',
    contactEmail: 'orders@flavorfusion.com',
    contactPhone: '+1 (555) 888-4444',
    logo: '/assets/suppliers/flavorfusion-logo.png',
    description: 'Provides syrups, toppings, and flavor mix-ins for drinks and desserts.',
    address: {
      street: '88 Sugar Lane',
      city: 'Philadelphia',
      state: 'PA',
      zipCode: '19107',
      country: 'USA'
    },
    status: 'active',
    notes: 'Ships in eco-friendly packaging only.',
    createdAt: '2023-03-05T10:10:00Z',
    minOrderValue: 300,
    deliveryTime: '2-4 business days'
  },
  {
    id: 'sup-014',
    name: 'Hot Shot Equipment',
    companyName: 'Hot Shot Technologies',
    contactEmail: 'tech@hotshotequip.com',
    contactPhone: '+1 (555) 555-9191',
    logo: '/assets/suppliers/hot-shot-logo.png',
    description: 'State-of-the-art espresso machines and grinders.',
    address: {
      street: '770 Innovation Blvd',
      city: 'Raleigh',
      state: 'NC',
      zipCode: '27601',
      country: 'USA'
    },
    status: 'active',
    notes: 'Offers technician training for franchises.',
    createdAt: '2023-08-14T13:45:00Z',
    minOrderValue: 1500,
    deliveryTime: '5-7 business days'
  },
  {
    id: 'sup-015',
    name: 'Crema Cleaners',
    companyName: 'Crema Maintenance Inc.',
    contactEmail: 'clean@cremaclean.com',
    contactPhone: '+1 (555) 333-1122',
    logo: '/assets/suppliers/crema-cleaners-logo.png',
    description: 'Cleaning supplies and sanitation kits for coffee equipment.',
    address: {
      street: '601 Hygiene St',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85004',
      country: 'USA'
    },
    status: 'active',
    notes: 'Auto-ship programs available for monthly refills.',
    createdAt: '2022-12-11T08:00:00Z',
    minOrderValue: 250,
    deliveryTime: '3-4 business days'
  },
  {
    id: 'sup-016',
    name: 'Barista Tools Pro',
    companyName: 'BT Pro Gear',
    contactEmail: 'tools@btpro.com',
    contactPhone: '+1 (555) 777-8888',
    logo: '/assets/suppliers/barista-tools-logo.png',
    description: 'Professional tools and accessories for baristas.',
    address: {
      street: '1200 Foam Lane',
      city: 'San Diego',
      state: 'CA',
      zipCode: '92101',
      country: 'USA'
    },
    status: 'inactive',
    notes: 'Warehouse closed for inventory update until mid-year.',
    createdAt: '2023-01-20T17:25:00Z',
    minOrderValue: 450,
    deliveryTime: '6-8 business days'
  },
  {
    id: 'sup-017',
    name: 'Grind Fresh Co.',
    companyName: 'Grind Fresh Roasters',
    contactEmail: 'fresh@grindco.com',
    contactPhone: '+1 (555) 999-1111',
    logo: '/assets/suppliers/grind-fresh-logo.png',
    description: 'Delivers small-batch roasted coffee on demand.',
    address: {
      street: '405 Roast Lane',
      city: 'Boise',
      state: 'ID',
      zipCode: '83702',
      country: 'USA'
    },
    status: 'active',
    notes: 'All products are organic and locally sourced.',
    createdAt: '2023-04-15T15:30:00Z',
    minOrderValue: 350,
    deliveryTime: '2-3 business days'
  },
  {
    id: 'sup-018',
    name: 'ChocoBlend Partners',
    companyName: 'ChocoBlend Global',
    contactEmail: 'orders@chocoblend.com',
    contactPhone: '+1 (555) 444-2222',
    logo: '/assets/suppliers/chocoblend-logo.png',
    description: 'Delivers chocolate powders, toppings, and vegan drink bases.',
    address: {
      street: '212 Dessert Way',
      city: 'Columbus',
      state: 'OH',
      zipCode: '43215',
      country: 'USA'
    },
    status: 'active',
    notes: 'Provides allergen-free options for specialty cafés.',
    createdAt: '2023-02-08T12:50:00Z',
    minOrderValue: 275,
    deliveryTime: '3-6 business days'
  },
  {
    id: 'sup-019',
    name: 'SteamCraft Fixtures',
    companyName: 'SteamCraft Interiors',
    contactEmail: 'sales@steamcraft.com',
    contactPhone: '+1 (555) 121-3434',
    logo: '/assets/suppliers/steamcraft-logo.png',
    description: 'Custom counters, shelving, and barista workstations.',
    address: {
      street: '155 Steel Ave',
      city: 'Detroit',
      state: 'MI',
      zipCode: '48226',
      country: 'USA'
    },
    status: 'active',
    notes: 'Custom builds take up to 6 weeks for delivery.',
    createdAt: '2022-11-29T16:40:00Z',
    minOrderValue: 2000,
    deliveryTime: '15-20 business days'
  },
  {
    id: 'sup-020',
    name: 'PureWater Tech',
    companyName: 'PureWater Systems',
    contactEmail: 'contact@purewatertech.com',
    contactPhone: '+1 (555) 787-9090',
    logo: '/assets/suppliers/purewater-logo.png',
    description: 'Water filtration and treatment systems for cafés and restaurants.',
    address: {
      street: '89 Clear Stream Dr',
      city: 'Minneapolis',
      state: 'MN',
      zipCode: '55401',
      country: 'USA'
    },
    status: 'active',
    notes: 'Includes annual maintenance services and system installation.',
    createdAt: '2023-05-30T10:55:00Z',
    minOrderValue: 1100,
    deliveryTime: '4-6 business days'
  }
];
