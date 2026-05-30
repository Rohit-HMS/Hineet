"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import VisionMissionSection from "@/components/sections/VisionMissionSection";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { fetchProducts, fetchHeroLogos, HeroLogo, fetchHomeHero, HomeHeroData, fetchStatsBar, StatsBarData, fetchExpertise, ExpertiseData } from "@/lib/api";
import { Product } from "@/data/products";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLivePreview } from "@payloadcms/live-preview-react";
import TechnologiesSection from "@/components/ui/TechnologiesSection";
import { Instrument_Sans } from "next/font/google";
import {
  SiReact,
  SiDocker,
  SiFigma,
  SiCanva,
  SiWordpress,
  SiTypescript,
  SiDotnet,
  SiStripe,
  SiSlack,
  SiOpenai,
  SiJira,
  SiNotion,
  SiWhatsapp,
  SiGithub,
  SiVercel,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const storytellingCards = [
  {
    title: "Wapex",
    desc: "Wapex is an advanced WhatsApp CRM platform that helps businesses manage leads and automate customer communication seamlessly.",
    link: "/products/wapex"
  },
  {
    title: "Propwise",
    desc: "Smarter real estate property operations and tenant management software for the modern era.",
    link: "/products/propwise"
  },
  {
    title: "School",
    desc: "Digitize and streamline K-12 school operations with our comprehensive School Management System.",
    link: "/products/school-os"
  },
  {
    title: "Healthcare",
    desc: "A fully compliant healthcare CRM and operations platform designed to help clinics manage patient flow and EHR.",
    link: "/products/healthcare-sync"
  },
  {
    title: "Project Management",
    desc: "A powerful, agile tool for teams to plan, track, and execute projects efficiently.",
    link: "/products/project-management"
  },
];

const stats = [
  { value: "10+", label: "Project Completed" },
  { value: "95%", label: "CUSTOMER SATISFACTION" },
  { value: "5+", label: "INNOVATION AND VALUABLE INSIGHT" },
  { value: "10+", label: "MEASURABLE RESULTS" },
];

// Use a set of distinct brand logos (files exist in public/assets/logos)
// Each logo may include optional `left` and `top` values (CSS strings, e.g. '10%' or '120px')
// to explicitly position it. If `left`/`top` are omitted the logo will be placed on the circular ring.
const heroLogos: Array<{ name: string; icon: IconType; size: number; left?: string; top?: string; color: string; zIndex?: number }> = [
  // Left side cluster
  { name: 'Stripe', icon: SiStripe, size: 42, left: '93%', top: '178%', color: '#008CDD', zIndex: 10 },
  { name: 'React', icon: SiReact, size: 62, left: '20%', top: '76%', color: '#61DAFB', zIndex: 20 },
  { name: 'Docker', icon: SiDocker, size: 62, left: '62%', top: '-40%', color: '#2496ED', zIndex: 15 },
  { name: 'Figma', icon: SiFigma, size: 50, left: '0%', top: '22%', color: '#F24E1E', zIndex: 12 },
  { name: 'WordPress', icon: SiWordpress, size: 56, left: '10%', top: '175%', color: '#21759B', zIndex: 10 },
  { name: 'Vercel', icon: SiVercel, size: 42, left: '19%', top: '-6%', color: 'currentColor', zIndex: 14 },
  { name: 'Canva', icon: SiCanva, size: 56, left: '38%', top: '-70%', color: '#00C4CC', zIndex: 11 },
  { name: 'AWS', icon: FaAws, size: 59, left: '78%', top: '-72%', color: '#FF9900', zIndex: 18 },

  // Right side cluster
  // Right side logos updated positions
  // Balanced according to your left side layout and reference image

  { name: 'WhatsApp', icon: SiWhatsapp, size: 52, left: '26%', top: '150%', color: '#25D366', zIndex: 15 },
  { name: 'TypeScript', icon: SiTypescript, size: 38, left: '18%', top: '-69%', color: '#3178C6', zIndex: 12 },
  { name: 'Notion', icon: SiNotion, size: 38, left: '95%', top: '-35%', color: 'currentColor', zIndex: 11 },
  { name: 'GitHub', icon: SiGithub, size: 42, left: '6%', top: '88%', color: 'currentColor', zIndex: 14 },
  { name: 'OpenAI', icon: SiOpenai, size: 46, left: '78%', top: '136%', color: 'currentColor', zIndex: 10 },
  { name: '.NET', icon: SiDotnet, size: 58, left: '94%', top: '64%', color: '#512BD4', zIndex: 13 },
  { name: 'Slack', icon: SiSlack, size: 40, left: '76%', top: '24%', color: '#4A154B', zIndex: 16 },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);
  const scrollViewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [cardFadeStates, setCardFadeStates] = useState<Record<number, { opacity: number; blur: number; scale: number }>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [initialHeroLogos, setInitialHeroLogos] = useState<{ logos: HeroLogo[] } | undefined>(undefined);
  const [initialHomeHero, setInitialHomeHero] = useState<HomeHeroData | undefined>(undefined);
  const [initialStatsBar, setInitialStatsBar] = useState<StatsBarData | undefined>(undefined);
  const [initialExpertise, setInitialExpertise] = useState<ExpertiseData | undefined>(undefined);

  useEffect(() => {
    fetchProducts().then(setProducts);
    fetchHeroLogos().then(data => {
      if (data && data.logos && data.logos.length > 0) {
        setInitialHeroLogos(data);
      }
    });
    fetchHomeHero().then(data => {
      if (data) {
        setInitialHomeHero(data);
      }
    });
    fetchStatsBar().then(data => {
      if (data && data.stats && data.stats.length > 0) {
        setInitialStatsBar(data);
      }
    });
    fetchExpertise().then(data => {
      if (data && data.cards && data.cards.length > 0) {
        setInitialExpertise(data);
      }
    });
  }, []);

  const { data: liveHeroLogos } = useLivePreview({
    initialData: initialHeroLogos as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const { data: liveHomeHero } = useLivePreview({
    initialData: initialHomeHero as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const { data: liveStatsBar } = useLivePreview({
    initialData: initialStatsBar as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const { data: liveExpertise } = useLivePreview({
    initialData: initialExpertise as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  // Use dynamic logos if available from CMS, otherwise fallback to the default static logos
  const resolvedHeroLogos = liveHeroLogos?.logos?.length > 0 ? liveHeroLogos : initialHeroLogos;
  const activeHeroLogos = resolvedHeroLogos?.logos && resolvedHeroLogos.logos.length > 0 
    ? resolvedHeroLogos.logos 
    : heroLogos as any;

  const resolvedHomeHero = liveHomeHero?.headingLine1 ? liveHomeHero : initialHomeHero;
  const activeHomeHero = {
    headingLine1: resolvedHomeHero?.headingLine1 || "Where Innovation",
    headingLine2: resolvedHomeHero?.headingLine2 || "Meets Execution.",
    primaryButtonText: resolvedHomeHero?.primaryButtonText || "Discover More",
    primaryButtonLink: resolvedHomeHero?.primaryButtonLink || "/products",
    secondaryButtonText: resolvedHomeHero?.secondaryButtonText || "Contact us",
    secondaryButtonLink: resolvedHomeHero?.secondaryButtonLink || "/contact",
  };

  const resolvedStatsBar = liveStatsBar?.stats?.length > 0 ? liveStatsBar : initialStatsBar;
  const activeStatsBar = resolvedStatsBar?.stats && resolvedStatsBar.stats.length > 0
    ? resolvedStatsBar.stats
    : stats;

  const resolvedExpertise = liveExpertise?.cards?.length > 0 ? liveExpertise : initialExpertise;
  const activeExpertise = resolvedExpertise || {
    headingLine1: "Our",
    headingLine2: "Expertise",
    cards: storytellingCards.map(c => ({
      title: c.title,
      description: c.desc,
      link: c.link, // fallback link
    }))
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Other GSAP animations if any
    }, containerRef);

    return () => ctx.revert();
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
      const fadeDistance = 112;
      const nextStates: Record<number, { opacity: number; blur: number; scale: number }> = {};

      cardRefs.current.forEach((card, index) => {
        if (!card) {
          return;
        }

        const cardRect = card.getBoundingClientRect();
        // Adjust fade distance to match the side overlays (120px on md)
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
      if (frameId) {
        return;
      }

      frameId = window.requestAnimationFrame(updateCardFadeStates);
    };

    updateCardFadeStates();

    scrollContainer.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(scheduleUpdate) : null;
    resizeObserver?.observe(viewport);

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }

      scrollContainer.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver?.disconnect();
    };
  }, []);

  const scrollExpertise = (direction: "left" | "right") => {
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
    <div ref={containerRef} className="relative w-full bg-transparent">
      <style dangerouslySetInnerHTML={{
        __html: `
          [data-theme="light"] .scroll-arrow { filter: brightness(0.3); }
          [data-theme="light"] .scroll-arrow:hover { filter: brightness(0.6); }
          [data-theme="dark"] .scroll-arrow { filter: invert(1) brightness(1.2); }
          [data-theme="dark"] .scroll-arrow:hover { filter: invert(1) brightness(1.4); }

          [data-theme="light"] .expertise-section { background-color: #FFFFFF !important; border-color: #E5E7EB !important; }
          [data-theme="light"] .expertise-title { color: #000000 !important; }
          [data-theme="light"] .expertise-card-title { color: #000000 !important; }
          [data-theme="light"] .expertise-card-desc { color: #4B5563 !important; }

        `
      }} />

      {/* ─── HERO ─── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Ambient orbs */}
        <div className="ambient-orb w-[60vw] h-[60vw] md:w-[32vw] md:h-[32vw] bg-[#2563EB]/10 top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2" />
        <div className="ambient-orb w-[40vw] h-[40vw] md:w-[24vw] md:h-[24vw] bg-[#60A5FA]/08 bottom-1/3 right-1/4" />

        {/* Floating vendor logos will be rendered near the heading */}

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="z-10 max-w-6xl w-full flex flex-col items-center relative"
        >

          {/* Circular ring of 12 logos around the heading */}
          <RingLogos logos={activeHeroLogos} staticLogos={heroLogos} />


          <h1 className={`${instrumentSans.className} relative z-20 text-[#FFFFFF] text-3xl md:text-[3.5rem] font-light tracking-wide leading-[1.1] mb-6 drop-shadow-sm`}>
            {activeHomeHero.headingLine1}{" "}
            <br />
            <span className="blue-gradient-text pr-4 drop-shadow-md opacity-95">{activeHomeHero.headingLine2}</span>
          </h1>

          {/* <p className="text-xl md:text-1xl text-[#737373] max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Powerful platforms designed to simplify operations, automate workflows, and create seamless customer experiences.
          </p> */}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href={activeHomeHero.primaryButtonLink}>
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="group flex items-center gap-2 px-7 py-3.5 blue-gradient-btn rounded-xl font-bold text-white shadow-[0_8px_32px_rgba(37,99,235,0.35)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)] transition-all duration-200 text-base"
              >
                {activeHomeHero.primaryButtonText}
                <ArrowRight className="group-hover:translate-x-1.5 transition-transform" />
              </motion.button>
            </Link>

            <Link href={activeHomeHero.secondaryButtonLink}>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="group flex items-center gap-2 px-7 py-3.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-xl font-bold text-[#2563EB] hover:bg-[#F8FAFC] hover:text-[#1D4ED8] hover:border-[#BFDBFE] hover:shadow-[0_8px_32px_rgba(37,99,235,0.12)] transition-all duration-200 text-base shadow-sm"
              >
                {activeHomeHero.secondaryButtonText}
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.45 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#94A3B8]">Scroll to explore</span>
          <div className="w-[1px] h-14 bg-gradient-to-b from-[#2563EB]/50 to-transparent" />
        </motion.div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="relative z-10 w-full border-y border-[#262626] bg-[#0A0A0A]/70 backdrop-blur-xl py-12 px-6">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {activeStatsBar.map((stat: any, i: number) => (
            <motion.div
              key={stat.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-black tracking-tighter blue-gradient-text mb-1">{stat.value}</div>
              <div className="text-sm text-[#737373] font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── HORIZONTAL SCROLL STORYTELLING ─── */}
      <section
        className="relative w-full overflow-hidden flex flex-col justify-center z-10 border-b border-[#262626] bg-[#050505] py-32 expertise-section"
      >
        <div className="pl-6 md:pl-24 mb-10 md:mb-16 relative z-20">
          <h2 className="text-[#FFFFFF] text-5xl md:text-[5.5rem] font-light tracking-wide leading-[1.1] mb-6 drop-shadow-sm expertise-title">
            {activeExpertise.headingLine1} <span className="blue-gradient-text">{activeExpertise.headingLine2}</span>
          </h2>
        </div>

        <div ref={scrollViewportRef} className="relative w-full overflow-hidden px-6 md:px-24">

          <button
            onClick={() => scrollExpertise("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-2 transition-all duration-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="scroll-arrow w-12 md:w-16 h-12 md:h-16 opacity-60 hover:opacity-100 transition-opacity text-black" strokeWidth={1.5} />
          </button>

          <div
            ref={scrollSectionRef}
            className="story-container relative z-10 flex items-stretch gap-6 md:gap-10 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full"
          >
            {activeExpertise.cards.map((card: any, i: number) => (
              <div
                key={card.id || i}
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
                <div className="group flex flex-col w-full hover:-translate-y-2 transition-all duration-200 ease-out cursor-pointer will-change-[opacity,transform,filter] transform-gpu origin-center">

                  {/* Top Image Area */}
                  <div className="h-[55vh] md:h-[400px] w-full relative overflow-hidden bg-[#1A1A1A] flex flex-col items-center justify-center">
                    {(() => {
                      const productMatch = card.product?.slug ? card.product : products.find(p => `/products/${p.slug}` === card.link);
                      if (productMatch?.imageUrl) {
                        return <Image src={productMatch.imageUrl} alt={card.title} fill sizes="(max-width: 768px) 86vw, 40vw" className="object-cover transform transition-transform duration-500 group-hover:scale-110" />;
                      }
                      return (
                        <div className="flex flex-col items-center">
                          <span className="text-white text-6xl md:text-7xl font-black tracking-tighter lowercase italic">hineet</span>
                          <span className="text-[#A3A3A3] text-[0.65rem] md:text-xs font-bold tracking-[0.25em] uppercase mt-3">A Tech Company</span>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Bottom Text Content */}
                  <div className="pt-6 md:pt-8 flex flex-col flex-1 relative bg-transparent">
                    <h3 className="text-2xl md:text-[2.1rem] font-semibold tracking-tight text-white mb-4 leading-[1.2] expertise-card-title">
                      {card.title}
                    </h3>
                    <p className="text-base md:text-[1.15rem] text-[#A3A3A3] mb-8 leading-relaxed font-normal expertise-card-desc">
                      {card.description}
                    </p>
                    <Link href={card.product?.slug ? `/products/${card.product.slug}` : card.link} className="mt-auto inline-flex items-center text-[var(--text-secondary)] font-semibold w-fit border-b border-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors duration-200 pb-0.5">
                      Explore More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scrollExpertise("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-2 transition-all duration-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="scroll-arrow w-12 md:w-16 h-12 md:h-16 opacity-60 hover:opacity-100 transition-opacity text-black" strokeWidth={1.5} />
          </button>
        </div>
      </section>

      {/* ─── TECHNOLOGIES WE USE SECTION ─── */}
      <TechnologiesSection />

      {/* ─── VISION & MISSION SECTION ─── */}
      <VisionMissionSection />
    </div>
  );
}

function RingLogos({ logos, staticLogos }: { logos: any[], staticLogos: any[] }) {
  type LogoTransform = { x: number; y: number };

  // Use a stable initial width during SSR to ensure identical server/client markup.
  const [vw, setVw] = useState<number>(1200);
  const logoRefs = useRef<Array<HTMLDivElement | null>>([]);
  const currentTransformsRef = useRef<LogoTransform[]>(logos.map(() => ({ x: 0, y: 0 })));
  const cursorPositionRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const animationRunningRef = useRef(false);
  const [logoTransforms, setLogoTransforms] = useState<LogoTransform[]>(() => logos.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    // Update to real viewport width only after mount (client-side).
    const setWidth = () => setVw(Math.round(window.innerWidth || 1200));
    setWidth();
    window.addEventListener("resize", setWidth);
    return () => window.removeEventListener("resize", setWidth);
  }, []);

  useEffect(() => {
    currentTransformsRef.current = logos.map(() => ({ x: 0, y: 0 }));
    setLogoTransforms(logos.map(() => ({ x: 0, y: 0 })));
  }, [logos]);

  useEffect(() => {
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

    const tick = (time: number) => {
      const cursorPosition = cursorPositionRef.current;
      let shouldKeepRunning = false;
      const nextTransforms = currentTransformsRef.current.map((currentTransform, index) => {
        const logo = logos[index];
        const logoElement = logoRefs.current[index];

        if (!logo || !logoElement) {
          return currentTransform;
        }

        const rect = logoElement.getBoundingClientRect();
        const logoCenterX = rect.left + rect.width / 2;
        const logoCenterY = rect.top + rect.height / 2;

        let targetX = 0;
        let targetY = 0;

        if (cursorPosition) {
          const deltaX = cursorPosition.x - logoCenterX;
          const deltaY = cursorPosition.y - logoCenterY;
          const distance = Math.hypot(deltaX, deltaY);
          const interactionRadius = Math.max(logo.size * 4.2, vw >= 768 ? 185 : 120);

          if (distance > 0.001 && distance < interactionRadius) {
            const proximity = 1 - distance / interactionRadius;
            const easedProximity = proximity * proximity * (3 - 2 * proximity);
            const maxDisplacement = clamp(logo.size * (vw >= 768 ? 0.24 : 0.18), 7, vw >= 768 ? 24 : 16);
            const displacement = easedProximity * maxDisplacement;

            targetX = -(deltaX / distance) * displacement;
            targetY = -(deltaY / distance) * displacement;
            shouldKeepRunning = true;
          }
        }

        const lerpAmount = cursorPosition ? 0.14 : 0.08;
        const nextX = currentTransform.x + (targetX - currentTransform.x) * lerpAmount;
        const nextY = currentTransform.y + (targetY - currentTransform.y) * lerpAmount;

        if (Math.abs(nextX) > 0.05 || Math.abs(nextY) > 0.05 || Math.abs(targetX) > 0.05 || Math.abs(targetY) > 0.05) {
          shouldKeepRunning = true;
        }

        return { x: nextX, y: nextY };
      });

      currentTransformsRef.current = nextTransforms;
      setLogoTransforms(nextTransforms.map((transform) => ({ ...transform })));

      if (shouldKeepRunning) {
        animationFrameRef.current = window.requestAnimationFrame(tick);
      } else {
        animationRunningRef.current = false;
        animationFrameRef.current = null;
      }
    };

    const startAnimation = () => {
      if (animationRunningRef.current) {
        return;
      }

      animationRunningRef.current = true;
      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    const handlePointerMove = (event: PointerEvent) => {
      cursorPositionRef.current = { x: event.clientX, y: event.clientY };
      startAnimation();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [logos, vw]);

  // Larger radius so logos sit around (not overlapping) the heading
  const radius = vw >= 768 ? 320 : 140;

  const { theme } = useTheme();
  const colorClass = theme === "dark" ? "text-white" : "text-black";

  return (
    <>
      {logos.map((logo, i) => {
        const count = logos.length;
        const leftCount = Math.ceil(count / 2);
        const rightCount = count - leftCount;

        // If explicit left/top provided, just use those (overrides automatic layout)
        if (logo.left && logo.top) {
          return (
            <motion.div
              key={`${logo.name}-${i}`}
              ref={(element) => {
                logoRefs.current[i] = element;
              }}
              style={{ left: logo.left, top: logo.top }}
              className={`absolute pointer-events-auto ${colorClass} opacity-90 cursor-pointer`}
              initial={{ x: "-50%", y: "-50%", zIndex: logo.zIndex || 10 }}
              whileHover={{ scale: 1.3, zIndex: 50 }}
            >
              <div
                className="transition-transform duration-200 ease-out will-change-transform"
                style={{
                  transform: `translate3d(${logoTransforms[i]?.x ?? 0}px, ${logoTransforms[i]?.y ?? 0}px, 0)`,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -10 - (i % 3) * 5, 0],
                  }}
                  transition={{
                    duration: 3 + (i % 3),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center justify-center transition-all duration-200 drop-shadow-lg">
                    {logo.logo && logo.logo.url ? (
                      <img src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000"}${logo.logo.url}`} width={logo.size} height={logo.size} alt={logo.name} className="opacity-95 object-contain" />
                    ) : (
                      (() => {
                        const fallback = staticLogos.find(s => s.name.toLowerCase() === logo.name.toLowerCase());
                        if (fallback) {
                          return <fallback.icon size={logo.size} color={fallback.color} className="opacity-95" aria-label={`${logo.name} logo`} />;
                        }
                        return null;
                      })()
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        }

        // Distribute first half on the left semicircle (90deg -> 270deg)
        // and second half on the right semicircle (-90deg -> 90deg)
        let angleRad = 0;
        if (i < leftCount) {
          const idx = i;
          const denom = Math.max(1, leftCount - 1);
          const t = denom === 0 ? 0.5 : idx / denom;
          angleRad = Math.PI / 2 + t * Math.PI; // 90 -> 270
        } else {
          const idx = i - leftCount;
          const denom = Math.max(1, rightCount - 1);
          const t = denom === 0 ? 0.5 : idx / denom;
          angleRad = -Math.PI / 2 + t * Math.PI; // -90 -> 90
        }

        const baseX = Math.round(Math.cos(angleRad) * radius);
        const baseY = Math.round(Math.sin(angleRad) * radius);

        // Deterministic pseudo-random jitter based on slug+index to avoid hydration mismatch
        const hashStringToInt = (s: string) => {
          let h = 2166136261 >>> 0;
          for (let j = 0; j < s.length; j++) {
            h ^= s.charCodeAt(j);
            h = Math.imul(h, 16777619) >>> 0;
          }
          return h >>> 0;
        };

        const xorshift = (n: number) => {
          let x = n >>> 0;
          x ^= x << 13;
          x ^= x >>> 17;
          x ^= x << 5;
          return (x >>> 0) / 4294967295;
        };

        const seed = hashStringToInt(`${logo.name}-${i}`) + i;
        const r1 = xorshift(seed);
        const r2 = xorshift(seed + 1);

        const jitterMax = vw >= 768 ? 72 : 36; // pixels
        const dx = Math.round((r1 - 0.5) * 2 * jitterMax);
        const dy = Math.round((r2 - 0.5) * 2 * Math.round(jitterMax * 0.6));

        const x = baseX + dx;
        const y = baseY + dy;

        const wrapperStyle: React.CSSProperties = { left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` };

        return (
          <motion.div
            key={`${logo.name}-${i}`}
            ref={(element) => {
              logoRefs.current[i] = element;
            }}
            style={wrapperStyle}
            className={`absolute pointer-events-auto ${colorClass} opacity-90 cursor-pointer`}
            initial={{ x: "-50%", y: "-50%", zIndex: logo.zIndex || 10 }}
            whileHover={{ scale: 1.3, zIndex: 50 }}
          >
            <div
              className="transition-transform duration-200 ease-out will-change-transform"
              style={{
                transform: `translate3d(${logoTransforms[i]?.x ?? 0}px, ${logoTransforms[i]?.y ?? 0}px, 0)`,
              }}
            >
              <motion.div
                animate={{
                  y: [0, -10 - (i % 3) * 5, 0],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex items-center justify-center transition-all duration-200 drop-shadow-lg">
                  {logo.logo && logo.logo.url ? (
                    <img src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000"}${logo.logo.url}`} width={logo.size} height={logo.size} alt={logo.name} className="opacity-95 object-contain" />
                  ) : (
                    (() => {
                      const fallback = staticLogos.find(s => s.name.toLowerCase() === logo.name.toLowerCase());
                      if (fallback) {
                        return <fallback.icon size={logo.size} color={fallback.color} className="opacity-95" aria-label={`${logo.name} logo`} />;
                      }
                      return null;
                    })()
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      })}

    </>
  );
}
