"use client";

import { useAppDispatch } from "@/lib/hooks";
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../store/cartSlice";
import { CartItem as CartItemType } from "../../types/cart";
import { motion } from "framer-motion";
import Image from "next/image";

interface CartItemProps {
  item: CartItemType;
  index: number;
}

export default function CartItem({ item, index }: CartItemProps) {
  const dispatch = useAppDispatch();
  const { product, quantity } = item;

  const handleIncrement = () => {
    dispatch(incrementQuantity(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(product.id));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(product.id));
  };

  const itemTotal = product.price * quantity;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-2"
            sizes="80px"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-body font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
            {product.title}
          </h3>
          <p className="text-xs text-gray-500 font-body capitalize mb-2">
            {product.category}
          </p>

          {/* Price & Quantity Controls */}
          <div className="flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrement}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Decrease quantity"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 12H4"
                  />
                </svg>
              </button>

              <span className="w-8 text-center font-body font-semibold text-gray-900">
                {quantity}
              </span>

              <button
                onClick={handleIncrement}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="Increase quantity"
              >
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-sm font-display font-bold text-gray-900">
                ${itemTotal.toFixed(2)}
              </p>
              {quantity > 1 && (
                <p className="text-xs text-gray-500 font-body">
                  ${product.price.toFixed(2)} each
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Remove Button */}
        <button
          onClick={handleRemove}
          className="shrink-0 p-1 hover:bg-red-50 rounded-lg transition-colors group"
          aria-label="Remove from cart"
        >
          <svg
            className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
