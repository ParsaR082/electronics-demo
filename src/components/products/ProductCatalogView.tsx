"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  LayoutGrid,
  List,
  Search,
  Star,
  Sparkles,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { SortOption } from "@/types/product";
import { normalizePersianText, formatPrice, toPersianDigits } from "@/lib/persian";
import ProductCard from "@/components/products/ProductCard";

const BRANDS = ["Sony", "Samsung", "LG", "JBL", "Bose", "Apple", "Philips", "Marshall", "Sonos"];

export default function ProductCatalogView() {
  const searchParams = useSearchParams();

  // Initialize Filter States directly from searchParams
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    () => searchParams.get("category") || "all"
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(() => {
    const b = searchParams.get("brand");
    return b ? [b] : [];
  });
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(200000000);
  const [onlyDiscounted, setOnlyDiscounted] = useState(
    () => searchParams.get("discount") === "true"
  );
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<SortOption>(() =>
    searchParams.get("sort") === "popular" ? "rating" : "featured"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Brand toggle handler
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(200000000);
    setOnlyDiscounted(false);
    setOnlyInStock(false);
    setMinRating(0);
    setSortBy("featured");
  };

  // Active filter count
  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    selectedBrands.length +
    (onlyDiscounted ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (maxPrice < 200000000 || minPrice > 0 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Search
      if (searchQuery.trim()) {
        const norm = normalizePersianText(searchQuery);
        const matchName = normalizePersianText(product.name).includes(norm);
        const matchEng = product.englishName.toLowerCase().includes(norm);
        const matchBrand = normalizePersianText(product.brand).includes(norm);
        if (!matchName && !matchEng && !matchBrand) return false;
      }

      // Category
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Brands
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Price range
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      // Discounted only
      if (onlyDiscounted && (!product.discount || product.discount <= 0)) {
        return false;
      }

      // In stock only
      if (onlyInStock && product.stock <= 0) {
        return false;
      }

      // Rating
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "discount") return (b.discount || 0) - (a.discount || 0);
      if (sortBy === "newest") return b.id.localeCompare(a.id);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedBrands,
    minPrice,
    maxPrice,
    onlyDiscounted,
    onlyInStock,
    minRating,
    sortBy,
  ]);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Top Banner & Breadcrumb */}
      <div className="mb-8 pb-6 border-b border-zinc-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#FF5B00] font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>فروشگاه تخصصی AUREON</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-zinc-950">
              کاتالوگ جامع تجهیزات صوتی و تصویری
            </h1>
          </div>

          <div className="text-xs text-zinc-500 font-medium">
            نمایش{" "}
            <strong className="text-zinc-900 font-extrabold text-sm">
              {toPersianDigits(filteredProducts.length)}
            </strong>{" "}
            از {toPersianDigits(PRODUCTS.length)} محصول لوکس
          </div>
        </div>
      </div>

      {/* Main Catalog Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters (3 cols) */}
        <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-3xl border border-zinc-200/80 shadow-xs space-y-6 sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
            <h3 className="font-extrabold text-sm text-zinc-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#FF5B00]" />
              فیلترهای پیشرفته
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#FF5B00] hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                پاکسازی همه ({toPersianDigits(activeFiltersCount)})
              </button>
            )}
          </div>

          {/* Search in Catalog */}
          <div className="relative">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="جستجو در این صفحه..."
              className="w-full pr-10 pl-3 py-2 text-xs rounded-xl bg-zinc-50 border border-zinc-200 focus:outline-hidden focus:border-[#FF5B00]"
            />
          </div>

          {/* Categories Filter */}
          <div>
            <h4 className="text-xs font-bold text-zinc-800 mb-2.5">دسته‌بندی‌ها</h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === "all"
                    ? "bg-[#FF5B00]/10 text-[#FF5B00]"
                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                }`}
              >
                <span>همه دسته‌ها</span>
                <span className="text-[10px] text-zinc-400">
                  {toPersianDigits(PRODUCTS.length)}
                </span>
              </button>

              {CATEGORIES.map((cat) => {
                const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-colors ${
                      isSelected
                        ? "bg-[#FF5B00]/10 text-[#FF5B00]"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-zinc-400">
                      {toPersianDigits(count)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Brands Filter */}
          <div className="pt-4 border-t border-zinc-100">
            <h4 className="text-xs font-bold text-zinc-800 mb-2.5">برند سازنده</h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {BRANDS.map((brand) => {
                const isChecked = selectedBrands.includes(brand);
                const count = PRODUCTS.filter((p) => p.brand === brand).length;

                return (
                  <label
                    key={brand}
                    className="flex items-center justify-between text-xs text-zinc-700 hover:text-zinc-950 cursor-pointer select-none py-1"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-zinc-300 text-[#FF5B00] focus:ring-[#FF5B00] w-4 h-4"
                      />
                      <span className="font-medium">{brand}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">
                      ({toPersianDigits(count)})
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="pt-4 border-t border-zinc-100">
            <h4 className="text-xs font-bold text-zinc-800 mb-2">محدوده قیمت</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>تا: {formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={10000000}
                max={200000000}
                step={5000000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#FF5B00] cursor-pointer"
              />
            </div>
          </div>

          {/* Toggles (Discounted & In Stock) */}
          <div className="pt-4 border-t border-zinc-100 space-y-3">
            <label className="flex items-center justify-between cursor-pointer select-none text-xs text-zinc-700">
              <span>فقط کالاهای تخفیف‌دار</span>
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
                className="rounded border-zinc-300 text-[#FF5B00] focus:ring-[#FF5B00] w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer select-none text-xs text-zinc-700">
              <span>فقط کالاهای موجود در انبار</span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded border-zinc-300 text-[#FF5B00] focus:ring-[#FF5B00] w-4 h-4"
              />
            </label>
          </div>

          {/* Rating Filter */}
          <div className="pt-4 border-t border-zinc-100">
            <h4 className="text-xs font-bold text-zinc-800 mb-2">حداقل امتیاز</h4>
            <div className="flex gap-1.5">
              {[0, 4.5, 4.8].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setMinRating(rate)}
                  className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-colors ${
                    minRating === rate
                      ? "bg-[#FF5B00]/10 border-[#FF5B00] text-[#FF5B00]"
                      : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{rate === 0 ? "همه" : `+${toPersianDigits(rate)}`}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Catalog Main Content (9 cols) */}
        <main className="col-span-1 lg:col-span-9 space-y-6">
          {/* Top Control Bar: Mobile Filter Button, Sorting, View Mode */}
          <div className="bg-white p-4 rounded-3xl border border-zinc-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs font-bold text-zinc-800 transition-colors"
            >
              <Filter className="w-4 h-4 text-[#FF5B00]" />
              <span>فیلترها</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#FF5B00] text-white text-[10px] font-bold flex items-center justify-center">
                  {toPersianDigits(activeFiltersCount)}
                </span>
              )}
            </button>

            {/* Sorting Select Options */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-500 hidden sm:inline">مرتب‌سازی:</span>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {[
                  { id: "featured", label: "پیشنهاد ما" },
                  { id: "newest", label: "جدیدترین" },
                  { id: "price-asc", label: "ارزان‌ترین" },
                  { id: "price-desc", label: "گران‌ترین" },
                  { id: "discount", label: "بیشترین تخفیف" },
                ].map((sort) => (
                  <button
                    key={sort.id}
                    onClick={() => setSortBy(sort.id as SortOption)}
                    className={`px-3 py-1.5 rounded-xl font-semibold transition-colors ${
                      sortBy === sort.id
                        ? "bg-[#0e0e12] text-white"
                        : "bg-zinc-50 hover:bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    {sort.label}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Buttons (Grid / List) */}
            <div className="hidden sm:flex items-center gap-1 border border-zinc-200 rounded-xl p-1 bg-zinc-50">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-zinc-950 shadow-2xs"
                    : "text-zinc-400 hover:text-zinc-700"
                }`}
                aria-label="نمایش شبکه‌ای"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-white text-zinc-950 shadow-2xs"
                    : "text-zinc-400 hover:text-zinc-700"
                }`}
                aria-label="نمایش لیستی"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Filter Badges */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-zinc-400">فیلترهای اعمال‌شده:</span>

              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF5B00]/10 text-[#FF5B00] text-xs font-semibold">
                  دسته: {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory("all")}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {selectedBrands.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200 text-zinc-800 text-xs font-semibold"
                >
                  برند: {b}
                  <button onClick={() => toggleBrand(b)}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}

              {onlyDiscounted && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold">
                  تخفیف‌دار
                  <button onClick={() => setOnlyDiscounted(false)}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              {onlyInStock && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                  موجود در انبار
                  <button onClick={() => setOnlyInStock(false)}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-xs text-zinc-500 hover:text-zinc-950 underline font-medium mr-2"
              >
                حذف همه
              </button>
            </div>
          )}

          {/* Product Grid / List */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-zinc-200/80 shadow-xs space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900">
                هیچ محصولی مطابق با فیلترهای شما یافت نشد
              </h3>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                لطفاً برخی از فیلترها را غیرفعال کرده یا کلمه دیگری را جستجو نمایید.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-[#0e0e12] hover:bg-[#FF5B00] text-white text-xs font-bold transition-colors"
              >
                پاکسازی فیلترها
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard product={product} viewMode={viewMode} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 bottom-0 right-0 w-[85%] max-w-[340px] bg-white shadow-2xl z-50 p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
                  <h3 className="font-bold text-base text-zinc-900">فیلترهای کاتالوگ</h3>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-lg text-zinc-500 hover:text-zinc-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 mb-2">دسته‌بندی</h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`w-full text-right p-2 rounded-xl text-xs font-semibold ${
                        selectedCategory === "all"
                          ? "bg-[#FF5B00]/10 text-[#FF5B00]"
                          : "text-zinc-600"
                      }`}
                    >
                      همه محصولات
                    </button>
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`w-full text-right p-2 rounded-xl text-xs font-semibold ${
                          selectedCategory === cat.id
                            ? "bg-[#FF5B00]/10 text-[#FF5B00]"
                            : "text-zinc-600"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brands */}
                <div>
                  <h4 className="text-xs font-bold text-zinc-800 mb-2">برند</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {BRANDS.map((b) => (
                      <button
                        key={b}
                        onClick={() => toggleBrand(b)}
                        className={`p-2 rounded-xl text-xs font-semibold border text-center ${
                          selectedBrands.includes(b)
                            ? "border-[#FF5B00] bg-[#FF5B00]/10 text-[#FF5B00]"
                            : "border-zinc-200 text-zinc-700"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply / Close Button */}
              <div className="pt-6 border-t border-zinc-100">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full py-3 rounded-2xl bg-[#0e0e12] text-white text-xs font-bold shadow-md"
                >
                  اعمال فیلترها ({toPersianDigits(filteredProducts.length)} محصول)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
