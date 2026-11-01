import HeroSection from "@/components/home/HeroSection";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ProductStorytelling from "@/components/home/ProductStorytelling";
import BestSellers from "@/components/home/BestSellers";
import BrandShowcase from "@/components/home/BrandShowcase";
import PromotionalBanner from "@/components/home/PromotionalBanner";
import Newsletter from "@/components/home/Newsletter";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <CategoryShowcase />
      <FeaturedProducts />
      <ProductStorytelling />
      <BestSellers />
      <BrandShowcase />
      <PromotionalBanner />
      <Newsletter />
    </div>
  );
}
