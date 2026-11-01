"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowLeft, TrendingUp } from "lucide-react";
import { useSearchModalStore } from "@/store/uiStore";
import { PRODUCTS } from "@/data/products";
import { normalizePersianText, formatPrice } from "@/lib/persian";

const POPULAR_SEARCHES = [
  "تلویزیون اولد سونی",
  "پلی استیشن ۵",
  "ساندبار JBL",
  "AirPods Max",
  "سامسونگ Neo QLED",
  "سینمای خانگی",
];

export default function SearchModal() {
  const isOpen = useSearchModalStore((state) => state.isOpen);
  const closeSearch = useSearchModalStore((state) => state.closeSearch);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut Ctrl+K / Cmd+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        useSearchModalStore.getState().toggleSearch();
      }
      if (e.key === "Escape" && isOpen) {
        closeSearch();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeSearch]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Derived filtered results using useMemo without cascading setState
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const normalizedQuery = normalizePersianText(query);
    return PRODUCTS.filter((p) => {
      const matchName = normalizePersianText(p.name).includes(normalizedQuery);
      const matchEnglishName = p.englishName.toLowerCase().includes(normalizedQuery);
      const matchBrand = normalizePersianText(p.brand).includes(normalizedQuery);
      const matchCategory = normalizePersianText(p.categoryName).includes(normalizedQuery);
      const matchDescription = normalizePersianText(p.description).includes(normalizedQuery);

      return matchName || matchEnglishName || matchBrand || matchCategory || matchDescription;
    });
  }, [query]);

  const handleClose = () => {
    setQuery("");
    closeSearch();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-start justify-center pt-12 sm:pt-20 px-4"
          >
            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-black/10 overflow-hidden flex flex-col max-h-[80vh]"
            >
              {/* Search Input Bar */}
              <div className="p-4 sm:p-5 border-b border-zinc-100 flex items-center gap-3">
                <Search className="w-5 h-5 text-accent shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="جستجوی مدل، برند، تلویزیون، اسپیکر، هدفون..."
                  className="flex-1 bg-transparent text-sm sm:text-base font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="px-2.5 py-1 text-xs font-semibold text-zinc-500 bg-zinc-100 hover:bg-zinc-200 rounded-lg transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Suggestions / Results Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                {query.trim() === "" ? (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <span>جستجوهای پرطرفدار خریداران</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_SEARCHES.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => setQuery(tag)}
                          className="px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-accent/10 hover:text-accent text-zinc-700 text-xs font-medium transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div className="space-y-2">
                    <span className="text-xs text-zinc-400 block mb-2 font-medium">
                      یافت شده ({results.length} محصول):
                    </span>
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={handleClose}
                        className="flex items-center gap-4 p-2.5 rounded-2xl hover:bg-zinc-50 border border-transparent hover:border-zinc-200 transition-colors group"
                      >
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="56px"
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 text-[11px] text-zinc-400 mb-0.5">
                            <span className="text-accent font-bold">
                              {product.brand}
                            </span>
                            <span>•</span>
                            <span>{product.categoryName}</span>
                          </div>
                          <h4 className="text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-accent transition-colors line-clamp-1">
                            {product.name}
                          </h4>
                          <span className="text-xs font-bold text-zinc-950 block mt-0.5">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                        <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-accent group-hover:-translate-x-0.75 transition-all" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm text-zinc-500 mb-2">
                      محصولی با عبارت «{query}» یافت نشد.
                    </p>
                    <p className="text-xs text-zinc-400">
                      لطفاً املای کلمه را بررسی کنید یا دسته‌بندی دیگری را جستجو نمایید.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Tip */}
              <div className="p-3 bg-zinc-50 border-t border-zinc-100 text-center text-[11px] text-zinc-400">
                با کلیک روی هر کالا صفحه مشخصات فنی کامل باز خواهد شد.
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
