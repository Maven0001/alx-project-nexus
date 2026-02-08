"use client";

import { Product } from "@/types/product";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart, openCart } from "../store/cartSlice";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(addToCart({ product, quantity: 1 }));

    // Show success notification
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);

    // Reset button state
    setTimeout(() => setIsAdding(false), 300);
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(openCart());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group border border-gray-100 relative"
    >
      {/* Success Notification */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-xs font-body font-medium shadow-lg z-10 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Added to cart!
        </motion.div>
      )}

      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-lg">
          <div className="flex items-center space-x-1">
            <svg
              className="w-4 h-4 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <span className="text-sm font-body font-semibold text-gray-700">
              {product.rating.rate.toFixed(1)}
            </span>
          </div>
        </div>
        {product.rating.rate >= 4.5 && (
          <div className="absolute top-4 left-4 bg-red-500  text-white px-3 py-1 rounded-full text-xs font-body font-bold shadow-lg">
            Top Rated
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-xs font-body font-semibold text-primary-600 uppercase tracking-wider mb-2">
          {product.category}
        </p>
        <h3 className="font-display text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 font-body">
          {product.description}
        </p>

        <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-500 font-body">
                {product.rating.count} reviews
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 bg-[#cc4a35] text-white px-4 py-2.5 rounded-xl hover:shadow-lg transition-all font-body text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {isAdding ? "Adding..." : "Add to Cart"}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
