import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsState, SortOption } from "@/types/product";

const API_URL = "https://fakestoreapi.com/products";

// Async  to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data: Product[] = await response.json();
    return data;
  },
);

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  selectedCategory: "all",
  sortBy: "default",
  currentPage: 1,
  itemsPerPage: 12,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.currentPage = 1;
      applyFiltersAndSort(state);
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
      applyFiltersAndSort(state);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetFilters: (state) => {
      state.selectedCategory = "all";
      state.sortBy = "default";
      state.currentPage = 1;
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

// Helper function to apply filters and sorting
function applyFiltersAndSort(state: ProductsState) {
  let filtered = [...state.products];

  // Apply category filter
  if (state.selectedCategory !== "all") {
    filtered = filtered.filter(
      (product) => product.category === state.selectedCategory,
    );
  }

  // Apply sorting
  switch (state.sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    case "default":
    default:
      // Keep original order
      break;
  }

  state.filteredProducts = filtered;
}

export const { setCategory, setSortBy, setCurrentPage, resetFilters } =
  productsSlice.actions;

export default productsSlice.reducer;
