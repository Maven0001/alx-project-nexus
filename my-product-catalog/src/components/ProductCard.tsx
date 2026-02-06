"use client";

import { Product } from "@/types/product";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group border border-gray-100"
    >
      <div className="relative h-64 bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
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
          <div className="absolute top-4 left-4 bg-linear-to-r from-accent-500 to-accent-600 text-red-600 px-3 py-1 rounded-full text-xs font-body font-bold shadow-lg">
            Best Seller
          </div>
        )}
      </div>

      <div className="p-6">
        <p className="text-xs font-bold text-[#cc4a35] uppercase tracking-wider mb-2">
          {product.category}
        </p>
        <h3 className="font-display text-lg font-bold text-gray-800 mb-2 line-clamp-2 min-h-14">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 font-body">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-2xl font-display font-bold text-gray-900 mb-2">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-500 font-body">
              {product.rating.count} reviews
            </span>
          </div>
          <button className="bg-[#cc4a35]  text-white px-5 py-2.5 rounded-xl hover:shadow-sm transform hover:scale-105 transition-all font-body text-sm font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
