"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Volume2, Play, CheckCircle, ChevronDown } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

export default function HeroSection() {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const toggleSoundDemo = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between pt-6 sm:pt-12 pb-8 overflow-hidden bg-radial from-amber-500/5 via-transparent to-transparent">
      {/* Background Subtle Luxury Lighting */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-[#FF5B00]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Right Column: Editorial Persian Headline & Content (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 space-y-6 text-right"
          >
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-zinc-200/80 shadow-xs text-xs font-semibold text-zinc-800">
              <span className="w-2 h-2 rounded-full bg-[#FF5B00] animate-ping" />
              <span>معرفی نسل جدید پرچمداران صوتی و تصویری ۲۰۲۶</span>
              <Sparkles className="w-3.5 h-3.5 text-[#FF5B00]" />
            </div>

            {/* Editorial Persian Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tight leading-[1.2]">
              خانه‌ات را به دنیای{" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-l from-[#FF5B00] via-amber-500 to-rose-600">
                صدا و تصویر
              </span>{" "}
              تبدیل کن
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-xl font-normal">
              تجربه‌ای فراتر از تماشا؛ تلفیق نمایشگرهای خیره‌کننده QD-OLED، سیستم‌های صوتی فراگیر فضایی و کنسول‌های نسل نهم در قالبی متمایز و مجلل.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="group flex items-center gap-3 px-7 py-4 rounded-2xl bg-[#0e0e12] hover:bg-[#FF5B00] text-white text-sm font-bold shadow-xl shadow-black/10 hover:shadow-[#FF5B00]/25 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>مشاهده محصولات</span>
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-[-4px] transition-transform" />
              </Link>

              <button
                onClick={toggleSoundDemo}
                className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-200 text-sm font-bold shadow-xs transition-colors"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isPlayingAudio ? "bg-[#FF5B00] text-white animate-pulse" : "bg-zinc-100 text-[#FF5B00]"}`}>
                  {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <Play className="w-3 h-3 ml-0.5 fill-current" />}
                </div>
                <span>{isPlayingAudio ? "پخش آکوستیک فعال شد" : "دموی صدای فضایی"}</span>
              </button>
            </div>

            {/* Key Advantages Tags */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-zinc-200/70 max-w-lg">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
                <CheckCircle className="w-4 h-4 text-[#FF5B00] shrink-0" />
                <span>۲۴ ماه گارانتی زرین</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
                <CheckCircle className="w-4 h-4 text-[#FF5B00] shrink-0" />
                <span>ارسال رایگان بیمه‌شده</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700">
                <CheckCircle className="w-4 h-4 text-[#FF5B00] shrink-0" />
                <span>کالیبراسیون رایگان</span>
              </div>
            </div>
          </motion.div>

          {/* Left Column: Visual Composition with 3D Tilt and Real Electronics (6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <TiltCard maxRotation={6} className="w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 bg-[#0e0e12] aspect-[16/11] group">
                {/* Hero Showcase Image */}
                <Image
                  src="/images/products/sony-bravia-xr-a95l-65.webp"
                  alt="Sony Bravia QD-OLED Flagship"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Gradient Overlays for High-End Contrast */}
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-r from-black/40 via-transparent to-transparent" />

                {/* Floating Specs Badges on Visual */}
                <div className="absolute top-5 right-5 z-20">
                  <div className="glass-panel-dark px-3.5 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-2 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>QD-OLED 4K ۱۲۰Hz</span>
                  </div>
                </div>

                <div className="absolute bottom-5 right-5 left-5 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-white">
                  <div>
                    <span className="text-[11px] text-[#FF5B00] font-black uppercase tracking-wider block mb-1">
                      سونی سری پرچمدار BRAVIA XR
                    </span>
                    <h3 className="text-lg sm:text-xl font-black leading-tight text-white">
                      شوروم اختصاصی نسل نهم صوت و تصویر
                    </h3>
                  </div>

                  <Link
                    href="/products/sony-bravia-xr-a95l-65"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/20 hover:bg-[#FF5B00] text-white backdrop-blur-md text-xs font-bold transition-colors"
                  >
                    <span>مشاهده جزئیات</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </TiltCard>

            {/* Overlapping Floating Soundbar Card */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 glass-panel p-3.5 sm:p-4 rounded-3xl shadow-xl border border-white/80 max-w-[240px] sm:max-w-[270px] hidden sm:flex items-center gap-3.5 z-30"
            >
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-zinc-900 shrink-0">
                <Image
                  src="/images/categories/speakers-audio.webp"
                  alt="Sony Soundbar"
                  fill
                  sizes="60px"
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] text-[#FF5B00] font-extrabold block">
                  دالبی اتموس ۷.۱.۲
                </span>
                <h4 className="text-xs font-bold text-zinc-900 line-clamp-1">
                  ساندبار سونی HT-A7000
                </h4>
                <span className="text-[11px] text-zinc-500 font-medium block">
                  توان ۵۰۰ وات آکوستیک
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-4 w-full flex justify-center pt-8">
        <Link
          href="#categories"
          className="flex flex-col items-center gap-1 text-zinc-400 hover:text-zinc-800 transition-colors"
        >
          <span className="text-[11px] font-medium">کشف دسته‌بندی‌ها</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </Link>
      </div>
    </section>
  );
}
