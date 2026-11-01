"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Heart, ShoppingBag, Tv, Speaker, Headphones, Film, Gamepad2, Home, Phone, ChevronLeft } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { toPersianDigits } from "@/lib/persian";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";

const ICONS = {
  "tv-displays": Tv,
  "speakers-audio": Speaker,
  headphones: Headphones,
  "home-theater": Film,
  "gaming-consoles": Gamepad2,
  "smart-home": Home,
};

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export default function MobileNav({ isOpen, onClose, onOpenSearch }: MobileNavProps) {
  const wishlistCount = useWishlistStore((state) => state.wishlistIds.length);
  const cartCount = useCartStore((state) => state.totalItems());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 bottom-0 right-0 w-[85%] max-w-[360px] bg-[#FAF9F6] shadow-2xl z-50 flex flex-col overflow-y-auto lg:hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-200/80 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-zinc-950 flex items-center justify-center text-white font-extrabold text-base tracking-wider">
                  A
                </div>
                <div>
                  <span className="font-extrabold tracking-wider text-base text-zinc-900 block">
                    AUREON
                  </span>
                  <span className="text-[10px] text-zinc-400 block -mt-1 font-medium">
                    الکترونیک و سرگرمی لوکس
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                aria-label="بستن منو"
                className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 grid grid-cols-3 gap-2 bg-zinc-100/60 border-b border-zinc-200/60">
              <button
                onClick={() => {
                  onClose();
                  onOpenSearch();
                }}
                className="flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-white text-zinc-700 shadow-sm text-xs font-medium hover:text-[#FF5B00] transition-colors"
              >
                <Search className="w-4 h-4 text-[#FF5B00]" />
                <span>جستجو</span>
              </button>

              <Link
                href="/wishlist"
                onClick={onClose}
                className="relative flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-white text-zinc-700 shadow-sm text-xs font-medium hover:text-[#FF5B00] transition-colors"
              >
                <Heart className="w-4 h-4 text-rose-500" />
                <span>علاقه‌مندی</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 left-2 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {toPersianDigits(wishlistCount)}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                onClick={onClose}
                className="relative flex flex-col items-center justify-center gap-1 p-2.5 rounded-xl bg-white text-zinc-700 shadow-sm text-xs font-medium hover:text-[#FF5B00] transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#FF5B00]" />
                <span>سبد خرید</span>
                {cartCount > 0 && (
                  <span className="absolute top-1.5 left-2 bg-[#FF5B00] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {toPersianDigits(cartCount)}
                  </span>
                )}
              </Link>
            </div>

            {/* Menu Links */}
            <div className="flex-1 py-4 px-4 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-zinc-400 px-3 mb-2 uppercase tracking-wider">
                  ناوبری اصلی
                </h4>
                <div className="space-y-1">
                  <Link
                    href="/"
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white text-sm font-semibold text-zinc-800 transition-colors"
                  >
                    <span>صفحه اصلی</span>
                    <ChevronLeft className="w-4 h-4 text-zinc-400" />
                  </Link>

                  <Link
                    href="/products"
                    onClick={onClose}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white text-sm font-semibold text-zinc-800 transition-colors"
                  >
                    <span>کاتالوگ تمام محصولات</span>
                    <span className="text-[11px] bg-[#FF5B00]/10 text-[#FF5B00] px-2 py-0.5 rounded-full font-bold">
                      ۲۴ مدل
                    </span>
                  </Link>
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold text-zinc-400 px-3 mb-2 uppercase tracking-wider">
                  دسته‌بندی‌های تخصصی
                </h4>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => {
                    const IconComp = ICONS[cat.id] || Tv;
                    return (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.id}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white text-sm text-zinc-700 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:text-[#FF5B00] group-hover:bg-[#FF5B00]/10 transition-colors">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span className="font-medium group-hover:text-zinc-900">
                            {cat.name}
                          </span>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-zinc-400" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Support Info */}
            <div className="p-4 border-t border-zinc-200/80 bg-white">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-[#FF5B00]/10 flex items-center justify-center text-[#FF5B00] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-zinc-500 block">مشاوره تخصصی و سفارش تلفنی:</span>
                  <a
                    href="tel:02191008899"
                    className="text-sm font-bold text-zinc-900 hover:text-[#FF5B00] transition-colors"
                    dir="ltr"
                  >
                    ۰۲۱ - ۹۱۰۰ ۸۸۹۹
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
