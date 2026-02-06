"use client";

import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";
import ProductLoader from "@/components/ProductLoader";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <ProductLoader />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-linear-to-r from-primary-600 via-primary-500 to-accent-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Discover Premium Quality
              </h1>
              <p className="font-body text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
                Explore our curated collection of exceptional products,
                handpicked for those who appreciate the finer things in life
              </p>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-8 py-4">
                  <p className="text-3xl font-display font-bold">500+</p>
                  <p className="text-sm font-body">Products</p>
                </div>
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-8 py-4">
                  <p className="text-3xl font-display font-bold">50K+</p>
                  <p className="text-sm font-body">Happy Customers</p>
                </div>
                <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-8 py-4">
                  <p className="text-3xl font-display font-bold">4.8★</p>
                  <p className="text-sm font-body">Average Rating</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <FilterBar />
          <ProductGrid />
        </section>
      </main>

      <Footer />
    </div>
  );
}
