"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, Tag, Copy, Check } from "lucide-react";
import { toPersianDigits } from "@/lib/persian";

export default function PromotionalBanner() {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("AUREON");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-16 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-[#0c0c10] border border-white/10 shadow-2xl p-8 sm:p-12 lg:p-16 text-white flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF5B00]/20 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Right Side: Text & Offer Details */}
          <div className="relative z-10 max-w-xl text-right space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5B00]/20 text-[#FF5B00] border border-[#FF5B00]/30 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>جشنواره فصلی صدای سینمایی آئورئون</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
              تا ۱۰ میلیون تومان تخفیف روی پکیج‌های سینمای خانگی و ساندبار
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
              با خرید هر تلویزیون ۶۵ اینچ به بالا، از تخفیف استثنایی خرید ساندبار دالبی اتموس و نصب و کالیبراسیون رایگان در محل بهره‌مند شوید.
            </p>

            {/* Promo Code Box */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/10 border border-white/20">
                <Tag className="w-4 h-4 text-[#FF5B00]" />
                <span className="text-xs text-zinc-400">کد تخفیف اختصاصی:</span>
                <span className="font-mono font-black text-base text-white tracking-widest">
                  AUREON
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-1 text-zinc-400 hover:text-white transition-colors"
                  aria-label="کپی کد تخفیف"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              <Link
                href="/products?discount=true"
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF5B00] hover:bg-[#e04f00] text-white text-xs font-bold transition-all shadow-lg shadow-[#FF5B00]/25"
              >
                <span>مشاهده تخفیف‌ها</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Left Side: Countdown Timer & Visual Showcase */}
          <div className="relative z-10 flex flex-col items-center gap-6 w-full lg:w-auto">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
              زمان باقی‌مانده تا پایان جشنواره:
            </span>

            {/* Countdown Grid */}
            <div className="grid grid-cols-4 gap-3 text-center">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-black text-white block">
                  {toPersianDigits(timeLeft.days)}
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">روز</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-black text-white block">
                  {toPersianDigits(timeLeft.hours)}
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">ساعت</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-black text-white block">
                  {toPersianDigits(timeLeft.minutes)}
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">دقیقه</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 sm:p-4 min-w-[70px]">
                <span className="text-2xl sm:text-3xl font-black text-[#FF5B00] block">
                  {toPersianDigits(timeLeft.seconds)}
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">ثانیه</span>
              </div>
            </div>

            {/* Product Visual */}
            <div className="relative w-72 h-44 rounded-2xl overflow-hidden border border-white/10 shadow-lg hidden sm:block">
              <Image
                src="/images/promo/promo-soundbar.webp"
                alt="Sony Home Cinema Promo"
                fill
                sizes="300px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <span className="absolute bottom-3 right-3 text-xs font-bold text-white">
                پکیج ساندبار دالبی اتموس ۷.۱.۲
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
