"use client";

import { useAppSelector } from "@/lib/hooks";
import ProductCard from "./ProductCard";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion";

export default function ProductGrid() {
  const { filteredProducts, loading, error, currentPage, itemsPerPage } =
    useAppSelector((state) => state.products);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 font-body text-lg">
            Loading amazing products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center bg-red-50 border-2 border-red-200 rounded-2xl p-8 max-w-md">
          <svg
            className="w-16 h-16 text-red-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-display font-bold text-red-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-red-700 font-body">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              className="w-24 h-24 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </motion.div>
          <h3 className="text-2xl font-display font-bold text-gray-800 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 font-body">
            Try adjusting your filters to see more results
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <p className="text-gray-600 font-body">
          Showing{" "}
          <span className="font-semibold text-gray-900">
            {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredProducts.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900">
            {filteredProducts.length}
          </span>{" "}
          products
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {currentProducts.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {totalPages > 1 && <Pagination totalPages={totalPages} />}
    </div>
  );
}
