"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Flame, ArrowLeft } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";

export default function BestSellers() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const bestSellerProducts = PRODUCTS.filter((p) => p.bestseller);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 340;
    scrollContainerRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header with Navigation Controls */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-500 mb-2">
              <Flame className="w-4 h-4 fill-rose-500" />
              <span>انتخاب خریداران حرفه‌ای</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              پرفروش‌ترین‌های ماه
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products?sort=popular"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-zinc-600 hover:text-accent transition-colors ml-4"
            >
              <span>مشاهده تمام محبوب‌ترین‌ها</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <button
              onClick={() => scroll("right")}
              aria-label="اسکرول به راست"
              className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-700 hover:text-zinc-950 shadow-xs transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("left")}
              aria-label="اسکرول به چپ"
              className="w-10 h-10 rounded-full border border-zinc-200 bg-white hover:bg-zinc-100 flex items-center justify-center text-zinc-700 hover:text-zinc-950 shadow-xs transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontally Scrollable Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {bestSellerProducts.map((product) => (
            <div
              key={product.id}
              className="w-70 sm:w-80 shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
