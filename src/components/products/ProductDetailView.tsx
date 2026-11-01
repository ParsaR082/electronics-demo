"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star,
  ShoppingBag,
  Check,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { Product } from "@/types/product";
import { PRODUCTS } from "@/data/products";
import { formatPrice, toPersianDigits } from "@/lib/persian";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/products/ProductCard";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "features" | "specs" | "reviews">("specs");

  const addItem = useCartStore((state) => state.addItem);
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);

  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const currentVariant = product.variants?.[selectedVariantIndex];
  const variantModifier = currentVariant?.priceModifier || 0;
  const currentPrice = product.price + variantModifier;

  const handleAddToCart = () => {
    addItem(product, quantity, currentVariant);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-zinc-950 transition-colors">
          خانه
        </Link>
        <ChevronLeft className="w-3.5 h-3.5 text-zinc-400" />
        <Link href="/products" className="hover:text-zinc-950 transition-colors">
          محصولات
        </Link>
        <ChevronLeft className="w-3.5 h-3.5 text-zinc-400" />
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-zinc-950 transition-colors"
        >
          {product.categoryName}
        </Link>
        <ChevronLeft className="w-3.5 h-3.5 text-zinc-400" />
        <span className="text-zinc-900 font-semibold truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
        {/* Left Column: Image Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Photo Container */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-zinc-200/80 shadow-md group">
            <Image
              src={gallery[activeImageIndex] || product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              {product.discount && (
                <span className="bg-[#FF5B00] text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                  {toPersianDigits(product.discount)}٪ تخفیف طلایی
                </span>
              )}
              {product.badge && (
                <span className="bg-zinc-900/85 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="افزودن به علاقه‌مندی"
              className={`absolute top-4 left-4 p-3 rounded-full backdrop-blur-md transition-all shadow-md ${
                isInWishlist
                  ? "bg-rose-500 text-white"
                  : "bg-white/90 hover:bg-white text-zinc-700 hover:text-rose-500"
              }`}
            >
              <Heart className={`w-5 h-5 ${isInWishlist ? "fill-white" : ""}`} />
            </button>
          </div>

          {/* Thumbnails Row */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx
                      ? "border-[#FF5B00] shadow-md scale-102"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - نمای ${idx + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information, Variant, Pricing, Cart Actions (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            {/* Brand & Stock */}
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#FF5B00] font-black tracking-wider text-sm">
                برند: {product.brand}
              </span>
              <span className="flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                موجود در انبار AUREON
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 leading-tight mb-2">
              {product.name}
            </h1>
            <span className="text-xs text-zinc-400 block font-sans tracking-wide mb-3" dir="ltr">
              {product.englishName}
            </span>

            {/* Rating */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2.5 py-1 rounded-full">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{toPersianDigits(product.rating)}</span>
              </div>
              <span className="text-zinc-400">
                بر اساس {toPersianDigits(product.reviewCount)} دیدگاه خریداران تایید شده
              </span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 flex items-baseline justify-between">
            <div>
              <span className="text-xs text-zinc-400 block mb-1">قیمت نهایی با احتساب مالیات:</span>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-zinc-950">
                  {formatPrice(currentPrice)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {product.discount && (
              <span className="text-xs font-bold text-emerald-600 bg-emerald-100/80 px-2.5 py-1 rounded-lg">
                سود خرید: {formatPrice((product.originalPrice || 0) - product.price)}
              </span>
            )}
          </div>

          {/* Variant Picker */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-zinc-800 block">
                انتخاب نسخه یا رنگ کالا:
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v, idx) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariantIndex(idx)}
                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                      selectedVariantIndex === idx
                        ? "border-[#FF5B00] bg-[#FF5B00]/10 text-[#FF5B00] shadow-xs"
                        : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
                    }`}
                  >
                    {v.colorHex && (
                      <span
                        className="w-4 h-4 rounded-full border border-black/15 shadow-2xs"
                        style={{ backgroundColor: v.colorHex }}
                      />
                    )}
                    <span>{v.name}</span>
                    {v.priceModifier && v.priceModifier !== 0 && (
                      <span className="text-[10px] text-zinc-500 font-normal">
                        ({v.priceModifier > 0 ? "+" : ""}{formatPrice(v.priceModifier)})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            {/* Quantity Stepper */}
            <div className="flex items-center justify-between border border-zinc-200 rounded-2xl p-1 bg-zinc-50 w-full sm:w-auto">
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold text-base shadow-2xs transition-colors"
                aria-label="افزایش تعداد"
              >
                +
              </button>
              <span className="w-12 text-center text-sm font-extrabold text-zinc-900">
                {toPersianDigits(quantity)}
              </span>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold text-base shadow-2xs transition-colors"
                aria-label="کاهش تعداد"
              >
                -
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`flex-1 w-full py-4 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl ${
                isAdded
                  ? "bg-emerald-600 text-white shadow-emerald-600/25"
                  : "bg-[#0e0e12] hover:bg-[#FF5B00] text-white shadow-black/15 hover:shadow-[#FF5B00]/30"
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>به سبد خرید اضافه شد</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>افزودن به سبد خرید</span>
                </>
              )}
            </button>
          </div>

          {/* Trust Value Props */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-200">
            <div className="flex items-center gap-2.5 text-xs text-zinc-700">
              <ShieldCheck className="w-4 h-4 text-[#FF5B00] shrink-0" />
              <span>۲۴ ماه گارانتی طلایی معتبر</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-700">
              <Truck className="w-4 h-4 text-[#FF5B00] shrink-0" />
              <span>ارسال رایگان و بیمه کامل حمل</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-700">
              <RotateCcw className="w-4 h-4 text-[#FF5B00] shrink-0" />
              <span>۷ روز مهلت تست و بازگشت</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-zinc-700">
              <Headphones className="w-4 h-4 text-[#FF5B00] shrink-0" />
              <span>نصب و کالیبراسیون تخصصی</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Specs, Features, Editorial Description */}
      <div className="bg-white rounded-3xl border border-zinc-200/80 p-6 sm:p-10 shadow-xs mb-16">
        {/* Tab Switcher */}
        <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-8 overflow-x-auto">
          {[
            { id: "specs", label: "جدول مشخصات فنی کامل" },
            { id: "features", label: "ویژگی‌های برجسته" },
            { id: "desc", label: "بررسی تخصصی AUREON" },
            { id: "reviews", label: `نظرات خریداران (${toPersianDigits(product.reviewCount)})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "desc" | "features" | "specs" | "reviews")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#0e0e12] text-white shadow-xs"
                  : "bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Technical Specifications Table */}
        {activeTab === "specs" && (
          <div className="space-y-6">
            <h3 className="text-base font-extrabold text-zinc-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5B00]" />
              مشخصات و استانداردهای فنی کالا
            </h3>

            {product.specifications?.map((group, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  {group.group}
                </h4>
                <div className="border border-zinc-100 rounded-2xl overflow-hidden divide-y divide-zinc-100">
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="grid grid-cols-1 sm:grid-cols-3 p-3.5 text-xs hover:bg-zinc-50/60 transition-colors"
                    >
                      <span className="font-semibold text-zinc-500">{item.label}</span>
                      <span className="sm:col-span-2 font-bold text-zinc-900 mt-1 sm:mt-0">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Key Features */}
        {activeTab === "features" && (
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-zinc-900 mb-4">
              نکات برجسته و مزایای رقابتی
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features?.map((feat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 text-xs font-medium text-zinc-800 leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#FF5B00] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Editorial Description */}
        {activeTab === "desc" && (
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-base font-extrabold text-zinc-900">
              نقد و بررسی کارشناسان صوتی و تصویری آئورئون
            </h3>
            <p className="text-sm text-zinc-600 leading-loose">
              {product.description}
            </p>
          </div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === "reviews" && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-100">
              <h3 className="text-base font-extrabold text-zinc-900">
                دیدگاه خریداران واقعی
              </h3>
              <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full">
                ۱۰۰٪ رضایت از کیفیت صدا و تصویر
              </span>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-bold flex items-center justify-center">
                      م
                    </span>
                    <span className="text-xs font-bold text-zinc-900">مهرداد کاظمی</span>
                    <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded-md">
                      خریدار تایید شده
                    </span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  روشنایی و کنتراست تصویر به قدری خیره‌کننده است که تماشای فیلم‌ها تجربه کاملاً جدیدی برای کل خانواده شد. ارسال با بسته‌بندی عالی و کالیبراسیون کارشناسان در منزل عالی بود.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#FF5B00] text-white text-xs font-bold flex items-center justify-center">
                      س
                    </span>
                    <span className="text-xs font-bold text-zinc-900">سهراب امینی</span>
                    <span className="text-[11px] text-emerald-600 font-semibold bg-emerald-100/60 px-2 py-0.5 rounded-md">
                      خریدار تایید شده
                    </span>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  تفکیک فرکانسی و کیفیت بیس فراتر از انتظار من بود. ارزش تک‌تک ریال‌های پرداخت شده رو داره.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Showcase */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-zinc-950">
              محصولات مرتبط و مشابه در آئورئون
            </h3>
            <Link
              href={`/products?category=${product.category}`}
              className="text-xs font-bold text-[#FF5B00] hover:underline"
            >
              مشاهده دسته کامل
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
