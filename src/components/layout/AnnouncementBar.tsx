"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Truck, Headphones, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const ANNOUNCEMENTS = [
  {
    text: "ارسال رایگان اکسپرس برای سفارش‌های بالای ۵ میلیون تومان به سراسر ایران",
    icon: Truck,
    highlight: "ارسال رایگان",
  },
  {
    text: "ضمانت ۱۰۰٪ اصالت کالا + ۲۴ ماه گارانتی معتبر شرکتی طلایی AUREON",
    icon: ShieldCheck,
    highlight: "ضمانت اصالت",
  },
  {
    text: "مشاوره تخصصی و پیشرفته چیدمان صوتی و تصویری خانگی ۲۴ ساعته",
    icon: Headphones,
    highlight: "مشاوره رایگان",
  },
  {
    text: "فروش جشنواره طلایی پاییزه با هدایای اختصاصی تا پایان هفته",
    icon: Sparkles,
    highlight: "جشنواره",
  },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = ANNOUNCEMENTS[currentIndex];
  const IconComponent = current.icon;

  return (
    <div className="bg-[#0e0e12] text-zinc-300 text-xs sm:text-sm py-2 px-4 border-b border-white/10 relative z-40 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Brand Slogan */}
        <div className="hidden lg:flex items-center gap-2 text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-[#FF5B00] animate-pulse" />
          <span className="font-medium text-zinc-300">AUREON Luxury Electronics</span>
          <span className="text-zinc-500">|</span>
          <span className="text-xs">شوروم دیجیتال صوتی و تصویری</span>
        </div>

        {/* Center: Rotating Announcement */}
        <div className="flex-1 flex items-center justify-center relative min-h-[22px] px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 text-center text-zinc-200"
            >
              <IconComponent className="w-4 h-4 text-[#FF5B00] shrink-0" />
              <span className="font-medium">{current.text}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Quick Navigation & Announcement Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev === 0 ? ANNOUNCEMENTS.length - 1 : prev - 1))
              }
              aria-label="اعلان قبلی"
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length)
              }
              aria-label="اعلان بعدی"
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>

          <Link
            href="/products"
            className="hidden sm:inline-block text-xs bg-white/10 hover:bg-[#FF5B00] hover:text-white px-2.5 py-1 rounded-full text-zinc-200 transition-colors"
          >
            مشاهده جشنواره
          </Link>
        </div>
      </div>
    </div>
  );
}
