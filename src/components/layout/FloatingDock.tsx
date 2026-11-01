"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from "framer-motion";
import {
  Home,
  Grid,
  Search,
  Heart,
  ShoppingBag,
  ArrowUp,
  Tv,
} from "lucide-react";
import { toPersianDigits } from "@/lib/persian";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useSearchModalStore } from "@/store/uiStore";

export default function FloatingDock() {
  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname();

  const wishlistCount = useWishlistStore((state) => state.wishlistIds.length);
  const cartCount = useCartStore((state) => state.totalItems());
  const openCart = useCartStore((state) => state.openCart);
  const openSearch = useSearchModalStore((state) => state.openSearch);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const dockItems = [
    {
      id: "home",
      title: "صفحه اصلی",
      icon: Home,
      href: "/",
      isActive: pathname === "/",
      desktopOnly: false,
    },
    {
      id: "catalog",
      title: "تمام محصولات",
      icon: Grid,
      href: "/products",
      isActive: pathname === "/products" && !pathname.includes("category"),
      desktopOnly: false,
    },
    {
      id: "tv-displays",
      title: "تلویزیون و اولد",
      icon: Tv,
      href: "/products?category=tv-displays",
      isActive: pathname.includes("tv-displays"),
      desktopOnly: true, // Only show on tablet & desktop
    },
    {
      id: "search",
      title: "جستجوی سریع",
      icon: Search,
      onClick: openSearch,
      desktopOnly: false,
    },
    {
      id: "wishlist",
      title: "علاقه‌مندی‌ها",
      icon: Heart,
      href: "/wishlist",
      badge: wishlistCount,
      badgeColor: "bg-rose-500",
      isActive: pathname === "/wishlist",
      desktopOnly: false,
    },
    {
      id: "cart",
      title: "سبد خرید",
      icon: ShoppingBag,
      onClick: openCart,
      badge: cartCount,
      badgeColor: "bg-accent",
      isActive: pathname === "/cart",
      desktopOnly: false,
    },
    {
      id: "scroll-top",
      title: "برگشت به بالا",
      icon: ArrowUp,
      onClick: scrollToTop,
      desktopOnly: true, // Only show on tablet & desktop
    },
  ];

  return (
    <div className="fixed bottom-2.5 sm:bottom-6 inset-x-0 flex justify-center z-40 pointer-events-none px-2 sm:px-4 pb-[env(safe-area-inset-bottom,0px)]">
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto flex items-end gap-1.5 sm:gap-2.5 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-full bg-white/90 backdrop-blur-2xl border border-white/70 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.14)] ring-1 ring-black/5 max-w-[calc(100vw-20px)] sm:max-w-none overflow-visible"
      >
        {dockItems.map((item) => (
          <DockIcon
            key={item.id}
            mouseX={mouseX}
            item={item}
          />
        ))}
      </motion.nav>
    </div>
  );
}

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue<number>;
  item: {
    id: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    href?: string;
    onClick?: () => void;
    badge?: number;
    badgeColor?: string;
    isActive?: boolean;
    desktopOnly?: boolean;
  };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Smooth magnification curve inspired by macOS dock
  const widthSync = useTransform(distance, [-120, 0, 120], [38, 54, 38]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 180, damping: 14 });

  const Icon = item.icon;

  const content = (
    <motion.div
      ref={ref}
      style={{ width, height: width }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center justify-center rounded-2xl transition-colors duration-200 cursor-pointer ${
        item.isActive
          ? "bg-[#0e0e12] text-white shadow-md shadow-black/20"
          : "bg-zinc-100/80 hover:bg-zinc-200/90 text-zinc-700 hover:text-zinc-950"
      }`}
    >
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />

      {/* Item badge for cart / wishlist */}
      {item.badge !== undefined && item.badge > 0 && (
        <span
          className={`absolute -top-1 -left-1 min-w-4 sm:min-w-4.5 h-4 sm:h-4.5 px-1 rounded-full ${
            item.badgeColor || "bg-accent"
          } text-white text-[9px] sm:text-[10px] font-extrabold flex items-center justify-center shadow-xs border-2 border-white`}
        >
          {toPersianDigits(item.badge)}
        </span>
      )}

      {/* Active Dot Indicator */}
      {item.isActive && (
        <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-accent" />
      )}

      {/* Persian Tooltip (Desktop only) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="hidden sm:block absolute -top-8 px-2.5 py-1 rounded-lg bg-zinc-900/95 text-white text-[11px] font-medium tracking-normal whitespace-nowrap shadow-lg pointer-events-none"
          >
            {item.title}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-900/95" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const wrapperClass = item.desktopOnly ? "hidden sm:inline-flex" : "inline-flex";

  if (item.href) {
    return (
      <Link href={item.href} aria-label={item.title} className={wrapperClass}>
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={item.onClick}
      aria-label={item.title}
      className={`focus:outline-hidden ${wrapperClass}`}
    >
      {content}
    </button>
  );
}
