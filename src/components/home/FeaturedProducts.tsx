"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

const FILTER_TABS = [
  { id: "all", label: "همه محصولات برتر" },
  { id: "tv-displays", label: "تلویزیون و اولد" },
  { id: "speakers-audio", label: "اسپیکر و ساندبار" },
  { id: "headphones", label: "هدفون و ایرپاد" },
  { id: "gaming-consoles", label: "کنسول و گیمینگ" },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeTab === "all") return product.featured;
    return product.category === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-20 sm:py-28 bg-[#F4F2EC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5B00] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>مجموعه برگزیده</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              محصولات شاخص آئورئون
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-[#FF5B00] transition-colors"
          >
            <span>مشاهده همه ۲۴ مدل کاتالوگ</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#0e0e12] text-white shadow-md"
                  : "bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 border border-zinc-200/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
