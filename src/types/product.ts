export type CategoryId =
  | "tv-displays"
  | "speakers-audio"
  | "headphones"
  | "home-theater"
  | "gaming-consoles"
  | "smart-home";

export interface Category {
  id: CategoryId;
  name: string;
  englishName: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  highlight: string;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "مشکی تیتانیوم", "نقره‌ای مات", "سفید صدفی"
  colorHex?: string;
  priceModifier?: number;
  inStock: boolean;
}

export interface ProductSpecification {
  group: string;
  items: {
    label: string;
    value: string;
  }[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  englishName: string;
  brand: string;
  category: CategoryId;
  categoryName: string;
  price: number; // in Tomans
  originalPrice?: number; // before discount
  discount?: number; // discount percentage
  rating: number; // 1-5
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  shortDescription: string;
  specifications: ProductSpecification[];
  features: string[];
  stock: number;
  variants?: ProductVariant[];
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  badge?: string; // e.g. "ویژه", "پرفروش", "پیشنهاد طلایی"
  specsHighlights?: {
    label: string;
    value: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export type SortOption =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "discount";
