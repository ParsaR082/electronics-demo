"use client";

import Link from "next/link";
import { Heart, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { PRODUCTS } from "@/data/products";
import { toPersianDigits } from "@/lib/persian";
import ProductCard from "@/components/products/ProductCard";

export default function WishlistPage() {
  const wishlistIds = useWishlistStore((state) => state.wishlistIds);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addItem = useCartStore((state) => state.addItem);

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const handleAddAllToCart = () => {
    wishlistProducts.forEach((p) => {
      addItem(p, 1, p.variants?.[0]);
    });
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="py-20 sm:py-32 max-w-4xl mx-auto px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-rose-50 flex items-center justify-center text-rose-400 mx-auto mb-6">
          <Heart className="w-12 h-12 stroke-1 fill-rose-100 text-rose-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 mb-2">
          لیست علاقه‌مندی‌های شما خالی است
        </h1>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mb-8 leading-relaxed">
          با کلیک روی آیکون قلب در هر کالا، محصولات مورد علاقه خود را برای خرید آسان‌تر در این بخش ذخیره نمایید.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0e0e12] hover:bg-accent text-white text-sm font-extrabold transition-all shadow-lg shadow-black/10"
        >
          <span>مشاهده و مرور کاتالوگ</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Title & Actions Bar */}
      <div className="mb-8 pb-6 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-rose-500 font-bold mb-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            <span>محصولات نشان‌شده شما</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-950">
            لیست علاقه‌مندی‌ها ({toPersianDigits(wishlistProducts.length)} کالا)
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddAllToCart}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0e0e12] hover:bg-accent text-white text-xs font-bold transition-colors shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>افزودن همه به سبد خرید</span>
          </button>

          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-zinc-600 hover:text-rose-500 text-xs font-bold transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>پاکسازی لیست</span>
          </button>
        </div>
      </div>

      {/* Grid of Wishlist Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
