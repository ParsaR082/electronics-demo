"use client";

import Link from "next/link";
import {
  ShieldCheck,
  RotateCcw,
  Truck,
  Headphones,
  Phone,
  Mail,
  MapPin,
  Clock,
  Instagram,
  Send,
  Youtube,
  ArrowUp,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";

const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    title: "ضمانت اصالت ۱۰۰٪",
    desc: "تمام محصولات با پلمب اصلی و گارانتی رسمی ۲۴ ماهه",
  },
  {
    icon: RotateCcw,
    title: "۷ روز مهلت تست و بازگشت",
    desc: "امکان تعویض یا عودت وجه بدون هیچ‌گونه قید و شرط",
  },
  {
    icon: Truck,
    title: "ارسال رایگان و اکسپرس",
    desc: "ارسال فوق سریع در بسته‌بندی ضد ضربه ویژه لوازم حساس",
  },
  {
    icon: Headphones,
    title: "مشاوره و کالیبراسیون تخصصی",
    desc: "چیدمان و تنظیم آکوستیک صوتی در منزل توسط متخصصان",
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0b0b0e] text-zinc-300 pt-16 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF5B00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Trust Badges Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-14 border-b border-white/10">
          {TRUST_BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#FF5B00]/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FF5B00]/15 flex items-center justify-center text-[#FF5B00] shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{badge.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{badge.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-14 border-b border-white/10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FF5B00] flex items-center justify-center text-white font-black text-xl tracking-wider shadow-lg shadow-[#FF5B00]/30">
                A
              </div>
              <div>
                <span className="font-black text-2xl tracking-wider text-white block">
                  AUREON
                </span>
                <span className="text-[11px] text-zinc-400 tracking-wide font-medium">
                  آئورئون | خانه الکترونیک و سرگرمی لوکس
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-2">
              آئورئون پیشگام در خلق تجربه صوتی و تصویری بی‌بدیل است. ما مجموعه‌ای منتخب از برترین تلویزیون‌های اولد، ساندبارهای دالبی اتموس، هدفون‌های استودیویی و تجهیزات گیمینگ روز جهان را با اصالت بی‌چون‌وچرا تقدیم شما می‌کنیم.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="اینستاگرام آئورئون"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#FF5B00] hover:text-white flex items-center justify-center text-zinc-300 transition-colors border border-white/10"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                aria-label="کانال تلگرام"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#FF5B00] hover:text-white flex items-center justify-center text-zinc-300 transition-colors border border-white/10"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="یوتیوب"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#FF5B00] hover:text-white flex items-center justify-center text-zinc-300 transition-colors border border-white/10"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B00]" />
              دسته‌بندی‌های اصلی
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.id}`}
                    className="hover:text-[#FF5B00] hover:translate-x-[-4px] inline-block transition-all"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service & Guides (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B00]" />
              خدمات مشتریان
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-zinc-400">
              <li>
                <Link href="/products" className="hover:text-[#FF5B00] transition-colors">
                  کاتالوگ محصولات
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-[#FF5B00] transition-colors">
                  سبد خرید شما
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#FF5B00] transition-colors">
                  علاقه‌مندی‌ها
                </Link>
              </li>
              <li>
                <span className="hover:text-[#FF5B00] cursor-pointer transition-colors">
                  رویه ارسال و بسته‌بندی
                </span>
              </li>
              <li>
                <span className="hover:text-[#FF5B00] cursor-pointer transition-colors">
                  شرایط گارانتی طلایی
                </span>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B00]" />
              تماس با شوروم مرکزی
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-zinc-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF5B00] shrink-0 mt-0.5" />
                <span>تهران، خیابان ولیعصر، تقاطع میرداماد، برج آئورئون، طبقه ۴</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#FF5B00] shrink-0" />
                <a href="tel:02191008899" className="hover:text-white" dir="ltr">
                  ۰۲۱ - ۹۱۰۰ ۸۸۹۹
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#FF5B00] shrink-0" />
                <span>support@aureon-store.ir</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#FF5B00] shrink-0" />
                <span>همه‌روزه از ۱۰:۰۰ الی ۲۲:۰۰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} آئورئون (AUREON). تمام حقوق مادی و معنوی این پلتفرم محفوظ است.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-[#FF5B00] transition-colors"
          >
            <span>بازگشت به ابتدای صفحه</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
