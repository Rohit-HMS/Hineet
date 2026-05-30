"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import { Product } from "@/data/products";
import { useTheme } from "@/components/layout/ThemeProvider";

export default function ProductDetail() {
  const { theme } = useTheme();
  const heroImageDark = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";
  const heroImageLight = "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const heroBgUrl = theme === "dark" ? heroImageDark : heroImageLight;
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [cardFadeStates, setCardFadeStates] = useState<Record<number, { opacity: number; blur: number; scale: number }>>({});
  const [isYearly, setIsYearly] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setIsLoading(false);
    });
    setMounted(true);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollSectionRef.current;
    const viewport = scrollViewportRef.current;

    if (!scrollContainer || !viewport) {
      return;
    }

    let frameId = 0;

    const smoothStep = (value: number) => {
      const clamped = Math.min(Math.max(value, 0), 1);
      return clamped * clamped * (3 - 2 * clamped);
    };

    const updateCardFadeStates = () => {
      frameId = 0;
      const viewportRect = viewport.getBoundingClientRect();
      const nextStates: Record<number, { opacity: number; blur: number; scale: number }> = {};

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const currentFadeDistance = window.innerWidth >= 768 ? 160 : 80;

        const leftVisibility = smoothStep((cardRect.right - (viewportRect.left + (window.innerWidth >= 768 ? 120 : 60))) / currentFadeDistance);
        const rightVisibility = smoothStep(((viewportRect.right - (window.innerWidth >= 768 ? 120 : 60)) - cardRect.left) / currentFadeDistance);
        const visibility = Math.min(leftVisibility, rightVisibility);

        nextStates[index] = {
          opacity: Math.max(0, visibility),
          blur: (1 - Math.max(0, visibility)) * 4,
          scale: 0.92 + Math.max(0, visibility) * 0.08,
        };
      });

      setCardFadeStates(nextStates);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateCardFadeStates);
    };

    updateCardFadeStates();

    scrollContainer.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleUpdate) : null;
    resizeObserver?.observe(viewport);

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      scrollContainer.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, []);

  const slug = useMemo(() => {
    const value = params.slug;
    return Array.isArray(value) ? value[0] : value;
  }, [params.slug]);

  const initialProduct = useMemo(() => {
    if (!slug) {
      return undefined;
    }

    return products.find((entry) => entry.slug === slug || entry.id === slug);
  }, [slug, products]);

  const { data: liveProduct } = useLivePreview({
    initialData: initialProduct as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const product = liveProduct || initialProduct;

  const relatedProducts = useMemo(() => {
    if (!initialProduct) {
      return [];
    }

    return products.filter((entry) => entry.slug !== initialProduct.slug);
  }, [initialProduct, products]);

  if (!mounted || isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] animate-ping"></div>
    </div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col items-center justify-center px-6">
        <div className="max-w-xl w-full rounded-[2rem] border border-[var(--glass-border)] bg-[var(--surface-primary)] backdrop-blur-xl p-10 text-center shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent-primary)] mb-4">
            Product not found
          </p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            We could not find that product.
          </h1>
          <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-8">
            Browse the full product list to explore the rest of the platform.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--accent-primary)] text-white font-semibold transition-transform duration-200 hover:-translate-y-0.5"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const plans = product.paymentOptions || [];
  const hasPlans = plans.length > 0;
  const accentTokens = (product.accent || "from-[#2563EB]/10 to-[#60A5FA]/10").split(" ");
  const accentFrom = accentTokens[0] ?? "from-[#2563EB]/10";
  const accentTo = accentTokens[1] ?? "to-[#60A5FA]/10";

  const scrollRelatedProducts = (direction: "left" | "right") => {
    if (scrollSectionRef.current) {
      const scrollAmount = 400;
      const currentScroll = scrollSectionRef.current.scrollLeft;
      scrollSectionRef.current.scrollTo({
        left: direction === "left" ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] pb-0">
      
      {/* Full-width Hero Section */}
      <div className="relative w-full h-[70vh] min-h-[500px] flex flex-col justify-end overflow-hidden mb-12">
        {/* Background Image */}
        <Image 
          src={heroBgUrl} 
          alt={product.name} 
          fill
          priority
          sizes="100vw"
          className="object-cover" 
        />
        
        {/* Gradient Overlay for Text Readability */}
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === "dark" ? "from-black via-black/50 to-black/10" : "from-white via-white/60 to-white/20"}`} />

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-16">
          <Link
            href="/products"
            className={`group mb-8 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${theme === "dark" ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"}`}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to all products
          </Link>
          
          <div className="mb-6">
            <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md border text-xs font-bold tracking-[0.2em] uppercase ${theme === "dark" ? "bg-white/10 border-white/20 text-white" : "bg-black/5 border-black/10 text-black"}`}>
              {product.category || "Product Detail"}
            </span>
          </div>
          
          <h1 className={`text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tight leading-[1.05] mb-4 drop-shadow-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
            {product.name}
          </h1>
          <p className={`text-2xl md:text-4xl font-medium leading-snug drop-shadow-md mb-6 max-w-4xl ${theme === "dark" ? "text-white/90" : "text-black/90"}`}>
            {product.tagline}
          </p>
          <p className={`text-lg md:text-xl max-w-3xl leading-relaxed drop-shadow-sm ${theme === "dark" ? "text-white/80" : "text-black/80"}`}>
            {product.shortDescription}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-12 lg:grid-cols-2 items-center mb-10 md:mb-20"
        >
          {/* Left Text */}
          <div className="flex flex-col">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8">About the product</h2>
            <p className="text-lg md:text-xl leading-relaxed text-[var(--text-secondary)] mb-6">
              {product.fullDescription}
            </p>
            {product.features && product.features.length > 0 && (
              <ul className="space-y-4 mt-4">
                {product.features.map((featureObj: any, i: number) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 size={20} className="mt-1 shrink-0 text-[var(--text-primary)]" />
                    <span className="text-lg text-[var(--text-secondary)]">
                      {typeof featureObj === 'string' ? featureObj : (featureObj as any).feature}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Right Image */}
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-[var(--card-shadow)]">
            {product.imageUrl ? (
              <Image src={product.imageUrl} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            ) : (
              <div className="absolute inset-0 bg-[var(--surface-primary)] flex items-center justify-center">
                <span className="text-[var(--text-muted)] text-4xl font-bold tracking-tighter lowercase italic">hineet</span>
              </div>
            )}
          </div>
        </motion.section>

        {/* Payment Options Section */}
        <section className="mt-20 md:mt-32">
          <div className="mb-10">
            <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-8">Payment Options</h2>

            <div className="flex items-center gap-6 text-lg">
              <button
                className={`pb-2 relative transition-colors ${!isYearly ? "text-[var(--text-primary)] font-semibold" : "text-[var(--text-muted)]"}`}
                onClick={() => setIsYearly(false)}
              >
                Monthly
                {!isYearly && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--text-primary)]"></span>}
              </button>
              <button
                className={`pb-2 relative flex items-center gap-3 transition-colors ${isYearly ? "text-[var(--text-primary)] font-semibold" : "text-[var(--text-muted)]"}`}
                onClick={() => setIsYearly(true)}
              >
                Yearly
                <span className="text-[10px] font-bold tracking-wider bg-[#E6F4EA] text-[#137333] px-2.5 py-0.5 rounded-full">Save 20%</span>
                {isYearly && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--text-primary)]"></span>}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(product.paymentOptions || []).map((option: any, idx: number) => (
              <div 
                key={idx} 
                className={`rounded-[2rem] border ${option.isCustomise ? 'border-[#2563EB] hover:shadow-[0_10px_40px_rgba(37,99,235,0.12)]' : 'border-[var(--glass-border)] hover:shadow-lg'} bg-[var(--surface-primary)] p-8 transition-transform hover:-translate-y-1`}
              >
                <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">{option.title}</h3>
                <div className="mb-6 flex items-baseline gap-1">
                  {option.isCustomise ? (
                    <span className="text-[2rem] md:text-4xl font-bold text-[var(--text-primary)] tracking-tight">Contact Us</span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold text-[var(--text-primary)]">
                        {isYearly ? option.yearlyPrice : option.monthlyPrice}
                      </span>
                      <span className="text-[var(--text-muted)] text-sm">/{isYearly ? "yr" : "mo"}</span>
                    </>
                  )}
                </div>
                <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
                  {(isYearly ? (option.yearlyFeatures || option.features || []) : (option.monthlyFeatures || option.features || [])).map((featureObj: any, fIdx: number) => (
                    <li key={fIdx} className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-[#2563EB]" /> 
                      {typeof featureObj === 'string' ? featureObj : (featureObj as any).feature}
                    </li>
                  ))}
                  {isYearly && option.yearlyBonus && (
                    <li className="flex items-center gap-3">
                      <CheckCircle2 size={16} className="text-[#2563EB]" /> {option.yearlyBonus}
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section
        className="relative w-full overflow-hidden flex flex-col justify-center z-10 pt-16 pb-8 md:pt-24 md:pb-12 expertise-section"
      >
        <div className="pl-6 md:pl-24 mb-10 md:mb-16 relative z-20">
          <h2 className="text-[#FFFFFF] text-5xl md:text-[4.5rem] font-light tracking-wide leading-[1.1] mb-6 drop-shadow-sm expertise-title">
            Other <span className="blue-gradient-text">Products</span>
          </h2>
        </div>

        <div ref={scrollViewportRef} className="relative w-full overflow-hidden px-6 lg:px-24">

          <button
            onClick={() => scrollRelatedProducts("left")}
            className="absolute left-4 lg:left-1 top-1/2 -translate-y-1/2 z-30 p-2 transition-all duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="scroll-arrow w-12 md:w-16 h-12 md:h-16 opacity-60 hover:opacity-100 transition-opacity text-[var(--text-primary)]" strokeWidth={1.5} />
          </button>

          <div
            ref={scrollSectionRef}
            className="story-container relative z-10 flex items-stretch gap-6 md:gap-10 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full"
          >
            {relatedProducts.map((entry, i) => (
              <div
                key={i}
                ref={(element) => {
                  cardRefs.current[i] = element;
                }}
                className="w-[86vw] md:basis-[calc((100%-5rem)/2.5)] flex-shrink-0 flex items-stretch py-4 snap-start"
                style={{
                  opacity: cardFadeStates[i]?.opacity ?? 1,
                  filter: `blur(${cardFadeStates[i]?.blur ?? 0}px)`,
                  transform: `scale(${cardFadeStates[i]?.scale ?? 1})`,
                  transition: "none"
                }}
              >
                <Link href={`/products/${entry.slug}`} className="group flex flex-col w-full hover:-translate-y-2 transition-all duration-200 ease-out cursor-pointer will-change-[opacity,transform,filter] transform-gpu origin-center">

                  {/* Top Image Area */}
                  <div className="h-[55vh] md:h-[400px] w-full relative overflow-hidden bg-[#1A1A1A] flex flex-col items-center justify-center">
                    <div className={`absolute inset-0 bg-gradient-to-br ${entry.accent || "from-[#2563EB]/10 to-[#60A5FA]/10"} opacity-20 transition-opacity duration-200 group-hover:opacity-40 z-10 pointer-events-none`} />
                    {entry.imageUrl ? (
                      <Image src={entry.imageUrl} alt={entry.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transform transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                      <div className="flex flex-col items-center relative z-20">
                        <span className="text-[#1e3a8a] text-6xl md:text-7xl font-black tracking-tighter lowercase italic">hineet</span>
                        <span className="text-[#A3A3A3] text-[0.65rem] md:text-xs font-bold tracking-[0.25em] uppercase mt-3">A Tech Company</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Text Content */}
                  <div className="pt-6 md:pt-8 flex flex-col flex-1 relative bg-transparent">
                    <h3 className="text-2xl md:text-[2.1rem] font-semibold tracking-tight text-[var(--text-primary)] mb-4 leading-[1.2] expertise-card-title">
                      {entry.name}
                    </h3>
                    <p className="text-base md:text-[1.15rem] text-[var(--text-secondary)] mb-8 leading-relaxed font-normal expertise-card-desc">
                      {entry.shortDescription}
                    </p>
                    <div className="mt-auto inline-flex items-center text-[var(--text-secondary)] font-semibold w-fit border-b border-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors duration-200 pb-0.5">
                      Explore More
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollRelatedProducts("right")}
            className="absolute right-4 lg:right-1 top-1/2 -translate-y-1/2 z-30 p-2 transition-all duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="scroll-arrow w-12 md:w-16 h-12 md:h-16 opacity-60 hover:opacity-100 transition-opacity text-[var(--text-primary)]" strokeWidth={1.5} />
          </button>
        </div>
      </section>
    </div>
  );
}
