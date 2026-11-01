import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PRODUCTS } from "@/data/products";
import ProductDetailView from "@/components/products/ProductDetailView";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "محصول یافت نشد | آئورئون (AUREON)",
    };
  }

  return {
    title: `${product.name} | آئورئون (AUREON)`,
    description: product.shortDescription || product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
