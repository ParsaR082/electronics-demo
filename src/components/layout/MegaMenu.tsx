"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/categories";
import { Tv, Speaker, Headphones, Film, Gamepad2, Home, ArrowLeft } from "lucide-react";
import { formatPrice } from "@/lib/persian";

const ICONS = {
  "tv-displays": Tv,
  "speakers-audio": Speaker,
  headphones: Headphones,
  "home-theater": Film,
  "gaming-consoles": Gamepad2,
  "smart-home": Home,
};

interface MegaMenuProps {
  onClose: () => void;
}

export default function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="absolute top-full right-0 left-0 bg-white/95 backdrop-blur-2xl border-b border-black/10 shadow-2xl py-8 px-6 z-50"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
        {/* Categories Grid (8 cols) */}
        <div className="col-span-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-zinc-100">
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5B00]" />
              دسته‌بندی تجهیزات صوتی و تصویری
            </h3>
            <Link
              href="/products"
              onClick={onClose}
              className="text-xs text-[#FF5B00] hover:underline flex items-center gap-1 font-medium"
            >
              مشاهده کاتالوگ جامع
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => {
              const IconComp = ICONS[cat.id] || Tv;
              return (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.id}`}
                  onClick={onClose}
                  className="group flex items-center gap-4 p-3 rounded-2xl border border-zinc-100 hover:border-[#FF5B00]/30 hover:bg-zinc-50/80 transition-all duration-300"
                >
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="64px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <IconComp className="w-4 h-4 text-[#FF5B00]" />
                      <h4 className="text-sm font-bold text-zinc-900 group-hover:text-[#FF5B00] transition-colors truncate">
                        {cat.name}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-1">
                      {cat.description}
                    </p>
                    <span className="inline-block text-[11px] text-[#FF5B00] font-medium mt-1">
                      {cat.highlight}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Flagship Product Preview (4 cols) */}
        <div className="col-span-4 bg-[#0e0e12] rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF5B00]/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF5B00] text-white text-[11px] font-bold px-3 py-1 rounded-full mb-3">
              پیشنهاد ویژه کارشناسان
            </div>
            <h4 className="text-lg font-extrabold text-white mb-1">
              تلویزیون اولد سونی BRAVIA XR A95L
            </h4>
            <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
              روشنایی ۲۰۰ درصدی با فناوری QD-OLED، کیفیت 4K ۱۲۰Hz و ساندبار داخلی آکوستیک سرفیس.
            </p>
          </div>

          <div className="relative w-full h-40 rounded-2xl overflow-hidden my-2 bg-zinc-900 border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80"
              alt="Sony Bravia A95L"
              fill
              sizes="300px"
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div>
              <span className="text-[11px] text-zinc-400 block">قیمت ویژه:</span>
              <span className="text-sm font-bold text-[#FF5B00]">
                {formatPrice(184500000)}
              </span>
            </div>
            <Link
              href="/products/sony-bravia-xr-a95l-65"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white text-zinc-900 hover:bg-[#FF5B00] hover:text-white px-3.5 py-2 rounded-xl transition-colors"
            >
              بررسی و خرید
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
