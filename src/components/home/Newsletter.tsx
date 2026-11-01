"use client";

import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle2, Sparkles } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMessage("لطفاً یک آدرس ایمیل معتبر وارد کنید.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 800);
  };

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-white border border-zinc-200/80 shadow-xl p-8 sm:p-12 text-center overflow-hidden">
          {/* Subtle Ambient Decorative Circles */}
          <div className="absolute top-0 right-1/2 translate-x-1/2 w-64 h-64 bg-[#FF5B00]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#FF5B00] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>باشگاه مشتریان پریمیوم AUREON VIP</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
              از اولین نفراتی باشید که محصولات جدید را تجربه می‌کنند
            </h2>

            <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
              عضویت در خبرنامه تخصصی آئورئون؛ دریافت مقالات کالیبراسیون صدا، اطلاع‌رسانی موجودی پرچمداران سونی و سامسونگ و کد تخفیف ۵۰۰ هزار تومانی اولین خرید.
            </p>

            {status === "success" ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-2 mt-6">
                <div className="flex items-center justify-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>عضویت شما با موفقیت ثبت گردید!</span>
                </div>
                <p className="text-xs text-emerald-700">
                  کد هدیه ۵۰۰ هزار تومانی به ایمیل شما ارسال شد. از خرید خود در آئورئون لذت ببرید.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <div className="flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto">
                  <div className="relative flex-1 w-full">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="آدرس ایمیل شما (مثال: name@gmail.com)"
                      className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 focus:border-[#FF5B00] focus:bg-white text-xs sm:text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden transition-all text-left"
                      dir="ltr"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#0e0e12] hover:bg-[#FF5B00] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shrink-0 shadow-md disabled:opacity-50"
                  >
                    <span>{status === "loading" ? "در حال ثبت..." : "عضویت در خبرنامه"}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>

                {status === "error" && (
                  <p className="text-xs text-rose-500 font-medium">{errorMessage}</p>
                )}
              </form>
            )}

            <span className="text-[11px] text-zinc-400 block pt-2">
              ما به حریم خصوصی شما احترام می‌گذاریم و هیچ‌گونه پیام تبلیغاتی ناخواسته ارسال نخواهیم کرد.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
