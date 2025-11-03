import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Defines the TypeScript interface for a single product object.
 * This structure ensures type safety when handling individual product data across the application.
 */
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  category?: string;
}

interface ProductState {
  products: Product[];
  searchQuery: string;
  categoryFilter: string;
  sortOption: string;
}

const initialState: ProductState = {
  products: [],
  searchQuery: "",
  categoryFilter: "All",
  sortOption: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      state.categoryFilter = action.payload;
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
  },
});

export const { setProducts, setSearchQuery, setCategoryFilter, setSortOption } =
  productSlice.actions;
export default productSlice.reducer;
