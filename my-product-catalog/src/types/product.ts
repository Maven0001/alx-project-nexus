export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  products: Product[];
  filteredProducts: Product[];
  loading: boolean;
  error: string | null;
  selectedCategory: string;
  sortBy: SortOption;
  currentPage: number;
  itemsPerPage: number;
}

export type SortOption = "price-asc" | "price-desc" | "rating" | "default";

export interface FilterOptions {
  category: string;
  minPrice?: number;
  maxPrice?: number;
}
