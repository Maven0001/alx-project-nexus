"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  closeCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../../store/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CartItem from "./CartItem";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, isOpen, totalItems, totalPrice } = useAppSelector(
    (state) => state.cart,
  );

  const handleClose = () => {
    dispatch(closeCart());
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const handleCheckout = () => {
    alert("Checkout functionality coming soon!");
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-500 text-white p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold">
                  Shopping Cart
                </h2>
                <p className="text-white/90 font-body text-sm mt-1">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close cart"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center"
                >
                  <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <svg
                      className="w-16 h-16 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-bold text-gray-800 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 font-body mb-6">
                    Add some products to get started!
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 bg-[#cc4a35] text-white rounded-xl font-body font-medium hover:shadow-lg transition-shadow"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <CartItem key={item.product.id} item={item} index={index} />
                  ))}

                  {/* Clear Cart Button */}
                  <button
                    onClick={handleClearCart}
                    className="w-full px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-body text-sm font-medium mt-4"
                  >
                    Clear Cart
                  </button>
                </div>
              )}
            </div>

            {/* Footer - Summary & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 font-body">Subtotal</span>
                  <span className="text-2xl font-display font-bold text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Shipping Notice */}
                <div className="bg-accent-50 border border-accent-200 rounded-lg p-3 mb-4">
                  <p className="text-xs text-accent-800 font-body">
                    🎉 Free shipping on orders over $50!
                  </p>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#cc4a35] text-white py-4 rounded-xl font-body font-semibold text-lg hover:shadow-xl transition-shadow mb-3"
                >
                  Proceed to Checkout
                </button>

                {/* Continue Shopping */}
                <button
                  onClick={handleClose}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-body font-medium hover:border-primary-500 hover:text-primary-600 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
