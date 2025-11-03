import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery, setSortOption, setCategoryFilter } from "../appStore/productSlice";
import type { RootState, AppDispatch } from "../appStore/store";

/**
 * Renders the Filters component, providing UI controls for searching, filtering by category, and sorting products.
 * Parameters: None.
 * The component retrieves product data from the Redux store to dynamically generate categories and dispatches actions to update global filtering/sorting states.
 */
const Filters: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.product.products);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const uniqueCategories = new Set(products.map((p) => p.category));
  const categories = ["All", ...Array.from(uniqueCategories)];

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 mt-3">
        
      {/* SearchBar   */}
      <div className="flex items-center bg-zinc-800 rounded-lg px-3 py-2 w-full md:w-64">
        <Search size={18} className="text-zinc-400 mr-2" />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none text-white w-full placeholder:text-zinc-400"
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        />
      </div>

      {/* Category filter */}
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
          onClick={() => {
            setCategoryOpen(!categoryOpen);
            setSortOpen(false);
          }}
        >
          Category <ChevronDown size={16} />
        </button>

        {categoryOpen && (
          <div className="absolute mt-2 w-48 bg-zinc-800 rounded-lg z-50 max-h-60 overflow-y-auto">
            {categories.map((item,index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 hover:bg-zinc-700 capitalize"
                onClick={() => {
                  dispatch(setCategoryFilter(item));
                  setCategoryOpen(false);
                }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter */}
      <div className="relative">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
          onClick={() => {
            setSortOpen(!sortOpen);
            setCategoryOpen(false);
          }}
        >
          Sort By <ChevronDown size={16} />
        </button>

        {sortOpen && (
          <div className="absolute mt-2 w-48 bg-zinc-800 rounded-lg z-50">
            <button
              className="w-full text-left px-4 py-2 hover:bg-zinc-700"
              onClick={() => {
                dispatch(setSortOption("price-asc"));
                setSortOpen(false);
              }}
            >
              Price: Low - High
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-zinc-700"
              onClick={() => {
                dispatch(setSortOption("price-desc"));
                setSortOpen(false);
              }}
            >
              Price: High - Low
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-zinc-700"
              onClick={() => {
                dispatch(setSortOption("title"));
                setSortOpen(false);
              }}
            >
              Title (A-Z)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
