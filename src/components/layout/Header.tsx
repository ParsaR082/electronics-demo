"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { toPersianDigits } from "@/lib/persian";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useSearchModalStore } from "@/store/uiStore";
import MegaMenu from "@/components/layout/MegaMenu";
import MobileNav from "@/components/layout/MobileNav";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const wishlistCount = useWishlistStore((state) => state.wishlistIds.length);
  const cartCount = useCartStore((state) => state.totalItems());
  const openCart = useCartStore((state) => state.openCart);
  const openSearch = useSearchModalStore((state) => state.openSearch);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-black/8 shadow-sm py-3"
            : "bg-white/95 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none border-b border-black/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Right Section: Mobile Trigger & Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="باز کردن منو"
              className="p-2 rounded-xl text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 lg:hidden transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-2xl bg-[#0e0e12] flex items-center justify-center text-white font-black text-lg tracking-wider shadow-md group-hover:bg-[#FF5B00] transition-colors duration-300">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-wider text-zinc-950 flex items-center gap-1.5 leading-none">
                  AUREON
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B00]" />
                </span>
                <span className="text-[10px] text-zinc-400 font-medium tracking-wide mt-0.5">
                  آئورئون | خانه الکترونیک
                </span>
              </div>
            </Link>
          </div>

          {/* Center Section: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/"
              className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors ${
                pathname === "/"
                  ? "text-[#FF5B00] bg-[#FF5B00]/10"
                  : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/70"
              }`}
            >
              صفحه اصلی
            </Link>

            {/* Mega Menu Toggle */}
            <div
              className="relative"
              onMouseEnter={() => setIsMegaMenuOpen(true)}
            >
              <button
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1 ${
                  isMegaMenuOpen
                    ? "text-[#FF5B00] bg-[#FF5B00]/10"
                    : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/70"
                }`}
              >
                <span>دسته‌بندی‌ها</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMegaMenuOpen ? "rotate-180 text-[#FF5B00]" : "text-zinc-400"
                  }`}
                />
              </button>
            </div>

            <Link
              href="/products"
              className={`px-3 py-2 rounded-full text-sm font-semibold transition-colors ${
                pathname === "/products" && !pathname.includes("category")
                  ? "text-[#FF5B00] bg-[#FF5B00]/10"
                  : "text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/70"
              }`}
            >
              همه محصولات
            </Link>

            <Link
              href="/products?category=tv-displays"
              className="px-3 py-2 rounded-full text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/70 transition-colors"
            >
              تلویزیون و نمایشگر
            </Link>

            <Link
              href="/products?category=speakers-audio"
              className="px-3 py-2 rounded-full text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/70 transition-colors"
            >
              اسپیکر و ساندبار
            </Link>

            <Link
              href="/products?category=headphones"
              className="px-3 py-2 rounded-full text-sm font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100/70 transition-colors"
            >
              هدفون و ایرپاد
            </Link>
          </nav>

          {/* Left Section: Search, Wishlist, Cart Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Trigger Button */}
            <button
              onClick={openSearch}
              aria-label="جستجوی محصولات"
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-100/90 hover:bg-zinc-200/80 text-zinc-600 hover:text-zinc-950 transition-colors text-xs font-medium"
            >
              <Search className="w-4 h-4 text-zinc-500" />
              <span className="hidden sm:inline">جستجو...</span>
              <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] bg-white text-zinc-500 border border-zinc-200 rounded font-mono shadow-xs">
                ⌘K
              </kbd>
            </button>

            {/* Wishlist Link with Live Counter */}
            <Link
              href="/wishlist"
              aria-label="لیست علاقه‌مندی‌ها"
              className="relative p-2.5 rounded-full text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 left-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs"
                >
                  {toPersianDigits(wishlistCount)}
                </motion.span>
              )}
            </Link>

            {/* Cart Trigger with Pop Animation */}
            <button
              onClick={openCart}
              aria-label="مشاهده سبد خرید"
              className="relative flex items-center gap-2 p-2.5 sm:px-4 sm:py-2 rounded-full bg-[#0e0e12] hover:bg-[#FF5B00] text-white transition-colors duration-200 shadow-md group"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="hidden sm:inline text-xs font-bold">سبد خرید</span>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 1.5 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-[#FF5B00] group-hover:bg-white group-hover:text-zinc-900 text-white text-[10px] font-bold flex items-center justify-center transition-colors shadow-xs"
                >
                  {toPersianDigits(cartCount)}
                </motion.span>
              )}
            </button>
          </div>
        </div>

        {/* Animated MegaMenu on Desktop */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <MegaMenu onClose={() => setIsMegaMenuOpen(false)} />
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={openSearch}
      />
    </>
  );
}
