import { fetchProducts } from "@/lib/api";
import { Metadata } from "next";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const products = await fetchProducts();
  const product = products.find((entry) => entry.slug === slug || entry.id === slug);

  if (!product) {
    return {
      title: "Product Not Found | Hineet Tech",
    };
  }

  return {
    title: `${product.name} | Hineet Tech`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | Hineet Tech`,
      description: product.shortDescription,
      images: [
        {
          url: product.imageUrl || "",
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductPage() {
  return <ProductDetailClient />;
}
