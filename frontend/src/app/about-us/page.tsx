"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  MessageSquare,
  Bot,
  PhoneCall,
  Workflow,
  Sparkles,
  Gauge,
  CircleUserRound,
  Headset,
  ShieldCheck
} from "lucide-react";
import { Instrument_Sans } from "next/font/google";
import { fetchAboutUsPage, type AboutUsPageData, type AboutServiceItem, type AboutFeatureItem } from "@/lib/api";
import { useLivePreview } from "@payloadcms/live-preview-react";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

const defaultAboutData: AboutUsPageData = {
  heading: "Building Smarter Business Solutions.",
  description: "Hineet Tech is a product-based technology company focused on building scalable digital solutions that help businesses automate operations, improve customer communication, and grow faster with AI-powered technology.",
  servicesSectionTitle: "What We Offer",
  services: [
    {
      title: "ERP Solutions",
      desc: "Streamline operations with a unified system built for modern businesses.",
      icon: "layout-grid",
    },
    {
      title: "Wapex – WhatsApp CRM",
      desc: "Manage leads, chats, and follow-ups from one clean communication hub.",
      icon: "message-square",
    },
    {
      title: "AI Chatbots",
      desc: "Deliver instant customer support with intelligent, always-on chat automation.",
      icon: "bot",
    },
    {
      title: "AI Calling Agents",
      desc: "Automate sales and support calls with smart voice-based workflows.",
      icon: "phone-call",
    },
    {
      title: "Business Automation Tools",
      desc: "Reduce manual work with connected workflows and smart automation.",
      icon: "workflow",
    },
  ],
  whyChooseUsTitle: "Why Choose Us",
  features: [
    {
      title: "Smart & Scalable Solutions",
      icon: "sparkles",
    },
    {
      title: "Modern Technology",
      icon: "gauge",
    },
    {
      title: "User-Friendly Platforms",
      icon: "circle-user",
    },
    {
      title: "Reliable Support",
      icon: "headset",
    },
    {
      title: "AI-Powered Automation",
      icon: "shield-check",
    },
  ],
  bottomStatement: "At Hineet Tech, we believe technology should make business *simpler*, faster, and more efficient.",
};

const getServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "layout-grid":
      return LayoutGrid;
    case "message-square":
      return MessageSquare;
    case "bot":
      return Bot;
    case "phone-call":
      return PhoneCall;
    case "workflow":
      return Workflow;
    case "sparkles":
    default:
      return Sparkles;
  }
};

const getFeatureIcon = (iconName: string) => {
  switch (iconName) {
    case "sparkles":
      return Sparkles;
    case "gauge":
      return Gauge;
    case "circle-user":
      return CircleUserRound;
    case "headset":
      return Headset;
    case "shield-check":
    default:
      return ShieldCheck;
  }
};

const renderStyledText = (text: string) => {
  if (!text) return "";
  // Split on text wrapped inside asterisks, e.g. *simpler*
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part: string, idx: number) => {
    if (part.startsWith('*') && part.endsWith('*')) {
      const cleanPart = part.slice(1, -1);
      return (
        <span key={idx} className="blue-gradient-text italic">
          {cleanPart}
        </span>
      );
    }
    return part;
  });
};

const renderSecondWordBlue = (text: string) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length < 2) return text;
  
  return (
    <>
      {words[0]}{" "}
      <span className="blue-gradient-text italic pr-4">
        {words[1]}
      </span>
      {words.length > 2 && " " + words.slice(2).join(" ")}
    </>
  );
};

export default function AboutUs() {
  const [initialData, setInitialData] = useState<AboutUsPageData | undefined>(undefined);

  useEffect(() => {
    fetchAboutUsPage().then((data) => {
      if (data) {
        setInitialData(data);
      }
    });
  }, []);

  const { data: liveData } = useLivePreview<AboutUsPageData>({
    initialData: initialData as any,
    serverURL: process.env.NEXT_PUBLIC_PAYLOAD_URL || "http://localhost:4000",
    depth: 1,
  });

  const resolvedData = liveData?.heading ? liveData : initialData;
  const activeData = resolvedData || defaultAboutData;

  return (
    <div className="pt-40 pb-20 w-full min-h-screen bg-transparent relative overflow-hidden">
      {/* Ambient background */}
      <div className="ambient-orb w-[60vw] h-[60vw] bg-[#2563EB]/06 top-0 right-0 blur-[150px]" />
      <div className="ambient-orb w-[40vw] h-[40vw] bg-[#60A5FA]/05 bottom-0 left-0 blur-[100px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-[#2563EB] mb-4 block">
            About Us
          </span>

          <h1 className="text-[#FFFFFF] text-5xl md:text-[5.5rem] font-light tracking-wide leading-[1.1] mb-6 drop-shadow-sm">
            {renderSecondWordBlue(activeData.heading)}
          </h1>

          <p className="text-2xl text-[#737373] mt-8 max-w-3xl leading-relaxed font-medium">
            {activeData.description}
          </p>
        </motion.div>

        {/* Services */}
        <div className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl md:text-5xl font-medium text-white tracking-tight">
              {activeData.servicesSectionTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {(activeData.services || []).map((service: AboutServiceItem, idx: number) => {
              const Icon = getServiceIcon(service.icon);
              return (
                <div
                  key={service.title || idx}
                  className="glass-card rounded-[2.5rem] border border-[#262626] p-10 transition-all duration-200 hover:border-[#2563EB]/40 hover:shadow-[0_10px_40px_rgba(37,99,235,0.12)] group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#171717] border border-[#262626] flex items-center justify-center mb-8 group-hover:bg-[#2563EB]/10 transition-colors duration-200">
                    <Icon className="text-[#2563EB]" size={26} />
                  </div>

                  <h3 className="text-2xl font-bold tracking-tighter mb-3 text-[#FFFFFF] group-hover:text-[#2563EB] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-[#737373] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-32">
          <h2 className={`${instrumentSans.className} text-[#FFFFFF] text-4xl md:text-[4rem] font-light tracking-wide leading-[1.1] mb-12 drop-shadow-sm`}>
            {activeData.whyChooseUsTitle}
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {(activeData.features || []).map((feature: AboutFeatureItem, idx: number) => {
              const Icon = getFeatureIcon(feature.icon);
              return (
                <div
                  key={feature.title || idx}
                  className="bg-[#0A0A0A] rounded-[2rem] border border-[#262626] p-8 flex flex-col items-start hover:border-[#2563EB]/40 transition-all duration-200 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#171717] border border-[#262626] flex items-center justify-center mb-6 group-hover:bg-[#2563EB]/10 transition-colors duration-200">
                    <Icon className="text-[#2563EB]" size={24} />
                  </div>

                  <h3 className="text-xl font-bold tracking-tighter text-[#FFFFFF] group-hover:text-[#2563EB] transition-colors leading-tight">
                    {feature.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-40 text-center max-w-4xl mx-auto">
          <div className="p-[1px] rounded-[3rem] bg-gradient-to-r from-transparent via-[#2563EB]/30 to-transparent">
            <div className="bg-[#0A0A0A]/80 backdrop-blur-xl rounded-[3rem] py-16 px-8 md:px-16 border border-[#262626]">
              <h2 className={`${instrumentSans.className} text-[#FFFFFF] text-4xl md:text-[4rem] font-light tracking-wide leading-[1.1] drop-shadow-sm`}>
                {renderStyledText(activeData.bottomStatement)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}