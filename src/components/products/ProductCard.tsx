"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag, Star, Check } from "lucide-react";
import { Product } from "@/types/product";
import { formatPrice, toPersianDigits } from "@/lib/persian";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useQuickViewStore } from "@/store/uiStore";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export default function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [isAdded, setIsAdded] = useState(false);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const addItem = useCartStore((state) => state.addItem);
  const openQuickView = useQuickViewStore((state) => state.openQuickView);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1, product.variants?.[0]);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  if (viewMode === "list") {
    return (
      <div className="group bg-white rounded-3xl p-4 sm:p-5 border border-black/6 hover:border-[#FF5B00]/30 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden">
        {/* Thumbnail */}
        <Link
          href={`/products/${product.slug}`}
          className="relative w-full sm:w-48 h-44 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 block"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 200px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.discount && (
            <span className="absolute top-2 right-2 bg-[#FF5B00] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {toPersianDigits(product.discount)}٪ تخفیف
            </span>
          )}
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between w-full h-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-semibold text-[#FF5B00] tracking-wide">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{toPersianDigits(product.rating)}</span>
                <span className="text-zinc-400 text-[11px]">
                  ({toPersianDigits(product.reviewCount)})
                </span>
              </div>
            </div>

            <Link href={`/products/${product.slug}`}>
              <h3 className="text-base font-bold text-zinc-900 hover:text-[#FF5B00] transition-colors line-clamp-1 mb-2">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">
              {product.shortDescription || product.description}
            </p>
          </div>

          {/* Pricing & CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
            <div>
              {product.originalPrice && (
                <span className="text-xs text-zinc-400 line-through block -mb-0.5">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-base sm:text-lg font-black text-zinc-950">
                {formatPrice(product.price)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleWishlist}
                className={`p-2.5 rounded-xl border transition-colors ${
                  isInWishlist
                    ? "bg-rose-50 border-rose-200 text-rose-500"
                    : "border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                }`}
                aria-label="افزودن به علاقه‌مندی"
              >
                <Heart className={`w-4 h-4 ${isInWishlist ? "fill-rose-500" : ""}`} />
              </button>

              <button
                onClick={handleAddToCart}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-[#0e0e12] hover:bg-[#FF5B00] text-white"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>افزوده شد</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>افزودن به سبد</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-white rounded-3xl p-4 border border-black/6 hover:border-[#FF5B00]/30 shadow-xs hover:shadow-xl transition-all duration-400 flex flex-col justify-between relative overflow-hidden h-full">
      {/* Top Image Container */}
      <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-zinc-100 mb-4">
        <Link href={`/products/${product.slug}`} className="block w-full h-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 pointer-events-none z-10">
          {product.discount && (
            <span className="bg-[#FF5B00] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md">
              {toPersianDigits(product.discount)}٪
            </span>
          )}
          {product.badge && (
            <span className="bg-zinc-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {/* Wishlist Button */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={handleToggleWishlist}
            aria-label="افزودن به علاقه‌مندی‌ها"
            className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm ${
              isInWishlist
                ? "bg-rose-500 text-white"
                : "bg-white/90 hover:bg-white text-zinc-700 hover:text-rose-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${isInWishlist ? "fill-white" : ""}`} />
          </motion.button>

          {/* Quick View Button */}
          <button
            onClick={handleQuickView}
            aria-label="پیش‌نمایش سریع"
            className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-zinc-700 hover:text-[#FF5B00] flex items-center justify-center backdrop-blur-md transition-all shadow-sm opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Middle Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#FF5B00] tracking-wider text-[11px]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{toPersianDigits(product.rating)}</span>
            </div>
          </div>

          {/* Product Title */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="text-sm font-bold text-zinc-900 hover:text-[#FF5B00] transition-colors line-clamp-2 leading-snug mb-2">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-2 mt-2">
          <div>
            {product.originalPrice && (
              <span className="text-[11px] text-zinc-400 line-through block -mb-1">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-sm sm:text-base font-black text-zinc-950">
              {formatPrice(product.price)}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleAddToCart}
            aria-label="افزودن به سبد خرید"
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-colors duration-300 shadow-sm shrink-0 ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-[#0e0e12] hover:bg-[#FF5B00] text-white"
            }`}
          >
            {isAdded ? (
              <Check className="w-5 h-5" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
