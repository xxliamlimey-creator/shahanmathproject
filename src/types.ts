export interface Product {
  id: string;
  name: string;
  price: number;
  color: 'red' | 'yellow' | 'blue' | 'green' | 'orange';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ScreenStep = 1 | 2 | 3 | 4 | 5;
