"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Cpu, Eye, Volume2, Gamepad2, Shield } from "lucide-react";
import { formatPrice } from "@/lib/persian";

const HOTSPOTS = [
  {
    id: "panel",
    icon: Eye,
    title: "پنل QD-OLED نسل جدید",
    tagline: "روشنایی ۲۰۰٪ بالاتر و رنگ‌های بی‌نهایت خالص",
    desc: "تلفیق نوآورانه دیودهای ارگانیک اولد با لایه‌ای از نقاط کوانتومی، کنتراست بی‌نهایت را با رنگ‌هایی فوق‌العاده زنده و غنی در هر سطحی از روشنایی بازآفرینی می‌کند.",
    stats: "بیش از ۸.۳ میلیون پیکسل خودنورده مستقل",
  },
  {
    id: "processor",
    icon: Cpu,
    title: "پردازشگر شناختی XR",
    tagline: "تنها پردازنده‌ای که مانند مغز انسان تصویر را درک می‌کند",
    desc: "این پردازنده نقطه کانونی نگاه انسان در هر صحنه را ردیابی کرده و بافت چهره، عمق منظره و جزئیات پیش‌زمینه را به گونه‌ای ارتقا می‌دهد که گویی در دنیای واقعی حضور دارید.",
    stats: "آنالیز صدها هزار مولفه در یک میلی‌ثانیه",
  },
  {
    id: "sound",
    icon: Volume2,
    title: "صدای ارتعاشی آکوستیک سرفیس",
    tagline: "صدایی که دقیقاً از همان نقطه‌ای که بازیگر سخن می‌گوید پرتاب می‌شود",
    desc: "با استفاده از فعال‌کننده‌های نامرئی در پشت پنل، کل صفحه نمایش به بلندگو تبدیل می‌شود. دیالوگ‌ها دقیقاً از دهان بازیگر و صدای پرواز جنگنده از همان جای تصویر شنیده می‌شود.",
    stats: "توان صوتی ۶۰ وات ۳.۲ کاناله Dolby Atmos",
  },
  {
    id: "gaming",
    icon: Gamepad2,
    title: "بهینه‌سازی انحصاری پلی‌استیشن ۵",
    tagline: "کاهش تاخیر ورودی به کمتر از ۵ میلی‌ثانیه",
    desc: "به محض اتصال کنسول، تلویزیون به صورت خودکار حالت بازی Auto Genre Picture Mode را فعال کرده و تطبیق رنگ HDR را با دقت فوق میکروسکوپی انجام می‌دهد.",
    stats: "4K ۱۲۰ فریم بر ثانیه با HDMI 2.1 VRR/ALLM",
  },
];

export default function ProductStorytelling() {
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0]);

  return (
    <section className="py-24 sm:py-32 bg-[#09090c] text-white relative overflow-hidden">
      {/* Background Cinematic Glow Elements */}
      <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-[#FF5B00]/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/15 text-xs font-bold">
            <Sparkles className="w-4 h-4 text-[#FF5B00]" />
            <span>داستان پرچمدار | Sony BRAVIA XR A95L</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            مرز میان واقعیت و تصویر{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-l from-[#FF5B00] to-amber-400">
              از میان برداشته شد
            </span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            با تلویزیون مستر سریز سونی، سینمای شخصی خود را در والاترین مرتبه استاندارد مهندسی صدا و نور بسازید.
          </p>
        </div>

        {/* Large Cinematic Product Display */}
        <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl mb-12 group">
          <Image
            src="/images/products/sony-bravia-xr-a95l-65.webp"
            alt="Sony Bravia XR Master Series"
            fill
            sizes="100vw"
            className="object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#09090c] via-transparent to-black/40" />

          {/* Interactive Floating Pulse Dots */}
          <div className="absolute inset-0 hidden md:block">
            {HOTSPOTS.map((h, i) => {
              const positions = [
                { top: "35%", right: "25%" },
                { top: "45%", right: "65%" },
                { top: "70%", right: "35%" },
                { top: "60%", right: "80%" },
              ];
              const pos = positions[i];
              const isSelected = activeHotspot.id === h.id;

              return (
                <button
                  key={h.id}
                  onClick={() => setActiveHotspot(h)}
                  style={{ top: pos.top, right: pos.right }}
                  aria-label={h.title}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-transform z-20 ${
                    isSelected ? "scale-125" : "hover:scale-110"
                  }`}
                >
                  <span className="relative flex h-6 w-6">
                    <span
                      className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                        isSelected ? "bg-[#FF5B00]" : "bg-white"
                      }`}
                    />
                    <span
                      className={`relative inline-flex rounded-full h-6 w-6 items-center justify-center text-[10px] font-bold text-white shadow-lg ${
                        isSelected ? "bg-[#FF5B00]" : "bg-black/80 border border-white/40"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Banner inside Image */}
          <div className="absolute bottom-6 right-6 left-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 z-20">
            <div>
              <span className="text-xs text-[#FF5B00] font-black tracking-wider block">
                FLAGSHIP SHOWROOM DEMO
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-white">
                Sony 65&quot; BRAVIA XR A95L Master Series
              </h3>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-base sm:text-xl font-black text-amber-400">
                {formatPrice(184500000)}
              </span>
              <Link
                href="/products/sony-bravia-xr-a95l-65"
                className="px-5 py-2.5 rounded-xl bg-[#FF5B00] hover:bg-[#e04f00] text-white text-xs font-bold transition-colors shadow-lg"
              >
                خرید پرچمدار
              </Link>
            </div>
          </div>
        </div>

        {/* Hotspots Specification Controller */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/[0.03] rounded-3xl p-6 sm:p-8 border border-white/10">
          {/* Tabs Selector (5 cols) */}
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-3">
              انتخاب فناوری جهت مشاهده جزئیات:
            </span>

            {HOTSPOTS.map((spot) => {
              const Icon = spot.icon;
              const isSelected = activeHotspot.id === spot.id;

              return (
                <button
                  key={spot.id}
                  onClick={() => setActiveHotspot(spot)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-right transition-all duration-300 border ${
                    isSelected
                      ? "bg-white/10 border-[#FF5B00] text-white shadow-lg"
                      : "bg-transparent border-white/5 text-zinc-400 hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-[#FF5B00] text-white"
                        : "bg-white/5 text-zinc-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold block">{spot.title}</h4>
                    <span className="text-xs text-zinc-500 line-clamp-1">
                      {spot.tagline}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Hotspot Showcase (7 cols) */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-[#FF5B00]">
                  <Shield className="w-4 h-4" />
                  <span>{activeHotspot.stats}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {activeHotspot.title}
                </h3>

                <h4 className="text-sm sm:text-base font-bold text-amber-400/90 leading-normal">
                  «{activeHotspot.tagline}»
                </h4>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-2">
                  {activeHotspot.desc}
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <Link
                    href="/products/sony-bravia-xr-a95l-65"
                    className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/10 hover:bg-[#FF5B00] px-4 py-2.5 rounded-xl transition-colors"
                  >
                    <span>بررسی مشخصات فنی کامل تلویزیون سونی</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
