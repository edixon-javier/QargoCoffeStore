// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supplier' | 'franchisee';
  profileImage?: string;
  createdAt: string;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: Category;
  supplier: Supplier;
  stock: number;
  minOrderQuantity: number;
  specifications: Record<string, string>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  image?: string;
}

export interface Supplier {
  id: string;
  name: string;
  companyName?: string;
  logo?: string;
  description?: string;
  contactEmail: string;
  contactPhone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'active' | 'inactive';
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  minOrderValue?: number;
  deliveryTime?: string;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  shipping: ShippingInfo;
  payment: PaymentInfo;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'canceled';

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  trackingNumber?: string;
}

export interface PaymentInfo {
  method: 'credit_card' | 'bank_transfer' | 'paypal';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Stats and Analytics
export interface SalesStats {
  daily: number[];
  weekly: number[];
  monthly: number[];
  yearly: number[];
}

export interface ProductPerformance {
  productId: string;
  productName: string;
  totalSales: number;
  quantitySold: number;
}

export interface BillingInfo {
  companyName: string;
  dba: string;
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  email: string;
  phone: string;
  paymentMethod: {
    type: 'credit_card';
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  };
}