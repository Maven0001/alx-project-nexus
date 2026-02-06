"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-lg bg-opacity-95"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-linear-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center shadow-lg">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              Lux<span className="text-primary-400">ura</span>
            </h1>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="hidden md:flex items-center space-x-8"
          >
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors font-body text-sm tracking-wide"
            >
              New Arrivals
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors font-body text-sm tracking-wide"
            >
              Collections
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors font-body text-sm tracking-wide"
            >
              About
            </a>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full transition-all transform hover:scale-105 font-body text-sm font-medium shadow-lg">
              Sign In
            </button>
          </motion.nav>
        </div>
      </div>
    </motion.header>
  );
}
