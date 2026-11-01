"use client";

import Link from "next/link";
import { Sparkles, ArrowLeft } from "lucide-react";

const BRANDS = [
  {
    name: "Sony",
    persianName: "سونی",
    specialty: "تلویزیون‌های اولد، ساندبار و کنسول پلی‌استیشن",
    query: "Sony",
    logoLetter: "SONY",
  },
  {
    name: "Samsung",
    persianName: "سامسونگ",
    specialty: "نمایشگرهای کوانتومی Neo QLED و تلویزیون‌های دکوراتیو",
    query: "Samsung",
    logoLetter: "SAMSUNG",
  },
  {
    name: "LG",
    persianName: "ال‌جی",
    specialty: "پیشگام پنل‌های OLED evo و پروژکتورهای لیزری 4K",
    query: "LG",
    logoLetter: "LG",
  },
  {
    name: "JBL",
    persianName: "جی‌بی‌ال",
    specialty: "اسپیکرهای غول‌پیکر مهمانی، ساندبارهای ۱۱۰۰ وات",
    query: "JBL",
    logoLetter: "JBL",
  },
  {
    name: "Bose",
    persianName: "بوز",
    specialty: "نهایت تفکیک صدای استودیویی و هدفون‌های نویزگیر",
    query: "Bose",
    logoLetter: "BOSE",
  },
  {
    name: "Apple",
    persianName: "اپل",
    specialty: "صدای محاسباتی سه‌بعدی، ایرپادز مکس و اپل تی‌وی",
    query: "Apple",
    logoLetter: "APPLE",
  },
  {
    name: "Marshall",
    persianName: "مارشال",
    specialty: "طراحی اصیل وینتیج با آکوستیک پرقدرت راک اند رول",
    query: "Marshall",
    logoLetter: "MARSHALL",
  },
  {
    name: "Sonos",
    persianName: "سونوس",
    specialty: "اکوسیستم یکپارچه سینمای خانگی چنداتاقه بی‌سیم",
    query: "Sonos",
    logoLetter: "SONOS",
  },
];

export default function BrandShowcase() {
  return (
    <section className="py-20 sm:py-28 bg-[#F4F2EC] relative border-y border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5B00] mb-2">
            <Sparkles className="w-4 h-4" />
            <span>نمایندگی رسمی و اصالت ۱۰۰٪</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight mb-3">
            معتبرترین غول‌های الکترونیک جهان
          </h2>
          <p className="text-sm text-zinc-500 leading-relaxed font-normal">
            همکاری مستقیم با تأمین‌کنندگان رسمی برای تضمین پلمب کارخانه، اصالت قطعات و گارانتی طلایی معتبر.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={`/products?brand=${brand.query}`}
              className="group p-6 rounded-3xl bg-white border border-zinc-200/80 hover:border-[#FF5B00]/40 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="h-12 flex items-center justify-between mb-4 border-b border-zinc-100 pb-2">
                  <span className="font-black text-xl sm:text-2xl text-zinc-900 tracking-wider group-hover:text-[#FF5B00] transition-colors">
                    {brand.logoLetter}
                  </span>
                  <span className="text-xs font-bold text-zinc-400 group-hover:text-zinc-600 transition-colors">
                    {brand.persianName}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                  {brand.specialty}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-[11px] font-bold text-zinc-400 group-hover:text-[#FF5B00] transition-colors mt-2">
                <span>مشاهده محصولات {brand.persianName}</span>
                <ArrowLeft className="w-3.5 h-3.5 group-hover:translate-x-[-3px] transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
