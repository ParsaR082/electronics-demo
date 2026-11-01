"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, Tv, Speaker, Headphones, Film, Gamepad2, Home } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import TiltCard from "@/components/ui/TiltCard";
import { toPersianDigits } from "@/lib/persian";

const ICONS = {
  "tv-displays": Tv,
  "speakers-audio": Speaker,
  headphones: Headphones,
  "home-theater": Film,
  "gaming-consoles": Gamepad2,
  "smart-home": Home,
};

export default function CategoryShowcase() {
  return (
    <section id="categories" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5B00] mb-2">
              <Sparkles className="w-4 h-4" />
              <span>دسته‌بندی‌های تخصصی</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              جهان تکنولوژی در یک نگاه
            </h2>
          </div>

          <p className="text-sm text-zinc-500 max-w-md leading-relaxed">
            مجموعه‌ای مهندسی‌شده از معتبرترین برندهای جهان برای خلق نهایت هیجان و کیفیت در خانه شما.
          </p>
        </div>

        {/* Asymmetrical Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const Icon = ICONS[cat.id] || Tv;
            const isLarge = idx === 0 || idx === 3;

            return (
              <TiltCard
                key={cat.id}
                maxRotation={5}
                className={isLarge ? "sm:col-span-2 lg:col-span-2" : "col-span-1"}
              >
                <Link
                  href={`/products?category=${cat.id}`}
                  className="group relative block w-full h-70 sm:h-80 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-black/5 bg-[#0e0e12]"
                >
                  {/* Category Image */}
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes={isLarge ? "(max-width: 1024px) 100vw, 800px" : "(max-width: 640px) 100vw, 400px"}
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent" />

                  {/* Top Badge: Item Count & Icon */}
                  <div className="absolute top-5 right-5 left-5 flex items-center justify-between z-10">
                    <span className="glass-panel-dark px-3 py-1.5 rounded-full text-[11px] font-bold text-zinc-200 border border-white/10 flex items-center gap-1.5">
                      <Icon className="w-3.5 h-3.5 text-accent" />
                      <span>{toPersianDigits(cat.itemCount)} محصول منتخب</span>
                    </span>

                    <span className="w-9 h-9 rounded-full glass-panel-dark flex items-center justify-center text-white group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-5 right-5 left-5 z-10 text-white">
                    <span className="text-[11px] text-accent font-black tracking-wide block mb-1">
                      {cat.highlight}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#FF5B00] transition-colors mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 line-clamp-1 max-w-lg leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
