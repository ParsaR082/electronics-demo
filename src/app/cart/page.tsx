"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import {
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Check,
  Sparkles,
  CreditCard,
  Building,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, toPersianDigits } from "@/lib/persian";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotalPrice = useCartStore((state) => state.subtotalPrice());
  const totalDiscount = useCartStore((state) => state.totalDiscount());
  const shippingCost = useCartStore((state) => state.shippingCost());

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");

  // Demo Checkout Modal state
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderTrackingCode, setOrderTrackingCode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<"gateway" | "installments" | "cod">("gateway");

  const FREE_SHIPPING_THRESHOLD = 5000000;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalPrice);
  const progressPercent = Math.min(100, Math.round((subtotalPrice / FREE_SHIPPING_THRESHOLD) * 100));

  // Extra coupon discount calculation
  const couponDiscountAmount = appliedCoupon ? Math.round(subtotalPrice * 0.05) : 0; // 5% extra discount
  const finalPayable = Math.max(0, subtotalPrice + shippingCost - couponDiscountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "AUREON" || code === "AUREON10") {
      setAppliedCoupon(code);
      setCouponError("");
    } else {
      setCouponError("کد تخفیف وارد شده معتبر نمی‌باشد (کد تست: AUREON)");
    }
  };

  const handleStartCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmOrder = () => {
    const randomCode = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderTrackingCode(randomCode);
    setIsOrderPlaced(true);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if confetti not supported in environment
    }

    clearCart();
  };

  if (items.length === 0 && !isOrderPlaced) {
    return (
      <div className="py-20 sm:py-32 max-w-4xl mx-auto px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mx-auto mb-6">
          <ShoppingBag className="w-12 h-12 stroke-1 text-zinc-400" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 mb-2">
          سبد خرید شما در حال حاضر خالی است
        </h1>
        <p className="text-sm text-zinc-500 max-w-md mx-auto mb-8 leading-relaxed">
          می‌توانید جدیدترین تلویزیون‌های اولد، ساندبارهای دالبی اتموس و تجهیزات گیمینگ را در کاتالوگ آئورئون بررسی نمایید.
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0e0e12] hover:bg-[#FF5B00] text-white text-sm font-extrabold transition-all shadow-lg shadow-black/10"
        >
          <span>مشاهده و خرید محصولات</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Title */}
      <div className="mb-8 pb-6 border-b border-zinc-200">
        <h1 className="text-2xl sm:text-3xl font-black text-zinc-950 mb-1">
          سبد خرید و تسویه حساب
        </h1>
        <p className="text-xs text-zinc-400">
          بررسی نهایی اقلام منتخب و تکمیل سفارش با ارسال امن اکسپرس
        </p>
      </div>

      {/* Free Shipping Notice */}
      <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-2xs mb-8">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="flex items-center gap-2 font-bold text-zinc-800">
            <Truck className="w-4 h-4 text-[#FF5B00]" />
            {remainingForFreeShipping === 0 ? (
              <span className="text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                سفارش شما واجد شرایط ارسال رایگان اکسپرس است!
              </span>
            ) : (
              <span>
                تنها{" "}
                <strong className="text-[#FF5B00]">
                  {formatPrice(remainingForFreeShipping)}
                </strong>{" "}
                تا ارسال کاملاً رایگان در سراسر ایران
              </span>
            )}
          </span>
          <span className="text-zinc-500 font-bold">
            {toPersianDigits(progressPercent)}٪
          </span>
        </div>
        <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-linear-to-r from-[#FF5B00] to-amber-400 rounded-full transition-all duration-500"
          />
        </div>
      </div>

      {/* 2 Columns: Items List & Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => {
            const variantModifier = item.selectedVariant?.priceModifier || 0;
            const unitPrice = item.product.price + variantModifier;

            return (
              <div
                key={`${item.product.id}-${item.selectedVariant?.id || "def"}`}
                className="p-4 sm:p-5 rounded-3xl bg-white border border-zinc-200/80 shadow-2xs flex flex-col sm:flex-row items-center gap-5"
              >
                {/* Product Thumbnail */}
                <Link
                  href={`/products/${item.product.slug}`}
                  className="relative w-full sm:w-28 h-28 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 block"
                >
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0 w-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-bold text-[#FF5B00]">
                        {item.product.brand}
                      </span>
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.selectedVariant?.id)
                        }
                        className="text-zinc-400 hover:text-rose-500 p-1 transition-colors"
                        aria-label="حذف از سبد"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-sm font-bold text-zinc-900 hover:text-[#FF5B00] transition-colors line-clamp-1 block mb-1"
                    >
                      {item.product.name}
                    </Link>

                    {item.selectedVariant && (
                      <span className="inline-block text-[11px] text-zinc-500 bg-zinc-100 px-2.5 py-0.5 rounded-md mb-2">
                        مدل / رنگ: {item.selectedVariant.name}
                      </span>
                    )}
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-100 mt-2">
                    <div className="flex items-center border border-zinc-200 rounded-xl p-1 bg-zinc-50">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedVariant?.id
                          )
                        }
                        className="w-7 h-7 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold text-sm shadow-2xs"
                      >
                        +
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-zinc-900">
                        {toPersianDigits(item.quantity)}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedVariant?.id
                          )
                        }
                        className="w-7 h-7 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold text-sm shadow-2xs"
                      >
                        -
                      </button>
                    </div>

                    <div className="text-left">
                      <span className="text-sm sm:text-base font-black text-zinc-950 block">
                        {formatPrice(unitPrice * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-zinc-400 block">
                          هر عدد: {formatPrice(unitPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-6 sticky top-24">
          <div className="p-6 rounded-3xl bg-white border border-zinc-200/80 shadow-xs space-y-5">
            <h3 className="text-base font-black text-zinc-950 pb-3 border-b border-zinc-100">
              خلاصه صورت‌حساب
            </h3>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs sm:text-sm text-zinc-600">
              <div className="flex justify-between">
                <span>جمع کل اقلام ({toPersianDigits(items.length)} کالا):</span>
                <span className="font-bold text-zinc-900">
                  {formatPrice(subtotalPrice)}
                </span>
              </div>

              {totalDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>تخفیف جشنواره کالاها:</span>
                  <span>- {formatPrice(totalDiscount)}</span>
                </div>
              )}

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>کد تخفیف ({appliedCoupon}):</span>
                  <span>- {formatPrice(couponDiscountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>هزینه بسته‌بندی و ارسال:</span>
                <span className="font-bold text-zinc-900">
                  {shippingCost === 0 ? "رایگان" : formatPrice(shippingCost)}
                </span>
              </div>

              <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline text-zinc-950">
                <span className="font-bold text-sm">مبلغ نهایی قابل پرداخت:</span>
                <span className="text-xl font-black text-[#FF5B00]">
                  {formatPrice(finalPayable)}
                </span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="pt-3 border-t border-zinc-100">
              <label className="text-xs font-bold text-zinc-700 block mb-2">
                کد تخفیف دارید؟
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="کد تخفیف (مثال: AUREON)"
                  className="flex-1 px-3 py-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium focus:outline-hidden focus:border-[#FF5B00] uppercase font-mono"
                  dir="ltr"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-[#FF5B00] text-white text-xs font-bold transition-colors"
                >
                  اعمال
                </button>
              </div>
              {appliedCoupon && (
                <span className="text-xs text-emerald-600 font-semibold block mt-1.5 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  کد تخفیف {appliedCoupon} اعمال گردید (۵٪ کسر شد).
                </span>
              )}
              {couponError && (
                <span className="text-xs text-rose-500 font-medium block mt-1.5">
                  {couponError}
                </span>
              )}
            </form>

            {/* Checkout CTA Button */}
            <button
              onClick={handleStartCheckout}
              className="w-full py-4 rounded-2xl bg-[#0e0e12] hover:bg-[#FF5B00] text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl shadow-black/10"
            >
              <span>ادامه فرایند خرید و ثبت سفارش</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Safe Purchase Guarantee */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs text-zinc-500 space-y-2">
            <div className="flex items-center gap-2 text-zinc-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-[#FF5B00]" />
              <span>خرید امن و مطمئن در آئورئون</span>
            </div>
            <p className="leading-relaxed">
              تمامی کالاها پیش از ارسال توسط تکنسین فنی از نظر سلامت فیزیکی و تست روشن شدن بازبینی و بیمه کامل می‌شوند.
            </p>
          </div>
        </div>
      </div>

      {/* Demo Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => !isOrderPlaced && setIsCheckoutModalOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            {!isOrderPlaced ? (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5B00] mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>تکمیل سفارش دمو</span>
                  </div>
                  <h3 className="text-xl font-black text-zinc-950">
                    اطلاعات تحویل و روش پرداخت
                  </h3>
                  <p className="text-xs text-zinc-500">
                    (پروژه نمایشی فرانت‌اند — بدون اتصال به درگاه بانکی واقعی)
                  </p>
                </div>

                {/* Address Mock */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-zinc-800 block">
                    آدرس تحویل سفارش:
                  </label>
                  <input
                    type="text"
                    defaultValue="تهران، شهرک غرب، بلوار فرحزادی، پلاک ۱۸، زنگ ۴"
                    className="w-full p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-medium text-zinc-800"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      defaultValue="پارسا حبیبی"
                      placeholder="نام گیرنده"
                      className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs"
                    />
                    <input
                      type="text"
                      defaultValue="۰۹۱۲۳۴۵۶۷۸۹"
                      placeholder="شماره تماس"
                      className="p-2.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-zinc-800 block">
                    انتخاب روش پرداخت:
                  </label>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment("gateway")}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                      selectedPayment === "gateway"
                        ? "border-[#FF5B00] bg-[#FF5B00]/5 text-zinc-950"
                        : "border-zinc-200 hover:border-zinc-300 text-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#FF5B00]" />
                      <span>پرداخت اینترنتی با کلیه کارت‌های عضو شتاب</span>
                    </div>
                    <span className="w-4 h-4 rounded-full border-2 border-[#FF5B00] flex items-center justify-center">
                      {selectedPayment === "gateway" && (
                        <span className="w-2 h-2 rounded-full bg-[#FF5B00]" />
                      )}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment("installments")}
                    className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                      selectedPayment === "installments"
                        ? "border-[#FF5B00] bg-[#FF5B00]/5 text-zinc-950"
                        : "border-zinc-200 hover:border-zinc-300 text-zinc-700"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5 text-indigo-600" />
                      <span>خرید اقساطی اسنپ‌پی در ۴ قسط بدون کارمزد</span>
                    </div>
                    <span className="w-4 h-4 rounded-full border-2 border-zinc-300 flex items-center justify-center">
                      {selectedPayment === "installments" && (
                        <span className="w-2 h-2 rounded-full bg-[#FF5B00]" />
                      )}
                    </span>
                  </button>
                </div>

                {/* Final Total in Modal */}
                <div className="p-4 rounded-2xl bg-zinc-50 flex items-center justify-between text-xs">
                  <span className="font-bold text-zinc-600">مبلغ قابل تسویه:</span>
                  <span className="text-base font-black text-[#FF5B00]">
                    {formatPrice(finalPayable)}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleConfirmOrder}
                    className="flex-1 py-3.5 rounded-2xl bg-[#0e0e12] hover:bg-[#FF5B00] text-white text-xs font-extrabold transition-colors shadow-lg"
                  >
                    تایید نهایی و پرداخت آزمایشی
                  </button>
                  <button
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="px-5 py-3.5 rounded-2xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold transition-colors"
                  >
                    انصراف
                  </button>
                </div>
              </div>
            ) : (
              /* Success Confirmation */
              <div className="text-center py-6 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div>
                  <h3 className="text-xl font-black text-zinc-950 mb-1">
                    سفارش شما با موفقیت ثبت گردید!
                  </h3>
                  <p className="text-xs text-zinc-500">
                    با تشکر از اعتماد شما به پلتفرم الکترونیک لوکس AUREON
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 text-xs text-right space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">شماره پیگیری سفارش:</span>
                    <span className="font-mono font-bold text-zinc-900">{orderTrackingCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">وضعیت پرداخت:</span>
                    <span className="text-emerald-600 font-bold">تایید شده (دمو)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">زمان تحویل برآوردی:</span>
                    <span className="font-bold text-zinc-900">فردا بین ساعت ۱۰ الی ۱۴</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/products"
                    onClick={() => {
                      setIsCheckoutModalOpen(false);
                      setIsOrderPlaced(false);
                    }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#0e0e12] hover:bg-[#FF5B00] text-white text-xs font-bold transition-colors shadow-md"
                  >
                    <span>ادامه خرید در کاتالوگ آئورئون</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
