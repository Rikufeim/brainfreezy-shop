export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'course' | 'guide' | 'bundle' | 'membership';
  image?: string;
  features?: string[];
  isSubscription?: boolean;
  subscriptionInterval?: 'month' | 'year';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}
