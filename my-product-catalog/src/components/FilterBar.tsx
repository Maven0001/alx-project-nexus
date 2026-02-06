"use client";

import { useAppDispatch, useAppSelector } from "../lib/hooks";
import { setCategory, setSortBy, resetFilters } from "../store/productSlice";
import { SortOption } from "@/types/product";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const { products, selectedCategory, sortBy } = useAppSelector(
    (state) => state.products,
  );

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((p) => p.category)),
    );
    setCategories(uniqueCategories);
  }, [products]);

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));
  };

  const handleSortChange = (sort: SortOption) => {
    dispatch(setSortBy(sort));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-sm p-6 mb-8 border border-gray-100"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Categories */}
        <div className="flex-1">
          <label className="block text-sm font-display font-semibold text-gray-700 mb-4">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all transform hover:scale-105 ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all transform hover:scale-105 capitalize ${
                  selectedCategory === category
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div className="lg:w-64">
          <label
            htmlFor="sort"
            className="block text-sm font-display font-semibold text-gray-700 mb-2"
          >
            Sort By
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value as SortOption)}
            className="w-full px-4  py-2.5 rounded-xl border-2 border-gray-200 focus:border-primary-300 focus:ring-1  outline-none font-body text-sm bg-white transition-all"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>

        {/* Reset */}
        <div className="lg:pt-7">
          <button
            onClick={handleReset}
            className="cursor-pointer px-6 py-2.5 rounded-xl border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600 font-body text-sm font-medium transition-all transform hover:scale-105"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </motion.div>
  );
}
