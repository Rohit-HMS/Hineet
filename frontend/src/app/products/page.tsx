"use client";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { fetchProducts, fetchProductsPage, type ProductsPageData } from "@/lib/api";
import { Product } from "@/data/products";
import { useTheme } from "@/components/layout/ThemeProvider";

const defaultHeroData: ProductsPageData = {
  badge: "OUR PRODUCTS",
  heading: "One Platform *Endless Possibilities.*",
  description: "Innovative software solutions that simplify workflows, enhance productivity, and scale with your business.",
};

function ProductCard({ initialProd }: { initialProd: Product }) {
  const { data: liveProd } = useLivePreview({
    initialData: initialProd,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const prod = (liveProd && liveProd.id === initialProd.id) ? liveProd : initialProd;

  return (
    <div
      key={prod.id}
      className="group flex flex-col w-full hover:-translate-y-2 transition-transform duration-200 cursor-pointer"
    >
      {/* Top Image Area */}
      <div className="h-[300px] md:h-[400px] w-full relative overflow-hidden bg-[#1A1A1A] flex flex-col items-center justify-center">
        <div className={`absolute inset-0 bg-gradient-to-br ${prod.accent || "from-[#2563EB]/10 to-[#60A5FA]/10"} opacity-20 group-hover:opacity-40 transition-opacity duration-250 z-10 pointer-events-none`} />
        {prod.imageUrl ? (
          <Image src={prod.imageUrl} alt={prod.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transform transition-transform duration-500 group-hover:scale-110" />
        ) : (
          <div className="flex flex-col items-center transform transition-transform duration-250 group-hover:scale-105 z-20">
            <span className="text-[#1e3a8a] text-5xl md:text-6xl font-black tracking-tighter lowercase italic">hineet</span>
            <span className="text-[#525252] text-[0.65rem] md:text-xs font-bold tracking-[0.25em] uppercase mt-3">A Tech Company</span>
          </div>
        )}
      </div>

      {/* Bottom Text Content */}
      <div className="pt-6 md:pt-8 flex flex-col flex-1 relative bg-transparent">
        <h3 className="text-2xl md:text-[2.1rem] font-semibold tracking-tight text-[var(--text-primary)] mb-4 leading-[1.2]">
          {prod.name}
        </h3>
        <p className="text-base md:text-[1.15rem] text-[var(--text-secondary)] mb-8 leading-relaxed font-normal">
          {prod.shortDescription}
        </p>
        <Link href={`/products/${prod.slug}`} className="mt-auto inline-flex items-center text-sm font-semibold text-[var(--text-secondary)] border-b border-[var(--text-secondary)] pb-0.5 w-fit hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors duration-200">
          Explore More
        </Link>
      </div>
    </div>
  );
}

export default function Products() {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [initialHeroData, setInitialHeroData] = useState<ProductsPageData | undefined>(undefined);

  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchProductsPage().then((data) => {
      if (data) {
        setInitialHeroData(data);
      }
    });
  }, []);

  const { data: liveHeroData } = useLivePreview<ProductsPageData>({
    initialData: initialHeroData as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const resolvedData = liveHeroData?.heading ? liveHeroData : initialHeroData;
  const activeData = resolvedData || defaultHeroData;

  const renderStyledText = (text: string) => {
    if (!text) return "";
    const parts = text.split(/(\*[^*]+\*)/g);
    return parts.map((part: string, idx: number) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        const cleanPart = part.slice(1, -1);
        return (
          <span key={idx} className="blue-gradient-text italic pr-4">
            {cleanPart}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="pt-40 pb-20 w-full min-h-screen bg-transparent relative overflow-hidden">
      {/* Ambient */}
      <div className="ambient-orb w-[60vw] h-[40vh] bg-[#2563EB]/07 top-0 left-1/2 -translate-x-1/2 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mb-24"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-[#2563EB] mb-4 block">
            {activeData.badge}
          </span>
          <h1 className="text-[#FFFFFF] text-5xl md:text-[5.5rem] font-light tracking-wide leading-[1.1] mb-6 drop-shadow-sm">
            {renderStyledText(activeData.heading)}
          </h1>
          <p className="text-2xl text-[#737373] font-medium leading-relaxed max-w-2xl">
            {activeData.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((prod) => (
            <ProductCard key={prod.id || prod.slug} initialProd={prod} />
          ))}
        </div>

        {/* Bottom CTA */}
        {/* Bottom CTA */}
      </div>
    </div>
  );
}
