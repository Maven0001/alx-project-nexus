"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleCart } from "../../store/cartSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function CartButton() {
  const dispatch = useAppDispatch();
  const { totalItems } = useAppSelector((state) => state.cart);

  const handleToggle = () => {
    dispatch(toggleCart());
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
      aria-label="Shopping cart"
    >
      <svg
        className="w-6 h-6 text-white"
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

      <AnimatePresence>
        {totalItems > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 bg-[#cc4a35] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg"
          >
            {totalItems > 99 ? "99+" : totalItems}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
