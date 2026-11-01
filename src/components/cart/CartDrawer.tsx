"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Truck, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, toPersianDigits } from "@/lib/persian";

export default function CartDrawer() {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotalPrice = useCartStore((state) => state.subtotalPrice());
  const totalDiscount = useCartStore((state) => state.totalDiscount());
  const shippingCost = useCartStore((state) => state.shippingCost());
  const finalPrice = useCartStore((state) => state.finalPrice());

  const FREE_SHIPPING_THRESHOLD = 5000000;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalPrice);
  const progressPercent = Math.min(100, Math.round((subtotalPrice / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed top-0 bottom-0 left-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#FF5B00]/10 flex items-center justify-center text-[#FF5B00]">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900">سبد خرید شما</h3>
                  <span className="text-xs text-zinc-400">
                    {toPersianDigits(items.length)} قلم کالا
                  </span>
                </div>
              </div>

              <button
                onClick={closeCart}
                aria-label="بستن سبد خرید"
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="px-5 py-3 bg-zinc-50 border-b border-zinc-100">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="flex items-center gap-1.5 font-medium text-zinc-700">
                  <Truck className="w-4 h-4 text-[#FF5B00]" />
                  {remainingForFreeShipping === 0 ? (
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      سفارش شما شامل ارسال رایگان است!
                    </span>
                  ) : (
                    <span>
                      فقط{" "}
                      <strong className="text-[#FF5B00]">
                        {formatPrice(remainingForFreeShipping)}
                      </strong>{" "}
                      تا ارسال رایگان
                    </span>
                  )}
                </span>
                <span className="text-zinc-400 font-bold">
                  {toPersianDigits(progressPercent)}٪
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-linear-to-r from-[#FF5B00] to-amber-400 rounded-full"
                />
              </div>
            </div>

            {/* Items List */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 mb-4">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <h4 className="text-base font-bold text-zinc-800 mb-1">
                  سبد خرید شما خالی است
                </h4>
                <p className="text-xs text-zinc-500 max-w-xs mb-6">
                  جدیدترین سیستم‌های صوتی و تصویری روز جهان را در آئورئون مشاهده کنید.
                </p>
                <Link
                  href="/products"
                  onClick={closeCart}
                  className="px-6 py-3 rounded-2xl bg-[#0e0e12] hover:bg-[#FF5B00] text-white text-xs font-bold transition-colors"
                >
                  مشاهده کاتالوگ محصولات
                </Link>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.map((item) => {
                  const variantMod = item.selectedVariant?.priceModifier || 0;
                  const itemUnitPrice = item.product.price + variantMod;

                  return (
                    <div
                      key={`${item.product.id}-${item.selectedVariant?.id || "default"}`}
                      className="flex items-center gap-4 p-3 rounded-2xl border border-zinc-100 hover:border-zinc-200 transition-colors bg-white shadow-2xs"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          sizes="72px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info & Quantity */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.product.slug}`}
                          onClick={closeCart}
                          className="block text-xs font-bold text-zinc-900 hover:text-[#FF5B00] transition-colors line-clamp-1 mb-1"
                        >
                          {item.product.name}
                        </Link>

                        {item.selectedVariant && (
                          <span className="inline-block text-[10px] text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-md mb-1.5">
                            رنگ/نسخه: {item.selectedVariant.name}
                          </span>
                        )}

                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-black text-zinc-900">
                            {formatPrice(itemUnitPrice * item.quantity)}
                          </span>

                          {/* Quantity Selector */}
                          <div className="flex items-center gap-2 border border-zinc-200 rounded-xl px-2 py-1">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                  item.selectedVariant?.id
                                )
                              }
                              className="text-zinc-600 hover:text-zinc-950 p-0.5"
                              aria-label="افزایش تعداد"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-zinc-900 w-4 text-center">
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
                              className="text-zinc-600 hover:text-zinc-950 p-0.5"
                              aria-label="کاهش تعداد"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.selectedVariant?.id)
                        }
                        aria-label="حذف از سبد"
                        className="p-1.5 text-zinc-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Footer Summary & Checkout */}
            {items.length > 0 && (
              <div className="p-5 border-t border-zinc-100 bg-zinc-50/70 space-y-3">
                <div className="space-y-1.5 text-xs text-zinc-500">
                  <div className="flex justify-between">
                    <span>مجموع اقلام:</span>
                    <span className="font-semibold text-zinc-800">
                      {formatPrice(subtotalPrice)}
                    </span>
                  </div>

                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>سود شما از خرید:</span>
                      <span>{formatPrice(totalDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>هزینه ارسال:</span>
                    <span className="font-semibold text-zinc-800">
                      {shippingCost === 0 ? "رایگان" : formatPrice(shippingCost)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm font-extrabold text-zinc-950 pt-2 border-t border-zinc-200">
                    <span>مبلغ نهایی:</span>
                    <span className="text-base text-[#FF5B00]">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-[#0e0e12] hover:bg-[#FF5B00] text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <span>تسویه حساب</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="flex items-center justify-center py-3 rounded-2xl bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 text-xs font-bold transition-colors"
                  >
                    مشاهده جزئیات سبد
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
