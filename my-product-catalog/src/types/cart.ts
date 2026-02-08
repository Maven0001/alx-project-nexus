import { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
}

export interface AddToCartPayload {
  product: Product;
  quantity?: number;
}

export interface UpdateQuantityPayload {
  productId: number;
  quantity: number;
}
