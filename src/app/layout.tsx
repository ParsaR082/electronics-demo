import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingDock from "@/components/layout/FloatingDock";
import CartDrawer from "@/components/cart/CartDrawer";
import QuickViewModal from "@/components/products/QuickViewModal";
import SearchModal from "@/components/search/SearchModal";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "آئورئون | تجربه برتر لوازم الکترونیک و صوتی تصویری لوکس | AUREON",
  description:
    "آئورئون | تجربه‌ای متفاوت از تکنولوژی. خرید آنلاین مدرن‌ترین تلویزیون‌های اولد، ساندبارها، هدفون‌های پریمیوم و تجهیزات گیمینگ و سینمای خانگی.",
  keywords: [
    "تلویزیون سونی",
    "ساندبار",
    "اسپیکر JBL",
    "هدفون اپل",
    "سینمای خانگی",
    "پلی استیشن 5",
    "لوازم الکترونیک لوکس",
    "AUREON",
  ],
  authors: [{ name: "AUREON" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className={`${vazirmatn.className} min-h-screen flex flex-col bg-[#FAF9F6] text-[#121216] selection:bg-[#FF5B00] selection:text-white`}>
        <AnnouncementBar />
        <Header />
        <main className="flex-1 pb-24 md:pb-28">{children}</main>
        <Footer />
        <FloatingDock />
        <CartDrawer />
        <QuickViewModal />
        <SearchModal />
      </body>
    </html>
  );
}
