"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingBag, Check, Heart, ExternalLink } from "lucide-react";
import { useQuickViewStore } from "@/store/uiStore";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice, toPersianDigits } from "@/lib/persian";

export default function QuickViewModal() {
  const isOpen = useQuickViewStore((state) => state.isOpen);
  const product = useQuickViewStore((state) => state.product);
  const closeQuickView = useQuickViewStore((state) => state.closeQuickView);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) =>
    product ? state.isInWishlist(product.id) : false
  );
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  if (!product) return null;

  const currentVariant = product.variants?.[selectedVariantIndex];
  const variantModifier = currentVariant?.priceModifier || 0;
  const currentPrice = product.price + variantModifier;
  const gallery = product.gallery?.length ? product.gallery : [product.image];

  const handleAddToCart = () => {
    addItem(product, quantity, currentVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-black/10 overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={closeQuickView}
              aria-label="بستن پنجره"
              className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white text-zinc-600 hover:text-zinc-950 shadow-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gallery Column (Left / Right in RTL) */}
            <div className="md:w-1/2 p-6 bg-zinc-50/80 flex flex-col justify-between border-b md:border-b-0 md:border-l border-zinc-100">
              {/* Main Image */}
              <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-white shadow-2xs mb-4">
                <Image
                  src={gallery[activeImageIndex] || product.image}
                  alt={product.name}
                  fill
                  sizes="500px"
                  className="object-cover transition-all duration-300"
                />
                {product.discount && (
                  <span className="absolute top-3 right-3 bg-[#FF5B00] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                    {toPersianDigits(product.discount)}٪ تخفیف
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activeImageIndex === idx
                          ? "border-[#FF5B00] shadow-sm"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`نمای ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
              <div>
                {/* Brand & Category */}
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span className="text-[#FF5B00] font-extrabold tracking-wider">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{toPersianDigits(product.rating)}</span>
                    <span className="text-zinc-400 text-[11px]">
                      ({toPersianDigits(product.reviewCount)} نظر)
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold text-zinc-900 leading-snug mb-2">
                  {product.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 mb-4 pb-4 border-b border-zinc-100">
                  <span className="text-xl sm:text-2xl font-black text-zinc-950">
                    {formatPrice(currentPrice)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-zinc-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-4">
                  {product.shortDescription || product.description}
                </p>

                {/* Variant Selector */}
                {product.variants && product.variants.length > 0 && (
                  <div className="mb-4">
                    <label className="text-xs font-bold text-zinc-700 block mb-2">
                      انتخاب مدل / رنگ:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant, idx) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariantIndex(idx)}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            selectedVariantIndex === idx
                              ? "border-[#FF5B00] bg-[#FF5B00]/10 text-[#FF5B00]"
                              : "border-zinc-200 text-zinc-700 hover:border-zinc-300"
                          }`}
                        >
                          {variant.colorHex && (
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                              style={{ backgroundColor: variant.colorHex }}
                            />
                          )}
                          <span>{variant.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specs Highlights */}
                {product.specsHighlights && (
                  <div className="grid grid-cols-2 gap-2 my-4 p-3 bg-zinc-50 rounded-2xl text-xs">
                    {product.specsHighlights.slice(0, 4).map((spec, i) => (
                      <div key={i} className="flex flex-col">
                        <span className="text-[11px] text-zinc-400">{spec.label}</span>
                        <span className="font-bold text-zinc-800">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-zinc-100 space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-zinc-200 rounded-2xl p-1 bg-zinc-50">
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-8 h-8 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 flex items-center justify-center font-bold shadow-2xs transition-colors"
                    >
                      +
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-zinc-900">
                      {toPersianDigits(quantity)}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 flex items-center justify-center font-bold shadow-2xs transition-colors"
                    >
                      -
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-bold transition-all shadow-md ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[#0e0e12] hover:bg-[#FF5B00] text-white"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>به سبد خرید اضافه شد</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        <span>افزودن به سبد خرید</span>
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`p-3 rounded-2xl border transition-colors ${
                      isInWishlist
                        ? "bg-rose-50 border-rose-200 text-rose-500"
                        : "border-zinc-200 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isInWishlist ? "fill-rose-500" : ""}`} />
                  </button>
                </div>

                {/* View Full Product Link */}
                <Link
                  href={`/products/${product.slug}`}
                  onClick={closeQuickView}
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-[#FF5B00] transition-colors py-1"
                >
                  <span>مشاهده صفحه کامل و جدول مشخصات فنی</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
