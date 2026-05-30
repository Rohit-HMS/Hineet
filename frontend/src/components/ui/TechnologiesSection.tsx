"use client";

import { useState, useEffect, type SVGProps } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Bot, Workflow, BrainCircuit, Route, Sparkles, Cpu } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";
import {
  SiMake, SiN8N, SiZapier, SiPython,
  SiReact, SiVuedotjs, SiAngular, SiSvelte, SiTailwindcss, SiNextdotjs, SiBootstrap,
  SiNodedotjs, SiSpringboot, SiNestjs, SiFastapi, SiExpress, SiGo, SiPhp, SiLaravel,
  SiFlutter, SiFrappe,
  SiGoogle, SiHuggingface, SiLivekit, SiOllama, SiGradio,
  SiKubernetes, SiApachekafka, SiDocker, SiGit,
  SiBlender, SiFigma,
  SiPostgresql, SiMongodb, SiMysql, SiRedis,
  SiGooglecloud, SiHostinger, SiDigitalocean,
  SiApachejmeter, SiSelenium
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { fetchTechnologies, type TechnologiesData, type TechCategory, type TechItem } from "@/lib/api";
import { useLivePreview } from "@payloadcms/live-preview-react";

type LogoProps = SVGProps<SVGSVGElement> & {
  size?: number;
  color?: string;
};

function AzureLogo({ size = 24, color = "#0078D4", className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M13.5 3L6.5 17.25H11.2L13 13.6L15.8 19H21L13.5 3Z" fill={color} />
      <path d="M4 19.5H12.2L13.9 16H8.2L4 19.5Z" fill={color} opacity="0.85" />
    </svg>
  );
}

function AdobeLogo({ size = 24, color = "#FF0000", className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 20L10.3 4H13.7L20 20H16.1L14.8 16.6H9.2L7.9 20H4Z" fill={color} />
      <path d="M10.5 13.7H13.5L12 9.9L10.5 13.7Z" fill="#FFFFFF" opacity="0.95" />
    </svg>
  );
}

function PhotoshopLogo({ size = 24, color = "#31A8FF", className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4" fill={color} />
      <path d="M8.2 16.7V7.3H12.1C14 7.3 15.1 8.3 15.1 9.9C15.1 11.5 13.9 12.6 12 12.6H10.7V16.7H8.2ZM10.7 10.9H11.8C12.5 10.9 12.9 10.5 12.9 9.9C12.9 9.3 12.5 8.9 11.8 8.9H10.7V10.9Z" fill="#FFFFFF" />
      <path d="M16.2 16.3C15.5 16.3 14.9 16.1 14.4 15.7L15 14.1C15.4 14.4 15.8 14.5 16.2 14.5C16.7 14.5 16.9 14.2 16.9 13.8C16.9 13.4 16.6 13.1 16 12.7C15.1 12.1 14.6 11.5 14.6 10.6C14.6 9.2 15.7 8.2 17.3 8.2C17.9 8.2 18.5 8.3 19 8.6L18.4 10.1C18 9.9 17.6 9.8 17.2 9.8C16.8 9.8 16.5 10 16.5 10.4C16.5 10.8 16.8 11 17.4 11.4C18.2 12 18.8 12.6 18.8 13.6C18.8 15 17.7 16.3 16.2 16.3Z" fill="#FFFFFF" />
    </svg>
  );
}

function FlutterFlowLogo({ size = 24, color = "#02569B", className }: LogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill={color} />
      <path d="M7.3 16.8L12.5 11.6L14.9 14L9.7 19.2H7.3V16.8Z" fill="#FFFFFF" opacity="0.95" />
      <path d="M12 4.8L18.7 11.5L15.9 14.3L12 10.4L9.2 13.2L7.7 11.7L12 7.4V4.8Z" fill="#FFFFFF" />
    </svg>
  );
}

const defaultCategories: TechCategory[] = [
  {
    name: "Ai Automation",
    items: [
      { name: "AutoGen" },
      { name: "make.com" },
      { name: "N8N" },
      { name: "zapier" },
      { name: "Python" },
      { name: "MCP" },
    ]
  },
  {
    name: "Frontend Technologies",
    items: [
      { name: "React.JS" },
      { name: "Vue.JS" },
      { name: "Angular" },
      { name: "Svelte" },
      { name: "FrappeUI" },
      { name: "TailwindCSS" },
      { name: "NextJS" },
      { name: "Bootstrap" },
    ]
  },
  {
    name: "Backend Technologies",
    items: [
      { name: "NodeJS" },
      { name: "Springboot" },
      { name: "NestJS" },
      { name: "FastAPI" },
      { name: "ExpressJS" },
      { name: "GO" },
      { name: "PHP" },
      { name: "Laravel" },
    ]
  },
  {
    name: "Mobile App",
    items: [
      { name: "Flutter" },
      { name: "ReactNative" },
      { name: "Flutter flow" },
    ]
  },
  {
    name: "Ai Agent",
    items: [
      { name: "Google AI Studio" },
      { name: "llamaindex" },
      { name: "Open Router" },
      { name: "Vertex AI" },
      { name: "Kling AI" },
      { name: "LiveKit" },
      { name: "Ollama" },
      { name: "HuggingFace" },
      { name: "Gradio" },
      { name: "Groq" },
    ]
  },
  {
    name: "Devops",
    items: [
      { name: "Kubernetes" },
      { name: "Kafka" },
      { name: "Docker" },
      { name: "Git" },
    ]
  },
  {
    name: "Design",
    items: [
      { name: "Blender" },
      { name: "Figma" },
      { name: "Adobe" },
      { name: "Photoshop" },
    ]
  },
  {
    name: "Database",
    items: [
      { name: "PostgreSQL" },
      { name: "MongoDB" },
      { name: "Mysql" },
      { name: "Redis" },
    ]
  },
  {
    name: "Cloud",
    items: [
      { name: "AWS" },
      { name: "Azure" },
      { name: "Google cloud" },
      { name: "Hostinger" },
      { name: "Digital Ocean" },
    ]
  },
  {
    name: "Testing",
    items: [
      { name: "JMeter" },
      { name: "Selenium" },
    ]
  }
];

const iconMap: Record<string, { icon: any; color?: string }> = {
  "autogen": { icon: Bot },
  "make.com": { icon: SiMake, color: "#512BD4" },
  "n8n": { icon: SiN8N, color: "#EA4335" },
  "zapier": { icon: SiZapier, color: "#FF4A00" },
  "python": { icon: SiPython, color: "#3776AB" },
  "mcp": { icon: Workflow },
  "react.js": { icon: SiReact, color: "#61DAFB" },
  "react": { icon: SiReact, color: "#61DAFB" },
  "reactnative": { icon: SiReact, color: "#61DAFB" },
  "vue.js": { icon: SiVuedotjs, color: "#4FC08D" },
  "vue": { icon: SiVuedotjs, color: "#4FC08D" },
  "angular": { icon: SiAngular, color: "#DD0031" },
  "svelte": { icon: SiSvelte, color: "#FF3E00" },
  "frappeui": { icon: SiFrappe, color: "#F86202" },
  "tailwindcss": { icon: SiTailwindcss, color: "#06B6D4" },
  "nextjs": { icon: SiNextdotjs },
  "bootstrap": { icon: SiBootstrap, color: "#7952B3" },
  "nodejs": { icon: SiNodedotjs, color: "#339933" },
  "springboot": { icon: SiSpringboot, color: "#6DB33F" },
  "nestjs": { icon: SiNestjs, color: "#E0234E" },
  "fastapi": { icon: SiFastapi, color: "#009688" },
  "expressjs": { icon: SiExpress },
  "go": { icon: SiGo, color: "#00ADD8" },
  "php": { icon: SiPhp, color: "#777BB4" },
  "laravel": { icon: SiLaravel, color: "#FF2D20" },
  "flutter": { icon: SiFlutter, color: "#02569B" },
  "flutter flow": { icon: FlutterFlowLogo, color: "#02569B" },
  "google ai studio": { icon: SiGoogle, color: "#4285F4" },
  "llamaindex": { icon: BrainCircuit },
  "open router": { icon: Route },
  "vertex ai": { icon: Sparkles },
  "kling ai": { icon: Bot },
  "livekit": { icon: SiLivekit, color: "#FF3366" },
  "ollama": { icon: SiOllama, color: "#8F5D3B" },
  "huggingface": { icon: SiHuggingface, color: "#FFD21E" },
  "gradio": { icon: SiGradio, color: "#FF6949" },
  "groq": { icon: Cpu },
  "kubernetes": { icon: SiKubernetes, color: "#326CE5" },
  "kafka": { icon: SiApachekafka },
  "docker": { icon: SiDocker, color: "#2496ED" },
  "git": { icon: SiGit, color: "#F05032" },
  "blender": { icon: SiBlender, color: "#F5792A" },
  "figma": { icon: SiFigma, color: "#F24E1E" },
  "adobe": { icon: AdobeLogo, color: "#FF0000" },
  "photoshop": { icon: PhotoshopLogo, color: "#31A8FF" },
  "postgresql": { icon: SiPostgresql, color: "#4169E1" },
  "mongodb": { icon: SiMongodb, color: "#47A248" },
  "mysql": { icon: SiMysql, color: "#4479A1" },
  "redis": { icon: SiRedis, color: "#DC382D" },
  "aws": { icon: FaAws, color: "#232F3E" },
  "azure": { icon: AzureLogo, color: "#0078D4" },
  "google cloud": { icon: SiGooglecloud, color: "#4285F4" },
  "hostinger": { icon: SiHostinger, color: "#673DE6" },
  "digital ocean": { icon: SiDigitalocean, color: "#0080FF" },
  "jmeter": { icon: SiApachejmeter, color: "#D22128" },
  "selenium": { icon: SiSelenium, color: "#43B02A" },
};

const renderTechIcon = (tech: TechItem) => {
  const logoObj = tech.logo;
  if (logoObj && typeof logoObj === 'object' && 'url' in logoObj && logoObj.url) {
    return (
      <img 
        src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000"}${logoObj.url}`} 
        alt={logoObj.alt || tech.name} 
        className="w-6 h-6 object-contain" 
      />
    );
  }
  
  const normalized = tech.name.toLowerCase().trim();
  const mapped = iconMap[normalized];
  if (mapped) {
    const IconComp = mapped.icon;
    return <IconComp size={24} color={mapped.color} />;
  }
  
  return <Cpu size={24} />;
};

export default function TechnologiesSection() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [initialData, setInitialData] = useState<TechnologiesData | undefined>(undefined);
  const { theme } = useTheme();

  useEffect(() => {
    fetchTechnologies().then((data) => {
      if (data) {
        setInitialData(data);
      }
    });
  }, []);

  const { data: liveData } = useLivePreview<TechnologiesData>({
    initialData: initialData as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const resolvedData = liveData?.categories?.length ? liveData : initialData;
  const activeCategories = resolvedData?.categories || defaultCategories;

  const activeTextColor = theme === "light" ? "!text-white" : "!text-black";
  const isDarkTheme = theme === "dark";
  const sectionSurfaceClass = isDarkTheme ? "bg-[#0f0f10]" : "bg-[var(--surface-primary)]";
  const contentSurfaceClass = isDarkTheme ? "bg-[#101112]" : "bg-[var(--surface-secondary)]";
  const inactiveCategoryTextClass = isDarkTheme ? "text-white/90" : "text-[var(--text-secondary)]";

  return (
    <section className="w-full bg-[var(--bg-primary)] py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Technologies We Use</h2>
        <p className="text-lg text-[var(--text-secondary)] mb-12">
          Technologies we actively use to build scalable, secure products.
        </p>

        <div className={`${sectionSurfaceClass} rounded-[2rem] p-4 md:p-8 flex flex-col md:flex-row gap-6 md:gap-10 border border-[var(--glass-border)] shadow-xl`}>
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 flex flex-col gap-2 relative">
            {/* Scroll Indicator line (desktop only) */}
            <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-[var(--grey-element)] rounded-full hidden md:block opacity-30">
              <motion.div 
                className="w-full bg-[#2563EB] rounded-full absolute"
                initial={false}
                animate={{ 
                  top: `${(activeCategory / activeCategories.length) * 100}%`,
                  height: `${100 / activeCategories.length}%`
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto pb-4 md:pb-0 md:pr-6 snap-x md:max-h-[380px] [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar]:w-1 md:[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--grey-element)] [&::-webkit-scrollbar-thumb]:rounded-full"
              data-lenis-prevent
            >
              {activeCategories.map((category: TechCategory, idx: number) => {
                const isActive = activeCategory === idx;
                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(idx)}
                    className={`text-left px-5 py-4 rounded-xl font-semibold text-sm md:text-base transition-all duration-200 flex items-center justify-between whitespace-nowrap md:whitespace-normal snap-start shrink-0
                      ${isActive 
                        ? `bg-[#2563EB] ${activeTextColor} shadow-lg shadow-blue-900/20` 
                        : `${inactiveCategoryTextClass} hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]`
                      }`}
                  >
                    {category.name}
                    {isActive && <ArrowRight size={18} className="hidden md:block opacity-70" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Area */}
          <div className={`w-full md:w-2/3 ${contentSurfaceClass} rounded-[1.5rem] p-6 md:p-10 border border-[var(--glass-border)] relative overflow-y-auto flex flex-col md:max-h-[380px] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--grey-element)] [&::-webkit-scrollbar-thumb]:rounded-full`}
            data-lenis-prevent
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-fit"
              >
                {(activeCategories[activeCategory]?.items || []).map((tech: TechItem) => (
                  <div 
                    key={tech.name} 
                    className="flex items-center gap-4 bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl p-4 hover:shadow-md hover:border-[#2563EB]/50 transition-all duration-200 group cursor-default"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[var(--bg-secondary)] shadow-sm flex items-center justify-center border border-[var(--glass-border)] shrink-0 text-[var(--text-primary)] group-hover:scale-110 transition-transform duration-200 overflow-hidden">
                      {renderTechIcon(tech)}
                    </div>
                    <span className="font-semibold text-sm md:text-base text-[var(--text-primary)] truncate">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </section>
  );
}
