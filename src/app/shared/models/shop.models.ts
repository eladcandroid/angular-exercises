/**
 * Shopping app models for testing exercise
 */

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl?: string;
  description?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id?: number;
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SearchFilters {
  query: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}
