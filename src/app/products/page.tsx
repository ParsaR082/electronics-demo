import { Suspense } from "react";
import ProductCatalogView from "@/components/products/ProductCatalogView";

export const metadata = {
  title: "کاتالوگ محصولات | آئورئون (AUREON)",
  description: "خرید آنلاین انواع تلویزیون‌های هوشمند، اسپیکر، هدفون و سینمای خانگی با تضمین اصالت و گارانتی ۲۴ ماهه",
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center text-zinc-400">
          در حال بارگذاری کاتالوگ آئورئون...
        </div>
      }
    >
      <ProductCatalogView />
    </Suspense>
  );
}
